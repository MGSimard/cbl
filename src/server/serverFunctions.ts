import { regionDictionary } from "@/_utils/helpers";
import { createServerFn } from "@tanstack/react-start";
import { rateLimit } from "@/server/ratelimit";
import { auth } from "@/server/auth";
import { getWebRequest } from "@tanstack/react-start/server";
import { getClientIP } from "@/server/utils/serverHelpers";
import {
  MatchV5ByMatchId,
  AccountV1ByRiotId,
  SummonerV4ByPuuid,
  LeagueV4ByPuuid,
  MatchV5ByPuuid,
} from "@/_utils/riotApiTypes";
import { env } from "@/env";

const API_KEY = env.RIOT_API_SECRET;

interface GetPlayerDataReturnType {
  success: boolean;
  data?: {
    identity: AccountV1ByRiotId;
    profile: SummonerV4ByPuuid;
    rank: LeagueV4ByPuuid;
    matches: MatchV5ByPuuid;
    region: string;
  };
  message: string;
}
export const getPlayerData = createServerFn({ method: "GET" })
  .validator((input: { regionPrefix: string; riotId: string }) => input)
  .handler(async ({ data }): Promise<GetPlayerDataReturnType> => {
    try {
      const { regionPrefix, riotId } = data;

      const req = getWebRequest();
      if (!req) throw new Error("ERROR: Invalid request.");
      const session = await auth.api.getSession({ headers: req.headers });
      // Session is optional, just using for ratelimit identifier

      const rateLimitResult = await rateLimit("query", session?.user.id ?? (await getClientIP()));
      if (!rateLimitResult.success) throw new Error(rateLimitResult.message);

      const [shard, cluster, fullRegion] = regionDictionary(regionPrefix); // e.g. ["NA1", "americas", "North America"]
      const [summonerName, summonerTag] = riotId.split("-");
      const targetIdentity = await fetch(
        `https://${cluster}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${summonerTag}?api_key=${API_KEY}`
      ).then(async (res) => {
        console.log(res);
        if (!res.ok) throw new Error(`ERROR (ACCOUNT-V1): ${res.status}`);
        return (await res.json()) as AccountV1ByRiotId;
      });
      const [targetProfile, matchIdList] = await Promise.all([
        fetch(
          `https://${shard}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${targetIdentity.puuid}?api_key=${API_KEY}`
        ).then(async (res) => {
          if (!res.ok) throw new Error(`ERROR (SUMMONER-V4): ${res.status}`);
          return (await res.json()) as SummonerV4ByPuuid;
        }),
        fetch(
          `https://${cluster}.api.riotgames.com/lol/match/v5/matches/by-puuid/${targetIdentity.puuid}/ids?start=0&count=20&api_key=${API_KEY}`
        ).then(async (res) => {
          if (!res.ok) throw new Error(`ERROR (MATCH-V5): ${res.status}`);
          return (await res.json()) as MatchV5ByPuuid;
        }),
      ]);
      const targetRank = await fetch(
        `https://${shard}.api.riotgames.com/lol/league/v4/entries/by-puuid/${targetProfile.puuid}?api_key=${API_KEY}`
      ).then(async (res) => {
        if (!res.ok) throw new Error(`ERROR (LEAGUE-V4): ${res.status}`);
        return (await res.json()) as LeagueV4ByPuuid;
      });

      return {
        success: true,
        data: {
          identity: targetIdentity,
          profile: targetProfile,
          rank: targetRank,
          matches: matchIdList,
          region: fullRegion,
        },
        message: "SUCCESS: Profile data fetched.",
      };
    } catch (err: unknown) {
      return { success: false, message: err instanceof Error ? err.message : "UNKNOWN ERROR." };
    }
  });

interface GetMatchesDataReturnType {
  success: boolean;
  data?: MatchV5ByMatchId[];
  message: string;
}
export const getMatchesData = createServerFn({ method: "GET" })
  .validator((input: { matchIds: string[]; regionPrefix: string }) => input)
  .handler(async ({ data }): Promise<GetMatchesDataReturnType> => {
    try {
      const { matchIds, regionPrefix } = data;

      const req = getWebRequest();
      if (!req) throw new Error("ERROR: Invalid request.");
      const session = await auth.api.getSession({ headers: req.headers });
      // Session is optional, just using for ratelimit identifier

      const rateLimitResult = await rateLimit("query", session?.user.id ?? (await getClientIP()));
      if (!rateLimitResult.success) throw new Error(rateLimitResult.message);

      const [_, cluster, __] = regionDictionary(regionPrefix);
      const matchesData = (
        await Promise.allSettled(
          matchIds.map((matchId) =>
            fetch(`https://${cluster}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`).then(
              async (res) => {
                if (!res.ok) throw new Error(`ERROR (MATCH-V5, MATCH ID: ${matchId}): ${res.status}`);
                return (await res.json()) as MatchV5ByMatchId;
              }
            )
          )
        )
      )
        .filter((result): result is PromiseFulfilledResult<MatchV5ByMatchId> => result.status === "fulfilled")
        .map((result) => result.value);
      return {
        success: true,
        data: matchesData,
        message: `SUCCESS: Fetched ${matchesData.length}/${matchIds.length} matches.`,
      };
    } catch (err: unknown) {
      return { success: false, message: err instanceof Error ? err.message : "UNKNOWN ERROR." };
    }
  });

// getReportsByPuuid

// submitReport

// approveReport

// rejectReport

// cancelReport

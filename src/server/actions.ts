"use server";
import { regionDictionary } from "@/utils/helpers";
import {
  AccountV1ByRiotId,
  LeagueV4ByPuuid,
  MatchV5ByPuuid,
  SummonerV4ByPuuid,
  MatchV5ByMatchId,
} from "@/utils/riotAPITypes";

const API_KEY = process.env.RIOT_API_SECRET;

interface GetPlayerDataReturnType {
  data?: {
    identity: AccountV1ByRiotId;
    profile: SummonerV4ByPuuid;
    rank: LeagueV4ByPuuid;
    matches: MatchV5ByPuuid;
    region: string;
  };
  message: string;
}
export async function getPlayerData(regionPrefix: string, summoner: string): Promise<GetPlayerDataReturnType> {
  try {
    const [shard, cluster, fullRegion] = regionDictionary(regionPrefix); // e.g. ["NA1", "americas", "North America"]
    const [summonerName, summonerTag] = summoner.split("-");

    const targetIdentity = await fetch(
      `https://${cluster}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${summonerTag}?api_key=${API_KEY}`
    ).then(async (res) => {
      if (!res.ok) throw new Error(`FETCH ERROR (ACCOUNT-V1): ${res.status}`);
      return (await res.json()) as AccountV1ByRiotId;
    });

    const [targetProfile, matchIdList] = await Promise.all([
      fetch(
        `https://${shard}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${targetIdentity.puuid}?api_key=${API_KEY}`
      ).then(async (res) => {
        if (!res.ok) throw new Error(`FETCH ERROR (SUMMONER-V4): ${res.status}`);
        return (await res.json()) as SummonerV4ByPuuid;
      }),
      fetch(
        `https://${cluster}.api.riotgames.com/lol/match/v5/matches/by-puuid/${targetIdentity.puuid}/ids?start=0&count=3&api_key=${API_KEY}`
      ).then(async (res) => {
        if (!res.ok) throw new Error(`FETCH ERROR (MATCH-V5): ${res.status}`);
        return (await res.json()) as MatchV5ByPuuid;
      }),
    ]);

    const targetRank = await fetch(
      `https://${shard}.api.riotgames.com/lol/league/v4/entries/by-puuid/${targetProfile.puuid}?api_key=${API_KEY}`
    ).then(async (res) => {
      if (!res.ok) throw new Error(`FETCH ERROR (LEAGUE-V4): ${res.status}`);
      return (await res.json()) as LeagueV4ByPuuid;
    });

    return {
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
    return { message: err instanceof Error ? err.message : "UNKNOWN ERROR." };
  }
}

interface GetMatchesDataReturnType {
  data?: MatchV5ByMatchId[];
  message: string;
}
export async function getMatchesData(matchIds: string[], regionPrefix: string): Promise<GetMatchesDataReturnType> {
  try {
    const [_, cluster, __] = regionDictionary(regionPrefix);

    const matchesData = (
      await Promise.allSettled(
        matchIds.map((matchId) =>
          fetch(`https://${cluster}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`).then(
            async (res) => {
              if (!res.ok) throw new Error(`FETCH ERROR (MATCH-V5, MATCH ID: ${matchId}): ${res.status}`);
              return (await res.json()) as MatchV5ByMatchId;
            }
          )
        )
      )
    )
      .filter((result): result is PromiseFulfilledResult<MatchV5ByMatchId> => result.status === "fulfilled")
      .map((result) => result.value);

    return {
      data: matchesData,
      message: `SUCCESS: Fetched ${matchesData.length}/${matchIds.length} matches.`,
    };
  } catch (err: unknown) {
    return { message: err instanceof Error ? err.message : "UNKNOWN ERROR." };
  }
}

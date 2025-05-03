"use server";
import { regionDictionary } from "@/utils/helpers";
import { AccountV1ByRiotID, LeagueV4ByPUUID, MatchV5ByPUUID, SummonerV4ByPUUID } from "@/utils/riotAPITypes";

const API_KEY = process.env.RIOT_DEV_KEY;

interface GetPlayerDataReturnType {
  data?: {
    identity: AccountV1ByRiotID;
    profile: SummonerV4ByPUUID;
    rank: LeagueV4ByPUUID;
    matches: MatchV5ByPUUID;
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
      return (await res.json()) as AccountV1ByRiotID;
    });

    const [targetProfile, matchIdList] = await Promise.all([
      fetch(
        `https://${shard}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${targetIdentity.puuid}?api_key=${API_KEY}`
      ).then(async (res) => {
        if (!res.ok) throw new Error(`FETCH ERROR (SUMMONER-V4): ${res.status}`);
        return (await res.json()) as SummonerV4ByPUUID;
      }),
      fetch(
        `https://${cluster}.api.riotgames.com/lol/match/v5/matches/by-puuid/${targetIdentity.puuid}/ids?start=0&count=10&api_key=${API_KEY}`
      ).then(async (res) => {
        if (!res.ok) throw new Error(`FETCH ERROR (MATCH-V5): ${res.status}`);
        return (await res.json()) as MatchV5ByPUUID;
      }),
    ]);

    const targetRank = await fetch(
      `https://${shard}.api.riotgames.com/lol/league/v4/entries/by-puuid/${targetProfile.puuid}?api_key=${API_KEY}`
    ).then(async (res) => {
      if (!res.ok) throw new Error(`FETCH ERROR (LEAGUE-V4): ${res.status}`);
      return (await res.json()) as LeagueV4ByPUUID;
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

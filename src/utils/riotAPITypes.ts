export interface AccountV1ByPUUID {
  puuid: string;
  gameName: string | null; // This field may be excluded from the response if the account doesn't have a gameName.
  tagLine: string | null; // 	This field may be excluded from the response if the account doesn't have a tagLine.
}

export interface AccountV1ByRiotId {
  puuid: string;
  gameName: string;
  tagLine: string;
}

export type LeagueV4ByPUUID = {
  leagueId: string;
  summonerId: string; // Player's encrypted summonerId.
  puuid: string; // Player's encrypted puuid.
  queueType: string;
  tier: string;
  rank: string; // The player's division within a tier.
  leaguePoints: number;
  wins: number;
  losses: number;
  hotStreak: boolean;
  veteran: boolean;
  freshBlood: boolean;
  inactive: boolean;
  miniSeries: { losses: number; progress: string; target: number; wins: number };
}[];

export type MatchV5ByPUUID = string[];

export interface SummonerV4ByPUUID {
  accountId: string; // Encrypted account ID. Max length 56 characters.
  profileIconId: number; // ID of the summoner icon associated with the summoner.
  revisionDate: number; // Date summoner was last modified specified as epoch milliseconds. The following events will update this timestamp: profile icon change, playing the tutorial or advanced tutorial, finishing a game, summoner name change.
  id: string; // Encrypted summoner ID. Max length 63 characters.
  puuid: string; // Encrypted PUUID. Exact length of 78 characters.
  summonerLevel: number; // Summoner level associated with the summoner.
}

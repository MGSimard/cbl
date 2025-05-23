export interface AccountV1ByPuuid {
  puuid: string;
  gameName: string | null; // This field may be excluded from the response if the account doesn't have a gameName.
  tagLine: string | null; // This field may be excluded from the response if the account doesn't have a tagLine.
}

export interface AccountV1ByRiotId {
  puuid: string;
  gameName: string;
  tagLine: string;
}

export type LeagueV4ByPuuid = {
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

export type MatchV5ByPuuid = string[];

export interface SummonerV4ByPuuid {
  accountId: string; // Encrypted account ID. Max length 56 characters.
  profileIconId: number; // ID of the summoner icon associated with the summoner.
  revisionDate: number; // Date summoner was last modified specified as epoch milliseconds. The following events will update this timestamp: profile icon change, playing the tutorial or advanced tutorial, finishing a game, summoner name change.
  id: string; // Encrypted summoner ID. Max length 63 characters.
  puuid: string; // Encrypted PUUID. Exact length of 78 characters.
  summonerLevel: number; // Summoner level associated with the summoner.
}

export interface MatchV5ByMatchId {
  metadata: MetadataDto;
  info: InfoDto;
}
interface MetadataDto {
  dataVersion: string; // Match data version.
  matchId: string; // Match id.
  participants: string[]; // A list of participant PUUIDs.
}
interface InfoDto {
  endOfGameResult: string; // Refer to indicate if the game ended in termination.
  gameCreation: number; // Unix timestamp for when the game is created on the game server (i.e., the loading screen).
  gameDuration: number; // Prior to patch 11.20, this field returns the game length in milliseconds calculated from gameEndTimestamp - gameStartTimestamp. Post patch 11.20, this field returns the max timePlayed of any participant in the game in seconds, which makes the behavior of this field consistent with that of match-v4. The best way to handling the change in this field is to treat the value as milliseconds if the gameEndTimestamp field isn't in the response and to treat the value as seconds if gameEndTimestamp is in the response.
  gameEndTimestamp: number; // Unix timestamp for when match ends on the game server. This timestamp can occasionally be significantly longer than when the match "ends". The most reliable way of determining the timestamp for the end of the match would be to add the max time played of any participant to the gameStartTimestamp. This field was added to match-v5 in patch 11.20 on Oct 5th, 2021.
  gameId: number;
  gameMode: string; // Refer to the Game Constants documentation.
  gameName: string;
  gameStartTimestamp: number; // Unix timestamp for when match starts on the game server.
  gameType: string;
  gameVersion: string; // The first two parts can be used to determine the patch a game was played on.
  mapId: number; // Refer to the Game Constants documentation.
  participants: ParticipantDto[];
  platformId: string; // Platform where the match was played.
  queueId: number; // Refer to the Game Constants documentation.
  teams: TeamDto[];
  tournamentCode: string; // Tournament code used to generate the match. This field was added to match-v5 in patch 11.13 on June 23rd, 2021.
}
export interface ParticipantDto {
  allInPings: number; // Yellow crossed swords.
  assistMePings: number; // Green flag.
  assists: number;
  baronKills: number;
  basicPings: number; // MISSING FROM DOCUMENTATION.
  bountyLevel: number;
  champExperience: number;
  champLevel: number;
  championId: number; // Prior to patch 11.4, on Feb 18th, 2021, this field returned invalid championIds. We recommend determining the champion based on the championName field for matches played prior to patch 11.4.
  championName: string;
  commandPings: number; // Blue generic ping (ALT+click).
  championTransform: number; // This field is currently only utilized for Kayn's transformations (legal values: 0 - None, 1 - Slayer, 2 - Assassin).
  consumablesPurchased: number;
  challenges: ChallengesDto;
  damageDealtToBuildings: number;
  damageDealtToObjectives: number;
  damageDealtToTurrets: number;
  damageSelfMitigated: number;
  dangerPings: number; // MISSING FROM DOCUMENTATION.
  deaths: number;
  detectorWardsPlaced: number;
  doubleKills: number;
  dragonKills: number;
  eligibleForProgression: boolean;
  enemyMissingPings: number; // Yellow question mark.
  enemyVisionPings: number; // Red eyeball.
  firstBloodAssist: boolean;
  firstBloodKill: boolean;
  firstTowerAssist: boolean;
  firstTowerKill: boolean;
  gameEndedInEarlySurrender: boolean; // This is an offshoot of the OneStone challenge. The code checks if a spell with the same instance ID does the final point of damage to at least 2 Champions. It doesn't matter if they're enemies, but you cannot hurt your friends.
  gameEndedInSurrender: boolean;
  holdPings: number;
  getBackPings: number; // Yellow circle with horizontal lin.
  goldEarned: number;
  goldSpent: number;
  individualPosition: string; // Both individualPosition and teamPosition are computed by the game server and are different versions of the most likely position played by a player. The individualPosition is the best guess for which position the player actually played in isolation of anything else. The teamPosition is the best guess for which position the player actually played if we add the constraint that each team must have one top player, one jungle, one middle, etc. Generally the recommendation is to use the teamPosition field over the individualPosition field.
  inhibitorKills: number;
  inhibitorTakedowns: number;
  inhibitorsLost: number;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  itemsPurchased: number;
  killingSprees: number;
  kills: number;
  lane: string;
  largestCriticalStrike: number;
  largestKillingSpree: number;
  largestMultiKill: number;
  longestTimeSpentLiving: number;
  magicDamageDealt: number;
  magicDamageDealtToChampions: number;
  magicDamageTaken: number;
  missions: MissionsDto;
  neutralMinionsKilled: number; // neutralMinionsKilled = mNeutralMinionsKilled, which is incremented on kills of kPet and kJungleMonster.
  needVisionPings: number; // Green ward.
  nexusKills: number;
  nexusTakedowns: number;
  nexusLost: number;
  objectivesStolen: number;
  objectivesStolenAssists: number;
  onMyWayPings: number; // Blue arrow pointing at ground.
  participantId: number;
  PlayerScore0: number; // DOCS SAY LOWERCASE P, BUT RESPONSE IS UPPERCASE.
  PlayerScore1: number; // DOCS SAY LOWERCASE P, BUT RESPONSE IS UPPERCASE.
  PlayerScore2: number; // DOCS SAY LOWERCASE P, BUT RESPONSE IS UPPERCASE.
  PlayerScore3: number; // DOCS SAY LOWERCASE P, BUT RESPONSE IS UPPERCASE.
  PlayerScore4: number; // DOCS SAY LOWERCASE P, BUT RESPONSE IS UPPERCASE.
  PlayerScore5: number; // DOCS SAY LOWERCASE P, BUT RESPONSE IS UPPERCASE.
  PlayerScore6: number; // DOCS SAY LOWERCASE P, BUT RESPONSE IS UPPERCASE.
  PlayerScore7: number; // DOCS SAY LOWERCASE P, BUT RESPONSE IS UPPERCASE.
  PlayerScore8: number; // DOCS SAY LOWERCASE P, BUT RESPONSE IS UPPERCASE.
  PlayerScore9: number; // DOCS SAY LOWERCASE P, BUT RESPONSE IS UPPERCASE.
  PlayerScore10: number; // DOCS SAY LOWERCASE P, BUT RESPONSE IS UPPERCASE.
  PlayerScore11: number; // DOCS SAY LOWERCASE P, BUT RESPONSE IS UPPERCASE.
  pentaKills: number;
  perks: PerksDto;
  physicalDamageDealt: number;
  physicalDamageDealtToChampions: number;
  physicalDamageTaken: number;
  placement: number;
  playerAugment1: number;
  playerAugment2: number;
  playerAugment3: number;
  playerAugment4: number;
  playerAugment5: number; // MISSING FROM DOCUMENTATION - ALWAYS RETURNS 0?
  playerAugment6: number; // MISSING FROM DOCUMENTATION - ALWAYS RETURNS 0?
  playerSubteamId: number;
  pushPings: number; // Green minion.
  profileIcon: number;
  puuid: string;
  quadraKills: number;
  retreatPings: number; // MISSING FROM DOCUMENTATION.
  riotIdGameName: string;
  riotIdTagline: string;
  role: string;
  sightWardsBoughtInGame: number;
  spell1Casts: number;
  spell2Casts: number;
  spell3Casts: number;
  spell4Casts: number;
  subteamPlacement: number;
  summoner1Casts: number;
  summoner1Id: number;
  summoner2Casts: number;
  summoner2Id: number;
  summonerId: string;
  summonerLevel: number;
  summonerName: string;
  teamEarlySurrendered: boolean;
  teamId: number;
  teamPosition: string; // Both individualPosition and teamPosition are computed by the game server and are different versions of the most likely position played by a player. The individualPosition is the best guess for which position the player actually played in isolation of anything else. The teamPosition is the best guess for which position the player actually played if we add the constraint that each team must have one top player, one jungle, one middle, etc. Generally the recommendation is to use the teamPosition field over the individualPosition field.
  timeCCingOthers: number;
  timePlayed: number;
  totalAllyJungleMinionsKilled: number;
  totalDamageDealt: number;
  totalDamageDealtToChampions: number;
  totalDamageShieldedOnTeammates: number;
  totalDamageTaken: number;
  totalEnemyJungleMinionsKilled: number;
  totalHeal: number; // Whenever positive health is applied (which translates to all heals in the game but not things like regeneration), totalHeal is incremented by the amount of health received. This includes healing enemies, jungle monsters, yourself, etc.
  totalHealsOnTeammates: number; // Whenever positive health is applied (which translates to all heals in the game but not things like regeneration), totalHealsOnTeammates is incremented by the amount of health received. This is post modified, so if you heal someone missing 5 health for 100 you will get +5 totalHealsOnTeammates
  totalMinionsKilled: number; // totalMillionsKilled = mMinionsKilled, which is only incremented on kills of kTeamMinion, kMeleeLaneMinion, kSuperLaneMinion, kRangedLaneMinion and kSiegeLaneMinion.
  totalTimeCCDealt: number;
  totalTimeSpentDead: number;
  totalUnitsHealed: number;
  tripleKills: number;
  trueDamageDealt: number;
  trueDamageDealtToChampions: number;
  trueDamageTaken: number;
  turretKills: number;
  turretTakedowns: number;
  turretsLost: number;
  unrealKills: number;
  visionScore: number;
  visionClearedPings: number;
  visionWardsBoughtInGame: number;
  wardsKilled: number;
  wardsPlaced: number;
  win: boolean;
}
interface ChallengesDto {
  "12AssistStreakCount": number;
  baronBuffGoldAdvantageOverThreshold: number;
  controlWardTimeCoverageInRiverOrEnemyHalf: number;
  earliestBaron: number;
  earliestDragonTakedown: number;
  earliestElderDragon: number;
  earlyLaningPhaseGoldExpAdvantage: number;
  fasterSupportQuestCompletion: number;
  fastestLegendary: number;
  hadAfkTeammate: number;
  highestChampionDamage: number;
  highestCrowdControlScore: number;
  highestWardKills: number;
  junglerKillsEarlyJungle: number;
  killsOnLanersEarlyJungleAsJungler: number;
  laningPhaseGoldExpAdvantage: number;
  legendaryCount: number;
  maxCsAdvantageOnLaneOpponent: number;
  maxLevelLeadLaneOpponent: number;
  mostWardsDestroyedOneSweeper: number;
  mythicItemUsed: number;
  playedChampSelectPosition: number;
  soloTurretsLategame: number;
  takedownsFirst25Minutes: number;
  teleportTakedowns: number;
  thirdInhibitorDestroyedTime: number;
  threeWardsOneSweeperCount: number;
  visionScoreAdvantageLaneOpponent: number;
  InfernalScalePickup: number;
  fistBumpParticipation: number;
  voidMonsterKill: number;
  abilityUses: number;
  acesBefore15Minutes: number;
  alliedJungleMonsterKills: number;
  baronTakedowns: number;
  blastConeOppositeOpponentCount: number;
  bountyGold: number;
  buffsStolen: number;
  completeSupportQuestInTime: number;
  controlWardsPlaced: number;
  damagePerMinute: number;
  damageTakenOnTeamPercentage: number;
  dancedWithRiftHerald: number;
  deathsByEnemyChamps: number;
  dodgeSkillShotsSmallWindow: number;
  doubleAces: number;
  dragonTakedowns: number;
  legendaryItemUsed: number[];
  effectiveHealAndShielding: number;
  elderDragonKillsWithOpposingSoul: number;
  elderDragonMultikills: number;
  enemyChampionImmobilizations: number;
  enemyJungleMonsterKills: number;
  epicMonsterKillsNearEnemyJungler: number;
  epicMonsterKillsWithin30SecondsOfSpawn: number;
  epicMonsterSteals: number;
  epicMonsterStolenWithoutSmite: number;
  firstTurretKilled: number;
  firstTurretKilledTime: number;
  flawlessAces: number;
  fullTeamTakedown: number;
  gameLength: number;
  getTakedownsInAllLanesEarlyJungleAsLaner: number;
  goldPerMinute: number;
  hadOpenNexus: number;
  HealFromMapSources: number; // MISSING FROM DOCUMENTATION + UPPERCASE H IN RESPONSE.
  immobilizeAndKillWithAlly: number;
  initialBuffCount: number;
  initialCrabCount: number;
  jungleCsBefore10Minutes: number;
  junglerTakedownsNearDamagedEpicMonster: number;
  kda: number;
  killAfterHiddenWithAlly: number;
  killedChampTookFullTeamDamageSurvived: number;
  killingSprees: number;
  killParticipation: number;
  killsNearEnemyTurret: number;
  killsOnOtherLanesEarlyJungleAsLaner: number;
  killsOnRecentlyHealedByAramPack: number;
  killsUnderOwnTurret: number;
  killsWithHelpFromEpicMonster: number;
  knockEnemyIntoTeamAndKill: number;
  kTurretsDestroyedBeforePlatesFall: number;
  landSkillShotsEarlyGame: number;
  laneMinionsFirst10Minutes: number;
  lostAnInhibitor: number;
  maxKillDeficit: number;
  mejaisFullStackInTime: number;
  moreEnemyJungleThanOpponent: number;
  multiKillOneSpell: number; // This is an offshoot of the OneStone challenge. The code checks if a spell with the same instance ID does the final point of damage to at least 2 Champions. It doesn't matter if they're enemies, but you cannot hurt your friends.
  multikills: number;
  multikillsAfterAggressiveFlash: number;
  multiTurretRiftHeraldCount: number;
  outerTurretExecutesBefore10Minutes: number;
  outnumberedKills: number;
  outnumberedNexusKill: number;
  perfectDragonSoulsTaken: number;
  perfectGame: number;
  pickKillWithAlly: number;
  poroExplosions: number;
  quickCleanse: number;
  quickFirstTurret: number;
  quickSoloKills: number;
  riftHeraldTakedowns: number;
  saveAllyFromDeath: number;
  scuttleCrabKills: number;
  shortestTimeToAceFromFirstTakedown: number;
  skillshotsDodged: number;
  skillshotsHit: number;
  snowballsHit: number;
  soloBaronKills: number;
  SWARM_DefeatAatrox: number;
  SWARM_DefeatBriar: number;
  SWARM_DefeatMiniBosses: number;
  SWARM_EvolveWeapon: number;
  SWARM_Have3Passives: number;
  SWARM_KillEnemy: number;
  SWARM_PickupGold: number;
  SWARM_ReachLevel50: number;
  SWARM_Survive15Min: number;
  SWARM_WinWith5EvolvedWeapons: number;
  soloKills: number;
  stealthWardsPlaced: number;
  survivedSingleDigitHpCount: number;
  survivedThreeImmobilizesInFight: number;
  takedownOnFirstTurret: number;
  takedowns: number;
  takedownsAfterGainingLevelAdvantage: number;
  takedownsBeforeJungleMinionSpawn: number;
  takedownsFirstXMinutes: number;
  takedownsInAlcove: number;
  takedownsInEnemyFountain: number;
  teamBaronKills: number;
  teamDamagePercentage: number;
  teamElderDragonKills: number;
  teamRiftHeraldKills: number;
  tookLargeDamageSurvived: number;
  turretPlatesTaken: number;
  turretsTakenWithRiftHerald: number;
  turretTakedowns: number;
  twentyMinionsIn3SecondsCount: number;
  twoWardsOneSweeperCount: number;
  unseenRecalls: number;
  visionScorePerMinute: number;
  wardsGuarded: number;
  wardTakedowns: number;
  wardTakedownsBefore20M: number;
}
interface MissionsDto {
  playerScore0: number;
  playerScore1: number;
  playerScore2: number;
  playerScore3: number;
  playerScore4: number;
  playerScore5: number;
  playerScore6: number;
  playerScore7: number;
  playerScore8: number;
  playerScore9: number;
  playerScore10: number;
  playerScore11: number;
}
interface PerksDto {
  statPerks: PerkStatsDto;
  styles: PerkStyleDto[];
}
interface PerkStatsDto {
  defense: number;
  flex: number;
  offense: number;
}
interface PerkStyleDto {
  description: string;
  selections: PerkStyleSelectionDto[];
  style: number;
}
interface PerkStyleSelectionDto {
  perk: number;
  var1: number;
  var2: number;
  var3: number;
}
interface TeamDto {
  bans: BanDto[];
  // v=== MISSING FROM DOCUMENTATION ===v
  feats: {
    EPIC_MONSTER_KILL: { featState: number };
    FIRST_BLOOD: { featState: number };
    FIRST_TURRET: { featState: number };
  };
  // ^=== MISSING FROM DOCUMENTATION ===^
  objectives: ObjectivesDto;
  teamId: number;
  win: boolean;
}
interface BanDto {
  championId: number;
  pickTurn: number;
}
interface ObjectivesDto {
  atakhan: ObjectiveDto; // MISSING FROM DOCUMENTATION.
  baron: ObjectiveDto;
  champion: ObjectiveDto;
  dragon: ObjectiveDto;
  horde: ObjectiveDto;
  inhibitor: ObjectiveDto;
  riftHerald: ObjectiveDto;
  tower: ObjectiveDto;
}
interface ObjectiveDto {
  first: boolean;
  kills: number;
}

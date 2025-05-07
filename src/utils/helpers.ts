import type { LeagueV4ByPuuid, ParticipantDto } from "@/utils/riotApiTypes";
import versionsJson from "@/datasets/versions.json";
import championsJson from "@/datasets/champion.json";
import itemsJson from "@/datasets/item.json";
import mapsJson from "@/datasets/maps.json";
import sumSpellsJson from "@/datasets/summoner.json";
import runesJson from "@/datasets/runesReforged.json";
import arenaJson from "@/datasets/arena.json";

const latestPatch = versionsJson[0];
const dsChampions = championsJson.data;
const dsItems = itemsJson.data;
const dsMaps = mapsJson;
const dsSumSpells = sumSpellsJson.data;
const dsRunes = runesJson;
const dsArena = arenaJson.augments;

export function rankFormatter(rankData: LeagueV4ByPuuid): string {
  const soloQueueRank = rankData.find((r) => r.queueType === "RANKED_SOLO_5x5");
  if (soloQueueRank) {
    const { tier, rank, leaguePoints } = soloQueueRank;
    return `${tier} ${rank} ${leaguePoints}LP (SOLO)`;
  }
  const flexQueueRank = rankData.find((r) => r.queueType === "RANKED_FLEX_SR");
  if (flexQueueRank) {
    const { tier, rank, leaguePoints } = flexQueueRank;
    return `${tier} ${rank} ${leaguePoints}LP (FLEX)`;
  }
  return "UNRANKED";
}

const BASE_CHAMP_URL = `https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/champion/`;
export function getChampImgUrl(champId: number): string {
  const champFilename = Object.values(dsChampions).find((info) => info.key === champId.toString())?.image?.full;
  if (!champFilename) {
    console.log(`ERROR: Champion ID ${champId} or its image is missing/empty.`);
    return "/assets/placeholder-warning.svg";
  }
  return `${BASE_CHAMP_URL}${champFilename}`;
}

const BASE_ITEM_URL = `https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/item/`;
export function getItemImgUrl(itemId: number): string | null {
  if (itemId === 0) return null;
  const itemFilename = dsItems[itemId.toString() as keyof typeof dsItems]?.image?.full;
  if (!itemFilename) {
    console.log(`ERROR: Item ID ${itemId} or its image is missing/empty.`);
    return "/assets/placeholder-warning.svg";
  }
  return `${BASE_ITEM_URL}${itemFilename}`;
}

export function getItemName(itemId: number): string {
  if (itemId === 0) return "Empty";
  const itemName = dsItems[itemId.toString() as keyof typeof dsItems]?.name;
  if (!itemName) {
    console.log(`ERROR: Item ID ${itemId} or its name is missing/empty.`);
    return "Unknown Item";
  }
  return itemName;
}

export function getMapName(mapId: number): string {
  const mapInfo = dsMaps.find((map) => map.mapId === mapId)?.mapName;
  if (!mapInfo) {
    console.log(`ERROR: Map ID ${mapId} or its name is missing/empty.`);
    return "Unknown Map";
  }
  return mapInfo;
}

const BASE_URL_SUMS = `https://ddragon.leagueoflegends.com/cdn/${latestPatch}/img/spell/`;
export function getSumSpells(order: 1 | 2, targetPlayerData: ParticipantDto): string {
  const sumSpellId = targetPlayerData[`summoner${order}Id` as keyof ParticipantDto];
  const sumSpellFilename = Object.values(dsSumSpells).find((spell) => spell.key === sumSpellId?.toString())?.image
    ?.full;
  if (!sumSpellFilename) {
    console.log(`ERROR: Summoner Spell ID ${sumSpellId} or its image is missing/empty.`);
    return "/assets/placeholder-warning.svg";
  }
  return `${BASE_URL_SUMS}${sumSpellFilename}`;
}

const BASE_URL_RUNES = "https://ddragon.canisback.com/img/";
export function getRunes(order: 1 | 2, targetPlayerData: ParticipantDto): string {
  // Keystone
  if (order === 1) {
    const keystoneId = targetPlayerData.perks?.styles?.[0]?.selections?.[0]?.perk;
    for (const runeTree of dsRunes) {
      const iconPath = runeTree.slots?.[0]?.runes?.find((r) => r.id === keystoneId)?.icon;
      if (iconPath) return `${BASE_URL_RUNES}${iconPath}`;
    }
    console.log(`ERROR: Keystone ID ${keystoneId} or its image is missing/empty.`);
    return "/assets/placeholder-warning.svg";
  }
  if (order === 2) {
    // Secondary Style
    const styleId = targetPlayerData.perks.styles[1]?.style;
    const styleFilename = dsRunes.find((style) => style.id === styleId)?.icon;
    if (!styleFilename) {
      console.log(`ERROR: Style ID ${styleId} or its image is missing/empty.`);
      return "/assets/placeholder-warning.svg";
    }
    return `${BASE_URL_RUNES}${styleFilename}`;
  }
  return "/assets/placeholder-warning.svg";
}

const BASE_URL_AUGMENTS = "https://raw.communitydragon.org/latest/game/";
export function getAugments(slot: 1 | 2 | 3 | 4, targetPlayerData: ParticipantDto): string | null {
  const augId = targetPlayerData[`playerAugment${slot}` as keyof ParticipantDto];
  if (augId === 0) return null;
  const augFilename = dsArena.find((aug) => aug.id === augId)?.iconSmall;
  if (!augFilename) {
    console.log(`ERROR: Augment ID ${augId} or its image is missing/empty.`);
    return "/assets/placeholder-warning.svg";
  }
  return `${BASE_URL_AUGMENTS}${augFilename}`;
}

export function calcDuration(gameLength: number): string {
  const minutes = Math.floor(gameLength / 60);
  const seconds = gameLength % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

const SECOND = 1;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 12 * MONTH;

const timeUnits: { threshold: number; singular: string; plural: string }[] = [
  { threshold: YEAR, singular: "year", plural: "years" },
  { threshold: MONTH, singular: "month", plural: "months" },
  { threshold: WEEK, singular: "week", plural: "weeks" },
  { threshold: DAY, singular: "day", plural: "days" },
  { threshold: HOUR, singular: "hour", plural: "hours" },
  { threshold: MINUTE, singular: "minute", plural: "minutes" },
];

export function timeSince(startUnix: number, gameLength: number): string {
  const currentUnix = Math.floor(new Date().getTime() / 1000);
  const gameStartUnix = Math.floor(startUnix / 1000);
  const gameEndUnix = gameStartUnix + gameLength;
  const timeSinceEnd = Math.max(0, currentUnix - gameEndUnix);
  for (const unit of timeUnits) {
    if (timeSinceEnd >= unit.threshold) {
      const value = Math.floor(timeSinceEnd / unit.threshold);
      return `${value} ${value === 1 ? unit.singular : unit.plural} ago`;
    }
  }
  return `${timeSinceEnd} seconds ago`;
}

type RegionInfo = [string, string, string]; // [shard, cluster, fullName]
const REGIONS: Record<string, RegionInfo> = {
  // AMERICAS
  na: ["NA1", "americas", "North America"],
  br: ["BR1", "americas", "Brazil"],
  lan: ["LA1", "americas", "Latin America North"],
  las: ["LA2", "americas", "Latin America South"],
  // ASIA
  kr: ["KR", "asia", "Korea"],
  jp: ["JP1", "asia", "Japan"],
  // EUROPE
  euw: ["EUW1", "europe", "Europe West"],
  eun: ["EUN1", "europe", "Europe Nordic & East"],
  me: ["ME1", "europe", "Middle East"],
  tr: ["TR1", "europe", "Türkiye"],
  ru: ["RU", "europe", "Russia"],
  // SEA
  oce: ["OC1", "sea", "Oceania"],
  sg: ["SG2", "sea", "Singapore"],
  ph: ["PH2", "sea", "Phillippines"],
  th: ["TH2", "sea", "Thailand"],
  tw: ["TW2", "sea", "Taiwan"],
  vn: ["VN2", "sea", "Vietnam"],
};
export function regionDictionary(regionPrefix: string): RegionInfo {
  const region = regionPrefix.toLowerCase();
  const regionInfo = REGIONS[region];
  if (!regionInfo) throw new Error(`Invalid region: ${regionPrefix}`);
  return regionInfo;
}

const REVERSE_REGIONS: Record<string, string> = Object.fromEntries(
  Object.entries(REGIONS).map(([prefix, [shard]]) => [shard.toLowerCase(), prefix])
);
export function reverseRegionDictionary(platformId: string): string {
  const lowerPlatformId = platformId.toLowerCase();
  const regionPrefix = REVERSE_REGIONS[lowerPlatformId];
  if (!regionPrefix) throw new Error(`Invalid Platform ID: ${platformId}`);
  return regionPrefix;
}

export function modeDictionary(queueId: number): string {
  // Queue IDs: src/datasets/queues.json (from https://static.developer.riotgames.com/docs/lol/queues.json)
  // Making our own dictionary because the dataset mode titles are very "dev-y"
  switch (queueId) {
    case 0:
      return "Custom";
    case 72:
    case 73:
      return "Showdown";
    case 75:
    case 98:
      return "Hexakill";
    case 76:
    case 1900:
      return "URF";
    case 78:
    case 1020:
      return "One For All";
    case 83:
      return "Co-op URF";
    case 100:
      return "Butcher's Bridge";
    case 310:
      return "Nemesis";
    case 313:
      return "Black Market Brawlers";
    case 317:
      return "Definitely Not Dominion";
    case 325:
      return "All Random";
    case 400:
      return "Normal (Draft Pick)";
    case 420:
      return "Ranked Solo/Duo";
    case 430:
      return "Normal (Blind Pick)";
    case 440:
      return "Ranked Flex";
    case 450:
      return "ARAM";
    case 490:
      return "Normal (Quickplay)";
    case 600:
      return "Blood Hunt";
    case 610:
      return "Dark Star: Singularity";
    case 700:
      return "Clash";
    case 720:
      return "ARAM Clash";
    case 820:
    case 870:
    case 880:
    case 890:
      return "Bots";
    case 900:
    case 1010:
      return "ARURF";
    case 910:
      return "Ascension";
    case 920:
      return "Poro King";
    case 940:
      return "Nexus Siege";
    case 950:
    case 960:
      return "Doom Bots";
    case 980:
      return "Star Guardian (Normal)";
    case 990:
      return "Star Guardian (Onslaught)";
    case 1000:
      return "PROJECT: Hunters";
    case 1030:
    case 1040:
    case 1050:
    case 1060:
    case 1070:
      return "Odyssey Extraction";
    /* 1090, 1100, 1110, 1111, 1210 Teamfight Tactics */
    case 1300:
      return "Nexus Blitz";
    case 1400:
      return "Ultimate Spellbook";
    case 1700:
    case 1710:
      return "Arena";
    case 1810:
    case 1820:
    case 1830:
    case 1840:
      return "Swarm";
    case 2000:
    case 2010:
    case 2020:
      return "Tutorial";
    default:
      return "Featured";
  }
}

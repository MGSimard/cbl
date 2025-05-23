import versionsJson from "@/_datasets/versions.json";
import championsJson from "@/_datasets/champion.json";
import itemsJson from "@/_datasets/item.json";
import mapsJson from "@/_datasets/maps.json";
import sumSpellsJson from "@/_datasets/summoner.json";
import runesJson from "@/_datasets/runesReforged.json";
import arenaJson from "@/_datasets/arena.json";
import type { LeagueV4ByPuuid, ParticipantDto } from "@/_utils/riotApiTypes";

const LATEST_PATCH = versionsJson[0];
const PLACEHOLDER_IMG = "/assets/placeholder-warning.svg";

// Pre-process datasets for faster lookups (O(n) once, then O(1) lookups)
const championsMap = new Map<string, { key: string; image: { full: string }; [key: string]: any }>();
Object.values(championsJson.data).forEach((champInfo) => {
  championsMap.set(champInfo.key, champInfo);
});
const itemsMap = new Map<string, { name: string; image: { full: string }; [key: string]: any }>();
Object.entries(itemsJson.data).forEach(([itemId, itemInfo]: [string, any]) => {
  itemsMap.set(itemId, itemInfo);
});
const mapsMap = new Map<number, { mapId: number; mapName: string; [key: string]: any }>();
mapsJson.forEach((mapInfo) => {
  mapsMap.set(mapInfo.mapId, mapInfo);
});
const sumSpellsMap = new Map<string, { key: string; image: { full: string }; [key: string]: any }>();
Object.values(sumSpellsJson.data).forEach((spellInfo) => {
  sumSpellsMap.set(spellInfo.key, spellInfo);
});
const keystoneMap = new Map<number, { icon: string; name: string }>();
runesJson.forEach((runeTree) => {
  runeTree.slots.forEach((slot) => {
    slot.runes.forEach((rune) => {
      keystoneMap.set(rune.id, { icon: rune.icon, name: rune.name });
    });
  });
});
const secondaryRuneStylesMap = new Map<number, { id: number; icon: string; [key: string]: any }>();
runesJson.forEach((runeTree) => {
  secondaryRuneStylesMap.set(runeTree.id, runeTree);
});
const arenaAugmentsMap = new Map<number, { id: number; iconSmall: string; [key: string]: any }>();
arenaJson.augments.forEach((augment: { id: number; iconSmall: string }) => {
  arenaAugmentsMap.set(augment.id, augment);
});

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

const BASE_CHAMP_URL = `https://ddragon.leagueoflegends.com/cdn/${LATEST_PATCH}/img/champion/`;
export function getChamp(champId: number): { url: string; label: string } {
  const champ = championsMap.get(champId.toString());
  const champFileName = champ?.image?.full;
  const champName = champ?.name;
  if (!champFileName || !champName) {
    console.warn(`ERROR: Champion ID ${champId} or its image is missing/empty.`);
  }
  return {
    url: champFileName ? `${BASE_CHAMP_URL}${champFileName}` : PLACEHOLDER_IMG,
    label: champName ?? "Unknown Champion",
  };
}

const BASE_ITEM_URL = `https://ddragon.leagueoflegends.com/cdn/${LATEST_PATCH}/img/item/`;
export function getItem(itemId: number): { url: string; label: string } | null {
  if (itemId === 0) return null;
  const item = itemsMap.get(itemId.toString());
  const itemFilename = item?.image?.full;
  const itemName = item?.name;
  if (!itemFilename || !itemName) {
    console.warn(`ERROR: Item ID ${itemId} or its image is missing/empty.`);
  }
  return {
    url: itemFilename ? `${BASE_ITEM_URL}${itemFilename}` : PLACEHOLDER_IMG,
    label: itemName ?? "Unknown Item",
  };
}

export function getMapName(mapId: number): string {
  const mapInfo = mapsMap.get(mapId)?.mapName;
  if (!mapInfo) {
    console.warn(`ERROR: Map ID ${mapId} or its name is missing/empty.`);
    return "Unknown Map";
  }
  return mapInfo;
}

const BASE_URL_SUMS = `https://ddragon.leagueoflegends.com/cdn/${LATEST_PATCH}/img/spell/`;
export function getSumSpells(order: 1 | 2, targetPlayerData: ParticipantDto): { url: string; label: string } {
  const sumSpellId = targetPlayerData[`summoner${order}Id` as keyof ParticipantDto];
  const sumSpellFilename = sumSpellsMap.get(sumSpellId?.toString())?.image?.full;
  const sumSpellName = sumSpellsMap.get(sumSpellId?.toString())?.name;
  if (!sumSpellFilename) {
    console.warn(`ERROR: Summoner Spell ID ${sumSpellId} or its image is missing/empty.`);
  }
  return {
    url: sumSpellFilename ? `${BASE_URL_SUMS}${sumSpellFilename}` : PLACEHOLDER_IMG,
    label: sumSpellName ?? "Unknown Summoner Spell",
  };
}

const BASE_URL_RUNES = "https://ddragon.canisback.com/img/";
export function getRunes(order: 1 | 2, targetPlayerData: ParticipantDto): { url: string; label: string } {
  // Keystone
  if (order === 1) {
    const keystoneId = targetPlayerData.perks?.styles?.[0]?.selections?.[0]?.perk;
    const keystone = keystoneMap.get(keystoneId as number);
    const keystoneFileName = keystone?.icon;
    const keystoneName = keystone?.name;
    if (!keystoneFileName || !keystoneName) {
      console.warn(`ERROR: Keystone ID ${keystoneId} or its image is missing/empty.`);
    }
    return {
      url: keystoneFileName ? `${BASE_URL_RUNES}${keystoneFileName}` : PLACEHOLDER_IMG,
      label: keystoneName ?? "Unknown Keystone",
    };
  }
  if (order === 2) {
    // Secondary Style
    const styleId = targetPlayerData.perks.styles[1]?.style;
    const style = secondaryRuneStylesMap.get(styleId as number);
    const styleFileName = style?.icon;
    const styleName = style?.name;
    if (!styleFileName || !styleName) {
      console.warn(`ERROR: Style ID ${styleId} or its image is missing/empty.`);
    }
    return {
      url: styleFileName ? `${BASE_URL_RUNES}${styleFileName}` : PLACEHOLDER_IMG,
      label: styleName ?? "Unknown Style",
    };
  }
  return { url: PLACEHOLDER_IMG, label: "Unknown Rune" };
}

const BASE_URL_AUGMENTS = "https://raw.communitydragon.org/latest/game/";
export function getAugments(
  slot: 1 | 2 | 3 | 4,
  targetPlayerData: ParticipantDto
): { url: string; label: string } | null {
  const augId = targetPlayerData[`playerAugment${slot}` as keyof ParticipantDto];
  if (augId === 0) return null;
  const aug = arenaAugmentsMap.get(augId as number);
  const augFileName = aug?.iconSmall;
  const augName = aug?.name;
  if (!augFileName || !augName) {
    console.warn(`ERROR: Augment ID ${augId} or its image is missing/empty.`);
  }
  return {
    url: augFileName ? `${BASE_URL_AUGMENTS}${augFileName}` : PLACEHOLDER_IMG,
    label: augName ?? "Unknown Augment",
  };
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

import { LeagueV4ByPuuid } from "@/utils/riotApiTypes";
import versionsJson from "@/datasets/versions.json";
import championsJson from "@/datasets/champion.json";

const latestPatch = versionsJson[0];
const dsChampions = championsJson.data;

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
export function champImgLink(champId: number): URL | null {
  // Consider pre-processing into a Map instead for micro optimization
  const championInfo = Object.values(dsChampions).find((info) => info.key === champId.toString());
  if (championInfo) {
    const fileName = championInfo.image.full;
    try {
      return new URL(`${BASE_CHAMP_URL}${fileName}`);
    } catch (error) {
      console.error(`ERROR: Could not create URL for champId ${champId} (${fileName}):`, error);
      return null;
    }
  } else {
    console.error(`ERROR: Could not find champion with id ${champId}.`);
    return null;
  }
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

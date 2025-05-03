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

  if (!regionInfo) {
    throw new Error(`Invalid region: ${regionPrefix}`);
  }

  return regionInfo;
}

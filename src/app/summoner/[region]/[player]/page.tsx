import { getPlayerData } from "@/server/actions";
import { SumSidebar } from "@/components/SummonerSidebar/SumSidebar";
import { MatchHistory } from "@/components/MatchHistory/MatchHistory";

// TODO: Dynamic meta title
// TODO: Caching (ISG)
// TODO: Error handling
// TODO: Add skeleton loading
// TODO: Refresh button

export default async function PageSummoner({ params }: { params: Promise<{ region: string; player: string }> }) {
  const { region: regionPrefix, player: summoner } = await params;
  const { data, message } = await getPlayerData(regionPrefix, summoner);

  if (!data) {
    // TODO
    return <main>{message}</main>;
  }

  const { identity, profile, rank, matches, region } = data;

  return (
    <main id="sum-main">
      <SumSidebar identity={identity} profile={profile} rank={rank} />
      <MatchHistory matchIds={matches} currentPlayer={profile.puuid} regionPrefix={regionPrefix} />
    </main>
  );
}

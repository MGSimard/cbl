import { getPlayerData } from "@/server/actions";
import { SumSidebar } from "@/components/SummonerSidebar/SumSidebar";

export default async function PageSummoner({ params }: { params: Promise<{ region: string; player: string }> }) {
  const { region: regionPrefix, player: summoner } = await params;
  const { data, message } = await getPlayerData(regionPrefix, summoner);

  if (!data) {
    // todo
    return <main>{message}</main>;
  }

  const { identity, profile, rank, matches, region } = data;

  return (
    <main id="sum-main">
      <SumSidebar identity={identity} profile={profile} rank={rank} />
      <section>
        <h2>Match History</h2>
      </section>
    </main>
  );
}

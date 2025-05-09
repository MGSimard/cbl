import { MatchHistory } from "@/_components/MatchHistory/MatchHistory";
import { SumSidebar } from "@/_components/SummonerSidebar/SumSidebar";
import { useParams } from "@tanstack/react-router";
import { getPlayerData } from "@/server/serverFunctions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/summoner/$region/$riotId")({
  component: PageSummoner,
  loader: async ({ params }) => {
    const { region: regionPrefix, riotId } = params;
    const data = await getPlayerData({ data: { regionPrefix, riotId } });
    return data;
  },
});

function PageSummoner() {
  const data = Route.useLoaderData();
  const { region: regionPrefix } = useParams({ from: Route.id });

  if (!data.data) {
    return <main>PLACEHOLDER: (Temporary 24h dev API key probably expired) - {data.message}</main>;
  }

  const { identity, profile, rank, matches, region } = data.data;

  return (
    <main id="sum-main">
      <SumSidebar identity={identity} profile={profile} rank={rank} />
      <MatchHistory matchIds={matches} currentPlayer={profile.puuid} regionPrefix={regionPrefix} />
    </main>
  );
}

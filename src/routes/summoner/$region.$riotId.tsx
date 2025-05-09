import { MatchHistory } from "@/_components/MatchHistory/MatchHistory";
import { SumSidebar } from "@/_components/SummonerSidebar/SumSidebar";
import { getPlayerData } from "@/server/serverFunctions";
import { createFileRoute } from "@tanstack/react-router";
import { useLoaderData } from "@tanstack/react-router";

export const Route = createFileRoute("/summoner/$region/$riotId")({
  loader: async ({ params }) => {
    const { region: regionPrefix, riotId } = params;
    const result = await getPlayerData({ data: { regionPrefix, riotId } });
    return result;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const data = Route.useLoaderData();
  if (!data) {
    return <main>PLACEHOLDER: (Temporary 24h dev API key probably expired)</main>;
  }
  console.log(data);

  const { identity, profile, rank, matches, region } = data.result;

  return (
    <main id="sum-main">
      <SumSidebar identity={identity} profile={profile} rank={rank} />
      <MatchHistory matchIds={matches} currentPlayer={profile.puuid} regionPrefix={region} />
    </main>
  );
}

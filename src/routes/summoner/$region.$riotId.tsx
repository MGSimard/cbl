import { MatchHistory } from "@/_components/MatchHistory/MatchHistory";
import { SumSidebar } from "@/_components/SummonerSidebar/SumSidebar";
import { getPlayerData } from "@/server/serverFunctions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/summoner/$region/$riotId")({
  loader: async ({ params }) => {
    const { region: regionPrefix, riotId } = params;
    const { data, message } = await getPlayerData({ data: { regionPrefix, riotId } });
    return { data, message };
  },
  component: RouteComponent,
});

function RouteComponent({ data, message }: { data: any; message: string }) {
  if (!data) {
    return <main>PLACEHOLDER: (Temporary 24h dev API key probably expired) - {message}</main>;
  }

  const { identity, profile, rank, matches, region } = data;

  return (
    <main id="sum-main">
      <SumSidebar identity={identity} profile={profile} rank={rank} />
      <MatchHistory matchIds={matches} currentPlayer={profile.puuid} regionPrefix={region} />
    </main>
  );
}

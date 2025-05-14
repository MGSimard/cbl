import { createFileRoute, useParams } from "@tanstack/react-router";
import { getPlayerData } from "@/server/serverFunctions";
import { MatchHistory } from "@/_components/MatchHistory/MatchHistory";
import { rankFormatter } from "@/_utils/helpers";
import SumIdentityCard from "@/_components/SumIdentityCard";

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

  if (!data.data) throw new Error(data.message);

  const { identity, profile, rank, matches, region } = data.data;

  return (
    <main id="summoner-profile">
      <div id="sum-header">
        <div id="sum-avatar">
          <img
            alt="Icon"
            src={`https://ddragon.leagueoflegends.com/cdn/15.9.1/img/profileicon/${profile.profileIconId}.png`}
          />
          <span id="sum-level">
            <span>{profile.summonerLevel}</span>
          </span>
        </div>
        <div id="sum-identity">
          <span id="sum-name" title={identity.gameName}>
            {identity.gameName}
            <span id="sum-tag">#{identity.tagLine}</span>
          </span>
          <span id="sum-rank">{rankFormatter(rank)}</span>
          <span id="sum-region">
            <span>{region}</span>
          </span>
          {/* <SumIdentityCard identity={identity} profile={profile} /> */}
        </div>
      </div>
      <MatchHistory matchIds={matches} currentPlayer={profile.puuid} regionPrefix={regionPrefix} />
    </main>
  );
}

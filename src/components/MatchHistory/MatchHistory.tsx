import { MatchCard } from "@/components/MatchHistory/MatchCard";
import { getMatchesData } from "@/server/actions";

interface MatchHistoryProps {
  matchIds: string[];
  currentPlayer: string;
  regionPrefix: string;
}

export async function MatchHistory({ matchIds, currentPlayer, regionPrefix }: MatchHistoryProps) {
  const { data, message } = await getMatchesData(matchIds, regionPrefix);
  console.log(data);
  if (!data) {
    return <main>{message}</main>;
  }

  return (
    <section>
      <h2>Match History (Last {data.length} played)</h2>
      <ul>
        {data.map((match) => (
          <MatchCard key={match.metadata.matchId} currentPlayer={currentPlayer} matchData={match} />
        ))}
      </ul>
    </section>
  );
}

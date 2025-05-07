import { MatchCard } from "@/components/MatchHistory/MatchCard";
import { getMatchesData } from "@/server/actions";

interface MatchHistoryProps {
  matchIds: string[];
  currentPlayer: string;
  regionPrefix: string;
}

export async function MatchHistory({ matchIds, currentPlayer, regionPrefix }: MatchHistoryProps) {
  const { data, message } = await getMatchesData(matchIds, regionPrefix);

  if (!data) {
    return <main>PLACEHOLDER: {message}</main>;
  }

  return (
    <section id="match-history">
      <h2>Recent games (Last {data.length} played)</h2>
      <ul>
        {data.map((match) => (
          <MatchCard key={match.metadata.matchId} currentPlayer={currentPlayer} matchData={match} />
        ))}
      </ul>
    </section>
  );
}

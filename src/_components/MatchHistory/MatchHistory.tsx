import { useSuspenseQuery } from "@tanstack/react-query";
import { getMatchesData } from "@/server/serverFunctions";
import { MatchCard } from "@/_components/MatchHistory/MatchCard";

interface MatchHistoryProps {
  matchIds: string[];
  currentPlayer: string;
  regionPrefix: string;
}

export function MatchHistory({ matchIds, currentPlayer, regionPrefix }: MatchHistoryProps) {
  return (
    <section id="match-history">
      <h2>Recent games (Last 20 played)</h2>
      <MatchList matchIds={matchIds} currentPlayer={currentPlayer} regionPrefix={regionPrefix} />
    </section>
  );
}

function MatchList({ matchIds, currentPlayer, regionPrefix }: MatchHistoryProps) {
  const { data } = useSuspenseQuery({
    queryKey: ["matches", matchIds, currentPlayer],
    queryFn: () => getMatchesData({ data: { matchIds, regionPrefix } }),
  });

  if (!data.success || !data.data) {
    return <main>PLACEHOLDER: {data.message}</main>;
  }

  return (
    <ul>
      {data.data.map((match) => (
        <MatchCard key={match.metadata.matchId} currentPlayer={currentPlayer} matchData={match} />
      ))}
    </ul>
  );
}

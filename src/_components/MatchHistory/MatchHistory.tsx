import { useSuspenseQuery } from "@tanstack/react-query";
import { getMatchesData } from "@/server/serverFunctions";
import { MatchCard } from "@/_components/MatchHistory/MatchCard";
import { Suspense } from "react";

interface MatchHistoryProps {
  matchIds: string[];
  currentPlayer: string;
  regionPrefix: string;
}

export function MatchHistory({ matchIds, currentPlayer, regionPrefix }: MatchHistoryProps) {
  return (
    <section id="match-history">
      <h2>Recent games (Last 20 played)</h2>
      <Suspense
        fallback={
          <div id="match-list-loading">
            <div className="spinner"></div>
          </div>
        }>
        <MatchList matchIds={matchIds} currentPlayer={currentPlayer} regionPrefix={regionPrefix} />
      </Suspense>
    </section>
  );
}

function MatchList({ matchIds, currentPlayer, regionPrefix }: MatchHistoryProps) {
  const { data } = useSuspenseQuery({
    queryKey: ["matches", matchIds, currentPlayer],
    queryFn: () => getMatchesData({ data: { matchIds, regionPrefix } }),
  });

  if (!data.success || !data.data) {
    return (
      <div id="match-list-loading">
        <p>{data.message}</p>
      </div>
    );
  }

  return (
    <ul>
      {data.data.map((match) => (
        <MatchCard key={match.metadata.matchId} currentPlayer={currentPlayer} matchData={match} />
      ))}
    </ul>
  );
}

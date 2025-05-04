import { MatchCard } from "@/components/MatchHistory/MatchCard";

export function MatchHistory() {
  return (
    <section>
      <h2>Match History (Last N played)</h2>
      <ul>
        <MatchCard />
        <MatchCard />
        <MatchCard />
        <MatchCard />
        <MatchCard />
        <MatchCard />
        <MatchCard />
      </ul>
    </section>
  );
}

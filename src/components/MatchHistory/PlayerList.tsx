import Link from "next/link";
import { ParticipantDto } from "@/utils/riotApiTypes";
import { reverseRegionDictionary } from "@/utils/helpers";

export function PlayerListStandard({ players, platformId }: { players: ParticipantDto[]; platformId: string }) {
  const teamOne = players.filter((player) => player.teamId === 100);
  const teamTwo = players.filter((player) => player.teamId === 200);

  return (
    <>
      <ul className="player-list-standard">
        {teamOne.map((plr) => (
          <PlayerItem key={plr.summonerId} player={plr} platformId={platformId} />
        ))}
      </ul>
      <ul className="player-list-standard">
        {teamTwo.map((plr) => (
          <PlayerItem key={plr.summonerId} player={plr} platformId={platformId} />
        ))}
      </ul>
    </>
  );
}

export function PlayerListArena({ players, platformId }: { players: ParticipantDto[]; platformId: string }) {
  const orderedPlayers = [...players].sort((a, b) => a.placement - b.placement);
  return (
    <ul className="player-list-arena">
      {orderedPlayers.map((plr) => (
        <PlayerItem key={plr.summonerId} player={plr} platformId={platformId} />
      ))}
    </ul>
  );
}

function PlayerItem({ player, platformId }: { player: ParticipantDto; platformId: string }) {
  return (
    <li key={player.summonerId}>
      <Link href={`/summoner/${reverseRegionDictionary(platformId)}/${player.riotIdGameName}-${player.riotIdTagline}`}>
        <img alt="img" />
        <span>{player.riotIdGameName}</span>
      </Link>
    </li>
  );
}

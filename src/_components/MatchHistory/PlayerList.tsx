import { Link } from "@tanstack/react-router";
import { getChamp, reverseRegionDictionary } from "@/_utils/helpers";
import type { ParticipantDto } from "@/_utils/riotApiTypes";

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
  const champ = getChamp(player.championId);

  return (
    <li key={player.summonerId}>
      {/* <Link to={`/summoner/${reverseRegionDictionary(platformId)}/${player.riotIdGameName}-${player.riotIdTagline}`}>
        <div className="list-img-wrapper">
          <img src={`${champ.url}`} alt={champ.label} title={champ.label} />
        </div>
        <span>{player.riotIdGameName}</span>
      </Link> */}
    </li>
  );
}

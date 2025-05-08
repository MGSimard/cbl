import { PlayerListStandard, PlayerListArena } from "@/components/MatchHistory/PlayerList";
import { SumsRunesAugs } from "@/components/MatchHistory/SumsRunesAugs";
import type { MatchV5ByMatchId } from "@/utils/riotApiTypes";
import { calcDuration, getChamp, getItem, getMapName, modeDictionary, timeSince } from "@/utils/helpers";
import { IconGold, IconMinion } from "@/components/Icons";

const ITEM_KEYS = ["item0", "item1", "item2", "item3", "item4", "item5", "item6"] as const;

interface MatchCardProps {
  currentPlayer: string;
  matchData: MatchV5ByMatchId;
}
export function MatchCard({ currentPlayer, matchData }: MatchCardProps) {
  const { gameDuration, gameStartTimestamp, participants, platformId, queueId, mapId } = matchData.info;
  const targetPlayerData = participants.find((player) => player.puuid === currentPlayer);

  if (!targetPlayerData) {
    /* TODO: HANDLE ERROR */
    return null;
  }

  const { championId, champLevel, totalMinionsKilled, goldEarned, kills, deaths, assists, win } = targetPlayerData;

  const champ = getChamp(championId);
  // TODO: label/title/alt -> champion name
  return (
    <li className="match-card">
      <div className="match-champ">
        <div className="champ-icon-bandaid">
          <img src={`${champ?.url}`} alt={champ?.label} title={champ?.label} />
        </div>
        <span>{champLevel}</span>
      </div>
      <div className="match-context">
        <div className={`match-outcome ${win ? "match-win" : "match-loss"}`}>{win ? "Victory" : "Defeat"}</div>
        <div className="match-mode">{modeDictionary(queueId)}</div>
        <SumsRunesAugs queueId={queueId} targetPlayerData={targetPlayerData} />
      </div>
      <div className="match-stats">
        <ul className="items">
          {ITEM_KEYS.map((key) => {
            const itemId = targetPlayerData[key];
            const item = getItem(itemId);
            return <li key={key}>{item && <img src={`${item.url}`} alt={item.label} title={item.label} />}</li>;
          })}
        </ul>
        <div className="stats">
          <div className="stats-kda">
            <span>{kills}</span>/<span>{deaths}</span>/<span>{assists}</span>
          </div>
          <div className="stats-minions">
            {totalMinionsKilled.toLocaleString()}
            <IconMinion />
          </div>
          <div className="stats-gold">
            {goldEarned.toLocaleString()}
            <IconGold />
          </div>
        </div>
      </div>
      <div className="match-metadata">
        <div>{getMapName(mapId)}</div>
        <div>
          {calcDuration(gameDuration)} <span className="dot">&#x2022;</span>{" "}
          {timeSince(gameStartTimestamp, gameDuration)}
        </div>
      </div>
      <div className="match-players">
        {queueId === 1700 || queueId === 1710 ? (
          <PlayerListArena players={participants} platformId={platformId} />
        ) : (
          <PlayerListStandard players={participants} platformId={platformId} />
        )}
      </div>
    </li>
  );
}

import type { MatchV5ByMatchId } from "@/utils/riotApiTypes";
import {
  calcDuration,
  champImgUrl,
  getItemImgUrl,
  getItemName,
  getMapName,
  modeDictionary,
  timeSince,
} from "@/utils/helpers";
import { IconGold, IconMinion } from "@/components/Icons";

/** ELEMENTS
 * - Summoner Spells
 * - Runes
 *
 * - Gold
 *
 * - Length
 * - Date (Or N minutes/hours/days/months ago)
 *
 * - Player list (Both teams)
 *  */

interface MatchCardProps {
  currentPlayer: string;
  matchData: MatchV5ByMatchId;
}

const ITEM_KEYS = ["item0", "item1", "item2", "item3", "item4", "item5", "item6"] as const;

export function MatchCard({ currentPlayer, matchData }: MatchCardProps) {
  const { gameDuration, gameStartTimestamp, participants, platformId, queueId, mapId } = matchData.info;
  const targetPlayerData = participants.find((player) => player.puuid === currentPlayer);

  if (!targetPlayerData) {
    /* TODO: HANDLE ERROR */
    return null;
  }

  const { championId, champLevel, totalMinionsKilled, goldEarned, kills, deaths, assists, win } = targetPlayerData;

  return (
    <li className="match-card">
      <div className="champ-icon">
        {/* TODO: If return is null, render the placeholder src instead (not yet made) */}
        <div className="champ-icon-bandaid">
          <img src={`${champImgUrl(championId)}`} alt={`cId:${championId}`} />
        </div>
        <span>{champLevel}</span>
      </div>
      <div className="match-context">
        <div className={`match-outcome ${win ? "match-win" : "match-loss"}`}>{win ? "Victory" : "Defeat"}</div>
        <div className="match-mode">{modeDictionary(queueId)}</div>
      </div>
      <div className="match-stats">
        <ul className="items">
          {ITEM_KEYS.map((itemKey) => {
            const itemId = targetPlayerData[itemKey as keyof typeof targetPlayerData] as number;

            const itemName = getItemName(itemId);

            return (
              <li key={itemKey} aria-label={itemName}>
                {itemId !== 0 && <img src={`${getItemImgUrl(itemId)}`} alt="" />}
              </li>
            );
          })}
        </ul>
        <div className="stats">
          <div>
            {kills}/{deaths}/{assists}
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
      <button type="button" aria-label="View Match Details">
        v
      </button>
    </li>
  );
}

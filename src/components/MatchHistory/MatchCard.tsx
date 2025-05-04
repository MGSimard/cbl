import type { MatchV5ByMatchId } from "@/utils/riotApiTypes";
import { champImgUrl, itemImgUrl, itemName, modeDictionary } from "@/utils/helpers";

/** ELEMENTS
 * - Summoner Spells
 * - Runes
 *
 * - KDA
 * - CS
 * - Gold
 *
 * - Map
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
        <img src={`${champImgUrl(championId)}`} alt={`cId:${championId}`} />
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
            return itemId === 0 ? (
              <li key={itemKey} aria-label="Empty item slot"></li>
            ) : (
              <li key={itemKey}>
                <img src={`${itemImgUrl(itemId)}`} alt={itemName(itemId)} />
              </li>
            );
          })}
        </ul>
        <div className="stats">
          <div>
            {kills}/{deaths}/{assists}
          </div>
          <div>{totalMinionsKilled}cs</div>
          <div>{goldEarned}g</div>
        </div>
      </div>
      <div className="match-metadata">
        <div>map{mapId}</div>
        <div>
          {gameDuration} - {gameStartTimestamp}
        </div>
      </div>
    </li>
  );
}

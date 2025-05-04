import type { MatchV5ByMatchId } from "@/utils/riotApiTypes";
import { champImgUrl, itemImgUrl, modeDictionary } from "@/utils/helpers";

/** ELEMENTS
 * - Champion Icon
 * - Level
 * - Outcome
 * - Mode
 * - Summoner Spells
 * - Runes
 *
 * - Items
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

export function MatchCard({ currentPlayer, matchData }: MatchCardProps) {
  const { gameDuration, gameStartTimestamp, participants, platformId, queueId, mapId } = matchData.info;
  const targetPlayerData = participants.find((player) => player.puuid === currentPlayer);

  if (!targetPlayerData) {
    /* TODO: HANDLE ERROR */
    return null;
  }

  const { championId, champLevel, totalMinionsKilled, goldEarned, kills, deaths, assists, win } = targetPlayerData;
  console.log(targetPlayerData.item2);
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
          <li>
            <img src={`${itemImgUrl(targetPlayerData.item0)}`} alt={`iId:${targetPlayerData.item0}`} />
          </li>
          <li>
            <img src={`${itemImgUrl(targetPlayerData.item1)}`} alt={`iId:${targetPlayerData.item1}`} />
          </li>
          <li>
            <img src={`${itemImgUrl(targetPlayerData.item2)}`} alt={`iId:${targetPlayerData.item2}`} />
          </li>
          <li>
            <img src={`${itemImgUrl(targetPlayerData.item3)}`} alt={`iId:${targetPlayerData.item3}`} />
          </li>
          <li>
            <img src={`${itemImgUrl(targetPlayerData.item4)}`} alt={`iId:${targetPlayerData.item4}`} />
          </li>
          <li>
            <img src={`${itemImgUrl(targetPlayerData.item5)}`} alt={`iId:${targetPlayerData.item5}`} />
          </li>
          <li>
            <img src={`${itemImgUrl(targetPlayerData.item6)}`} alt={`iId:${targetPlayerData.item6}`} />
          </li>
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

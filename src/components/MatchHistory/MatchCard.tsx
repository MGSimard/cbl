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

export function MatchCard() {
  return (
    <li className="match-card">
      <div className="champ-icon">
        <img alt="Champ" />
        <span>lvl</span>
      </div>
      <div className="match-context"></div>
      <div className="match-stats">
        <ul className="stats-up">
          <li>I1</li>
          <li>I2</li>
          <li>I3</li>
          <li>I4</li>
          <li>I5</li>
          <li>I6</li>
          <li>I7</li>
        </ul>
        <div className="stats-down"></div>
      </div>
      <div className="match-metadata"></div>
    </li>
  );
}

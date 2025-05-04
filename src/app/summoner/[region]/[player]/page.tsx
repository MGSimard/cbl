import { getPlayerData } from "@/server/actions";
import { rankFormatter } from "@/utils/helpers";

export default async function PageSummoner({ params }: { params: Promise<{ region: string; player: string }> }) {
  const { region: regionPrefix, player: summoner } = await params;
  const { data, message } = await getPlayerData(regionPrefix, summoner);

  if (!data) {
    // todo
    return <main>{message}</main>;
  }

  const { identity, profile, rank, matches, region } = data;

  return (
    <main id="sum-main">
      <section id="sum-info">
        <div id="sum-card">
          <div id="sum-card-header">
            <div id="sum-card-avatar">
              <img
                alt="Icon"
                src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/${profile.profileIconId}.png`}
              />
              <span>{profile.summonerLevel}</span>
            </div>
            <h1>
              {identity.gameName}
              <span>#{identity.tagLine}</span>
            </h1>
            <span>{rankFormatter(rank)} </span>
          </div>
          {/* <table id="id-table">
            <tbody>
              <tr>
                <th>SummonerID</th>
                <td title={profile.id}>{profile.id}</td>
              </tr>
              <tr>
                <th>AccountID</th>
                <td title={profile.accountId}>{profile.accountId}</td>
              </tr>
              <tr>
                <th>PUUID</th>
                <td title={profile.puuid}>{profile.puuid}</td>
              </tr>
            </tbody>
          </table> */}
        </div>
        {/* <details>
          <summary>
            <h2>Aliases</h2>
          </summary>
        </details>
        <details>
          <summary>
            <h2>Reports</h2>
          </summary>
        </details>
        <details>
          <summary>
            <h2>Teammates</h2>
          </summary>
        </details> */}
      </section>
      <section>
        <h2>Match History</h2>
      </section>
    </main>
  );
}

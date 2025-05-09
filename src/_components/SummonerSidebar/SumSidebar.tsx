import { rankFormatter } from "@/_utils/helpers";
import { SumAccordion } from "@/_components/SummonerSidebar/SumAccordion";
import { CopyButton } from "@/_components/SummonerSidebar/CopyButton";
import type { AccountV1ByRiotId, LeagueV4ByPuuid, SummonerV4ByPuuid } from "@/_utils/riotApiTypes";

interface SumSidebarProps {
  identity: AccountV1ByRiotId;
  profile: SummonerV4ByPuuid;
  rank: LeagueV4ByPuuid;
}

export function SumSidebar({ identity, profile, rank }: SumSidebarProps) {
  return (
    <section id="sum-info">
      <div id="sum-info-header">
        <div id="sum-avatar">
          <img
            alt="Icon"
            src={`https://ddragon.leagueoflegends.com/cdn/15.9.1/img/profileicon/${profile.profileIconId}.png`}
          />
          <span id="sum-level">
            <span>{profile.summonerLevel}</span>
          </span>
        </div>
        <div id="sum-identity">
          <h1 title={`${identity.gameName}#${identity.tagLine}`}>
            <span>{identity.gameName}</span>
            <span id="sum-tag">#{identity.tagLine}</span>
          </h1>
          <span id="sum-rank" title={rankFormatter(rank)}>
            {rankFormatter(rank)}
          </span>
        </div>
      </div>
      <div id="sum-info-content">
        <table id="id-table">
          <tbody>
            <tr>
              <th>SummonerID</th>
              <td title={profile.id}>
                <span>{profile.id}</span>
                <CopyButton toCopy={profile.id} />
              </td>
            </tr>
            <tr>
              <th>AccountID</th>
              <td title={profile.accountId}>
                <span>{profile.accountId}</span>
                <CopyButton toCopy={profile.accountId} />
              </td>
            </tr>
            <tr>
              <th>PUUID</th>
              <td title={profile.puuid}>
                <span>{profile.puuid}</span>
                <CopyButton toCopy={profile.puuid} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <SumAccordion label="Aliases" count={1}>
        <ul>
          <li>Alias 1</li>
        </ul>
      </SumAccordion>
      <SumAccordion label="Reports" count={2}>
        <ul>
          <li>Report 1</li>
          <li>Report 2</li>
        </ul>
      </SumAccordion>
      <SumAccordion label="Recent Players" count={3}>
        <ul>
          <li>Recent Player 1</li>
          <li>Recent Player 2</li>
          <li>Recent Player 3</li>
        </ul>
      </SumAccordion>
      <SumAccordion label="Disabled Test" count={0}></SumAccordion>
    </section>
  );
}

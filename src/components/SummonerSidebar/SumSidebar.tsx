import type { AccountV1ByRiotId, LeagueV4ByPuuid, SummonerV4ByPuuid } from "@/utils/riotAPITypes";
import { rankFormatter } from "@/utils/helpers";
import { SumAccordion } from "@/components/SummonerSidebar/SumAccordion";

interface SumSidebarProps {
  identity: AccountV1ByRiotId;
  profile: SummonerV4ByPuuid;
  rank: LeagueV4ByPuuid;
}

export function SumSidebar({ identity, profile, rank }: SumSidebarProps) {
  return (
    <section id="sum-info">
      <div id="sum-info-header">
        <div id="sum-card">
          <div id="sum-avatar">
            <img
              alt="Icon"
              src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/profileicon/${profile.profileIconId}.png`}
            />
            <span id="sum-level">
              <span>{profile.summonerLevel}</span>
            </span>
          </div>
          <div id="sum-identity">
            <h1 title={`${identity.gameName}#${identity.tagLine}`}>
              {identity.gameName}
              <span>#{identity.tagLine}</span>
            </h1>
            <span id="sum-rank" title={rankFormatter(rank)}>
              {rankFormatter(rank)}
            </span>
          </div>
        </div>
      </div>
      <div id="sum-info-content">
        <table id="id-table">
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
        </table>
      </div>
      <SumAccordion label="Aliases" count={3}>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </SumAccordion>
      <SumAccordion label="Reports" count={2}>
        <ul>
          <li>1</li>
          <li>2</li>
        </ul>
      </SumAccordion>
      <SumAccordion label="Recent Players" count={12}>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li>10</li>
        </ul>
      </SumAccordion>
      <SumAccordion label="Disabled Test"></SumAccordion>
    </section>
  );
}

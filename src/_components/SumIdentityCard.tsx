import { useState } from "react";
import { IconIdentity } from "@/_components/Icons";
import type { AccountV1ByPuuid, SummonerV4ByPuuid } from "@/_utils/riotApiTypes";

interface SumIdentityCardProps {
  identity: AccountV1ByPuuid;
  profile: SummonerV4ByPuuid;
}

export default function SumIdentityCard({ identity, profile }: SumIdentityCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { puuid, id, accountId } = profile;

  return (
    <div id="sum-popover-wrapper">
      <button type="button" aria-expanded={isOpen} aria-controls="sum-popup" onClick={() => setIsOpen(!isOpen)}>
        <IconIdentity />
      </button>
      {isOpen && (
        <div id="sum-popup">
          <table>
            <tbody>
              <tr>
                <th>Summoner Name</th>
                <td>{identity.gameName}</td>
              </tr>
              <tr>
                <th>PUUID</th>
                <td>{puuid}</td>
              </tr>
              <tr>
                <th>SummonerID</th>
                <td>{id}</td>
              </tr>
              <tr>
                <th>AccountID</th>
                <td>{accountId}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

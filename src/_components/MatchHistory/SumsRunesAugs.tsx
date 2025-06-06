import { getAugments, getRunes, getSumSpells } from "@/_utils/helpers";
import type { ParticipantDto } from "@/_utils/riotApiTypes";

interface SumsRunesAugsProps {
  queueId: number;
  targetPlayerData: ParticipantDto;
}
export function SumsRunesAugs({ queueId, targetPlayerData }: SumsRunesAugsProps) {
  const isArena = queueId === 1700 || queueId === 1710;

  const slot1 = isArena ? getAugments(1, targetPlayerData) : getSumSpells(1, targetPlayerData);
  const slot2 = isArena ? getAugments(2, targetPlayerData) : getSumSpells(2, targetPlayerData);
  const slot3 = isArena ? getAugments(3, targetPlayerData) : getRunes(1, targetPlayerData);
  const slot4 = isArena ? getAugments(4, targetPlayerData) : getRunes(2, targetPlayerData);

  return (
    <div className="player-sumsRunesAugs">
      <div className="slot">{slot1 && <img src={`${slot1.url}`} alt={slot1.label} title={slot1.label} />}</div>
      <div className="slot">{slot2 && <img src={`${slot2.url}`} alt={slot2.label} title={slot2.label} />}</div>
      <div className="slot">{slot3 && <img src={`${slot3.url}`} alt={slot3.label} title={slot3.label} />}</div>
      <div className={`slot${isArena ? "" : " rune-minor"}`}>
        {slot4 && <img src={`${slot4.url}`} alt={slot4.label} title={slot4.label} />}
      </div>
    </div>
  );
}

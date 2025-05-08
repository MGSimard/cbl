import { getSumSpells } from "@/utils/helpers";
import { getRunes } from "@/utils/helpers";
import { getAugments } from "@/utils/helpers";
import { ParticipantDto } from "@/utils/riotApiTypes";

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
      <div className="slot" aria-label={slot1.label} title={slot1.label}>
        {slot1 && <img src={`${slot1.url}`} alt="" />}
      </div>
      <div className="slot" aria-label={slot2.label} title={slot2.label}>
        {slot2 && <img src={`${slot2.url}`} alt="" />}
      </div>
      <div className="slot" aria-label={slot3.label} title={slot3.label}>
        {slot3 && <img src={`${slot3.url}`} alt="" />}
      </div>
      <div className={`slot${isArena ? "" : " rune-minor"}`} aria-label={slot4.label} title={slot4.label}>
        {slot4 && <img src={`${slot4.url}`} alt="" />}
      </div>
    </div>
  );
}

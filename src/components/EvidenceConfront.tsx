import React, { useState } from 'react';
import { ArrowRight, Feather, X } from 'lucide-react';
import { EvidenceItem, GuestCase } from '../types/game';
import { libraryAudio } from '../utils/audio';
import { EvidenceIcon } from './EvidenceIcon';
import { SeasonSigilIcon } from './VisualKeepsakes';
import { VictorianCornerFiligree } from './VictorianOrnaments';

interface EvidenceConfrontProps {
  currentCase: GuestCase;
  collectedEvidenceIds: string[];
  onPass: () => void;
  onClose: () => void;
}

/**
 * 对证：客人先说出对自己的错误指控，玩家必须指出哪件信物推翻了它。
 * 选错不作废，客人会反驳并提示；选对才进入牌阵。这一层把「捡到四件东西」变成「读懂一件事」。
 */
export const EvidenceConfront: React.FC<EvidenceConfrontProps> = ({
  currentCase,
  collectedEvidenceIds,
  onPass,
  onClose,
}) => {
  const [wrongPicks, setWrongPicks] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);

  const evidence = currentCase.evidence.filter((e) => collectedEvidenceIds.includes(e.id));
  const lastWrong = wrongPicks[wrongPicks.length - 1];
  const lastWrongItem = evidence.find((e) => e.id === lastWrong);

  const handlePick = (item: EvidenceItem) => {
    if (solved) return;
    if (item.id === currentCase.confront.keyEvidenceId) {
      libraryAudio.playMagicChime();
      setSolved(true);
      return;
    }
    if (wrongPicks.includes(item.id)) return;
    libraryAudio.playWaxSealStamp();
    setWrongPicks((prev) => [...prev, item.id]);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`对证 · ${currentCase.guestName}`}
      className="fixed inset-0 z-40 flex items-center justify-center bg-[#150D07]/92 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto library-scroll"
    >
      <div className="relative w-full max-w-[720px] my-auto">
        <div className="relative rounded-[6px] p-2 bg-embossed-leather border-[2px] border-[#26110E] shadow-[0_30px_64px_rgba(6,3,1,0.8)]">
          <VictorianCornerFiligree color="#9B753D" sizeClass="w-5 h-5" />
          <div className="relative bg-vintage-folio rounded-[3px] text-[#241B14] px-6 py-6 sm:px-8 sm:py-7">
            {/* 页眉 */}
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#C7B087]/70">
              <div className="flex items-center gap-2 text-[11px] font-serif-body tracking-[0.22em] text-[#6A5236]">
                <SeasonSigilIcon season={currentCase.season} className="w-4 h-4" />
                <span>对证 · {currentCase.guestName}</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="暂不对证"
                className="p-1 text-[#7A634A] hover:text-[#241B14] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 客人的自我指控 */}
            <blockquote className="mt-5 pl-4 border-l-2 border-[#8E2D20]/60">
              <p className="font-serif-body text-[15px] leading-[1.9] text-[#2A1F16]">
                {currentCase.confront.accusation}
              </p>
              <footer className="mt-1.5 text-[11px] font-serif-body text-[#7A634A]">
                —— {currentCase.guestName}
              </footer>
            </blockquote>

            {!solved ? (
              <>
                <p className="mt-6 text-[13px] font-serif-body text-[#4B3F32]">
                  {currentCase.confront.prompt}
                </p>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {evidence.map((item) => {
                    const isWrong = wrongPicks.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handlePick(item)}
                        disabled={isWrong}
                        className={`group flex items-start gap-2.5 rounded-[2px] border px-3 py-2.5 text-left transition-colors ${
                          isWrong
                            ? 'border-[#C7B087]/40 text-[#9A8B74] line-through decoration-[#9A8B74]/50'
                            : 'border-[#B08D52]/70 hover:border-[#8E2D20] hover:bg-[#F7EAD0]/60 text-[#241B14]'
                        }`}
                      >
                        <span className="mt-0.5 shrink-0 text-[#8E2D20]/85">
                          <EvidenceIcon symbol={item.symbol} className="w-4 h-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-display text-[13px] font-semibold">{item.title}</span>
                          <span className="mt-0.5 block text-[11px] font-serif-body leading-snug text-[#5A4836]">
                            {item.category} · 第 {item.originPage} 页
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                {lastWrongItem && (
                  <div className="mt-4 flex items-start gap-2 text-[12px] font-serif-body text-[#5B3A24]">
                    <Feather className="mt-0.5 w-3.5 h-3.5 shrink-0 text-[#8E2D20]" />
                    <p className="leading-relaxed">{currentCase.confront.onWrong}</p>
                  </div>
                )}
              </>
            ) : (
              <div className="mt-6 animate-subtitle-in">
                <p className="font-serif-body text-[14px] leading-[1.9] text-[#2A1F16]">
                  {currentCase.confront.onCorrect}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    libraryAudio.playPageTurn();
                    onPass();
                  }}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[2px] px-6 py-2.5 text-sm font-serif-body font-medium text-[#FAF6EE] victorian-wax-btn transition-colors"
                >
                  <span>去牌桌解开这一结</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

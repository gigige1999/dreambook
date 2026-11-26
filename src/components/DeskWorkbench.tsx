import React from 'react';
import { BookOpen, Check, Search, Sparkles } from 'lucide-react';
import { GamePhase, GuestCase } from '../types/game';
import { GiftKeepsakeIllustration, SeasonSigilIcon } from './VisualKeepsakes';

interface DeskWorkbenchProps {
  phase: GamePhase;
  currentCase: GuestCase;
  collectedEvidenceIds: string[];
  collectedGiftIds: string[];
  hasServedTea: boolean;
  hasMoreGuests: boolean;
  onOpenShelves: () => void;
  onOpenBookModal: () => void;
  onOpenConfront: () => void;
  onOpenKnotModal: () => void;
  onCollectGift: (giftId: string) => void;
  onNextGuest: () => void;
  onOpenArchive: () => void;
}

/**
 * 案头信息条：只保留「当前这本书 + 信物进度 + 此刻唯一该做的事」，
 * 其余说明性文字全部让位给舞台画面。
 */
export const DeskWorkbench: React.FC<DeskWorkbenchProps> = ({
  phase,
  currentCase,
  collectedEvidenceIds,
  collectedGiftIds,
  hasMoreGuests,
  onOpenShelves,
  onOpenBookModal,
  onOpenConfront,
  onOpenKnotModal,
  onCollectGift,
  onNextGuest,
  onOpenArchive,
}) => {
  const allCollected = collectedEvidenceIds.length >= currentCase.evidence.length;
  const isGiftCollected = collectedGiftIds.includes(currentCase.giftKeepsake.id);
  const totalEvidence = currentCase.evidence.length;

  return (
    <footer
      aria-label="案头信息条"
      className="relative z-20 w-full shrink-0 select-none border-t-[2px] border-[#241B14] bg-gradient-to-b from-[#5A3B23] via-[#4A2F1B] to-[#38220F]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-[#E2BC7B]/55"
      />

      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-2 sm:px-8">
        {/* 左：季节印记 + 书名 + 索书号 + 信物进度 */}
        <div className="flex min-w-0 items-center gap-3 text-[#F3E4C8]">
          <SeasonSigilIcon
            season={currentCase.season}
            glowing={phase === 'CASE_CLEARED' || phase === 'KNOT_RESOLUTION'}
            className="w-5 h-5 shrink-0"
          />

          <p className="min-w-0 truncate font-display text-[13px] font-medium tracking-wide text-[#FBF1DC]">
            《{currentCase.bookTitle}》
            <span className="ml-2 font-mono text-[10.5px] font-normal tracking-normal text-[#CDB68D] tabular-nums">
              {currentCase.bookCallNumber}
            </span>
          </p>

          <span aria-hidden="true" className="hidden h-3 w-[1px] bg-[#C8A460]/40 sm:block" />

          <div
            className="flex items-center gap-1.5"
            title={`梦境信物 ${collectedEvidenceIds.length} / ${totalEvidence}`}
          >
            {currentCase.evidence.map((ev, idx) => {
              const collected = collectedEvidenceIds.includes(ev.id);
              return (
                <span
                  key={ev.id}
                  aria-label={`信物 ${idx + 1}${collected ? ' 已拾取' : ' 待拾取'}`}
                  className={`h-2 w-2 rounded-full border transition-all duration-500 ${
                    collected
                      ? 'border-[#F0CD82] bg-[#E8C071] shadow-[0_0_8px_rgba(240,205,130,0.55)]'
                      : 'border-[#9C8256]/70 bg-transparent'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* 右：此刻唯一的主行动 */}
        <div className="flex items-center gap-2 shrink-0">
          {phase === 'DESK_DIALOGUE' && (
            <button
              type="button"
              onClick={onOpenShelves}
              className="inline-flex items-center gap-1.5 rounded-[2px] px-4 py-1.5 text-xs font-serif-body font-medium text-[#FAF6EE] victorian-wax-btn transition-colors whitespace-nowrap"
            >
              <Search className="w-3.5 h-3.5" />
              <span>去书架寻书</span>
            </button>
          )}

          {(phase === 'BOOK_INSPECTION' || phase === 'SHELF_SEARCH') && (
            <>
              <button
                type="button"
                onClick={onOpenBookModal}
                className="inline-flex items-center gap-1.5 rounded-[2px] px-3.5 py-1.5 text-xs font-serif-body font-medium text-[#2A2118] bg-[#EFE3CA] hover:bg-[#E4D3B2] border border-[#8D7654] transition-colors whitespace-nowrap"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#963E2A]" />
                <span>翻开梦境书</span>
              </button>

              {allCollected && (
                <button
                  type="button"
                  onClick={onOpenConfront}
                  className="inline-flex items-center gap-1.5 rounded-[2px] px-4 py-1.5 text-xs font-serif-body font-medium text-[#FAF6EE] victorian-wax-btn transition-colors whitespace-nowrap"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>当面问清楚</span>
                </button>
              )}
            </>
          )}

          {phase === 'KNOT_RESOLUTION' && (
            <button
              type="button"
              onClick={onOpenKnotModal}
              className="inline-flex items-center gap-1.5 rounded-[2px] px-4 py-1.5 text-xs font-serif-body font-medium text-[#FAF6EE] victorian-wax-btn transition-colors whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>入梦解结</span>
            </button>
          )}

          {phase === 'CASE_CLEARED' &&
            (!isGiftCollected ? (
              <button
                type="button"
                onClick={() => onCollectGift(currentCase.giftKeepsake.id)}
                className="inline-flex items-center gap-1.5 rounded-[2px] px-4 py-1.5 text-xs font-serif-body font-medium text-[#FAF6EE] victorian-wax-btn transition-colors whitespace-nowrap"
              >
                <GiftKeepsakeIllustration
                  giftId={currentCase.giftKeepsake.id}
                  className="w-4 h-4 shrink-0"
                />
                <span>收下临别信物</span>
              </button>
            ) : hasMoreGuests ? (
              <button
                type="button"
                onClick={onNextGuest}
                className="inline-flex items-center gap-1.5 rounded-[2px] px-3.5 py-1.5 text-xs font-serif-body font-medium text-[#2A2118] bg-[#EFE3CA] hover:bg-[#E4D3B2] border border-[#8D7654] transition-colors whitespace-nowrap"
              >
                <Check className="w-3.5 h-3.5 text-[#8E2D20]" />
                <span>迎接下一位</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onOpenArchive}
                className="inline-flex items-center gap-1.5 rounded-[2px] px-4 py-1.5 text-xs font-serif-body font-medium text-[#FAF6EE] victorian-wax-btn transition-colors whitespace-nowrap"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>翻看手帐</span>
              </button>
            ))}
        </div>
      </div>
    </footer>
  );
};

import React, { useMemo, useState } from 'react';
import { ArrowRight, Check, Feather, RotateCcw, X } from 'lucide-react';
import { GuestCase } from '../types/game';
import { libraryAudio } from '../utils/audio';
import { EvidenceIcon } from './EvidenceIcon';
import { SeasonSigilIcon } from './VisualKeepsakes';
import { VictorianCornerFiligree } from '../components/VictorianOrnaments';

interface EvidenceConfrontProps {
  currentCase: GuestCase;
  collectedEvidenceIds: string[];
  onPass: () => void;
  onClose: () => void;
}

type Stage = 'timeline' | 'combine' | 'reveal';

/** 用 case id 做种子的确定性洗牌：每次进同一章顺序一致，但不按正确顺序摆。 */
const seededShuffle = <T,>(items: T[], seed: string): T[] => {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    const j = Math.abs(h % (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

/**
 * 对证：两段推理。
 * ① 时间线推演 —— 把那几件事按发生的先后排好；
 * ② 组合指认 —— 同时指出两件能推翻客人自我指控的信物。
 */
export const EvidenceConfront: React.FC<EvidenceConfrontProps> = ({
  currentCase,
  collectedEvidenceIds,
  onPass,
  onClose,
}) => {
  const { confront } = currentCase;
  const [stage, setStage] = useState<Stage>('timeline');
  const [order, setOrder] = useState<string[]>([]);
  const [timelineError, setTimelineError] = useState(false);
  const [picked, setPicked] = useState<string[]>([]);
  const [wrongNote, setWrongNote] = useState<string | null>(null);

  const events = useMemo(
    () => seededShuffle(confront.timeline.events, `${currentCase.id}-tl`),
    [confront.timeline.events, currentCase.id]
  );
  const evidence = useMemo(
    () => currentCase.evidence.filter((e) => collectedEvidenceIds.includes(e.id)),
    [currentCase.evidence, collectedEvidenceIds]
  );

  const placeEvent = (id: string) => {
    if (order.includes(id)) return;
    libraryAudio.playPageTurn();
    const next = [...order, id];
    setOrder(next);
    setTimelineError(false);
    if (next.length === confront.timeline.correctOrderIds.length) {
      const ok = next.every((v, i) => v === confront.timeline.correctOrderIds[i]);
      if (ok) {
        libraryAudio.playMagicChime();
        setStage('combine');
        setOrder([]);
      } else {
        libraryAudio.playWaxSealStamp();
        setTimelineError(true);
        window.setTimeout(() => setOrder([]), 900);
      }
    }
  };

  const togglePick = (id: string) => {
    if (picked.includes(id)) {
      setPicked((prev) => prev.filter((v) => v !== id));
      return;
    }
    if (picked.length >= 2) return;
    libraryAudio.playBrassClick();
    setPicked((prev) => [...prev, id]);
    setWrongNote(null);
  };

  const submit = () => {
    const need = confront.keyEvidenceIds;
    const ok = picked.length === need.length && need.every((id) => picked.includes(id));
    if (ok) {
      libraryAudio.playMagicChime();
      setStage('reveal');
    } else {
      libraryAudio.playWaxSealStamp();
      setWrongNote(confront.onWrong);
      setPicked([]);
    }
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
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#C7B087]/70">
              <div className="flex items-center gap-2 text-[11px] font-serif-body tracking-[0.22em] text-[#6A5236]">
                <SeasonSigilIcon season={currentCase.season} className="w-4 h-4" />
                <span>
                  对证 · {currentCase.guestName}
                  <span className="ml-2 text-[#9A8B74]">
                    {stage === 'timeline' ? '一 · 理清先后' : stage === 'combine' ? '二 · 指认信物' : '已对证'}
                  </span>
                </span>
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
                {confront.accusation}
              </p>
              <footer className="mt-1.5 text-[11px] font-serif-body text-[#7A634A]">
                —— {currentCase.guestName}
              </footer>
            </blockquote>

            {/* ① 时间线推演 */}
            {stage === 'timeline' && (
              <div className="mt-6">
                <p className="text-[13px] font-serif-body text-[#4B3F32]">{confront.timeline.prompt}</p>

                <div className="mt-3 flex items-center gap-2">
                  {confront.timeline.correctOrderIds.map((_, idx) => {
                    const id = order[idx];
                    const label = events.find((e) => e.id === id)?.label;
                    return (
                      <div
                        key={idx}
                        className={`flex-1 min-h-[46px] rounded-[2px] border px-2 py-1.5 text-[11.5px] font-serif-body leading-snug flex items-center ${
                          label
                            ? 'border-[#8E2D20]/60 text-[#241B14]'
                            : 'border-dashed border-[#B89A6A]/70 text-[#A7967C]'
                        }`}
                      >
                        <span className="mr-1.5 font-mono text-[10px] text-[#8E2D20]/80">{idx + 1}</span>
                        {label ?? '待排'}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-3 space-y-1.5">
                  {events.map((e) => {
                    const used = order.includes(e.id);
                    return (
                      <button
                        key={e.id}
                        type="button"
                        disabled={used}
                        onClick={() => placeEvent(e.id)}
                        className={`w-full text-left rounded-[2px] border px-3 py-2 text-[12.5px] font-serif-body transition-colors ${
                          used
                            ? 'border-[#C7B087]/35 text-[#9A8B74]'
                            : 'border-[#B08D52]/70 hover:border-[#8E2D20] hover:bg-[#F7EAD0]/60 text-[#241B14]'
                        }`}
                      >
                        {e.label}
                      </button>
                    );
                  })}
                </div>

                {timelineError && (
                  <p className="mt-3 flex items-center gap-1.5 text-[12px] font-serif-body text-[#8E2D20]">
                    <RotateCcw className="w-3.5 h-3.5" />
                    顺序不对，再想想谁先谁后。
                  </p>
                )}
              </div>
            )}

            {/* ② 组合指认 */}
            {stage === 'combine' && (
              <div className="mt-6">
                <p className="text-[13px] font-serif-body text-[#4B3F32]">
                  {confront.prompt}
                  <span className="ml-1 text-[#7A634A]">（选两件）</span>
                </p>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {evidence.map((item) => {
                    const active = picked.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => togglePick(item.id)}
                        className={`flex items-start gap-2.5 rounded-[2px] border px-3 py-2.5 text-left transition-colors ${
                          active
                            ? 'border-[#8E2D20] bg-[#F7EAD0]/70 text-[#241B14]'
                            : 'border-[#B08D52]/70 hover:border-[#8E2D20] hover:bg-[#F7EAD0]/50 text-[#241B14]'
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
                        {active && <Check className="ml-auto mt-0.5 w-3.5 h-3.5 shrink-0 text-[#8E2D20]" />}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  disabled={picked.length !== 2}
                  onClick={submit}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-[2px] px-6 py-2.5 text-sm font-serif-body font-medium text-[#FAF6EE] victorian-wax-btn transition-colors disabled:opacity-40 disabled:pointer-events-none"
                >
                  <Feather className="w-4 h-4" />
                  <span>{picked.length === 2 ? '就这两件' : `已选 ${picked.length}/2`}</span>
                </button>

                {wrongNote && (
                  <p className="mt-3 text-[12px] font-serif-body text-[#8E2D20] leading-relaxed">{wrongNote}</p>
                )}
              </div>
            )}

            {/* ③ 反转 */}
            {stage === 'reveal' && (
              <div className="mt-6 animate-subtitle-in">
                <p className="font-serif-body text-[14px] leading-[1.9] text-[#2A1F16]">{confront.onCorrect}</p>
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

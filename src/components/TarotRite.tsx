import React, { useMemo, useState } from 'react';
import { ArrowLeft, Check, RotateCcw, Sparkles, X } from 'lucide-react';
import { GuestCase, KnotInterpretation } from '../types/game';
import { libraryAudio } from '../utils/audio';
import { SeasonSigilIcon } from './VisualKeepsakes';

/**
 * 梦境牌桌 · 三段式仪式
 * ① 翻牌配对：八张牌两两成对（牌面 ↔ 书页里的一句话），全部配齐才进入下一步
 * ② 时间线拼图：四张牌按书页里的先后钉到时间轴上，钉错当场退回
 * ③ 落印抉择：选出真正的解法；选错会看到坏结局，可以重来
 */

interface Pair {
  card: string;
  clue: string;
}

interface RiteData {
  pairs: Pair[];
  timeline: string[];
  timelineHint: string;
}

const RITE: Record<string, RiteData> = {
  'case-isolde': {
    pairs: [
      { card: '种荚', clue: '“等它开花，我就回来看。”' },
      { card: '露水', clue: '“花不谢，种不落。”' },
      { card: '花', clue: '“去下一个春天里盛开吧。”' },
      { card: '风', clue: '“那三个字是我自己加上去的。”' },
    ],
    timeline: ['种荚', '露水', '花', '风'],
    timelineHint: '手记写的次序：先埋进土里，才轮得到露水、开花、放手。',
  },
  'case-arthur': {
    pairs: [
      { card: '第七个节目', clue: '“节目单第七行：艾伦独奏。”' },
      { card: '半个音', clue: '“按偏半个音，也是今晚才有的旋律。”' },
      { card: '灯灭之后', clue: '“灯灭之后，他还在台上站了很久。”' },
      { card: '掌声', clue: '“幕落时，观众席才响起来。”' },
    ],
    timeline: ['第七个节目', '半个音', '灯灭之后', '掌声'],
    timelineHint: '那一晚的次序：开演、出错、有人离开、掌声。',
  },
  'case-martha': {
    pairs: [
      { card: '消散信件', clue: '“褪色的是琐事，留下的是暖句。”' },
      { card: '封蜡纹章', clue: '“蜡太厚，收信人就拆不开。”' },
      { card: '羽毛笔', clue: '“字会自己长，别用石头压。”' },
      { card: '旧肖像碎片', clue: '“三个最暖的瞬间就够了。”' },
    ],
    timeline: ['消散信件', '封蜡纹章', '羽毛笔', '旧肖像碎片'],
    timelineHint: '先写下来，再封缄，才轮到落笔与拼回。',
  },
  'case-samuel': {
    pairs: [
      { card: '黄铜齿轮', clue: '“不必填满，只需让下一秒转动。”' },
      { card: '碎钟面', clue: '“指针停在她说完‘再等一刻’那一格。”' },
      { card: '冰晶钥匙', clue: '“锁得越多，门外越安静。”' },
      { card: '雪晶符号', clue: '“时间重新流动，人才走得到。”' },
    ],
    timeline: ['碎钟面', '冰晶钥匙', '黄铜齿轮', '雪晶符号'],
    timelineHint: '先看清停在哪一格，才谈得上解冻与重新走。',
  },
};

interface TarotRiteProps {
  currentCase: GuestCase;
  hasServedTea: boolean;
  onResolveSuccess: (feedback: string) => void;
  onClose: () => void;
}

type Stage = 'pair' | 'timeline' | 'choose' | 'ending';

interface RiteCard {
  id: string;
  pairId: string;
  text: string;
  kind: 'card' | 'clue';
}

export const TarotRite: React.FC<TarotRiteProps> = ({
  currentCase,
  hasServedTea,
  onResolveSuccess,
  onClose,
}) => {
  const data = RITE[currentCase.id];
  const [stage, setStage] = useState<Stage>('pair');

  // 配对
  const cards = useMemo<RiteCard[]>(() => {
    const list: RiteCard[] = [];
    data.pairs.forEach((p, i) => {
      list.push({ id: `c${i}`, pairId: `p${i}`, text: p.card, kind: 'card' });
      list.push({ id: `q${i}`, pairId: `p${i}`, text: p.clue, kind: 'clue' });
    });
    // 固定交错洗牌，避免每次顺序完全一致但又不按对排列
    return [list[0], list[5], list[2], list[7], list[1], list[4], list[3], list[6]];
  }, [data]);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [mismatch, setMismatch] = useState(false);

  // 时间线
  const [placed, setPlaced] = useState<(string | null)[]>([null, null, null, null]);
  const [selected, setSelected] = useState<string | null>(null);
  const [rejects, setRejects] = useState(0);
  const [flashSlot, setFlashSlot] = useState<number | null>(null);
  const [rejectNote, setRejectNote] = useState(false);

  // 落印
  const [outcome, setOutcome] = useState<'good' | 'bad' | null>(null);
  const [badEnding, setBadEnding] = useState<KnotInterpretation | null>(null);

  const flip = (id: string) => {
    if (mismatch || matched.includes(id) || flipped.includes(id)) return;
    libraryAudio.playPageTurn();
    const next = [...flipped, id];
    setFlipped(next);
    if (next.length === 2) {
      const [a, b] = next;
      const cardA = cards.find((c) => c.id === a)!;
      const cardB = cards.find((c) => c.id === b)!;
      if (cardA.pairId === cardB.pairId) {
        libraryAudio.playMagicChime();
        setMatched((m) => [...m, a, b]);
        setFlipped([]);
      } else {
        libraryAudio.playSlotPlace();
        setMismatch(true);
        window.setTimeout(() => {
          setFlipped([]);
          setMismatch(false);
        }, 900);
      }
    }
  };

  const pin = (slot: number) => {
    if (!selected || placed[slot]) return;
    const cardText = selected;
    const wantIdx = data.timeline.indexOf(cardText);
    if (wantIdx === slot) {
      libraryAudio.playBrassClick();
      setPlaced((prev) => {
        const next = [...prev];
        next[slot] = cardText;
        if (next.every(Boolean)) window.setTimeout(() => setStage('choose'), 500);
        return next;
      });
      setSelected(null);
      setRejectNote(false);
    } else {
      libraryAudio.playSlotPlace();
      setRejects((r) => r + 1);
      setRejectNote(true);
      setFlashSlot(slot);
      window.setTimeout(() => setFlashSlot(null), 420);
    }
  };

  const choose = (item: KnotInterpretation) => {
    if (item.isHealingTruth || (!item.isForbiddenTrap && item.id.includes('good'))) {
      libraryAudio.playKnotResolved();
      setOutcome('good');
      setStage('ending');
      window.setTimeout(() => onResolveSuccess(item.feedback), 1600);
    } else {
      libraryAudio.playWaxSealStamp();
      setBadEnding(item);
      setOutcome('bad');
      setStage('ending');
    }
  };

  const resetRite = () => {
    setPlaced([null, null, null, null]);
    setSelected(null);
    setRejects(0);
    setRejectNote(false);
    setBadEnding(null);
    setOutcome(null);
    setStage('timeline');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`梦境牌桌 · ${currentCase.guestName}`}
      className="fixed inset-0 z-40 flex flex-col bg-[#1B1109] overflow-y-auto library-scroll"
    >
      <img
        src="src/assets/images/desk_ritual_tabletop_clean.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 w-full h-full object-cover object-center opacity-95 brightness-[0.55] saturate-[0.85]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[#0B0603]/35 bg-[radial-gradient(ellipse_at_50%_38%,rgba(24,15,9,0.05)_10%,rgba(8,5,3,0.82)_100%)]"
      />
      {/* 顶栏 */}
      <header className="relative z-10 flex items-center justify-between gap-3 px-5 py-2.5 border-b border-[#8B683C]/45 bg-[#1B1109]/72 backdrop-blur-sm">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-1 text-xs font-serif-body text-[#E4D3B3] hover:text-[#FFF3D8] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>离开牌桌</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-serif-body text-[#E4D3B3]">
          <SeasonSigilIcon season={currentCase.season} glowing className="w-4 h-4" />
          <span className="font-display">{currentCase.knot.dreamTitle}</span>
          <span aria-hidden="true" className="text-[#9E8258]">·</span>
          <span className="text-[#C9B08A]">
            {stage === 'pair' ? '一 · 配对' : stage === 'timeline' ? '二 · 钉时间线' : stage === 'choose' ? '三 · 落印' : '结局'}
          </span>
          {hasServedTea && <span className="ml-1 text-[#D9B36A]">· 花茶护佑</span>}
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="关闭"
          className="p-1 text-[#C9B08A] hover:text-[#F5E6C4]"
        >
          <X className="w-4 h-4" />
        </button>
      </header>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-3.2rem)] w-full max-w-[880px] flex-col justify-center px-5 py-8">
        {/* ① 配对 */}
        {stage === 'pair' && (
          <section>
            <p className="text-center font-serif-body text-[13px] text-[#F4E4C4] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              八张牌里，四张是牌，四张是书页里的一句话。翻出它们的一对。
            </p>
            <p className="mt-1 text-center font-serif-body text-[11px] text-[#D8C29A] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              已配对 {matched.length / 2} / 4
            </p>

            <div className="mt-5 grid grid-cols-4 gap-2.5 sm:gap-3">
              {cards.map((card) => {
                const isMatched = matched.includes(card.id);
                const isOpen = flipped.includes(card.id) || isMatched;
                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => flip(card.id)}
                    disabled={isMatched}
                    className={`group relative aspect-[3/4] rounded-[3px] border-[1.5px] shadow-[0_10px_24px_rgba(8,4,2,0.55)] transition-all duration-300 ${
                      isOpen
                        ? 'border-[#B08A4E] bg-[#F6EBD0] text-[#241B14]'
                        : 'border-[#C89F55]/75 bg-[linear-gradient(160deg,#5A1F1C,#3A1210)] text-[#E8C98F] hover:-translate-y-0.5 hover:border-[#F0CA7A]'
                    } ${isMatched ? 'opacity-30' : ''} ${mismatch && isOpen && !isMatched ? 'border-[#C98574]' : ''}`}
                  >
                    <span className="absolute inset-0 flex items-center justify-center p-2 text-center">
                      {isOpen ? (
                        <span
                          className={
                            card.kind === 'card'
                              ? 'font-display text-[13px] font-semibold leading-tight'
                              : 'font-serif-body text-[11px] leading-snug'
                          }
                        >
                          {card.text}
                        </span>
                      ) : (
                        <span className="flex flex-col items-center gap-2 opacity-85">
                          <span className="font-display text-lg">✦</span>
                          <span className="h-[1px] w-8 bg-[#C89F55]/40" />
                          <span className="font-mono text-[9px] tracking-[0.2em] text-[#C89F55]/70">MORNING</span>
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* ② 时间线 */}
        {stage === 'timeline' && (
          <section>
            <p className="text-center font-serif-body text-[13px] text-[#F4E4C4] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              把四张牌钉回它们发生的先后。钉错会弹回来。
            </p>

            <div className="mt-6 flex items-stretch gap-2">
              {placed.map((slot, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => pin(idx)}
                  className={`flex-1 min-h-[92px] rounded-[3px] border px-2 py-2 text-center transition-colors ${
                    flashSlot === idx
                      ? 'border-[#C98574] bg-[#3E1B16]'
                      : slot
                        ? 'border-[#C89F55] bg-[#F7ECD2] text-[#241B14]'
                        : 'border-dashed border-[#8A6B45] text-[#B49A74] hover:border-[#C89F55]'
                  }`}
                >
                  <span className="block font-mono text-[10px] text-[#C89F55]/80">{idx + 1}</span>
                  <span className="mt-1 block font-display text-[13px] font-semibold leading-tight">
                    {slot ?? '待钉'}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {data.timeline
                .filter((t) => !placed.includes(t))
                .map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      libraryAudio.playPageTurn();
                      setSelected(t);
                    }}
                    className={`rounded-[2px] border px-4 py-2.5 text-[13px] font-display transition-colors ${
                      selected === t
                        ? 'border-[#F0CA7A] bg-[#8E6A36] text-[#FFF6DE]'
                        : 'border-[#C89F55]/60 bg-[#1B1109]/85 text-[#F4E6C6] hover:border-[#F0CA7A]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
            </div>

            <p className="mt-3 text-center text-[11px] font-serif-body text-[#D8C29A] drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              {selected ? '再点上面的格子把它钉下去' : '先点一张牌'}
            </p>

            {rejectNote && (
              <p className="mt-2 flex items-center justify-center gap-1.5 text-[12px] font-serif-body text-[#D98B78]">
                <RotateCcw className="w-3.5 h-3.5" />
                这个时刻不对，牌弹回来了。
              </p>
            )}

            {rejects >= 2 && (
              <p className="mt-2 rounded-[2px] border border-[#C2974E]/70 px-3 py-2 text-center text-[12px] font-serif-body text-[#E8C98F]">
                {data.timelineHint}
              </p>
            )}
          </section>
        )}

        {/* ③ 落印 */}
        {stage === 'choose' && (
          <section>
            <p className="text-center font-serif-body text-[13px] text-[#F4E4C4] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              {currentCase.knot.question}
            </p>
            <p className="mt-2 text-center font-serif-body text-[12px] italic text-[#C9B08A]">
              {currentCase.knot.guestWorry}
            </p>

            <div className="mt-5 space-y-2">
              {currentCase.knot.interpretations.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => choose(item)}
                  className="w-full rounded-[3px] border border-[#B08A4E] bg-[#F6EBD0] px-4 py-3 text-left text-[#241B14] shadow-[0_8px_20px_rgba(8,4,2,0.45)] transition-all hover:-translate-y-0.5 hover:border-[#8E2D20]"
                >
                  <span className="block font-display text-[13px] font-semibold text-[#2A1F16]">
                    {item.shortPhrase}
                  </span>
                  <span className="mt-0.5 block text-[11.5px] font-serif-body leading-snug text-[#5A4836]">
                    {item.text}
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* 结局 */}
        {stage === 'ending' && (
          <section className="text-center">
            {outcome === 'good' ? (
              <>
                <Check className="mx-auto w-8 h-8 text-[#E5C175]" />
                <p className="mt-3 font-display text-lg text-[#F7E6C0]">心结已解</p>
                <p className="mx-auto mt-2 max-w-lg text-[13px] font-serif-body leading-relaxed text-[#D8C6A4]">
                  {currentCase.knot.resolutionDialogue}
                </p>
              </>
            ) : (
              <>
                <Sparkles className="mx-auto w-8 h-8 text-[#C98574]" />
                <p className="mt-3 font-display text-lg text-[#F0C9BE]">
                  {badEnding?.badEndingTitle ?? '梦境失序'}
                </p>
                <p className="mx-auto mt-2 max-w-lg text-[13px] font-serif-body leading-relaxed text-[#D8C6A4]">
                  {badEnding?.badEndingDesc ?? currentCase.knot.badEndingDefault.desc}
                </p>
                <button
                  type="button"
                  onClick={resetRite}
                  className="mt-5 inline-flex items-center gap-1.5 rounded-[2px] border border-[#C89F55]/70 px-4 py-2 text-xs font-serif-body text-[#F5E6C4] hover:bg-[#3A2719]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  重新落印
                </button>
              </>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

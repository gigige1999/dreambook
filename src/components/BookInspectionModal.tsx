import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Briefcase, Check, ChevronLeft, ChevronRight, Eye, RotateCcw, Sparkles } from 'lucide-react';
import { GuestCase, SeasonId } from '../types/game';
import { libraryAudio } from '../utils/audio';
import {
  BOOK_SATCHEL_META,
  BookPagePuzzleSuite,
  BookPuzzleSessionState,
  BookSatchelItemId,
  SatchelItemGlyph,
  createInitialBookPuzzleState,
} from './BookPagePuzzleSuite';
import {
  AntiquePhotoCorners,
  BrassCornerPlate,
  CrimsonWaxSealMedallion,
  DeckledPaperEdge,
  PaperFiberOverlay,
  VictorianCornerFiligree,
} from './VictorianOrnaments';
import { KeepsakeIllustration, MagicRelicFrame, SeasonSigilIcon } from './VisualKeepsakes';

const ROMAN_PAGES = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ'] as const;

const MODAL_PIANO_KEYS = [
  { note: 'C', freq: 261.63, sharpAfter: true },
  { note: 'D', freq: 293.66, sharpAfter: true },
  { note: 'E', freq: 329.63, sharpAfter: false },
  { note: 'F', freq: 349.23, sharpAfter: true },
  { note: 'G', freq: 392.0, sharpAfter: true },
  { note: 'A', freq: 440.0, sharpAfter: false },
  { note: 'B', freq: 493.88, sharpAfter: false },
] as const;

const SPRING_PETAL_ANGLES = [-52, -26, 0, 26, 52] as const;

const SeasonalBookInteractiveVisual: React.FC<{
  season: SeasonId;
  pageNumber: number;
  isRelicCollected: boolean;
  isRelicConsumed: boolean;
  onCollectRelic: (id: BookSatchelItemId) => void;
  onStartDragRelic: (id: BookSatchelItemId) => void;
  onEndDragRelic: () => void;
}> = ({
  season,
  pageNumber,
  isRelicCollected,
  isRelicConsumed,
  onCollectRelic,
  onStartDragRelic,
  onEndDragRelic,
}) => {
  // Spring: 5 clickable hand-drawn flower petal plectrums
  const [fannedPetals, setFannedPetals] = useState<boolean[]>([false, false, false, false, false]);

  // Summer: Animated piano keys with pluck depth & rising golden note
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [risingNote, setRisingNote] = useState<{ note: string; key: number } | null>(null);
  const [pluckedCount, setPluckedCount] = useState(0);

  // Autumn: 4-piece fragmented painting puzzle (angles % 360 === 0 means complete)
  const [paintingAngles, setPaintingAngles] = useState<[number, number, number, number]>([
    90, 0, 270, 180,
  ]);

  // Winter: Rotating SVG clockwork gear assembly
  const [gearsSpinning, setGearsSpinning] = useState<boolean>(true);

  useEffect(() => {
    setFannedPetals([false, false, false, false, false]);
    setPressedKey(null);
    setRisingNote(null);
    setPluckedCount(0);
    setPaintingAngles([90, 0, 270, 180]);
    setGearsSpinning(true);
  }, [season, pageNumber]);

  const renderRelicToken = (relicId: BookSatchelItemId, label: string) => {
    if (isRelicConsumed || isRelicCollected) {
      return (
        <div className="mt-2 pt-1.5 border-t border-[#CDB892]/55 flex items-center justify-center gap-1.5 text-[11px] font-serif-body text-[#6E563B]">
          <Check className="w-3.5 h-3.5 text-[#5D8755] shrink-0" />
          <span>{isRelicConsumed ? `「${label}」已嵌入右页` : `「${label}」已入工具匣`}</span>
        </div>
      );
    }

    return (
      <div className="mt-2 pt-1.5 border-t border-[#CDB892]/55 flex items-center justify-center">
        <div
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData('text/plain', relicId);
            onStartDragRelic(relicId);
          }}
          onDragEnd={onEndDragRelic}
          onClick={() => onCollectRelic(relicId)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onCollectRelic(relicId);
          }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-[3px] border border-[#B0843B] bg-[#FFF8E4] hover:bg-[#F7E8C2] text-xs font-serif-body font-medium text-[#4D2F16] shadow-xs cursor-grab active:cursor-grabbing transition-transform hover:-translate-y-0.5"
        >
          <SatchelItemGlyph id={relicId} className="w-5 h-5 shrink-0" />
          <span>{label}</span>
        </div>
      </div>
    );
  };

  if (season === 'spring') {
    const fannedCount = fannedPetals.filter(Boolean).length;
    const allFanned = fannedCount === 5;

    const togglePetal = (idx: number) => {
      libraryAudio.playWaterDrop(true);
      setFannedPetals((prev) => prev.map((v, i) => (i === idx ? !v : v)));
    };

    return (
      <div className="mt-3.5 px-0 py-1">
        <div className="flex items-center justify-center">
          <svg
            viewBox="0 0 220 96"
            className="w-full max-w-[240px] h-24 select-none"
            aria-label="春季手绘花朵拨片图"
          >
            {/* Hand-drawn stem & twin leaves */}
            <path d="M110 88 Q107 64 110 44" stroke="#4D784E" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            <path d="M109 73 Q89 67 86 75 Q97 80 109 73 Z" fill="#88BA84" stroke="#3D613E" strokeWidth="1.1" />
            <path d="M110 66 Q131 60 134 68 Q123 73 110 66 Z" fill="#9BC894" stroke="#3D613E" strokeWidth="1.1" />

            {/* 5 Hand-drawn clickable flower petal plectrums */}
            {SPRING_PETAL_ANGLES.map((baseAngle, idx) => {
              const isOpen = fannedPetals[idx];
              const rot = isOpen ? baseAngle * 1.48 : baseAngle * 0.65;
              const liftY = isOpen ? -6 : 0;
              return (
                <g
                  key={idx}
                  onClick={() => togglePetal(idx)}
                  className="cursor-pointer transition-transform duration-300"
                  style={{
                    transformOrigin: '110px 44px',
                    transform: `rotate(${rot}deg) translateY(${liftY}px)`,
                  }}
                >
                  <path
                    d="M110 44 Q97 22 110 10 Q123 22 110 44 Z"
                    fill={isOpen ? '#FFFDF2' : '#F4E4BE'}
                    stroke="#7D5E34"
                    strokeWidth="1.25"
                  />
                  <path d="M110 38 Q108 25 110 17" stroke="#C59D56" strokeWidth="0.9" fill="none" opacity="0.7" />
                </g>
              );
            })}

            {/* Central pollen stamen */}
            <circle cx="110" cy="44" r="9" fill="#E8BE54" stroke="#7A5520" strokeWidth="1.3" />
            <circle cx="110" cy="44" r="4" fill="#FFF4C2" />
            {allFanned && (
              <g>
                <circle cx="80" cy="22" r="2" fill="#E8C96D" />
                <circle cx="140" cy="22" r="2" fill="#E8C96D" />
              </g>
            )}
          </svg>
        </div>
        {(allFanned || isRelicCollected || isRelicConsumed) &&
          renderRelicToken('dry-petal', '干压白花瓣')}
      </div>
    );
  }

  if (season === 'summer') {
    const watchUnlocked = pluckedCount >= 3 || isRelicCollected || isRelicConsumed;

    const pluckKey = (note: string, freq: number) => {
      libraryAudio.playPianoKey(freq, false);
      setPressedKey(note);
      setRisingNote({ note, key: Date.now() });
      setPluckedCount((c) => {
        const next = c + 1;
        if (next === 3 && !isRelicCollected && !isRelicConsumed) {
          libraryAudio.playBrassClick();
        }
        return next;
      });
      window.setTimeout(() => {
        setPressedKey((curr) => (curr === note ? null : curr));
      }, 220);
    };

    return (
      <div className="mt-3.5 px-0 py-1">

        <div className="relative rounded-[3px] border border-[#4D301D] bg-[#3A2416] p-1.5 shadow-inner">
          <div className="relative h-16 flex gap-0.5">
            {MODAL_PIANO_KEYS.map((k) => {
              const isDown = pressedKey === k.note;
              const showRising = risingNote?.note === k.note;
              return (
                <div key={k.note} className="relative flex-1 flex">
                  {showRising && (
                    <span
                      key={risingNote.key}
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 z-30 text-xs font-bold text-[#9E2D20] animate-note-rise"
                    >
                      ♪
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => pluckKey(k.note, k.freq)}
                    className={`w-full h-full rounded-b-[3px] border border-[#8E7755] flex flex-col items-center justify-end pb-1 transition-all duration-150 ${
                      isDown
                        ? 'translate-y-[3px] scale-y-[0.95] bg-[#F3D782] shadow-inner'
                        : 'bg-gradient-to-b from-[#FFFDF7] to-[#EFE4CC] hover:bg-[#FAF0D6] shadow-xs'
                    }`}
                  >
                    <span className="font-mono text-[9.5px] font-bold text-[#322419]">{k.note}</span>
                  </button>
                  {k.sharpAfter && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-1.5 top-0 w-2.5 h-9 bg-[#221A15] rounded-b-[2px] border border-[#0E0A08] z-10"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {watchUnlocked && renderRelicToken('brass-watch', '停摆铜怀表')}
      </div>
    );
  }

  if (season === 'autumn') {
    const isComplete = paintingAngles.every((deg) => deg % 360 === 0);

    const rotateTile = (idx: 0 | 1 | 2 | 3) => {
      libraryAudio.playCardFlip();
      setPaintingAngles((prev) => {
        const next: [number, number, number, number] = [...prev] as [number, number, number, number];
        next[idx] = next[idx] + 90;
        if (next.every((d) => d % 360 === 0)) {
          libraryAudio.playMagicChime();
        }
        return next;
      });
    };

    return (
      <div className="mt-3.5 px-0 py-1">
        <div className="mx-auto w-[148px] p-1 rounded-[3px] border border-[#8C6432] bg-[#E8D5AC] shadow-inner">
          <div className="grid grid-cols-2 gap-[2px]">
            {([0, 1, 2, 3] as const).map((idx) => {
              const aligned = paintingAngles[idx] % 360 === 0;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => rotateTile(idx)}
                  aria-label={`旋转拼画碎片 ${idx + 1}`}
                  className={`relative w-[68px] h-[44px] overflow-hidden border transition-colors ${
                    aligned ? 'border-[#9B7538]/40' : 'border-[#8E2D20]/65'
                  }`}
                >
                  <div
                    className="w-full h-full transition-transform duration-200"
                    style={{ transform: `rotate(${paintingAngles[idx]}deg)` }}
                  >
                    <svg viewBox="0 0 68 44" className="w-full h-full" aria-hidden="true">
                      <rect width="68" height="44" fill="#F4E7C9" />
                      {idx === 0 && (
                        <>
                          <circle cx="50" cy="18" r="10" fill="#E8B872" opacity="0.8" />
                          <path d="M10 34 Q24 22 40 32" stroke="#8C5242" strokeWidth="2" fill="none" />
                          <path d="M18 14 L26 11 L24 20 Z" fill="#C46A4D" />
                        </>
                      )}
                      {idx === 1 && (
                        <>
                          <path d="M12 20 L30 12 L48 22 L30 30 Z" fill="#FAF4E6" stroke="#8B6F84" strokeWidth="1.2" />
                          <circle cx="30" cy="21" r="3" fill="#9E3124" />
                          <path d="M44 34 Q54 24 62 32" stroke="#8C5242" strokeWidth="1.8" fill="none" />
                        </>
                      )}
                      {idx === 2 && (
                        <>
                          <rect x="28" y="14" width="38" height="28" fill="#7D4939" />
                          <path d="M36 42 Q47 22 58 42 Z" fill="#E79C4E" />
                          <circle cx="16" cy="24" r="5" fill="#B68BD6" opacity="0.65" />
                        </>
                      )}
                      {idx === 3 && (
                        <>
                          <rect x="2" y="14" width="34" height="28" fill="#7D4939" />
                          <ellipse cx="48" cy="30" rx="12" ry="5" fill="#EFE4CC" stroke="#7A6248" strokeWidth="1.2" />
                          <path d="M42 22 Q48 14 54 22" stroke="#9B75B8" strokeWidth="1.4" fill="none" />
                        </>
                      )}
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        {(isComplete || isRelicCollected || isRelicConsumed) &&
          renderRelicToken('painting-shard', '残画嵌片')}
      </div>
    );
  }

  // Winter: Rotating SVG clockwork gear assembly
  const toggleGears = () => {
    libraryAudio.playClockTick(!gearsSpinning);
    setGearsSpinning((prev) => !prev);
  };

  return (
    <div className="mt-3.5 px-0 py-1">

      <button
        type="button"
        onClick={toggleGears}
        aria-label="点击拨动冬季钟楼齿轮"
        className="w-full rounded-[3px] border border-[#5D7286] bg-[#2D3945] py-1.5 px-2 flex items-center justify-center hover:bg-[#344352] transition-colors"
      >
        <svg viewBox="0 0 220 84" className="w-full max-w-[230px] h-20" aria-hidden="true">
          {/* Gear 1: Large Brass Drive Gear */}
          <g className={gearsSpinning ? 'animate-gear-spin' : ''} style={{ transformOrigin: '64px 42px' }}>
            {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => (
              <rect
                key={deg}
                x="60"
                y="11"
                width="8"
                height="9"
                rx="1.5"
                fill="#D4A64A"
                stroke="#5A3F15"
                strokeWidth="1.2"
                transform={`rotate(${deg} 64 42)`}
              />
            ))}
            <circle cx="64" cy="42" r="22" fill="#E3B962" stroke="#5A3F15" strokeWidth="1.8" />
            <circle cx="64" cy="42" r="9" fill="#2D3945" stroke="#5A3F15" strokeWidth="1.5" />
          </g>

          {/* Gear 2: Medium Frosted Steel Gear (counter-rotating) */}
          <g className={gearsSpinning ? 'animate-gear-spin-reverse' : ''} style={{ transformOrigin: '112px 42px' }}>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <rect
                key={deg}
                x="109"
                y="17"
                width="6"
                height="8"
                rx="1.2"
                fill="#B8CEDF"
                stroke="#41576B"
                strokeWidth="1.1"
                transform={`rotate(${deg} 112 42)`}
              />
            ))}
            <circle cx="112" cy="42" r="17" fill="#D0E1EE" stroke="#41576B" strokeWidth="1.6" />
            <circle cx="112" cy="42" r="6" fill="#2D3945" stroke="#41576B" strokeWidth="1.3" />
          </g>

          {/* Gear 3: Small Future Brass Gear */}
          <g className={gearsSpinning ? 'animate-gear-spin' : ''} style={{ transformOrigin: '153px 42px' }}>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <rect
                key={deg}
                x="150"
                y="21"
                width="6"
                height="7"
                rx="1.2"
                fill="#E8C677"
                stroke="#6E4E1B"
                strokeWidth="1.1"
                transform={`rotate(${deg} 153 42)`}
              />
            ))}
            <circle cx="153" cy="42" r="14" fill="#F2D78E" stroke="#6E4E1B" strokeWidth="1.6" />
            <circle cx="153" cy="42" r="5" fill="#9E3124" stroke="#4D150D" strokeWidth="1.2" />
          </g>
        </svg>
      </button>
      {(!gearsSpinning || isRelicCollected || isRelicConsumed) &&
        renderRelicToken('clock-pin', '钟楼铜锁栓')}
    </div>
  );
};

interface BookInspectionModalProps {
  isOpen: boolean;
  currentCase: GuestCase;
  collectedEvidenceIds: string[];
  isMagnifierActive: boolean;
  onToggleMagnifier: () => void;
  onCollectEvidence: (evidenceId: string) => void;
  onEnterKnotResolution: () => void;
  onClose: () => void;
}

export const BookInspectionModal: React.FC<BookInspectionModalProps> = ({
  isOpen,
  currentCase,
  collectedEvidenceIds,
  isMagnifierActive,
  onToggleMagnifier,
  onCollectEvidence,
  onEnterKnotResolution,
  onClose,
}) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [lensPos, setLensPos] = useState({ x: 50, y: 50 });
  const [lensFocused, setLensFocused] = useState(false);
  const [puzzleState, setPuzzleState] = useState<BookPuzzleSessionState>(createInitialBookPuzzleState);
  const [satchelFeedback, setSatchelFeedback] = useState<string>('');
  const [draggingItemId, setDraggingItemId] = useState<BookSatchelItemId | null>(null);
  const [inspectingMechanismPage, setInspectingMechanismPage] = useState<number | null>(null);
  const [bookViewPhase, setBookViewPhase] = useState<'open' | 'closing' | 'doorway'>('open');
  const lensAreaRef = useRef<HTMLDivElement | null>(null);
  const doorwayTimersRef = useRef<number[]>([]);
  const allCollected = collectedEvidenceIds.length >= currentCase.evidence.length;
  const prevAllCollectedRef = useRef<boolean>(allCollected);

  const clearDoorwayTimers = () => {
    doorwayTimersRef.current.forEach((id) => window.clearTimeout(id));
    doorwayTimersRef.current = [];
  };

  useEffect(() => {
    clearDoorwayTimers();
    setPageIndex(0);
    setLensFocused(false);
    setPuzzleState(createInitialBookPuzzleState());
    setSatchelFeedback('');
    setDraggingItemId(null);
    setInspectingMechanismPage(null);
    setBookViewPhase('open');
    prevAllCollectedRef.current = collectedEvidenceIds.length >= currentCase.evidence.length;
  }, [currentCase.id]);

  useEffect(() => {
    if (!isOpen) {
      clearDoorwayTimers();
      setDraggingItemId(null);
      setBookViewPhase('open');
      setInspectingMechanismPage(null);
      return;
    }

    if (allCollected && !prevAllCollectedRef.current) {
      clearDoorwayTimers();
      libraryAudio.playMagicChime();
      const t1 = window.setTimeout(() => {
        libraryAudio.playPageTurn();
        setBookViewPhase('closing');
      }, 650);
      const t2 = window.setTimeout(() => {
        setBookViewPhase('doorway');
      }, 980);
      doorwayTimersRef.current = [t1, t2];
    }
    prevAllCollectedRef.current = allCollected;
  }, [isOpen, allCollected]);

  useEffect(() => () => clearDoorwayTimers(), []);

  if (!isOpen) return null;

  const safePageIndex = Math.min(pageIndex, currentCase.pages.length - 1);
  const currentPage = currentCase.pages[safePageIndex];
  const hotspot = currentPage.hotspots[0];
  const evidenceObj = hotspot
    ? currentCase.evidence.find((e) => e.id === hotspot.evidenceId)
    : undefined;

  const isCollected = hotspot ? collectedEvidenceIds.includes(hotspot.evidenceId) : false;
  const isPuzzleSolved =
    isCollected || (hotspot ? puzzleState.solvedEvidenceIds.includes(hotspot.evidenceId) : true);
  const requiresMagnifier = Boolean(hotspot?.requiresMagnifier);

  const allSatchelItems = puzzleState.satchelItems;
  const activeSatchelItems = allSatchelItems.filter(
    (id) => !puzzleState.consumedItems.includes(id)
  );
  const canCraftWarmer =
    activeSatchelItems.includes('empty-warmer') && activeSatchelItems.includes('glowing-ember');

  const craftWarmer = () => {
    if (!canCraftWarmer) return;
    libraryAudio.playMagicChime();
    setPuzzleState((prev) => ({
      ...prev,
      satchelItems: prev.satchelItems.includes('lit-warmer')
        ? prev.satchelItems
        : [...prev.satchelItems, 'lit-warmer'],
      consumedItems: Array.from(new Set([...prev.consumedItems, 'empty-warmer', 'glowing-ember'])),
      selectedSatchelItem: 'lit-warmer',
    }));
    setSatchelFeedback('已将「余温炭块」放入「空铜手炉壳」，合成暖烘烘的「微温手炉」！');
  };

  const handleSatchelSlotClick = (itemId: BookSatchelItemId) => {
    const isConsumed = puzzleState.consumedItems.includes(itemId);
    if (isConsumed) {
      libraryAudio.playBrassClick();
      const meta = BOOK_SATCHEL_META[itemId];
      setSatchelFeedback(`「${meta.name}」已使用（${meta.originHint} · ${meta.usableHint}）`);
      return;
    }

    const sel = puzzleState.selectedSatchelItem;
    if (
      (sel === 'empty-warmer' && itemId === 'glowing-ember') ||
      (sel === 'glowing-ember' && itemId === 'empty-warmer')
    ) {
      craftWarmer();
      return;
    }

    libraryAudio.playBrassClick();
    const nextSel = sel === itemId ? null : itemId;
    setPuzzleState((prev) => ({
      ...prev,
      selectedSatchelItem: nextSel,
    }));
    setSatchelFeedback(
      nextSel
        ? `已持「${BOOK_SATCHEL_META[nextSel].name}」——${BOOK_SATCHEL_META[nextSel].usableHint}`
        : ''
    );
  };

  const leftRelicMap: Record<SeasonId, BookSatchelItemId> = {
    spring: 'dry-petal',
    summer: 'brass-watch',
    autumn: 'painting-shard',
    winter: 'clock-pin',
  };
  const currentLeftRelicId = leftRelicMap[currentCase.season];
  const isLeftRelicCollected =
    puzzleState[currentCase.season].leftRelicCollected ||
    puzzleState.satchelItems.includes(currentLeftRelicId);
  const isLeftRelicConsumed = puzzleState.consumedItems.includes(currentLeftRelicId);

  const collectLeftPageRelic = (relicId: BookSatchelItemId) => {
    if (puzzleState.satchelItems.includes(relicId) || puzzleState.consumedItems.includes(relicId)) {
      return;
    }
    libraryAudio.playEvidenceCollect();
    setPuzzleState((prev) => ({
      ...prev,
      satchelItems: prev.satchelItems.includes(relicId)
        ? prev.satchelItems
        : [...prev.satchelItems, relicId],
      selectedSatchelItem: relicId,
      [currentCase.season]: {
        ...prev[currentCase.season],
        leftRelicCollected: true,
      },
    }));
    setSatchelFeedback(`已拾取「${BOOK_SATCHEL_META[relicId].name}」，请拖入右页暗格。`);
  };

  const handlePuzzleSolved = (evidenceId: string) => {
    setPuzzleState((prev) => ({
      ...prev,
      solvedEvidenceIds: prev.solvedEvidenceIds.includes(evidenceId)
        ? prev.solvedEvidenceIds
        : [...prev.solvedEvidenceIds, evidenceId],
    }));
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!lensAreaRef.current || !isMagnifierActive || !isPuzzleSolved) return;
    const rect = lensAreaRef.current.getBoundingClientRect();
    const x = Math.max(10, Math.min(90, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(12, Math.min(88, ((e.clientY - rect.top) / rect.height) * 100));
    setLensPos({ x, y });
    if (x > 25 && x < 75 && y > 20 && y < 80) {
      setLensFocused(true);
    }
  };

  const isSecretRevealed =
    isPuzzleSolved && (!requiresMagnifier || isCollected || (isMagnifierActive && lensFocused));

  const goPrevPage = () => {
    if (safePageIndex > 0) {
      libraryAudio.playPageTurn();
      setPageIndex((i) => i - 1);
      setLensFocused(false);
      setInspectingMechanismPage(null);
    }
  };

  const goNextPage = () => {
    if (safePageIndex < currentCase.pages.length - 1) {
      libraryAudio.playPageTurn();
      setPageIndex((i) => i + 1);
      setLensFocused(false);
      setInspectingMechanismPage(null);
    }
  };

  const firstPara = currentPage.paragraphs[0] ?? '';
  const dropCapChar = firstPara.slice(0, 1);
  const firstParaRest = firstPara.slice(1);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`翻阅梦境书《${currentCase.bookTitle}》`}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#180E08]/88 backdrop-blur-sm p-3 sm:p-5 overflow-y-auto"
    >
      {/* Floating Walnut & Brass Desk Tools Above the Open Book */}
      <div className="w-full max-w-[1090px] flex flex-wrap items-center justify-between gap-3 mb-2.5 text-[#FAF4E8]">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-serif-body font-medium bg-[#3B2415] hover:bg-[#4D301D] border border-[#C89F55]/65 rounded-[3px] shadow-sm transition-colors whitespace-nowrap shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#E5C175]" />
          <span>合上书</span>
        </button>

        <div className="flex items-center gap-2.5">
          {bookViewPhase !== 'doorway' && (
            <button
              type="button"
              onClick={onToggleMagnifier}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-serif-body font-medium rounded-[3px] border shadow-sm transition-colors whitespace-nowrap shrink-0 ${
                isMagnifierActive
                  ? 'bg-[#E5C175] border-[#FFF0C4] text-[#241B14]'
                  : 'bg-[#3B2415] border-[#C89F55]/65 text-[#F5EAD6] hover:bg-[#4D301D]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{isMagnifierActive ? '持镜中' : '放大镜'}</span>
            </button>
          )}

          <button
            type="button"
            disabled={!allCollected}
            onClick={() => {
              if (allCollected) {
                if (bookViewPhase === 'doorway') {
                  onEnterKnotResolution();
                } else {
                  libraryAudio.playPageTurn();
                  setBookViewPhase('doorway');
                }
              }
            }}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-serif-body font-medium rounded-[3px] border shadow-sm transition-all whitespace-nowrap shrink-0 ${
              allCollected
                ? 'victorian-wax-btn text-[#FAF6EE] ring-1 ring-[#F0CA7A]/70'
                : 'bg-[#382518] border-[#6A513B]/55 text-[#A9967D] cursor-not-allowed'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {allCollected
                ? bookViewPhase === 'doorway'
                  ? '推开梦境门扉'
                  : '入梦'
                : `信物 ${collectedEvidenceIds.length}/${currentCase.evidence.length}`}
            </span>
          </button>
        </div>
      </div>

      {bookViewPhase === 'doorway' ? (
        /* ================= CLOSED BOOK & GILT DREAM DOORWAY OVERLAY ================= */
        <div className="w-full max-w-[540px] my-auto py-3">
          <div
            className="animate-book-fold relative rounded-[8px] p-4 sm:p-5 border-[2px] border-[#DFB96E] bg-embossed-leather shadow-[0_36px_80px_rgba(6,2,1,0.85),0_0_52px_rgba(229,193,117,0.22)]"
            style={{
              backgroundColor: currentCase.spineColor,
              backgroundBlendMode: 'overlay',
            }}
          >
            <BrassCornerPlate position="tl" />
            <BrassCornerPlate position="tr" />
            <BrassCornerPlate position="bl" />
            <BrassCornerPlate position="br" />

            {/* Left Spine Binding Rib */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-3 bottom-3 w-3 rounded-l-[4px] border-r border-[#DFB96E]/45 bg-gradient-to-r from-black/35 to-transparent"
            />

            {/* Gilt Blind-Tooling Outer Frame */}
            <div className="animate-doorway-reveal relative rounded-[5px] border border-[#E5C175]/65 bg-gradient-to-b from-[#2A1910]/85 via-[#1E110A]/90 to-[#160C07]/95 px-5 py-6 sm:px-8 sm:py-7 text-center text-[#FAF3E3] shadow-inner">
              <div className="pointer-events-none absolute top-3 right-3 rotate-12">
                <CrimsonWaxSealMedallion glyph="梦" className="w-10 h-10 drop-shadow" />
              </div>

              {/* Arched Dream Doorway Portal Medallion */}
              <div className="mx-auto w-28 h-36 rounded-t-[999px] rounded-b-[4px] border border-[#DFB96E]/75 bg-gradient-to-b from-[#3E2717]/90 via-[#28180E]/95 to-[#1B1009] flex flex-col items-center justify-center shadow-[inset_0_0_24px_rgba(229,193,117,0.18)]">
                <SeasonSigilIcon season={currentCase.season} glowing className="w-12 h-12" />
                <span className="mt-2 font-mono text-[10px] tracking-[0.22em] text-[#E8CB86] uppercase">
                  {currentCase.bookCallNumber}
                </span>
              </div>

              <p className="mt-4 text-xs font-serif-body text-[#DFC58E] tracking-wide">
                四章信物已尽数封缄 · 书页合拢之处
              </p>

              <h2 className="mt-1 font-display text-xl sm:text-2xl font-semibold text-[#FFF4D6]">
                《{currentCase.bookTitle}》
              </h2>

              <p className="mt-1 text-sm font-serif-body font-medium text-[#E5C67E]">
                {currentCase.knot.dreamTitle}
              </p>

              <p className="mt-3 mx-auto max-w-md text-xs sm:text-[13px] font-serif-body italic text-[#E2D3B7] leading-[1.75]">
                “{currentCase.knot.dreamAtmosphere}”
              </p>

              <div className="mt-5 pt-4 border-t border-[#C89F55]/35 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={onEnterKnotResolution}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-serif-body font-medium text-[#FAF6EE] victorian-wax-btn rounded-[3px] ring-1 ring-[#F4D388]/70 shadow-lg transition-transform duration-150 hover:-translate-y-0.5 whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>推开梦境门扉</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    libraryAudio.playPageTurn();
                    setBookViewPhase('open');
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-serif-body font-medium text-[#EFE1C4] hover:text-white bg-[#2E1C11] hover:bg-[#3D2516] border border-[#9E7C47]/75 rounded-[3px] transition-colors whitespace-nowrap"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#E5C175]" />
                  <span>重翻书卷</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
      /* Main Layout: Open Hardcover Spread (Left/Center) + Vertical Tool Satchel Sidebar (Right) */
      <div
        className={`w-full max-w-[1090px] flex flex-col lg:flex-row items-stretch justify-center gap-3.5 transition-all duration-300 ${
          bookViewPhase === 'closing' ? 'opacity-30 scale-x-75 scale-y-95' : 'opacity-100 scale-100'
        }`}
      >
        {/* Left/Center Column: Hardcover Book + Page Index Tabs */}
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="relative w-full">
            <div
              className={`relative rounded-[6px] p-3 sm:p-4 shadow-[0_32px_68px_rgba(8,4,2,0.8)] border-[2px] bg-embossed-leather transition-shadow duration-500 ${
                allCollected
                  ? 'border-[#DFB96E] ring-1 ring-[#F5D68E]/65 shadow-[0_0_46px_rgba(229,193,117,0.28),0_32px_68px_rgba(8,4,2,0.8)]'
                  : 'border-[#22120B]'
              }`}
              style={{
                backgroundColor: currentCase.spineColor,
                backgroundBlendMode: 'overlay',
              }}
            >
          {/* Heavy Hammered Brass Corner Mounts */}
          <BrassCornerPlate position="tl" />
          <BrassCornerPlate position="tr" />
          <BrassCornerPlate position="bl" />
          <BrassCornerPlate position="br" />

          {/* Gold-Stamped Blind-Tooling Border */}
          <div className="pointer-events-none absolute inset-2 rounded-[4px] border border-[#DFB96E]/45" />

          {/* Braided Spine Headbands */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-1/2 top-1.5 -translate-x-1/2 w-12 h-2.5 rounded-t-sm bg-gradient-to-r from-[#8E2D20] via-[#E5C175] to-[#8E2D20] border border-[#2C180E] z-20"
          />
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-1/2 bottom-1.5 -translate-x-1/2 w-12 h-2.5 rounded-b-sm bg-gradient-to-r from-[#8E2D20] via-[#E5C175] to-[#8E2D20] border border-[#2C180E] z-20"
          />

          {/* Hanging Crimson Satin Ribbon Bookmark */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-1/2 -bottom-8 -translate-x-1/2 z-20 w-5 h-11 bg-gradient-to-b from-[#9E3527] to-[#6D1F15] shadow-md"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 76%, 0 100%)',
            }}
          />

          {/* Two-Page Open Spread */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 min-h-[450px] sm:min-h-[495px] border-b-[6px] border-b-[#D5C097] rounded-[3px]">
            {/* Soft Central Spine Gutter Shadow */}
            <div
              aria-hidden="true"
              className="hidden md:block pointer-events-none absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-10 z-10 bg-gradient-to-r from-transparent via-[#7A5430]/15 to-transparent"
            />
            <div
              aria-hidden="true"
              className="hidden md:block pointer-events-none absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[1px] z-10 bg-[#7A5430]/25"
            />

            {/* ================= LEFT PAGE: Illuminated Storybook Prose & Handwritten Marginalia ================= */}
            <div className="relative bg-parchment journal-ruled-page deckle-edge-sheet deckle-edge-left book-heavy-stack-left rounded-t-[3px] md:rounded-tr-none md:rounded-l-[3px] p-5 sm:p-7 flex flex-col justify-between text-[#241B14]">
              <PaperFiberOverlay idSuffix="book-inspect-left" light />
              <DeckledPaperEdge side="left" />
              <VictorianCornerFiligree color="#9B753D" sizeClass="w-4 h-4" />

              {/* Subtle Inner Engraved Page Frame */}
              <div className="relative z-[4] flex-1 flex flex-col justify-between px-2 sm:px-3 pb-4">
                <div>
                  {/* Running Editorial Header */}
                  <div className="flex items-center justify-between gap-2 text-[11px] font-serif-body text-[#6E563B] pb-2 mb-4 border-b border-[#CDB892]/70">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <SeasonSigilIcon season={currentCase.season} className="w-3.5 h-3.5 shrink-0" />
                      <span className="italic truncate">《{currentCase.bookTitle}》</span>
                    </div>
                    <span className="font-mono text-[10px] tracking-widest text-[#8E2D20] font-semibold shrink-0">
                      第 {safePageIndex + 1} 章
                    </span>
                  </div>

                  {/* Chapter Title + Engraved Divider */}
                  <h2 className="font-display text-lg sm:text-xl font-semibold text-[#241B14] leading-snug">
                    {currentPage.chapterTitle}
                  </h2>
                  <div className="mt-2 mb-4 flex items-center gap-2">
                    <span className="h-[1px] w-10 bg-[#B89054]" />
                    <span className="text-[10px] text-[#9E7840]">✦</span>
                    <span className="h-[1px] flex-1 bg-[#D8C49E]" />
                  </div>

                  {/* Illuminated Drop-Cap Opening + Crisp Prose */}
                  <div className="space-y-3.5">
                    {firstPara && (
                      <p className="font-serif-body text-[14.5px] sm:text-[15.5px] text-[#2A1F16] leading-[1.92]">
                        <span className="float-left mr-2 mt-1 font-display text-[46px] leading-[0.82] text-[#6B252B] select-none">
                          {dropCapChar}
                        </span>
                        {firstParaRest}
                      </p>
                    )}

                    {currentPage.paragraphs.slice(1).map((para, idx) => (
                      <p
                        key={idx}
                        className="font-serif-body text-[14.5px] sm:text-[15px] text-[#35281D] leading-[1.88]"
                      >
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Interactive Seasonal Visual Plate Embedded in the Storybook Page */}
                  <SeasonalBookInteractiveVisual
                    season={currentCase.season}
                    pageNumber={currentPage.pageNumber}
                    isRelicCollected={isLeftRelicCollected}
                    isRelicConsumed={isLeftRelicConsumed}
                    onCollectRelic={collectLeftPageRelic}
                    onStartDragRelic={(id) => {
                      setDraggingItemId(id);
                      setPuzzleState((prev) => ({
                        ...prev,
                        selectedSatchelItem: id,
                      }));
                    }}
                    onEndDragRelic={() => setDraggingItemId(null)}
                  />
                </div>

                {/* Bottom Handwritten Curator Marginalia + Prev Button */}
                <div className="mt-4 pt-3 border-t border-[#CDB892]/55 flex items-end justify-between gap-2">
                  {currentPage.keepsakeNote ? (
                    <div className="pl-2.5 border-l-2 border-[#A87F46]/80 min-w-0 max-w-[62%]">
                      <p className="font-handwriting text-[15px] leading-snug text-[#6D4426] -rotate-[0.5deg]">
                        注：{currentPage.keepsakeNote}
                      </p>
                    </div>
                  ) : (
                    <span />
                  )}

                  <button
                    type="button"
                    disabled={safePageIndex === 0}
                    onClick={goPrevPage}
                    className="inline-flex items-center gap-1 text-[11px] font-serif-body text-[#6E563B] hover:text-[#8E2D20] disabled:opacity-25 disabled:pointer-events-none transition-colors whitespace-nowrap shrink-0"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>上一页</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ================= RIGHT PAGE: Interactive Mechanism -> Museum Specimen Plate ================= */}
            <div
              ref={lensAreaRef}
              onPointerMove={handlePointerMove}
              className="relative bg-parchment deckle-edge-sheet deckle-edge-right book-heavy-stack-right rounded-b-[3px] md:rounded-bl-none md:rounded-r-[3px] p-5 sm:p-7 flex flex-col justify-between select-none overflow-hidden text-[#241B14]"
            >
              <PaperFiberOverlay idSuffix="book-inspect-right" light />
              <DeckledPaperEdge side="right" />
              <VictorianCornerFiligree color="#9B753D" sizeClass="w-4 h-4" />

              <div className="relative z-[4] flex-1 flex flex-col justify-between px-2 sm:px-3 pb-4">
                <div className="flex items-center justify-between gap-2 text-[11px] font-serif-body text-[#6E563B] pb-2 mb-3 border-b border-[#CDB892] tabular-nums">
                  <span>
                    {isPuzzleSolved && inspectingMechanismPage !== currentPage.pageNumber
                      ? '标本图版'
                      : '页间机关'}
                  </span>
                  <div className="flex items-center gap-2">
                    {isPuzzleSolved && (
                      <button
                        type="button"
                        onClick={() => {
                          libraryAudio.playBrassClick();
                          setInspectingMechanismPage((prev) =>
                            prev === currentPage.pageNumber ? null : currentPage.pageNumber
                          );
                        }}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] border border-[#B08D52] bg-[#FAF0D6] hover:bg-[#F2E0B6] text-[10.5px] font-serif-body text-[#6D4426] transition-colors whitespace-nowrap"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>
                          {inspectingMechanismPage === currentPage.pageNumber
                            ? '返回标本图版'
                            : '察看本页机关'}
                        </span>
                      </button>
                    )}
                    <span>{safePageIndex + 1} / {currentCase.pages.length}</span>
                  </div>
                </div>

                {hotspot && evidenceObj && (
                  <div className="relative my-auto flex flex-col items-center justify-center py-2">
                    {!isPuzzleSolved || inspectingMechanismPage === currentPage.pageNumber ? (
                      <BookPagePuzzleSuite
                        season={currentCase.season}
                        pageNumber={currentPage.pageNumber}
                        evidenceId={hotspot.evidenceId}
                        isSolved={isPuzzleSolved}
                        puzzleState={puzzleState}
                        draggingItemId={draggingItemId}
                        onClearDragItem={() => setDraggingItemId(null)}
                        onUpdateState={setPuzzleState}
                        onSolved={handlePuzzleSolved}
                      />
                    ) : (
                      <>
                        {/* Aged Washi Tape Strip */}
                        <div
                          aria-hidden="true"
                          className="w-16 h-3.5 bg-[#DFC79A]/90 border border-[#B39562]/70 -mb-1.5 rotate-[-2.5deg] z-20 shadow-xs"
                        />

                        <MagicRelicFrame season={currentCase.season} className="w-full max-w-[300px]">
                          <div className="relative flex flex-col items-center justify-center p-3 overflow-hidden">
                            <AntiquePhotoCorners tone="brass" />

                            {isCollected && (
                              <div className="pointer-events-none absolute top-2 right-2 z-20 rotate-12">
                                <CrimsonWaxSealMedallion glyph="收" className="w-9 h-9 drop-shadow-sm" />
                              </div>
                            )}

                            <div
                              className={`w-full flex flex-col items-center text-center transition-all duration-200 ${
                                requiresMagnifier && !isCollected && !lensFocused
                                  ? 'opacity-25 blur-[3.5px]'
                                  : 'opacity-100'
                              }`}
                            >
                              <button
                                type="button"
                                disabled={!isSecretRevealed || isCollected}
                                onClick={() => onCollectEvidence(evidenceObj.id)}
                                className={`group relative w-full flex flex-col items-center p-2 rounded-[2px] transition-transform duration-200 ${
                                  isCollected
                                    ? 'cursor-default'
                                    : isSecretRevealed
                                      ? 'hover:scale-[1.03] cursor-pointer'
                                      : 'cursor-not-allowed'
                                }`}
                              >
                                <div className="p-2 rounded-[3px] border border-[#9E783B] bg-[#F7ECD4] shadow-[inset_0_0_12px_rgba(124,88,42,0.12)]">
                                  <KeepsakeIllustration
                                    id={evidenceObj.id}
                                    className="w-28 h-28 sm:w-32 sm:h-32 drop-shadow-sm"
                                  />
                                </div>

                                <span className="mt-2.5 font-display text-base font-semibold text-[#241B14]">
                                  {evidenceObj.title}
                                </span>

                                <span
                                  className={`mt-1 inline-flex items-center gap-1 px-3 py-1 rounded-[2px] text-[11px] font-serif-body font-medium transition-colors ${
                                    isCollected
                                      ? 'bg-[#EAD7AF] text-[#8E2D20] border border-[#B08D52]'
                                      : isSecretRevealed
                                        ? 'victorian-wax-btn text-[#FAF6EE]'
                                        : 'text-[#6B543D]'
                                  }`}
                                >
                                  {isCollected ? (
                                    <>
                                      <Check className="w-3.5 h-3.5" />
                                      <span>已收录</span>
                                    </>
                                  ) : (
                                    <span>{hotspot.label}</span>
                                  )}
                                </span>
                              </button>
                            </div>

                            {/* Live Circular Brass Magnifying Lens */}
                            {requiresMagnifier && isMagnifierActive && !isCollected && (
                              <>
                                <div
                                  className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center p-4 bg-[#FCF5E1]"
                                  style={{
                                    clipPath: `circle(74px at ${lensPos.x}% ${lensPos.y}%)`,
                                  }}
                                >
                                  <div className="p-2 rounded-[3px] border border-[#9E783B] bg-[#F7ECD4]">
                                    <KeepsakeIllustration
                                      id={evidenceObj.id}
                                      className="w-28 h-28 sm:w-32 sm:h-32 drop-shadow"
                                    />
                                  </div>
                                  <span className="mt-2 font-display text-sm font-semibold text-[#241B14]">
                                    {evidenceObj.title}
                                  </span>
                                  <span className="mt-0.5 text-[11px] text-[#8E2D20] font-semibold">
                                    暗纹已显影 · 点击拾取
                                  </span>
                                </div>

                                <div
                                  className="pointer-events-none absolute w-40 h-40 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#B48A3E] shadow-[0_0_0_2px_rgba(255,244,214,0.7),0_8px_22px_rgba(36,24,14,0.34)]"
                                  style={{
                                    left: `${lensPos.x}%`,
                                    top: `${lensPos.y}%`,
                                  }}
                                />
                              </>
                            )}

                            {requiresMagnifier && !isCollected && !lensFocused && (
                              <button
                                type="button"
                                onClick={() => {
                                  if (!isMagnifierActive) onToggleMagnifier();
                                  setLensPos({ x: 50, y: 46 });
                                  setLensFocused(true);
                                }}
                                className="relative z-10 mt-2 px-3.5 py-1.5 text-xs font-serif-body font-medium text-[#FAF6EE] victorian-wax-btn rounded-[2px] shadow transition-transform hover:-translate-y-0.5 whitespace-nowrap"
                              >
                                以黄铜放大镜照亮暗纹
                              </button>
                            )}
                          </div>
                        </MagicRelicFrame>
                      </>
                    )}
                  </div>
                )}

                <div className="mt-4 pt-3 border-t border-[#CDB892]/55 flex items-end justify-between gap-2">
                  <p className="text-[11.5px] font-serif-body italic text-[#6D5A42] line-clamp-2">
                    {evidenceObj?.quote ?? ''}
                  </p>

                  <button
                    type="button"
                    disabled={safePageIndex >= currentCase.pages.length - 1}
                    onClick={goNextPage}
                    className="inline-flex items-center gap-1 text-[11px] font-serif-body text-[#6E563B] hover:text-[#8E2D20] disabled:opacity-25 disabled:pointer-events-none transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>下一页</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

            {/* 4-Page Brass & Vellum Bookmark Index Tabs Below Book */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
              {currentCase.pages.map((p, idx) => {
                const pageHotspot = p.hotspots[0];
                const pageDone = pageHotspot
                  ? collectedEvidenceIds.includes(pageHotspot.evidenceId)
                  : false;

                return (
                  <button
                    key={p.pageNumber}
                    type="button"
                    onClick={() => {
                      libraryAudio.playPageTurn();
                      setPageIndex(idx);
                      setLensFocused(false);
                      setInspectingMechanismPage(null);
                    }}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-serif-body rounded-[2px] border transition-all whitespace-nowrap tabular-nums ${
                      safePageIndex === idx
                        ? 'bg-vintage-folio border-[#E5C175] text-[#241B14] font-semibold shadow-md -translate-y-0.5'
                        : 'bg-[#3B2415] border-[#8D6B42]/70 text-[#E5D3B3] hover:bg-[#4D301D]'
                    }`}
                  >
                    <span className="font-mono text-[10.5px] text-[#8E2D20]">
                      {ROMAN_PAGES[idx]}
                    </span>
                    {pageDone && <Check className="w-3.5 h-3.5 text-[#8E2D20]" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side Column: Vertical Walnut & Brass Tool Satchel (5 Slots, Keeps Consumed Items Visible) */}
        <aside
          aria-label="页间工具匣"
          className="hidden w-full lg:w-[206px] shrink-0 rounded-[6px] border-[2px] border-[#382113] bg-gradient-to-b from-[#332014] via-[#27170E] to-[#1D1009] p-3 text-[#FAF4E8] shadow-[0_22px_48px_rgba(8,4,2,0.72)] flex flex-col gap-3"
        >
          <div>
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#C89F55]/40">
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-[#E5C175] shrink-0" />
                <span className="text-xs font-serif-body font-semibold text-[#F4E0B5]">页间工具匣</span>
              </div>
              <span className="font-mono text-[10.5px] text-[#D7C09C] tabular-nums">
                {allSatchelItems.length}/5
              </span>
            </div>

            {satchelFeedback && (
              <p className="mt-2 text-[11px] font-serif-body text-[#E5CFA8] leading-snug">
                {satchelFeedback}
              </p>
            )}

            {canCraftWarmer && (
              <button
                type="button"
                onClick={craftWarmer}
                className="mt-2 w-full px-2.5 py-1.5 rounded-[3px] border border-[#F0CA7A] bg-[#8E3524] hover:bg-[#A13E2B] text-[11px] font-serif-body text-[#FFF5DC] transition-colors text-center"
              >
                合成「微温手炉」
              </button>
            )}

            <div className="mt-2.5 grid grid-cols-2 lg:grid-cols-1 gap-2">
              {[0, 1, 2, 3, 4].map((slotIdx) => {
                const itemId = allSatchelItems[slotIdx];
                if (!itemId) {
                  return (
                    <div
                      key={slotIdx}
                      className="h-[46px] rounded-[3px] border border-dashed border-[#6D533B]/60 bg-[#1B1009]/65 flex items-center justify-center text-[10.5px] font-serif-body text-[#7D664F]"
                    >
                      空槽
                    </div>
                  );
                }

                const meta = BOOK_SATCHEL_META[itemId];
                const isConsumed = puzzleState.consumedItems.includes(itemId);
                const isSelected = !isConsumed && puzzleState.selectedSatchelItem === itemId;

                return (
                  <button
                    key={itemId}
                    type="button"
                    draggable={!isConsumed}
                    onDragStart={(e) => {
                      if (isConsumed) return;
                      e.dataTransfer.setData('text/plain', itemId);
                      setDraggingItemId(itemId);
                      setPuzzleState((prev) => ({ ...prev, selectedSatchelItem: itemId }));
                    }}
                    onDragEnd={() => setDraggingItemId(null)}
                    onDragOver={(e) => {
                      if (
                        !isConsumed &&
                        ((itemId === 'empty-warmer' && draggingItemId === 'glowing-ember') ||
                          (itemId === 'glowing-ember' && draggingItemId === 'empty-warmer'))
                      ) {
                        e.preventDefault();
                      }
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      const dragged = e.dataTransfer.getData('text/plain') || draggingItemId;
                      if (
                        !isConsumed &&
                        ((itemId === 'empty-warmer' && dragged === 'glowing-ember') ||
                          (itemId === 'glowing-ember' && dragged === 'empty-warmer'))
                      ) {
                        setDraggingItemId(null);
                        craftWarmer();
                      }
                    }}
                    onClick={() => handleSatchelSlotClick(itemId)}
                    title={meta.usableHint}
                    className={`h-[46px] px-2.5 rounded-[3px] border flex items-center justify-between gap-2 transition-all text-left overflow-hidden ${
                      isConsumed
                        ? 'border-[#6E5943]/55 bg-[#24160E]/80 text-[#9D8971] opacity-80 hover:opacity-95'
                        : isSelected
                          ? 'border-[#FCE49C] bg-[#6E3426] text-[#FFF8E6] shadow-[0_0_0_1px_rgba(252,228,156,0.65)]'
                          : 'border-[#B68E4E]/75 bg-[#3D2719] text-[#F5E7CE] hover:bg-[#4B301F]'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={isConsumed ? 'grayscale opacity-65 shrink-0' : 'shrink-0'}>
                        <SatchelItemGlyph id={itemId} className="w-6 h-6" />
                      </div>
                      <span className={`text-[11.5px] font-serif-body font-medium truncate ${isConsumed ? 'line-through decoration-[#8E765B]' : ''}`}>
                        {meta.name}
                      </span>
                    </div>

                    {isConsumed && (
                      <span className="px-1.5 py-0.5 rounded-[2px] border border-[#8E765B]/70 bg-[#322116] text-[9.5px] font-serif-body text-[#CBB696] shrink-0">
                        已用
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
      )}
    </div>
  );
};

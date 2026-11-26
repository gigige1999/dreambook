import React, { useEffect, useState } from 'react';
import { Check, Flame, RotateCw, Sparkles } from 'lucide-react';
import { SeasonId } from '../types/game';
import { libraryAudio } from '../utils/audio';

export type BookSatchelItemId =
  | 'dry-petal'
  | 'rusty-shears'
  | 'greenhouse-key'
  | 'dormant-seed'
  | 'brass-watch'
  | 'tuning-fork'
  | 'watch-key'
  | 'stage-weight'
  | 'painting-shard'
  | 'matches'
  | 'letter-opener'
  | 'velvet-cloth'
  | 'clock-pin'
  | 'empty-warmer'
  | 'glowing-ember'
  | 'lit-warmer'
  | 'future-gear';

export interface SatchelItemMeta {
  id: BookSatchelItemId;
  name: string;
  originHint: string;
  usableHint: string;
}

export const BOOK_SATCHEL_META: Record<BookSatchelItemId, SatchelItemMeta> = {
  'dry-petal': {
    id: 'dry-petal',
    name: '干压白花瓣',
    originHint: '春 · 左页花朵机关',
    usableHint: '须拖入第 1 页右页「缺瓣试药盘暗槽」',
  },
  'rusty-shears': {
    id: 'rusty-shears',
    name: '生锈花剪',
    originHint: '春 · 第一章所得',
    usableHint: '可剪断韧如铁丝的干藤',
  },
  'greenhouse-key': {
    id: 'greenhouse-key',
    name: '小铜钥匙',
    originHint: '春 · 第二章所得',
    usableHint: '可开启花架暗格铜栓',
  },
  'dormant-seed': {
    id: 'dormant-seed',
    name: '干瘪魔豆',
    originHint: '春 · 第三章所得',
    usableHint: '须埋入末页培养皿土壤',
  },
  'brass-watch': {
    id: 'brass-watch',
    name: '停摆铜怀表',
    originHint: '夏 · 左页琴台暗盒',
    usableHint: '须拖入第 3 页右页「丝绒怀表暗槽」',
  },
  'tuning-fork': {
    id: 'tuning-fork',
    name: '黄铜音叉',
    originHint: '夏 · 第一章所得',
    usableHint: '可震松受潮卡涩的琴键',
  },
  'watch-key': {
    id: 'watch-key',
    name: '发条小匙',
    originHint: '夏 · 第二章所得',
    usableHint: '可替怀表表冠上弦',
  },
  'stage-weight': {
    id: 'stage-weight',
    name: '黄铜幕坠',
    originHint: '夏 · 第三章所得',
    usableHint: '可挂上剧院幕绳配重',
  },
  'painting-shard': {
    id: 'painting-shard',
    name: '残画嵌片',
    originHint: '秋 · 左页拼画机关',
    usableHint: '须拖入第 4 页右页「旧肖像右上缺角暗格」',
  },
  matches: {
    id: 'matches',
    name: '干松枝火柴',
    originHint: '秋 · 第一章所得',
    usableHint: '可点亮蜡烛融化封蜡石壳',
  },
  'letter-opener': {
    id: 'letter-opener',
    name: '铜柄裁刀',
    originHint: '秋 · 第二章所得',
    usableHint: '可依序划断红绳死结',
  },
  'velvet-cloth': {
    id: 'velvet-cloth',
    name: '柔软绒布',
    originHint: '秋 · 第三章所得',
    usableHint: '可拂去旧肖像上的炭灰',
  },
  'clock-pin': {
    id: 'clock-pin',
    name: '钟楼铜锁栓',
    originHint: '冬 · 左页齿轮机关',
    usableHint: '须拖入第 1 页右页「发条杆栓孔暗格」',
  },
  'empty-warmer': {
    id: 'empty-warmer',
    name: '空铜手炉壳',
    originHint: '冬 · 第一章所得',
    usableHint: '与余温炭块合成微温手炉',
  },
  'glowing-ember': {
    id: 'glowing-ember',
    name: '余温炭块',
    originHint: '冬 · 第二章所得',
    usableHint: '放入空铜手炉壳点燃余温',
  },
  'lit-warmer': {
    id: 'lit-warmer',
    name: '微温手炉',
    originHint: '手提袋合成所得',
    usableHint: '可三次贴近寒冰融开冰霜',
  },
  'future-gear': {
    id: 'future-gear',
    name: '未来之齿',
    originHint: '冬 · 第三章所得',
    usableHint: '可装回第一章八齿右轴',
  },
};

export const SatchelItemGlyph: React.FC<{ id: BookSatchelItemId; className?: string }> = ({
  id,
  className = 'w-7 h-7',
}) => {
  switch (id) {
    case 'dry-petal':
      return (
        <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
          <path d="M18 5 C25 12 26 24 18 31 C10 24 11 12 18 5 Z" fill="#FFFDF4" stroke="#8C6A3B" strokeWidth="1.7" />
          <path d="M18 11 Q17 19 18 27" stroke="#C9A255" strokeWidth="1.2" fill="none" />
          <circle cx="18" cy="28" r="2.2" fill="#E6BE52" />
        </svg>
      );
    case 'rusty-shears':
      return (
        <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
          <circle cx="10" cy="26" r="5" fill="none" stroke="#6E3F24" strokeWidth="2.2" />
          <circle cx="24" cy="26" r="5" fill="none" stroke="#6E3F24" strokeWidth="2.2" />
          <path d="M13 22 L23 6" stroke="#857E75" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M21 22 L12 6" stroke="#6C665E" strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="17.5" cy="14" r="1.8" fill="#B88744" />
        </svg>
      );
    case 'greenhouse-key':
      return (
        <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
          <circle cx="11" cy="18" r="6" fill="none" stroke="#B48436" strokeWidth="2.4" />
          <circle cx="11" cy="18" r="2.2" fill="#D5A64E" />
          <path d="M17 18 H31 M26 18 V24 M30 18 V23" stroke="#B48436" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    case 'dormant-seed':
      return (
        <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
          <path d="M18 6 C25 12 26 24 18 30 C10 24 11 12 18 6 Z" fill="#9E713B" stroke="#4D3316" strokeWidth="1.8" />
          <path d="M18 11 Q21 18 17 25" stroke="#EAD4A6" strokeWidth="1.2" fill="none" />
          <path d="M18 6 Q21 3 24 4" stroke="#678B56" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </svg>
      );
    case 'tuning-fork':
      return (
        <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
          <path d="M12 6 V17 Q12 22 18 22 Q24 22 24 17 V6" fill="none" stroke="#B7893B" strokeWidth="2.6" strokeLinecap="round" />
          <line x1="18" y1="22" x2="18" y2="31" stroke="#B7893B" strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="18" cy="31" r="2.2" fill="#E3BC67" stroke="#6E4E1B" strokeWidth="1" />
        </svg>
      );
    case 'brass-watch':
      return (
        <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
          <rect x="15" y="4" width="6" height="4" rx="1" fill="#C99A48" stroke="#5A3E17" strokeWidth="1.2" />
          <circle cx="18" cy="20" r="11" fill="#E8C677" stroke="#5A3E17" strokeWidth="1.7" />
          <circle cx="18" cy="20" r="8" fill="#FCF6E6" stroke="#8C6730" strokeWidth="1" />
          <path d="M18 20 V14 M18 20 L23 22" stroke="#3D2B18" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case 'watch-key':
      return (
        <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
          <path d="M11 10 C11 6 25 6 25 10 C25 14 20 15 18 18 C16 15 11 14 11 10 Z" fill="#D5AA52" stroke="#5F4218" strokeWidth="1.6" />
          <rect x="16" y="18" width="4" height="12" rx="1" fill="#C2923E" stroke="#5F4218" strokeWidth="1.3" />
        </svg>
      );
    case 'stage-weight':
      return (
        <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
          <circle cx="18" cy="8" r="3.5" fill="none" stroke="#9B7538" strokeWidth="2" />
          <polygon points="12,13 24,13 27,28 9,28" fill="#C99944" stroke="#5C3F17" strokeWidth="1.6" />
          <line x1="12" y1="20" x2="24" y2="20" stroke="#F7E1A8" strokeWidth="1.2" />
        </svg>
      );
    case 'matches':
      return (
        <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
          <rect x="8" y="14" width="20" height="15" rx="2" fill="#B57249" stroke="#542E18" strokeWidth="1.5" />
          <line x1="14" y1="7" x2="14" y2="15" stroke="#DFC495" strokeWidth="2.2" />
          <circle cx="14" cy="7" r="2.3" fill="#A63224" />
          <line x1="21" y1="8" x2="21" y2="15" stroke="#DFC495" strokeWidth="2.2" />
          <circle cx="21" cy="8" r="2.3" fill="#A63224" />
        </svg>
      );
    case 'letter-opener':
      return (
        <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
          <rect x="6" y="21" width="11" height="6" rx="2.5" transform="rotate(-40 11 24)" fill="#C99A48" stroke="#4D3413" strokeWidth="1.3" />
          <polygon points="15,19 29,6 30,8 17,22" fill="#E3E8EE" stroke="#53606E" strokeWidth="1.2" />
        </svg>
      );
    case 'painting-shard':
      return (
        <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
          <polygon points="7,9 28,7 29,26 14,29 7,21" fill="#F4E6C5" stroke="#7D5B30" strokeWidth="1.6" />
          <circle cx="21" cy="15" r="4" fill="#E2A458" opacity="0.85" />
          <path d="M11 23 Q17 18 24 22" stroke="#8E4E3D" strokeWidth="1.6" fill="none" />
        </svg>
      );
    case 'velvet-cloth':
      return (
        <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
          <path d="M6 24 Q12 8 23 10 L30 22 Q18 28 6 24 Z" fill="#A6483B" stroke="#521C14" strokeWidth="1.5" />
          <path d="M11 21 Q18 15 25 18" stroke="#F0BFB5" strokeWidth="1.3" fill="none" />
        </svg>
      );
    case 'empty-warmer':
      return (
        <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
          <ellipse cx="18" cy="18" rx="12" ry="9" fill="#B99968" stroke="#5A4223" strokeWidth="1.6" />
          <ellipse cx="18" cy="18" rx="8" ry="5.5" fill="#46382C" />
        </svg>
      );
    case 'glowing-ember':
      return (
        <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
          <polygon points="10,22 14,10 25,11 28,22 19,28" fill="#453834" stroke="#241B18" strokeWidth="1.5" />
          <path d="M15 17 L20 14 L22 21 Z" fill="#F28A30" />
          <circle cx="19" cy="18" r="2.2" fill="#FFD16B" />
        </svg>
      );
    case 'lit-warmer':
      return (
        <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
          <ellipse cx="18" cy="18" rx="12" ry="9" fill="#C98A42" stroke="#5A3714" strokeWidth="1.6" />
          <circle cx="14" cy="18" r="1.8" fill="#FFD26A" />
          <circle cx="22" cy="18" r="1.8" fill="#FFD26A" />
          <circle cx="18" cy="14" r="1.6" fill="#FFD26A" />
          <circle cx="18" cy="22" r="1.6" fill="#FFD26A" />
        </svg>
      );
    case 'clock-pin':
      return (
        <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
          <circle cx="12" cy="18" r="5.5" fill="#E2B963" stroke="#5A3F16" strokeWidth="1.6" />
          <circle cx="12" cy="18" r="2" fill="#5A3F16" />
          <rect x="17" y="15.5" width="13" height="5" rx="1.5" fill="#C89B45" stroke="#5A3F16" strokeWidth="1.4" />
          <line x1="25" y1="15.5" x2="25" y2="20.5" stroke="#FFF1C9" strokeWidth="1.1" />
        </svg>
      );
    case 'future-gear':
      return (
        <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <rect
              key={deg}
              x="16"
              y="4"
              width="4"
              height="6"
              rx="1"
              fill="#E3B962"
              stroke="#6E4E1B"
              strokeWidth="1"
              transform={`rotate(${deg} 18 18)`}
            />
          ))}
          <circle cx="18" cy="18" r="9" fill="#F0CD7A" stroke="#6E4E1B" strokeWidth="1.6" />
          <circle cx="18" cy="18" r="3.4" fill="#FAF2DC" stroke="#6E4E1B" strokeWidth="1.2" />
        </svg>
      );
  }
};

export interface DiscoveredPageClue {
  label: string;
  symbol: string;
}

export interface BookPuzzleSessionState {
  satchelItems: BookSatchelItemId[];
  consumedItems: BookSatchelItemId[];
  selectedSatchelItem: BookSatchelItemId | null;
  discoveredClues: Record<number, DiscoveredPageClue>;
  solvedEvidenceIds: string[];
  spring: {
    leftRelicCollected: boolean;
    petalMounted: boolean;
    calyxState: 'withered' | 'mist' | 'bloomed';
    unfoldCorner: boolean;
    vineCut: boolean;
    flowerBandSlid: boolean;
    keyholeUnlocked: boolean;
    vineMovedLeft: boolean;
    stoneMovedRight: boolean;
    seedPlanted: boolean;
    rings: [number, number, number];
  };
  summer: {
    leftRelicCollected: boolean;
    watchMounted: boolean;
    scoreAngles: [number, number, number];
    eKeyUnjammed: boolean;
    melodyProgress: number;
    watchWound: boolean;
    watchHour: number;
    watchMinute: number;
    weightAttached: boolean;
    curtainPulls: number;
    pedestalCode: [string, string, string];
  };
  autumn: {
    leftRelicCollected: boolean;
    frameRepaired: boolean;
    stampPeeled: boolean;
    knotsCut: [boolean, boolean, boolean];
    cutSequence: number[];
    candleLit: boolean;
    waxMeltSteps: number;
    cryptexIndices: [number, number, number, number];
    sootCleared: [boolean, boolean, boolean];
    selectedCrests: string[];
  };
  winter: {
    leftRelicCollected: boolean;
    pinInserted: boolean;
    warmerPicked: boolean;
    leftShaftGear: 'cold' | 'future' | null;
    rightShaftGear: 'cold' | 'future' | null;
    leverPulled: boolean;
    dialAngles: [number, number, number];
    iceMeltSteps: number;
    outerSnowDeg: number;
    innerSnowDeg: number;
    gearPin: '8:8' | '10:8' | '12:6';
    dialPin: 'Ⅲ' | 'Ⅵ' | 'Ⅸ' | 'Ⅻ';
  };
}

export function createInitialBookPuzzleState(): BookPuzzleSessionState {
  return {
    satchelItems: [],
    consumedItems: [],
    selectedSatchelItem: null,
    discoveredClues: {},
    solvedEvidenceIds: [],
    spring: {
      leftRelicCollected: false,
      petalMounted: false,
      calyxState: 'withered',
      unfoldCorner: false,
      vineCut: false,
      flowerBandSlid: false,
      keyholeUnlocked: false,
      vineMovedLeft: false,
      stoneMovedRight: false,
      seedPlanted: false,
      rings: [1, 1, 1],
    },
    summer: {
      leftRelicCollected: false,
      watchMounted: false,
      scoreAngles: [90, 180, 270],
      eKeyUnjammed: false,
      melodyProgress: 0,
      watchWound: false,
      watchHour: 1,
      watchMinute: 0,
      weightAttached: false,
      curtainPulls: 0,
      pedestalCode: ['C', 'C', 'Ⅻ'],
    },
    autumn: {
      leftRelicCollected: false,
      frameRepaired: false,
      stampPeeled: false,
      knotsCut: [false, false, false],
      cutSequence: [],
      candleLit: false,
      waxMeltSteps: 0,
      cryptexIndices: [0, 0, 0, 0],
      sootCleared: [false, false, false],
      selectedCrests: [],
    },
    winter: {
      leftRelicCollected: false,
      pinInserted: false,
      warmerPicked: false,
      leftShaftGear: null,
      rightShaftGear: null,
      leverPulled: false,
      dialAngles: [90, 270, 180],
      iceMeltSteps: 0,
      outerSnowDeg: 30,
      innerSnowDeg: 45,
      gearPin: '8:8',
      dialPin: 'Ⅻ',
    },
  };
}

interface BookPagePuzzleSuiteProps {
  season: SeasonId;
  pageNumber: number;
  evidenceId: string;
  isSolved: boolean;
  puzzleState: BookPuzzleSessionState;
  draggingItemId?: BookSatchelItemId | null;
  onClearDragItem?: () => void;
  onUpdateState: (updater: (prev: BookPuzzleSessionState) => BookPuzzleSessionState) => void;
  onSolved: (evidenceId: string) => void;
}

const WHEEL_OPTIONS = [
  ['L', 'H', 'W', 'M'],
  ['A', 'O', 'E', 'U'],
  ['N', 'R', 'M', 'S'],
  ['T', 'D', 'E', 'A'],
];

const PIANO_KEYS = [
  { note: 'C', freq: 261.63, hasSharpAfter: true },
  { note: 'D', freq: 293.66, hasSharpAfter: true },
  { note: 'E', freq: 329.63, hasSharpAfter: false },
  { note: 'F', freq: 349.23, hasSharpAfter: true },
  { note: 'G', freq: 392.0, hasSharpAfter: false },
] as const;

const SUMMER_PEDESTAL_NOTE_OPTIONS = ['C', 'D', 'E', 'F', 'G'] as const;
const SUMMER_PEDESTAL_CLOCK_OPTIONS = ['Ⅻ', 'Ⅲ', 'Ⅵ', 'Ⅸ'] as const;

const AUTUMN_CREST_OPTIONS = [
  { id: 'tea', label: '茶盏' },
  { id: 'hearth', label: '炉火' },
  { id: 'home', label: '门廊' },
  { id: 'ledger', label: '账簿' },
  { id: 'chain', label: '铁链' },
] as const;

const WINTER_GEAR_PIN_OPTIONS = ['8:8', '10:8', '12:6'] as const;
const WINTER_DIAL_PIN_OPTIONS = ['Ⅲ', 'Ⅵ', 'Ⅸ', 'Ⅻ'] as const;

const addSatchelItem = (
  prev: BookPuzzleSessionState,
  item: BookSatchelItemId,
  consume?: BookSatchelItemId
): BookPuzzleSessionState => {
  const nextConsumed = consume
    ? prev.consumedItems.includes(consume)
      ? prev.consumedItems
      : [...prev.consumedItems, consume]
    : prev.consumedItems;
  const nextItems = prev.satchelItems.includes(item) ? prev.satchelItems : [...prev.satchelItems, item];
  const nextSelected =
    consume && prev.selectedSatchelItem === consume ? null : prev.selectedSatchelItem;
  return {
    ...prev,
    satchelItems: nextItems,
    consumedItems: nextConsumed,
    selectedSatchelItem: nextSelected,
  };
};

const consumeSatchelItem = (
  prev: BookPuzzleSessionState,
  item: BookSatchelItemId
): BookPuzzleSessionState => ({
  ...prev,
  consumedItems: prev.consumedItems.includes(item) ? prev.consumedItems : [...prev.consumedItems, item],
  selectedSatchelItem: prev.selectedSatchelItem === item ? null : prev.selectedSatchelItem,
});

const ConvergenceHeader: React.FC<{
  discoveredClues: Record<number, DiscoveredPageClue>;
  expectedLabels: [string, string, string];
}> = ({ discoveredClues, expectedLabels }) => (
  <div className="mb-2 grid grid-cols-3 gap-1.5">
    {[1, 2, 3].map((p, idx) => {
      const clue = discoveredClues[p];
      return (
        <div
          key={p}
          className={`px-1.5 py-1 rounded-[2px] border text-center text-[10.5px] font-serif-body whitespace-nowrap truncate ${
            clue
              ? 'border-[#8C6834] bg-[#FCF7E8] text-[#4C2E14] font-semibold'
              : 'border-dashed border-[#B79D72] bg-[#EAD9B3]/60 text-[#856F52]'
          }`}
        >
          {clue ? `${expectedLabels[idx]} · 已启` : `${expectedLabels[idx]} · 未启`}
        </div>
      );
    })}
  </div>
);

export const BookPagePuzzleSuite: React.FC<BookPagePuzzleSuiteProps> = ({
  season,
  pageNumber,
  evidenceId,
  isSolved,
  puzzleState,
  draggingItemId = null,
  onClearDragItem,
  onUpdateState,
  onSolved,
}) => {
  const [feedback, setFeedback] = useState<string>('');
  const [localTool, setLocalTool] = useState<string | null>(null);
  const [activePianoNote, setActivePianoNote] = useState<string | null>(null);
  const [risingPuzzleNote, setRisingPuzzleNote] = useState<{ note: string; key: number } | null>(null);

  useEffect(() => {
    setFeedback('');
    setLocalTool(null);
    setActivePianoNote(null);
    setRisingPuzzleNote(null);
  }, [season, pageNumber, evidenceId]);

  const selectedSatchel = puzzleState.selectedSatchelItem;
  const hasItem = (id: BookSatchelItemId) =>
    puzzleState.satchelItems.includes(id) && !puzzleState.consumedItems.includes(id);

  const triggerSolved = (message: string, targetEvidenceId = evidenceId) => {
    setFeedback(message);
    libraryAudio.playMagicChime();
    window.setTimeout(() => {
      onSolved(targetEvidenceId);
    }, 900);
  };

  /* =========================================================================
   * SEASON 1: SPRING
   * ========================================================================= */
  if (season === 'spring' && pageNumber === 1) {
    const { calyxState, petalMounted } = puzzleState.spring;

    const mountPetal = (fromDrop = false) => {
      if (isSolved || petalMounted) return;
      if (!fromDrop && selectedSatchel !== 'dry-petal') {
        libraryAudio.playGentleNudge();
        setFeedback(
          hasItem('dry-petal')
            ? '请将工具匣中的「干压白花瓣」手动拖入此处「缺瓣暗槽」组合。'
            : '花蕊缺了一枚主瓣——先在左页拨开五片手绘花瓣采集「干压白花瓣」，再拖至此处。'
        );
        return;
      }
      libraryAudio.playBrassClick();
      onClearDragItem?.();
      onUpdateState((prev) => {
        const withItem = addSatchelItem(prev, 'dry-petal');
        const consumed = consumeSatchelItem(withItem, 'dry-petal');
        return {
          ...consumed,
          spring: {
            ...consumed.spring,
            leftRelicCollected: true,
            petalMounted: true,
          },
        };
      });
      setFeedback('「干压白花瓣」已嵌入花蕊暗槽！现在可以拖入玻璃滴瓶试药了。');
    };

    const applyDropper = (kind: 'truth' | 'mist') => {
      if (isSolved || calyxState === 'bloomed') return;
      if (!petalMounted) {
        libraryAudio.playGentleNudge();
        setFeedback('花蕊尚缺左页的「干压白花瓣」，先将其手动拖入花皿暗槽再试滴。');
        return;
      }
      if (kind === 'truth') {
        libraryAudio.playWaterDrop(true);
        setLocalTool(null);
        onUpdateState((prev) => {
          const withShears = addSatchelItem(prev, 'rusty-shears');
          return {
            ...withShears,
            discoveredClues: {
              ...withShears.discoveredClues,
              1: { label: '叶之数', symbol: '叶 · 2' },
            },
            spring: { ...withShears.spring, calyxState: 'bloomed' },
          };
        });
        triggerSolved('诚实露水唤醒了花蕊！细数花枝舒展出的叶片，皿旁「生锈花剪」已收入工具匣。');
      } else {
        libraryAudio.playWaterDrop(false);
        onUpdateState((prev) => ({
          ...prev,
          spring: { ...prev.spring, calyxState: 'mist' },
        }));
        setFeedback('虚言雾令花苞萎缩——对照手记另选一只滴瓶吧。');
      }
    };

    const isDraggingPetal = draggingItemId === 'dry-petal';

    return (
      <div className="w-full max-w-[330px] py-1 text-[#241B14]">
        <div className="flex items-center justify-between text-[11px] font-serif-body text-[#6E563B] pb-1.5 border-b border-[#D2BA8F]">
          <span>温室试药台</span>
        </div>

        {/* Dedicated Right-Page Secret Compartment for Left-Page Petal */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.getData('text/plain') === 'dry-petal' || draggingItemId === 'dry-petal') {
              mountPetal(true);
            }
          }}
          onClick={() => mountPetal(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') mountPetal(false);
          }}
          className={`mt-2 rounded-[3px] border px-2.5 py-1.5 flex items-center justify-between gap-2 text-[11px] font-serif-body transition-all cursor-pointer ${
            petalMounted
              ? 'border-[#5D8755] text-[#2B4B27]'
              : isDraggingPetal
                ? 'border-2 border-dashed border-[#8E2D20] bg-[#FCECC8] ring-2 ring-[#E5C175] text-[#5D2419]'
                : 'border-dashed border-[#9E783B] text-[#5C4428] hover:bg-[#EFE0BC]/40'
          }`}
        >
          <span>
            {petalMounted
              ? '右页花萼暗槽：已嵌合「干压白花瓣」'
              : '右页暗槽：拖入左页「干压白花瓣」'}
          </span>
          {petalMounted && <Check className="w-3.5 h-3.5 text-[#4B7544] shrink-0" />}
        </div>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const kind = e.dataTransfer.getData('text/plain');
            if (kind === 'dry-petal' || draggingItemId === 'dry-petal') {
              mountPetal(true);
              return;
            }
            if (kind === 'truth' || kind === 'mist') applyDropper(kind);
          }}
          onClick={() => {
            if (selectedSatchel === 'dry-petal' && !petalMounted) {
              mountPetal(false);
            } else if (localTool === 'truth' || localTool === 'mist') {
              applyDropper(localTool);
            } else {
              setFeedback(
                petalMounted
                  ? '先点击或拖动下方刻有不同纹路的玻璃滴瓶。'
                  : '先从左页花朵机关收集「干压白花瓣」并拖入暗槽。'
              );
            }
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if ((e.key === 'Enter' || e.key === ' ') && (localTool === 'truth' || localTool === 'mist')) {
              applyDropper(localTool);
            }
          }}
          className="mt-2 px-1 py-1 flex flex-col items-center cursor-pointer transition-opacity hover:opacity-90"
        >
          <svg viewBox="0 0 230 120" className="w-full h-28" aria-hidden="true">
            <ellipse cx="115" cy="96" rx="70" ry="11" fill="#D5B97E" stroke="#7A5A2B" strokeWidth="1.5" />
            <ellipse cx="115" cy="94" rx="58" ry="7" fill="#EFE0BC" stroke="#9C7A42" strokeWidth="1" />
            <path
              d="M115 92 Q109 68 115 44"
              stroke={calyxState === 'bloomed' ? '#4C7A4D' : '#6F5D48'}
              strokeWidth="3.2"
              fill="none"
              strokeLinecap="round"
            />
            {/* Exactly 2 distinct leaves as visual clue (no text label spoiler) */}
            <path
              d="M113 74 Q92 66 89 75 Q100 81 113 74 Z"
              fill={calyxState === 'bloomed' ? '#79AE76' : '#9B896F'}
              stroke="#4C3B28"
              strokeWidth="1.2"
            />
            <path
              d="M115 65 Q137 57 140 66 Q129 72 115 65 Z"
              fill={calyxState === 'bloomed' ? '#88BE83' : '#9B896F'}
              stroke="#4C3B28"
              strokeWidth="1.2"
            />
            {calyxState === 'bloomed' ? (
              <g>
                <circle cx="115" cy="36" r="24" fill="#FBEFA8" opacity="0.55" />
                <path d="M115 46 Q91 30 97 17 Q111 23 115 40 Z" fill="#FFFDF2" stroke="#7A6238" strokeWidth="1.3" />
                <path d="M115 46 Q139 30 133 17 Q119 23 115 40 Z" fill="#FFFDF2" stroke="#7A6238" strokeWidth="1.3" />
                <path d="M115 44 Q103 16 115 12 Q127 16 115 44 Z" fill="#FFF9E0" stroke="#7A6238" strokeWidth="1.3" />
                <circle cx="115" cy="29" r="5" fill="#EAC14D" />
              </g>
            ) : (
              <g>
                <path
                  d="M115 48 Q100 36 106 24 Q115 30 115 44 Q115 30 124 24 Q130 36 115 48 Z"
                  fill={calyxState === 'mist' ? '#8E857D' : '#C6AF88'}
                  stroke="#5B4730"
                  strokeWidth="1.4"
                />
                {petalMounted && (
                  <path
                    d="M115 46 Q107 20 115 13 Q123 20 115 46 Z"
                    fill="#FFFDF2"
                    stroke="#8C6A3B"
                    strokeWidth="1.2"
                  />
                )}
              </g>
            )}
            {/* Rusty shears peeking beside dish */}
            {calyxState !== 'bloomed' && (
              <g opacity="0.9">
                <circle cx="34" cy="95" r="4.5" fill="none" stroke="#6E3F24" strokeWidth="1.8" />
                <circle cx="44" cy="97" r="4.5" fill="none" stroke="#6E3F24" strokeWidth="1.8" />
                <path d="M36 91 L48 76 M42 93 L38 75" stroke="#7A7269" strokeWidth="2" strokeLinecap="round" />
              </g>
            )}
          </svg>
        </div>

        <div className="mt-2.5 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', 'truth');
              setLocalTool('truth');
            }}
            onClick={() => {
              setLocalTool('truth');
              setFeedback('已拿起「叶纹滴瓶」，请拖向或滴向花蕊。');
            }}
            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-[3px] border transition-all whitespace-nowrap shrink-0 ${
              localTool === 'truth'
                ? 'bg-[#6F3329] text-[#FAF3E2] border-[#C89F55] shadow-sm'
                : 'bg-[#F3E7C9] text-[#322419] border-[#B89862] hover:bg-[#EAD8B0]'
            }`}
          >
            <svg viewBox="0 0 32 44" className="w-7 h-9 shrink-0" aria-hidden="true">
              <rect x="12" y="2" width="8" height="10" rx="4" fill="#9E3A2B" stroke="#3D160E" strokeWidth="1.2" />
              <rect x="10" y="12" width="12" height="4" rx="1" fill="#C49A4E" stroke="#4D3518" strokeWidth="1.1" />
              <path d="M9 16 H23 L25 36 Q25 41 16 41 Q7 41 7 36 Z" fill="#E7F6E6" stroke="#4E6F52" strokeWidth="1.3" />
              <path d="M9 28 H23 L24 36 Q24 39 16 39 Q8 39 8 36 Z" fill="#9EDB8C" />
              <path d="M16 32 Q12 26 16 22 Q20 26 16 32 Z" fill="#467346" />
            </svg>
            <span className="text-xs font-serif-body font-medium">叶纹露瓶</span>
          </button>

          <button
            type="button"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('text/plain', 'mist');
              setLocalTool('mist');
            }}
            onClick={() => {
              setLocalTool('mist');
              setFeedback('已拿起「棘纹雾瓶」，可拖向或滴向花蕊试探。');
            }}
            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-[3px] border transition-all whitespace-nowrap shrink-0 ${
              localTool === 'mist'
                ? 'bg-[#5A5147] text-[#FAF3E2] border-[#B89F72] shadow-sm'
                : 'bg-[#ECE4D4] text-[#4C4238] border-[#B8A78E] hover:bg-[#E1D7C3]'
            }`}
          >
            <svg viewBox="0 0 32 44" className="w-7 h-9 shrink-0" aria-hidden="true">
              <rect x="12" y="2" width="8" height="10" rx="4" fill="#5D554E" stroke="#2D2824" strokeWidth="1.2" />
              <rect x="10" y="12" width="12" height="4" rx="1" fill="#8D8274" stroke="#3D362E" strokeWidth="1.1" />
              <path d="M9 16 H23 L25 36 Q25 41 16 41 Q7 41 7 36 Z" fill="#E3E0DB" stroke="#625A52" strokeWidth="1.3" />
              <path d="M9 27 H23 L24 36 Q24 39 16 39 Q8 39 8 36 Z" fill="#9E9790" />
              <path d="M12 29 L20 23 M14 23 L18 29" stroke="#4D453E" strokeWidth="1.4" />
            </svg>
            <span className="text-xs font-serif-body font-medium">棘纹雾瓶</span>
          </button>
        </div>

        {feedback && (
          <p className="mt-2 text-[11px] font-serif-body text-[#7B3325] text-center leading-snug">{feedback}</p>
        )}
      </div>
    );
  }

  if (season === 'spring' && pageNumber === 2) {
    const { unfoldCorner, vineCut, flowerBandSlid } = puzzleState.spring;
    const stepDone = [unfoldCorner, vineCut, flowerBandSlid].filter(Boolean).length;

    const handleCorner = () => {
      if (isSolved || unfoldCorner) return;
      libraryAudio.playPageTurn();
      onUpdateState((prev) => ({
        ...prev,
        spring: { ...prev.spring, unfoldCorner: true },
      }));
      setFeedback('已掀开左上折角，干藤仍牢牢捆着信封。');
    };

    const handleCutVine = (fromDrop = false) => {
      if (isSolved || vineCut) return;
      if (!unfoldCorner) {
        libraryAudio.playGentleNudge();
        setFeedback('右上角被左角压住了，先掀开「左上折角」。');
        return;
      }
      if (!fromDrop && selectedSatchel !== 'rusty-shears') {
        libraryAudio.playGentleNudge();
        setFeedback('干藤硬如铁丝——请先在右侧「页间工具匣」点选或拖出第 1 页的「生锈花剪」。');
        return;
      }
      libraryAudio.playBrassClick();
      onUpdateState((prev) => {
        const next = consumeSatchelItem(prev, 'rusty-shears');
        return {
          ...next,
          spring: { ...next.spring, vineCut: true },
        };
      });
      setFeedback('咔嚓——干藤应声断落！拨开「押花条」即可展开信纸。');
    };

    const handleSlideFlowerBand = () => {
      if (isSolved || flowerBandSlid) return;
      if (!vineCut) {
        libraryAudio.playGentleNudge();
        setFeedback('押花条被干藤死死勒住，先剪断「干藤」。');
        return;
      }
      libraryAudio.playPageTurn();
      onUpdateState((prev) => {
        const next = addSatchelItem(prev, 'greenhouse-key');
        return {
          ...next,
          discoveredClues: {
            ...next.discoveredClues,
            2: { label: '花瓣之数', symbol: '瓣 · 3' },
          },
          spring: { ...next.spring, flowerBandSlid: true },
        };
      });
      triggerSolved('押花条滑开，信纸背面绘着几朵白花；夹层落出的「小铜钥匙」已收进工具匣。');
    };

    return (
      <div className="w-full max-w-[330px] py-1 text-[#241B14]">
        <div className="flex items-center justify-between text-[11px] font-serif-body text-[#6E563B] pb-1.5 border-b border-[#D2BA8F]">
          <span>牛皮纸折封</span>
          <span className="tabular-nums">{stepDone}/3</span>
        </div>

        <div className="mt-2.5 rounded-[4px] border border-[#B89B67] bg-[#F5E9CC] p-2">
          <svg viewBox="0 0 260 164" className="w-full h-40 select-none" aria-label="牛皮纸折封机关">
            <rect x="24" y="20" width="212" height="128" rx="4" fill="#E6CF9C" stroke="#7E5E33" strokeWidth="2" />
            <rect x="30" y="26" width="200" height="116" rx="2" fill="#EFE0BC" stroke="#B79862" strokeWidth="1" strokeDasharray="3 2" />
            <path d="M24 22 L130 88 L236 22" fill="#DEC288" stroke="#8C6A3B" strokeWidth="1.5" />

            {flowerBandSlid && (
              <g>
                <rect x="50" y="34" width="160" height="68" rx="2" fill="#FCF6E6" stroke="#A68B5B" strokeWidth="1.2" />
                {[82, 130, 178].map((cx) => (
                  <g key={cx}>
                    <circle cx={cx} cy="64" r="10" fill="#FFFDF4" stroke="#8C6A3B" strokeWidth="1.2" />
                    <circle cx={cx} cy="64" r="3.4" fill="#E5BA4E" />
                  </g>
                ))}
                <line x1="66" y1="88" x2="194" y2="88" stroke="#CDB892" strokeWidth="0.9" strokeDasharray="2 2" />
              </g>
            )}

            <g onClick={handleCorner} className="cursor-pointer">
              {!unfoldCorner ? (
                <>
                  <polygon points="24,20 78,20 24,74" fill="#C7A364" stroke="#6E4E24" strokeWidth="1.8" />
                  <polygon points="24,74 78,20 78,74" fill="#F4E6C5" stroke="#8C6A3B" strokeWidth="1.2" opacity="0.85" />
                  <text x="53" y="54" textAnchor="middle" fontSize="9.5" fill="#4B2F16" fontWeight="bold">折角</text>
                </>
              ) : (
                <polygon points="24,20 58,20 24,54" fill="#EBD7AC" stroke="#9E7E4C" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
              )}
            </g>

            <g
              onClick={handleSlideFlowerBand}
              className="cursor-pointer transition-transform duration-300"
              transform={flowerBandSlid ? 'translate(58, 0)' : 'translate(0, 0)'}
              opacity={flowerBandSlid ? 0.25 : 1}
            >
              <rect x="108" y="16" width="44" height="136" rx="2" fill="#FBF4E0" stroke="#8D6C3E" strokeWidth="1.5" />
              <path d="M130 108 V62" stroke="#537D55" strokeWidth="2" strokeLinecap="round" />
              <circle cx="130" cy="56" r="7" fill="#E8B968" stroke="#7A5224" strokeWidth="1.2" />
              <circle cx="130" cy="56" r="2.8" fill="#FFF7D6" />
              <text x="130" y="132" textAnchor="middle" fontSize="9.5" fill="#4D371F" fontWeight="bold">押花条</text>
            </g>

            <g
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.getData('text/plain') === 'rusty-shears') {
                  handleCutVine(true);
                }
              }}
              onClick={() => handleCutVine(false)}
              className="cursor-pointer"
            >
              {!vineCut ? (
                <>
                  <path d="M22 98 Q80 90 130 102 Q180 112 238 96" fill="none" stroke="#4D3B26" strokeWidth="4.2" strokeLinecap="round" />
                  <path d="M74 93 L70 84 M110 99 L115 108 M168 105 L174 95" stroke="#362819" strokeWidth="2" strokeLinecap="round" />
                  <rect x="172" y="76" width="54" height="16" rx="2" fill="#FAF0D4" stroke="#8C6A3B" strokeWidth="1" />
                  <text x="199" y="87" textAnchor="middle" fontSize="9" fill="#5D2419" fontWeight="bold">韧性干藤</text>
                </>
              ) : (
                <path d="M22 98 H70 M190 96 H238" stroke="#6E5438" strokeWidth="2.4" strokeDasharray="3 2" opacity="0.55" />
              )}
            </g>
          </svg>
        </div>

        {feedback && (
          <p className="mt-2 text-[11px] font-serif-body text-[#7B3325] text-center leading-snug">{feedback}</p>
        )}
      </div>
    );
  }

  if (season === 'spring' && pageNumber === 3) {
    const { keyholeUnlocked, vineMovedLeft, stoneMovedRight } = puzzleState.spring;

    const unlockPin = (fromDrop = false) => {
      if (isSolved || keyholeUnlocked) return;
      if (!fromDrop && selectedSatchel !== 'greenhouse-key') {
        libraryAudio.playGentleNudge();
        setFeedback('上层铜栓锁住了枯藤——请从手提袋选取第 2 页的「小铜钥匙」。');
        return;
      }
      libraryAudio.playBrassClick();
      onUpdateState((prev) => {
        const next = consumeSatchelItem(prev, 'greenhouse-key');
        return {
          ...next,
          spring: { ...next.spring, keyholeUnlocked: true },
        };
      });
      setFeedback('铜栓弹开！现在可以向左推开「枯藤条」了。');
    };

    const slideVine = () => {
      if (isSolved || vineMovedLeft) return;
      if (!keyholeUnlocked) {
        libraryAudio.playGentleNudge();
        setFeedback('枯藤条被右侧铜栓锁死，须先用「小铜钥匙」开锁。');
        return;
      }
      libraryAudio.playWoodSlide();
      onUpdateState((prev) => ({
        ...prev,
        spring: { ...prev.spring, vineMovedLeft: true },
      }));
      setFeedback('枯藤条已移开，向右移开下方「碎石片」。');
    };

    const slideStone = () => {
      if (isSolved || stoneMovedRight) return;
      if (!vineMovedLeft) {
        libraryAudio.playGentleNudge();
        setFeedback('碎石片被上方的「枯藤条」挡住了。');
        return;
      }
      libraryAudio.playWoodSlide();
      onUpdateState((prev) => {
        const next = addSatchelItem(prev, 'dormant-seed');
        return {
          ...next,
          discoveredClues: {
            ...next.discoveredClues,
            3: { label: '藤梯阶数', symbol: '梯 · 4' },
          },
          spring: { ...next.spring, stoneMovedRight: true },
        };
      });
      triggerSolved('暗格露出刻有通月藤梯的素烧陶盆，盆底「干瘪魔豆」已收进工具匣。');
    };

    return (
      <div className="w-full max-w-[330px] py-1 text-[#241B14]">
        <div className="flex items-center justify-between text-[11px] font-serif-body text-[#6E563B] pb-1.5 border-b border-[#D2BA8F]">
          <span>台角暗格</span>
        </div>

        <div className="mt-2.5 rounded-[4px] border border-[#9E8050] bg-[#4A3320] p-2">
          <svg viewBox="0 0 260 156" className="w-full h-36 select-none" aria-label="藤石暗格机关">
            <rect x="44" y="18" width="172" height="120" rx="4" fill="#2A1B10" stroke="#B79253" strokeWidth="2" />
            <polygon points="104,76 156,76 148,124 112,124" fill="#B86B49" stroke="#5D2E1B" strokeWidth="1.5" />
            <rect x="98" y="68" width="64" height="10" rx="2" fill="#C97C58" stroke="#5D2E1B" strokeWidth="1.5" />
            {/* 4 Ladder rungs engraved on pot */}
            <path d="M123 82 V116 M137 82 V116 M123 89 H137 M123 96 H137 M123 103 H137 M123 110 H137" stroke="#F8E2B4" strokeWidth="1.6" />

            <rect x="18" y="42" width="224" height="6" rx="2" fill="#8C6B39" />
            <rect x="18" y="102" width="224" height="6" rx="2" fill="#8C6B39" />

            <g
              onClick={slideVine}
              className="cursor-pointer transition-transform duration-300"
              transform={vineMovedLeft ? 'translate(-88, 0)' : 'translate(0, 0)'}
            >
              <rect x="60" y="24" width="136" height="38" rx="4" fill="#5D4A33" stroke="#C8A25B" strokeWidth="1.6" />
              <path d="M70 44 Q98 32 130 45 Q162 56 188 38" fill="none" stroke="#362819" strokeWidth="4.2" strokeLinecap="round" />
            </g>

            {/* Brass Keyhole Pin locking top vine */}
            <g
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.getData('text/plain') === 'greenhouse-key') unlockPin(true);
              }}
              onClick={() => unlockPin(false)}
              className="cursor-pointer"
            >
              <circle
                cx="206"
                cy="43"
                r="12"
                fill={keyholeUnlocked ? '#88A66E' : '#C99944'}
                stroke="#3D260F"
                strokeWidth="1.6"
              />
              {!keyholeUnlocked ? (
                <path d="M206 38 A2.5 2.5 0 1 1 205.9 38 M204.5 41 L207.5 41 L208.5 49 L203.5 49 Z" fill="#2A190C" />
              ) : (
                <path d="M201 43 L205 47 L212 39" stroke="#1E3316" strokeWidth="2.2" fill="none" strokeLinecap="round" />
              )}
            </g>

            <g
              onClick={slideStone}
              className="cursor-pointer transition-transform duration-300"
              transform={stoneMovedRight ? 'translate(88, 0)' : 'translate(0, 0)'}
            >
              <polygon points="66,86 196,82 206,108 190,126 70,124 58,104" fill="#7D756C" stroke="#3C3630" strokeWidth="2" />
              <ellipse cx="176" cy="95" rx="14" ry="6" fill="#637E5B" opacity="0.7" />
            </g>
          </svg>
        </div>

        {feedback && (
          <p className="mt-2 text-[11px] font-serif-body text-[#7B3325] text-center leading-snug">{feedback}</p>
        )}
      </div>
    );
  }

  if (season === 'spring' && pageNumber === 4) {
    const { seedPlanted, rings } = puzzleState.spring;
    const allPreSolved = Boolean(
      puzzleState.discoveredClues[1] && puzzleState.discoveredClues[2] && puzzleState.discoveredClues[3]
    );

    const plantSeed = (fromDrop = false) => {
      if (isSolved || seedPlanted) return;
      if (!fromDrop && selectedSatchel !== 'dormant-seed') {
        libraryAudio.playGentleNudge();
        setFeedback(
          hasItem('dormant-seed')
            ? '请先在右侧工具匣点选「干瘪魔豆」再埋入培养皿。'
            : '培养皿尚缺「干瘪魔豆」，须先开启第 3 页暗格。'
        );
        return;
      }
      libraryAudio.playWaterDrop(true);
      onUpdateState((prev) => {
        const next = consumeSatchelItem(prev, 'dormant-seed');
        return {
          ...next,
          spring: { ...next.spring, seedPlanted: true },
        };
      });
      setFeedback('干瘪魔豆已埋入黑土！回想前三页叶片、白花与梯阶之数拨转三环。');
    };

    const cycleRing = (idx: 0 | 1 | 2) => {
      if (isSolved) return;
      libraryAudio.playBrassClick();
      const nextRings: [number, number, number] = [...rings] as [number, number, number];
      nextRings[idx] = nextRings[idx] >= 5 ? 1 : nextRings[idx] + 1;
      onUpdateState((prev) => ({
        ...prev,
        spring: { ...prev.spring, rings: nextRings },
      }));

      if (nextRings[0] === 2 && nextRings[1] === 3 && nextRings[2] === 4) {
        if (!seedPlanted) {
          libraryAudio.playGentleNudge();
          setFeedback('三环机括似已相扣，但花皿中尚未埋入「干瘪魔豆」。');
          return;
        }
        if (!allPreSolved) {
          libraryAudio.playGentleNudge();
          setFeedback('前三章尚有机关未解封，总锁还缺一丝呼应。');
          return;
        }
        triggerSolved('三环咔哒咬合，魔豆抽芽发光！请举起黄铜放大镜显影。');
      }
    };

    const ringMeta = [
      { label: '叶数环', glyph: '🌿' },
      { label: '花瓣环', glyph: '✿' },
      { label: '藤梯环', glyph: '🪜' },
    ];

    return (
      <div className="w-full max-w-[330px] py-1 text-[#241B14]">
        <div className="flex items-center justify-between text-[11px] font-serif-body text-[#6E563B] pb-1.5 border-b border-[#D2BA8F]">
          <span>温室总锁</span>
        </div>

        <div className="mt-2">
          <ConvergenceHeader
            discoveredClues={puzzleState.discoveredClues}
            expectedLabels={['叶数', '瓣数', '梯阶']}
          />
        </div>

        {/* Soil Vessel */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.getData('text/plain') === 'dormant-seed') plantSeed(true);
          }}
          onClick={() => plantSeed(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') plantSeed(false);
          }}
          className={`rounded-[3px] border px-2.5 py-2 flex items-center justify-between cursor-pointer transition-colors ${
            seedPlanted
              ? 'border-[#5D8755] bg-[#E8F2DF]'
              : 'border-dashed border-[#9E783B] hover:bg-[#EFE0BC]/40'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full border border-[#7A5A2B] bg-[#5C442E] flex items-center justify-center text-xs text-[#F5DF9D]">
              {seedPlanted ? '🌱' : '土'}
            </span>
            <span className="text-xs font-serif-body text-[#322419]">
              {seedPlanted ? '魔豆已埋入黑土' : '点击埋入「干瘪魔豆」'}
            </span>
          </div>
          {seedPlanted && <Check className="w-4 h-4 text-[#4B7544]" />}
        </div>

        <div className="mt-2 grid grid-cols-3 gap-2 rounded-[4px] border border-[#9E783B] bg-[#EFE0BC] p-2">
          {([0, 1, 2] as const).map((idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => cycleRing(idx)}
              className="flex flex-col items-center justify-center rounded-[4px] border border-[#A58143] bg-gradient-to-b from-[#FAF0D6] to-[#E6CE9B] py-2 px-1 hover:brightness-95 transition-all shadow-xs"
            >
              <span className="text-[10px] font-serif-body text-[#6E563B]">{ringMeta[idx].label}</span>
              <span className="my-1 w-10 h-10 rounded-full border border-[#8E6A33] bg-[#FCF7E8] flex items-center justify-center font-display text-lg font-bold text-[#2C2015] shadow-inner tabular-nums">
                {rings[idx]}
              </span>
            </button>
          ))}
        </div>

        {feedback && (
          <p className="mt-2 text-[11px] font-serif-body text-[#7B3325] text-center leading-snug">{feedback}</p>
        )}
      </div>
    );
  }

  /* =========================================================================
   * SEASON 2: SUMMER
   * ========================================================================= */
  if (season === 'summer' && pageNumber === 1) {
    const { scoreAngles } = puzzleState.summer;
    const rotateFragment = (idx: 0 | 1 | 2) => {
      if (isSolved) return;
      libraryAudio.playPageTurn();
      const next: [number, number, number] = [...scoreAngles] as [number, number, number];
      next[idx] = next[idx] + 90;
      const alignedAll = next.every((deg) => deg % 360 === 0);

      onUpdateState((prev) => {
        let updated: BookPuzzleSessionState = {
          ...prev,
          summer: { ...prev.summer, scoreAngles: next },
        };
        if (alignedAll) {
          updated = addSatchelItem(updated, 'tuning-fork');
          updated = {
            ...updated,
            discoveredClues: {
              ...updated.discoveredClues,
              1: { label: '首音与拍数', symbol: '首音 E · 3拍' },
            },
          };
        }
        return updated;
      });

      if (alignedAll) {
        triggerSolved('碎裂乐谱终于接通！细看五线谱金圈音符落于第几线，匣旁「黄铜音叉」已入工具匣。');
      } else {
        setFeedback('点击旋转三块残谱，令五线横纹齐平。');
      }
    };

    return (
      <div className="w-full max-w-[330px] py-1 text-[#241B14]">
        <div className="flex items-center justify-between text-[11px] font-serif-body text-[#6E563B] pb-1.5 border-b border-[#D2BA8F]">
          <span>碎裂五线谱</span>
        </div>

        <div className="mt-2.5 grid grid-cols-3 gap-2 rounded-[4px] border border-[#B09260] bg-[#EAD8B2] p-2.5">
          {([0, 1, 2] as const).map((idx) => {
            const norm = scoreAngles[idx] % 360;
            const aligned = norm === 0;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => rotateFragment(idx)}
                className={`flex flex-col items-center rounded-[3px] border p-1.5 transition-colors ${
                  aligned ? 'border-[#9B7538] bg-[#FAF0D6]' : 'border-[#B89F72] bg-[#F4E6C5] hover:bg-[#EDE0BD]'
                }`}
              >
                <div
                  className="w-20 h-20 flex items-center justify-center transition-transform duration-200"
                  style={{ transform: `rotate(${scoreAngles[idx]}deg)` }}
                >
                  <svg viewBox="0 0 72 72" className="w-full h-full" aria-hidden="true">
                    <polygon points="6,10 66,8 63,24 68,42 62,62 8,64 12,44 6,28" fill="#FDF9EE" stroke="#8E754E" strokeWidth="1.5" />
                    {[24, 30, 36, 42, 48].map((y) => (
                      <line key={y} x1="9" y1={y} x2="63" y2={y} stroke="#63513E" strokeWidth="1.1" />
                    ))}
                    {idx === 0 && (
                      <>
                        <text x="14" y="45" fontSize="22" fill="#323F50" fontFamily="serif">𝄞</text>
                        <text x="38" y="34" fontSize="10.5" fill="#8E2D20" fontWeight="bold">3/4</text>
                        <text x="13" y="60" fontSize="7" fill="#6E563B" fontFamily="serif">线由下: E·G·B</text>
                      </>
                    )}
                    {idx === 1 && (
                      <>
                        <circle cx="24" cy="48" r="7.5" fill="none" stroke="#C9963A" strokeWidth="1.8" />
                        <circle cx="24" cy="48" r="3.6" fill="#8E2D20" />
                        <line x1="27.5" y1="48" x2="27.5" y2="28" stroke="#8E2D20" strokeWidth="1.3" />
                        <circle cx="48" cy="42" r="3.6" fill="#323F50" />
                        <line x1="51.5" y1="42" x2="51.5" y2="23" stroke="#323F50" strokeWidth="1.2" />
                      </>
                    )}
                    {idx === 2 && (
                      <>
                        <circle cx="24" cy="48" r="3.6" fill="#323F50" />
                        <line x1="27.5" y1="48" x2="27.5" y2="28" stroke="#323F50" strokeWidth="1.2" />
                        <line x1="50" y1="24" x2="50" y2="48" stroke="#323F50" strokeWidth="1.4" />
                        <line x1="54" y1="24" x2="54" y2="48" stroke="#323F50" strokeWidth="2.4" />
                      </>
                    )}
                  </svg>
                </div>
              </button>
            );
          })}
        </div>

        {feedback && (
          <p className="mt-2 text-[11px] font-serif-body text-[#7B3325] text-center leading-snug">{feedback}</p>
        )}
      </div>
    );
  }

  if (season === 'summer' && pageNumber === 2) {
    const { eKeyUnjammed, melodyProgress } = puzzleState.summer;
    const targetNotes = ['E', 'G', 'E'] as const;

    const handlePressKey = (note: string, freq: number, fromDrop = false) => {
      if (isSolved) return;

      if (note === 'E' && !eKeyUnjammed) {
        if (fromDrop || selectedSatchel === 'tuning-fork') {
          libraryAudio.playMagicChime();
          onUpdateState((prev) => {
            const next = consumeSatchelItem(prev, 'tuning-fork');
            return {
              ...next,
              summer: { ...next.summer, eKeyUnjammed: true },
            };
          });
          setFeedback('音叉清鸣振开湿潮！「E」键已恢复弹性，对照琴盖蜡痕奏出旋律吧。');
          return;
        }
        libraryAudio.playPianoKey(freq, true);
        setFeedback('中央「E」键受潮卡死了！须先从手提袋拿起第 1 页的「黄铜音叉」振松。');
        return;
      }

      if (!eKeyUnjammed) {
        libraryAudio.playPianoKey(freq, true);
        setFeedback('琴台主音「E」键尚卡涩，先用「黄铜音叉」敲松 E 键。');
        return;
      }

      setActivePianoNote(note);
      setRisingPuzzleNote({ note, key: Date.now() });
      window.setTimeout(() => setActivePianoNote(null), 200);

      if (note === targetNotes[melodyProgress]) {
        libraryAudio.playPianoKey(freq, false);
        const nextProg = melodyProgress + 1;
        onUpdateState((prev) => {
          let updated: BookPuzzleSessionState = {
            ...prev,
            summer: { ...prev.summer, melodyProgress: nextProg },
          };
          if (nextProg === 3) {
            updated = addSatchelItem(updated, 'watch-key');
            updated = {
              ...updated,
              discoveredClues: {
                ...updated.discoveredClues,
                2: { label: '琴尾音', symbol: '尾音 G' },
              },
            };
          }
          return updated;
        });

        if (nextProg === 3) {
          triggerSolved('琴音齐鸣！最后一声余韵震开了琴盖暗扣，「发条小匙」已收入工具匣。');
        } else {
          setFeedback(`奏响 ${note} 音（${nextProg}/3），继续对照琴键蜡痕刻号。`);
        }
      } else {
        libraryAudio.playPianoKey(freq, true);
        onUpdateState((prev) => ({
          ...prev,
          summer: { ...prev.summer, melodyProgress: 0 },
        }));
        setFeedback('余音中断——细看琴键蜡滴上的罗马序号重弹。');
      }
    };

    return (
      <div className="w-full max-w-[330px] py-1 text-[#241B14]">
        <div className="flex items-center justify-between text-[11px] font-serif-body text-[#6E563B] pb-1.5 border-b border-[#D2BA8F]">
          <span>微缩琴台</span>
          <span className="tabular-nums">{melodyProgress}/3</span>
        </div>

        <div className="mt-2.5 rounded-[4px] border-2 border-[#4A2E1B] bg-[#5C3A22] p-2 shadow-inner">
          <div className="flex items-center justify-end px-1 pb-1.5 mb-1.5 border-b border-[#C89F55]/45">
            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full border border-[#3B2313] transition-colors ${
                    melodyProgress > i ? 'bg-[#F5CE67] shadow-[0_0_6px_#F5CE67]' : 'bg-[#2E1C10]'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="relative h-28 flex gap-1">
            {PIANO_KEYS.map((k) => {
              const isPressed = activePianoNote === k.note;
              const showRising = risingPuzzleNote?.note === k.note;
              const isJammedE = k.note === 'E' && !eKeyUnjammed;
              return (
                <div key={k.note} className="relative flex-1 flex">
                  {showRising && (
                    <span
                      key={risingPuzzleNote.key}
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 z-30 text-sm font-bold text-[#F7D774] animate-note-rise"
                    >
                      ♪
                    </span>
                  )}
                  <button
                    type="button"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (e.dataTransfer.getData('text/plain') === 'tuning-fork') {
                        handlePressKey(k.note, k.freq, true);
                      }
                    }}
                    onClick={() => handlePressKey(k.note, k.freq, false)}
                    className={`w-full h-full rounded-b-[4px] border flex flex-col items-center justify-end pb-2 transition-all duration-150 shadow-sm ${
                      isJammedE
                        ? 'border-[#6E4934] bg-[#C9BBA0] hover:bg-[#BFA988]'
                        : isPressed
                          ? 'border-[#8E7755] translate-y-[4px] scale-y-[0.95] bg-[#F2D98D] shadow-inner'
                          : 'border-[#8E7755] bg-gradient-to-b from-[#FFFDF7] to-[#EFE4CB] hover:bg-[#F9EFD5]'
                    }`}
                  >
                    {k.note === 'E' && (
                      <span
                        aria-hidden="true"
                        className="mb-auto mt-1.5 px-1 rounded-full bg-[#B74A36]/90 border border-[#6E2115] text-[8px] font-serif-body text-[#FFF4DC] leading-tight"
                      >
                        Ⅰ·Ⅲ
                      </span>
                    )}
                    {k.note === 'G' && (
                      <span
                        aria-hidden="true"
                        className="mb-auto mt-1.5 px-1 rounded-full bg-[#D99F4E]/90 border border-[#7A4F1D] text-[8px] font-serif-body text-[#35200C] leading-tight"
                      >
                        Ⅱ
                      </span>
                    )}
                    <span className="font-mono text-xs font-bold text-[#2F2318]">{k.note}</span>
                  </button>
                  {k.hasSharpAfter && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-2 top-0 w-3.5 h-14 bg-gradient-to-b from-[#3A302A] to-[#1A1411] rounded-b-[2px] border border-[#0E0A08] z-10 shadow"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {feedback && (
          <p className="mt-2 text-[11px] font-serif-body text-[#7B3325] text-center leading-snug">{feedback}</p>
        )}
      </div>
    );
  }

  if (season === 'summer' && pageNumber === 3) {
    const { watchMounted, watchWound, watchHour, watchMinute } = puzzleState.summer;
    const isDraggingWatch = draggingItemId === 'brass-watch';

    const mountWatch = (fromDrop = false) => {
      if (isSolved || watchMounted) return;
      if (!fromDrop && selectedSatchel !== 'brass-watch') {
        libraryAudio.playGentleNudge();
        setFeedback(
          hasItem('brass-watch')
            ? '请将工具匣中的「停摆铜怀表」手动拖入此处丝绒暗格。'
            : '丝绒暗格尚空——先拨动左页琴键开启暗盒，取出「停摆铜怀表」再手动拖入此处。'
        );
        return;
      }
      libraryAudio.playBrassClick();
      onClearDragItem?.();
      onUpdateState((prev) => {
        const withItem = addSatchelItem(prev, 'brass-watch');
        const consumed = consumeSatchelItem(withItem, 'brass-watch');
        return {
          ...consumed,
          summer: {
            ...consumed.summer,
            leftRelicCollected: true,
            watchMounted: true,
          },
        };
      });
      setFeedback('「停摆铜怀表」已稳稳嵌入丝绒暗槽！请再拖入「发条小匙」替表冠上弦。');
    };

    const windWatch = (fromDrop = false) => {
      if (isSolved || watchWound) return;
      if (!watchMounted) {
        mountWatch(false);
        return;
      }
      if (!fromDrop && selectedSatchel !== 'watch-key') {
        libraryAudio.playGentleNudge();
        setFeedback('表芯发条咬死——请从手提袋选取或拖入第 2 页所得「发条小匙」插向表冠。');
        return;
      }
      libraryAudio.playBrassClick();
      onClearDragItem?.();
      onUpdateState((prev) => {
        const next = consumeSatchelItem(prev, 'watch-key');
        return {
          ...next,
          summer: { ...next.summer, watchWound: true },
        };
      });
      setFeedback('发条小匙上弦成功！留心表盘朱砂刻记与第一章三拍之数。');
    };

    const checkWatch = (nextH: number, nextM: number) => {
      if (nextH === 3 && nextM === 15) {
        libraryAudio.playBrassClick();
        onUpdateState((prev) => {
          let updated: BookPuzzleSessionState = {
            ...prev,
            summer: { ...prev.summer, watchHour: nextH, watchMinute: nextM },
          };
          updated = addSatchelItem(updated, 'stage-weight');
          updated = {
            ...updated,
            discoveredClues: {
              ...updated.discoveredClues,
              3: { label: '刻钟刻度', symbol: '刻钟 Ⅲ' },
            },
          };
          return updated;
        });
        triggerSolved('怀表机芯咔哒弹开！表背暗扣下的「黄铜幕坠」已收入工具匣。');
      } else {
        onUpdateState((prev) => ({
          ...prev,
          summer: { ...prev.summer, watchHour: nextH, watchMinute: nextM },
        }));
        setFeedback(`当前时刻：${nextH}:${String(nextM).padStart(2, '0')}，结合剧场停演一刻与钟面刻痕拨正指针。`);
      }
    };

    const advanceHour = () => {
      if (isSolved) return;
      if (!watchMounted) {
        libraryAudio.playGentleNudge();
        setFeedback('丝绒表槽尚空，须先将左页琴台暗盒里的「停摆铜怀表」手动拖入此处。');
        return;
      }
      if (!watchWound) {
        libraryAudio.playClockTick(true);
        setFeedback('发条尚未上弦，指针纹丝不动。先用「发条小匙」轻触或拖向表冠。');
        return;
      }
      libraryAudio.playClockTick(false);
      checkWatch((watchHour % 12) + 1, watchMinute);
    };

    const advanceMinute = () => {
      if (isSolved) return;
      if (!watchMounted) {
        libraryAudio.playGentleNudge();
        setFeedback('丝绒表槽尚空，须先将左页「停摆铜怀表」手动拖入此处。');
        return;
      }
      if (!watchWound) {
        libraryAudio.playClockTick(true);
        setFeedback('发条尚未上弦，先用「发条小匙」上弦。');
        return;
      }
      libraryAudio.playClockTick(false);
      checkWatch(watchHour, (watchMinute + 5) % 60);
    };

    const hourDeg = (watchHour % 12) * 30 + watchMinute * 0.5;
    const minDeg = watchMinute * 6;

    return (
      <div className="w-full max-w-[330px] py-1 text-[#241B14]">
        <div className="flex items-center justify-between text-[11px] font-serif-body text-[#6E563B] pb-1.5 border-b border-[#D2BA8F]">
          <span>回声怀表</span>
          {watchMounted && watchWound && (
            <span className="font-mono tabular-nums">
              {watchHour}:{String(watchMinute).padStart(2, '0')}
            </span>
          )}
        </div>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const item = e.dataTransfer.getData('text/plain');
            if (item === 'brass-watch' || draggingItemId === 'brass-watch') {
              mountWatch(true);
            } else if (item === 'watch-key' || draggingItemId === 'watch-key') {
              windWatch(true);
            }
          }}
          className={`mt-2 flex flex-col items-center rounded-[4px] p-1.5 transition-all ${
            !watchMounted && isDraggingWatch
              ? 'bg-[#FCECC8] ring-2 ring-dashed ring-[#8E2D20]'
              : ''
          }`}
        >
          {!watchMounted ? (
            <button
              type="button"
              onClick={() => mountWatch(false)}
              className="w-full py-5 px-3 rounded-[4px] border-2 border-dashed border-[#9E783B] bg-[#EFE0BC] hover:bg-[#E7D4A8] flex flex-col items-center justify-center gap-2 transition-colors"
            >
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#8E6A33] bg-[#5C2420]/85 flex items-center justify-center shadow-inner">
                <span className="text-[11px] font-serif-body text-[#F5DFB0] text-center leading-snug px-2">
                  丝绒怀表<br />暗格凹槽
                </span>
              </div>
              <span className="text-[11px] font-serif-body text-[#5A442C]">
                将左页琴台暗盒所得「停摆铜怀表」手动拖入此处
              </span>
            </button>
          ) : (
            <svg viewBox="0 0 156 132" className="w-36 h-30" aria-hidden="true">
              <g
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.getData('text/plain') === 'watch-key' || draggingItemId === 'watch-key') {
                    windWatch(true);
                  }
                }}
                onClick={() => windWatch(false)}
                className="cursor-pointer"
              >
                <circle cx="78" cy="11" r="8" fill={watchWound ? '#94B878' : '#E3B962'} stroke="#6E4E24" strokeWidth="2" />
                <rect x="72" y="15" width="12" height="8" rx="1.5" fill="#C49A4E" stroke="#6E4E24" strokeWidth="1.2" />
                <text x="116" y="15" fontSize="8.5" fill="#7B3325" fontWeight="bold">
                  {watchWound ? '已上弦' : '← 插钥匙上弦'}
                </text>
              </g>

              <circle cx="78" cy="74" r="52" fill="#D9B773" stroke="#7A5A2B" strokeWidth="2" />
              <circle cx="78" cy="74" r="46" fill="#FCF8EC" stroke="#9B7538" strokeWidth="2" />
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <line key={deg} x1="78" y1="31" x2="78" y2="35" stroke={deg === 90 && watchWound ? '#8E2D20' : '#6E563B'} strokeWidth={deg === 90 && watchWound ? '2.2' : '1.3'} transform={`rotate(${deg} 78 74)`} />
              ))}
              <text x="78" y="46" textAnchor="middle" fontSize="9.5" fill="#4B3926" fontFamily="serif">Ⅻ</text>
              <text x="110" y="77" textAnchor="middle" fontSize="9.5" fill="#8E2D20" fontWeight="bold" fontFamily="serif">Ⅲ</text>
              <text x="78" y="110" textAnchor="middle" fontSize="9.5" fill="#4B3926" fontFamily="serif">Ⅵ</text>
              <text x="46" y="77" textAnchor="middle" fontSize="9.5" fill="#4B3926" fontFamily="serif">Ⅸ</text>

              {watchWound && (
                <path d="M78 74 L78 32 A42 42 0 0 1 120 74 Z" fill="#8E2D20" opacity="0.1" />
              )}

              <line x1="78" y1="74" x2="78" y2="50" stroke="#2D231A" strokeWidth="3.4" strokeLinecap="round" transform={`rotate(${hourDeg} 78 74)`} />
              <line x1="78" y1="74" x2="78" y2="39" stroke="#8E2D20" strokeWidth="2" strokeLinecap="round" transform={`rotate(${minDeg} 78 74)`} />
              <circle cx="78" cy="74" r="3.6" fill="#9B7538" stroke="#3D2A15" strokeWidth="1" />
            </svg>
          )}

          <div className="mt-1.5 flex items-center gap-2">
            <button
              type="button"
              onClick={advanceHour}
              className="px-3 py-1 rounded-[2px] border border-[#A58143] bg-[#F4E6C5] hover:bg-[#EAD6A8] text-xs font-serif-body text-[#2F2318] whitespace-nowrap shrink-0"
            >
              拨时针 (+1时)
            </button>
            <button
              type="button"
              onClick={advanceMinute}
              className="px-3 py-1 rounded-[2px] border border-[#A58143] bg-[#F4E6C5] hover:bg-[#EAD6A8] text-xs font-serif-body text-[#2F2318] whitespace-nowrap shrink-0"
            >
              拨分针 (+5分)
            </button>
          </div>
        </div>

        {feedback && (
          <p className="mt-2 text-[11px] font-serif-body text-[#7B3325] text-center leading-snug">{feedback}</p>
        )}
      </div>
    );
  }

  if (season === 'summer' && pageNumber === 4) {
    const { weightAttached, curtainPulls, pedestalCode } = puzzleState.summer;
    const allPreSolved = Boolean(
      puzzleState.discoveredClues[1] && puzzleState.discoveredClues[2] && puzzleState.discoveredClues[3]
    );

    const attachWeight = (fromDrop = false) => {
      if (isSolved || weightAttached) return;
      if (!fromDrop && selectedSatchel !== 'stage-weight') {
        libraryAudio.playGentleNudge();
        setFeedback('幕绳过轻拉不开绒幕——请先从手提袋选取第 3 页的「黄铜幕坠」。');
        return;
      }
      libraryAudio.playBrassClick();
      onUpdateState((prev) => {
        const next = consumeSatchelItem(prev, 'stage-weight');
        return {
          ...next,
          summer: { ...next.summer, weightAttached: true },
        };
      });
      setFeedback('黄铜幕坠已挂妥！拉动右侧幕绳两次即可掀开绒幕。');
    };

    const pullCurtain = () => {
      if (isSolved || curtainPulls >= 2) return;
      if (!weightAttached) {
        attachWeight(false);
        return;
      }
      libraryAudio.playWoodSlide();
      const nextPull = curtainPulls + 1;
      onUpdateState((prev) => ({
        ...prev,
        summer: { ...prev.summer, curtainPulls: nextPull },
      }));
      setFeedback(nextPull >= 2 ? '绒帘全开！核对前三页线索拨正舞台共鸣锁。' : '绒帘微启，再拉一次幕绳。');
    };

    const cycleSlot = (slotIdx: 0 | 1 | 2) => {
      if (isSolved) return;
      if (curtainPulls < 2) {
        libraryAudio.playGentleNudge();
        setFeedback('先挂上配重拉开绒幕，再拨动台座共鸣锁。');
        return;
      }
      libraryAudio.playBrassClick();
      const opts = slotIdx === 2 ? SUMMER_PEDESTAL_CLOCK_OPTIONS : SUMMER_PEDESTAL_NOTE_OPTIONS;
      const curIdx = opts.indexOf(pedestalCode[slotIdx] as never);
      const nextVal = opts[(curIdx + 1) % opts.length];
      const nextCode: [string, string, string] = [...pedestalCode] as [string, string, string];
      nextCode[slotIdx] = nextVal;

      onUpdateState((prev) => ({
        ...prev,
        summer: { ...prev.summer, pedestalCode: nextCode },
      }));

      if (nextCode[0] === 'E' && nextCode[1] === 'G' && nextCode[2] === 'Ⅲ') {
        if (!allPreSolved) {
          libraryAudio.playGentleNudge();
          setFeedback('台座似乎有所松动，但前几章尚有乐声或怀表未解封。');
          return;
        }
        triggerSolved('舞台共鸣锁齐声弹开！空座暗格浮出剧院空票，请举镜显影。');
      }
    };

    const gapOffset = curtainPulls === 0 ? 0 : curtainPulls === 1 ? 34 : 74;

    return (
      <div className="w-full max-w-[330px] py-1 text-[#241B14]">
        <div className="flex items-center justify-between text-[11px] font-serif-body text-[#6E563B] pb-1.5 border-b border-[#D2BA8F]">
          <span>剧院总锁</span>
          <span className="tabular-nums">{curtainPulls}/2</span>
        </div>

        <div className="mt-2">
          <ConvergenceHeader
            discoveredClues={puzzleState.discoveredClues}
            expectedLabels={['首音', '尾音', '刻钟']}
          />
        </div>

        <div className="rounded-[4px] border border-[#8D6B3C] bg-[#2D1A18] p-1.5">
          <svg viewBox="0 0 260 124" className="w-full h-28 select-none" aria-label="剧院绒幕机关">
            <rect x="10" y="8" width="240" height="108" rx="3" fill="#1D1214" stroke="#C89F55" strokeWidth="1.5" />
            <polygon points="130,8 66,116 194,116" fill="#FBE5A2" opacity={curtainPulls >= 2 ? 0.25 : 0.08} />
            <rect x="82" y="66" width="96" height="36" rx="3" fill="#471D1A" stroke="#C89F55" strokeWidth="1.2" />
            <text x="130" y="88" textAnchor="middle" fontSize="9.5" fill="#F6E2B3">ROW 01</text>

            <g transform={`translate(${-gapOffset}, 0)`} className="transition-transform duration-300">
              <rect x="10" y="10" width="122" height="106" fill="#7D231B" stroke="#45100C" strokeWidth="1.2" />
              <line x1="130" y1="12" x2="130" y2="114" stroke="#D9B15E" strokeWidth="2.5" />
            </g>
            <g transform={`translate(${gapOffset}, 0)`} className="transition-transform duration-300">
              <rect x="128" y="10" width="122" height="106" fill="#7D231B" stroke="#45100C" strokeWidth="1.2" />
              <line x1="129" y1="12" x2="129" y2="114" stroke="#D9B15E" strokeWidth="2.5" />
            </g>
            <path d="M10 8 H250 V22 Q220 30 190 20 Q160 30 130 20 Q100 30 70 20 Q40 30 10 22 Z" fill="#6A1B15" stroke="#D9B15E" strokeWidth="1.5" />

            <g
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.getData('text/plain') === 'stage-weight') attachWeight(true);
              }}
              onClick={pullCurtain}
              className="cursor-pointer"
              transform={`translate(0, ${curtainPulls * 10})`}
            >
              <line x1="232" y1="14" x2="232" y2="74" stroke="#E5C175" strokeWidth="3" />
              {weightAttached ? (
                <polygon points="224,74 240,74 243,94 221,94" fill="#D5A64A" stroke="#5A3F13" strokeWidth="1.2" />
              ) : (
                <circle cx="232" cy="76" r="6" fill="none" stroke="#E5C175" strokeWidth="2" strokeDasharray="2 2" />
              )}
              <rect x="176" y="48" width="46" height="16" rx="2" fill="#FAF0D6" stroke="#9E783B" strokeWidth="1" />
              <text x="199" y="59" textAnchor="middle" fontSize="8" fill="#5A3219" fontWeight="bold">
                {weightAttached ? '拉动幕绳' : '挂配重坠'}
              </text>
            </g>
          </svg>
        </div>

        <div className="mt-2 grid grid-cols-3 gap-2 rounded-[4px] border border-[#9E783B] bg-[#EFE0BC] p-2">
          {(['首音', '尾音', '刻钟'] as const).map((label, idx) => (
            <button
              key={label}
              type="button"
              onClick={() => cycleSlot(idx as 0 | 1 | 2)}
              className="flex flex-col items-center rounded-[3px] border border-[#A58143] bg-[#FCF7E8] py-1.5 hover:bg-[#F4E6C5] transition-colors"
            >
              <span className="text-[10px] font-serif-body text-[#6E563B]">{label}</span>
              <span className="font-display text-base font-bold text-[#2C2015]">{pedestalCode[idx]}</span>
            </button>
          ))}
        </div>

        {feedback && (
          <p className="mt-2 text-[11px] font-serif-body text-[#7B3325] text-center leading-snug">{feedback}</p>
        )}
      </div>
    );
  }

  /* =========================================================================
   * SEASON 3: AUTUMN (Backtracking: P1 Phase A -> P2 -> P1 Phase B -> P3 -> P4)
   * ========================================================================= */
  if (season === 'autumn' && pageNumber === 1) {
    const { stampPeeled, knotsCut, cutSequence } = puzzleState.autumn;
    const expectedCutOrder = [0, 2, 1] as const; // Top(Ⅰ) -> Bottom(Ⅱ) -> Middle(Ⅲ)

    const peelStamp = () => {
      if (stampPeeled) return;
      libraryAudio.playPageTurn();
      onUpdateState((prev) => {
        const next = addSatchelItem(prev, 'matches');
        return {
          ...next,
          autumn: { ...next.autumn, stampPeeled: true },
        };
      });
      setFeedback('揭开松动邮票，藏在背胶后的「干松枝火柴」已收入工具匣；细察上方三枚邮票的红绳暗记。');
    };

    const cutKnot = (idx: 0 | 1 | 2, fromDrop = false) => {
      if (isSolved || knotsCut[idx]) return;
      if (!fromDrop && selectedSatchel !== 'letter-opener') {
        libraryAudio.playGentleNudge();
        setFeedback(
          hasItem('letter-opener')
            ? '请先在右侧工具匣点选「铜柄裁刀」。'
            : '红绳死结紧勒信袋，须先寻利器——不妨先揭开松动的角落邮票，再去他页熔蜡寻刀。'
        );
        return;
      }

      const stepPos = cutSequence.length;
      if (expectedCutOrder[stepPos] !== idx) {
        libraryAudio.playGentleNudge();
        onUpdateState((prev) => ({
          ...prev,
          autumn: { ...prev.autumn, knotsCut: [false, false, false], cutSequence: [] },
        }));
        setFeedback('裁断次序不对，红绳又重新绷紧！对照信封顶端三枚邮票画出的绳位。');
        return;
      }

      libraryAudio.playBrassClick();
      const nextKnots: [boolean, boolean, boolean] = [...knotsCut] as [boolean, boolean, boolean];
      nextKnots[idx] = true;
      const nextSeq = [...cutSequence, idx];
      const allCut = nextSeq.length === 3;

      onUpdateState((prev) => {
        let updated: BookPuzzleSessionState = {
          ...prev,
          autumn: { ...prev.autumn, knotsCut: nextKnots, cutSequence: nextSeq },
        };
        if (allCut) {
          updated = consumeSatchelItem(updated, 'letter-opener');
          updated = {
            ...updated,
            discoveredClues: {
              ...updated.discoveredClues,
              1: { label: '字母与首印', symbol: 'H·E / 茶盏' },
            },
          };
        }
        return updated;
      });

      if (allCut) {
        triggerSolved('三结依序裁断！信口缓缓张开，纸角透出淡紫墨迹与茶盏印纹。');
      } else {
        setFeedback(`依序划断第 ${nextSeq.length}/3 道红绳。`);
      }
    };

    const knotY = [46, 78, 110] as const;
    const stampBadges = [
      { x: 44, roman: 'Ⅰ', activeRow: 0 },
      { x: 96, roman: 'Ⅲ', activeRow: 1 },
      { x: 148, roman: 'Ⅱ', activeRow: 2 },
    ];

    return (
      <div className="w-full max-w-[330px] py-1 text-[#241B14]">
        <div className="flex items-center justify-between text-[11px] font-serif-body text-[#6E563B] pb-1.5 border-b border-[#D2BA8F]">
          <span>红绳信袋</span>
          <span className="tabular-nums">{cutSequence.length}/3</span>
        </div>

        <div className="mt-2.5 rounded-[4px] border border-[#B09260] bg-[#EFE0BC] p-2">
          <svg viewBox="0 0 250 144" className="w-full h-32 select-none" aria-label="红绳封信机关">
            <rect x="28" y="16" width="194" height="114" rx="4" fill="#E8D2A2" stroke="#7A5B32" strokeWidth="1.8" />
            <path d="M28 18 L125 78 L222 18" fill="none" stroke="#9B7A4B" strokeWidth="1.4" />

            {/* Opened inner letter revealing H · E + subtle teacup outline */}
            {cutSequence.length === 3 && (
              <g>
                <rect x="58" y="42" width="134" height="74" rx="2" fill="#FCF7E8" stroke="#8C6A3B" strokeWidth="1.2" />
                <text x="106" y="76" textAnchor="middle" fontSize="16" fill="#6F4B7E" fontWeight="bold" fontFamily="serif">
                  H · E
                </text>
                <path d="M148 64 H168 C168 74, 163 78, 158 78 C153 78, 148 74, 148 64 Z" fill="#EFE4CC" stroke="#8C6A3B" strokeWidth="1.1" />
                <path d="M168 66 C173 66, 173 72, 167 72" fill="none" stroke="#8C6A3B" strokeWidth="1.1" />
                <line x1="74" y1="94" x2="176" y2="94" stroke="#CBB898" strokeWidth="1" strokeDasharray="3 2" />
              </g>
            )}

            {/* 3 Postage Stamps showing knot order visually (no text spoiler) */}
            {stampBadges.map((s) => (
              <g key={s.roman}>
                <rect x={s.x} y="19" width="38" height="20" rx="1" fill="#FBF4E0" stroke="#8C6A3B" strokeWidth="1" strokeDasharray="2 1" />
                {[0, 1, 2].map((row) => (
                  <line
                    key={row}
                    x1={s.x + 4}
                    y1={24 + row * 4.5}
                    x2={s.x + 20}
                    y2={24 + row * 4.5}
                    stroke={row === s.activeRow ? '#8E2D20' : '#C8B490'}
                    strokeWidth={row === s.activeRow ? '2' : '1'}
                  />
                ))}
                <text x={s.x + 29} y="32" textAnchor="middle" fontSize="8.5" fill="#6E2318" fontWeight="bold">
                  {s.roman}
                </text>
              </g>
            ))}

            {/* Top-right peelable corner stamp holding matches */}
            <g onClick={peelStamp} className="cursor-pointer">
              <rect
                x="188"
                y="18"
                width="30"
                height="22"
                rx="2"
                fill={stampPeeled ? '#DFC79A' : '#A6483B'}
                stroke="#4D1C14"
                strokeWidth="1.2"
              />
              <text x="203" y="32" textAnchor="middle" fontSize="8" fill={stampPeeled ? '#5D4733' : '#FFF4DC'} fontWeight="bold">
                {stampPeeled ? '已揭' : '揭邮票'}
              </text>
            </g>

            {([0, 1, 2] as const).map((idx) => {
              const y = knotY[idx];
              const isCut = knotsCut[idx];
              return (
                <g
                  key={idx}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.getData('text/plain') === 'letter-opener') cutKnot(idx, true);
                  }}
                  onClick={() => cutKnot(idx, false)}
                  className="cursor-pointer"
                >
                  {!isCut ? (
                    <>
                      <line x1="26" y1={y} x2="224" y2={y} stroke="#922D21" strokeWidth="3.2" />
                      <circle cx="125" cy={y} r="8" fill="#A63628" stroke="#4D140D" strokeWidth="1.4" />
                      <path d={`M120 ${y - 3} L130 ${y + 3} M120 ${y + 3} L130 ${y - 3}`} stroke="#F8E2C8" strokeWidth="1.3" />
                    </>
                  ) : (
                    <>
                      <line x1="26" y1={y} x2="96" y2={y + 4} stroke="#922D21" strokeWidth="2.2" opacity="0.4" />
                      <line x1="154" y1={y + 4} x2="224" y2={y} stroke="#922D21" strokeWidth="2.2" opacity="0.4" />
                    </>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {feedback && (
          <p className="mt-2 text-[11px] font-serif-body text-[#7B3325] text-center leading-snug">{feedback}</p>
        )}
      </div>
    );
  }

  if (season === 'autumn' && pageNumber === 2) {
    const { candleLit, waxMeltSteps } = puzzleState.autumn;

    const lightCandle = (fromDrop = false) => {
      if (isSolved || candleLit) return;
      if (!fromDrop && selectedSatchel !== 'matches') {
        libraryAudio.playGentleNudge();
        setFeedback(
          hasItem('matches')
            ? '请先在手提袋点选第 1 页拾得的「干松枝火柴」点亮小铜烛。'
            : '手边没有火源——先去第 1 页揭开信封右上角的松动邮票吧！'
        );
        return;
      }
      libraryAudio.playBrassClick();
      onUpdateState((prev) => {
        const next = consumeSatchelItem(prev, 'matches');
        return {
          ...next,
          autumn: { ...next.autumn, candleLit: true },
        };
      });
      setFeedback('小铜烛已点亮！点击封蜡三次融去灰冷石壳。');
    };

    const warmWaxSeal = () => {
      if (isSolved || waxMeltSteps >= 3) return;
      if (!candleLit) {
        lightCandle(false);
        return;
      }
      const next = waxMeltSteps + 1;
      onUpdateState((prev) => {
        let updated: BookPuzzleSessionState = {
          ...prev,
          autumn: { ...prev.autumn, waxMeltSteps: next },
        };
        if (next >= 3) {
          updated = addSatchelItem(updated, 'letter-opener');
          updated = {
            ...updated,
            discoveredClues: {
              ...updated.discoveredClues,
              2: { label: '字母与炉印', symbol: 'O·M / 炉火' },
            },
          };
        }
        return updated;
      });

      if (next >= 3) {
        libraryAudio.playWaxSealStamp();
        triggerSolved('灰冷石壳融尽，封蜡显出西洋字母与一道炉火纹，一柄「铜柄裁刀」落入工具匣。');
      } else {
        libraryAudio.playWaterDrop(true);
        setFeedback(`烛火烘融石壳（${next}/3），继续轻烤封蜡。`);
      }
    };

    return (
      <div className="w-full max-w-[330px] py-1 text-[#241B14]">
        <div className="flex items-center justify-between text-[11px] font-serif-body text-[#6E563B] pb-1.5 border-b border-[#D2BA8F]">
          <span>石化蜡封</span>
          <span className="tabular-nums">{waxMeltSteps}/3</span>
        </div>

        <div
          onClick={warmWaxSeal}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') warmWaxSeal();
          }}
          className="mt-2.5 rounded-[4px] border border-[#B59763] bg-[#EFE0BC] p-2 flex flex-col items-center cursor-pointer hover:bg-[#E9D6AC] transition-colors"
        >
          <svg viewBox="0 0 180 112" className="w-44 h-28" aria-hidden="true">
            <circle cx="90" cy="56" r="40" fill="#9E3124" stroke="#52140C" strokeWidth="2" />
            <circle cx="90" cy="56" r="28" fill="#B64232" stroke="#6B1E14" strokeWidth="1.4" />
            <text x="90" y="55" textAnchor="middle" fontSize="13" fill="#F8E7CF" fontWeight="bold">O · M</text>
            {/* Hearth flame motif engraved below O·M */}
            <path d="M90 77 C85 71, 87 65, 90 62 C93 65, 95 71, 90 77 Z" fill="#F4C776" />

            {waxMeltSteps < 3 && (
              <polygon
                points="52,42 90,18 128,42 114,70 64,66"
                fill="#8C867F"
                stroke="#4D4842"
                strokeWidth="1.6"
                opacity={waxMeltSteps === 0 ? 0.96 : waxMeltSteps === 1 ? 0.72 : 0.35}
              />
            )}
            {waxMeltSteps < 2 && (
              <polygon
                points="54,66 124,60 128,86 86,96 52,84"
                fill="#7D7770"
                stroke="#4D4842"
                strokeWidth="1.6"
                opacity={waxMeltSteps === 0 ? 0.96 : 0.55}
              />
            )}
            {candleLit && waxMeltSteps < 3 && (
              <circle cx="90" cy="56" r="44" fill="none" stroke="#F2B857" strokeWidth="1.6" strokeDasharray="4 3" opacity="0.75" />
            )}
          </svg>
        </div>

        <button
          type="button"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.getData('text/plain') === 'matches') lightCandle(true);
          }}
          onClick={() => (!candleLit ? lightCandle(false) : warmWaxSeal())}
          className={`mt-2.5 w-full flex items-center justify-center gap-2 py-1.5 px-3 rounded-[3px] border text-xs font-serif-body transition-colors whitespace-nowrap shrink-0 ${
            candleLit ? 'bg-[#8E3524] text-[#FAF3E2] border-[#DFB96E]' : 'bg-[#F3E7C9] text-[#322419] border-[#B89862] hover:bg-[#EAD8B0]'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>{candleLit ? '小铜烛已亮 · 点封蜡烘融' : '用「干松枝火柴」点亮小铜烛'}</span>
        </button>

        {feedback && (
          <p className="mt-2 text-[11px] font-serif-body text-[#7B3325] text-center leading-snug">{feedback}</p>
        )}
      </div>
    );
  }

  if (season === 'autumn' && pageNumber === 3) {
    const { cryptexIndices } = puzzleState.autumn;
    const p1Done = Boolean(puzzleState.discoveredClues[1]);
    const p2Done = Boolean(puzzleState.discoveredClues[2]);

    const cycleWheel = (idx: 0 | 1 | 2 | 3) => {
      if (isSolved) return;
      libraryAudio.playBrassClick();
      const next: [number, number, number, number] = [...cryptexIndices] as [number, number, number, number];
      next[idx] = (next[idx] + 1) % WHEEL_OPTIONS[idx].length;
      const word = next.map((val, i) => WHEEL_OPTIONS[i][val]).join('');

      onUpdateState((prev) => {
        let updated: BookPuzzleSessionState = {
          ...prev,
          autumn: { ...prev.autumn, cryptexIndices: next },
        };
        if (word === 'HOME' && p1Done && p2Done) {
          updated = addSatchelItem(updated, 'velvet-cloth');
          updated = {
            ...updated,
            discoveredClues: {
              ...updated.discoveredClues,
              3: { label: '门廊印', symbol: 'HOME / 门廊' },
            },
          };
        }
        return updated;
      });

      if (word === 'HOME') {
        if (!p1Done || !p2Done) {
          libraryAudio.playGentleNudge();
          setFeedback('活字虽已对齐，但前两章封信与蜡印尚未启开，笔匣暗扣未松。');
          return;
        }
        triggerSolved('四联活字咔哒咬合！笔匣弹出「柔软绒布」，暗格还映出一道门廊刻纹。');
      } else {
        setFeedback(`当前活字：${word}，回看第 1、2 章信件与蜡底拼合归家四字。`);
      }
    };

    return (
      <div className="w-full max-w-[330px] py-1 text-[#241B14]">
        <div className="flex items-center justify-between text-[11px] font-serif-body text-[#6E563B] pb-1.5 border-b border-[#D2BA8F]">
          <span>活字笔匣</span>
        </div>

        <div className="mt-2.5 rounded-[6px] border-2 border-[#5D411F] bg-gradient-to-b from-[#8C6432] via-[#C6994E] to-[#745125] p-2.5 shadow-inner">
          <div className="grid grid-cols-4 gap-2">
            {([0, 1, 2, 3] as const).map((idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => cycleWheel(idx)}
                className="flex flex-col items-center justify-between rounded-[3px] border border-[#4D3415] bg-gradient-to-b from-[#C79C50] via-[#FAF0D4] to-[#B78B40] py-2 hover:brightness-105 transition-all shadow-sm"
              >
                <span className="text-[9px] text-[#5C3D18]">▲</span>
                <span className="my-1 px-2 py-0.5 rounded-[2px] border border-[#A58143] bg-[#FCF7E8] font-display text-lg font-bold text-[#2C2015] shadow-inner">
                  {WHEEL_OPTIONS[idx][cryptexIndices[idx]]}
                </span>
                <span className="text-[9px] text-[#5C3D18]">▼</span>
              </button>
            ))}
          </div>
        </div>

        {feedback && (
          <p className="mt-2 text-[11px] font-serif-body text-[#7B3325] text-center leading-snug">{feedback}</p>
        )}
      </div>
    );
  }

  if (season === 'autumn' && pageNumber === 4) {
    const { frameRepaired, sootCleared, selectedCrests } = puzzleState.autumn;
    const allSootWiped = sootCleared.every(Boolean);
    const allPreSolved = Boolean(
      puzzleState.discoveredClues[1] && puzzleState.discoveredClues[2] && puzzleState.discoveredClues[3]
    );
    const isDraggingShard = draggingItemId === 'painting-shard';

    const repairFrame = (fromDrop = false) => {
      if (isSolved || frameRepaired) return;
      if (!fromDrop && selectedSatchel !== 'painting-shard') {
        libraryAudio.playGentleNudge();
        setFeedback(
          hasItem('painting-shard')
            ? '请将工具匣中的「残画嵌片」手动拖入肖像右上角的缺口暗格。'
            : '肖像右上角缺失一角——先拼合左页「残缺拼画机关」取出「残画嵌片」，再手动拖入此处。'
        );
        return;
      }
      libraryAudio.playBrassClick();
      onClearDragItem?.();
      onUpdateState((prev) => {
        const withItem = addSatchelItem(prev, 'painting-shard');
        const consumed = consumeSatchelItem(withItem, 'painting-shard');
        return {
          ...consumed,
          autumn: {
            ...consumed.autumn,
            leftRelicCollected: true,
            frameRepaired: true,
          },
        };
      });
      setFeedback('「残画嵌片」已嵌合画框右上暗格！再用「柔软绒布」拂去肖像炭灰。');
    };

    const wipePatch = (idx: 0 | 1 | 2, fromDrop = false) => {
      if (isSolved || sootCleared[idx]) return;
      if (!fromDrop && selectedSatchel !== 'velvet-cloth') {
        libraryAudio.playGentleNudge();
        setFeedback('请先从手提袋选取或拖入第 3 页所得「柔软绒布」拂散炭灰。');
        return;
      }
      libraryAudio.playPageTurn();
      onClearDragItem?.();
      const next: [boolean, boolean, boolean] = [...sootCleared] as [boolean, boolean, boolean];
      next[idx] = true;
      const wipedAll = next.every(Boolean);

      onUpdateState((prev) => {
        const updated = wipedAll ? consumeSatchelItem(prev, 'velvet-cloth') : prev;
        return {
          ...updated,
          autumn: { ...updated.autumn, sootCleared: next },
        };
      });

      if (wipedAll) {
        setFeedback(
          frameRepaired
            ? '炭灰拭净！请再依据前三页三印，在下方选中最温暖的三枚印记。'
            : '炭灰已拭净，还须将左页所得「残画嵌片」拖入画框缺角暗格。'
        );
      }
    };

    const toggleCrest = (id: string) => {
      if (isSolved) return;
      if (!frameRepaired) {
        libraryAudio.playGentleNudge();
        setFeedback('画框右上角仍有缺口暗格未补全——请先将左页「残画嵌片」手动拖入嵌合。');
        return;
      }
      if (!allSootWiped) {
        libraryAudio.playGentleNudge();
        setFeedback('先用「柔软绒布」擦净肖像炭灰。');
        return;
      }
      if (id === 'ledger' || id === 'chain') {
        libraryAudio.playGentleNudge();
        setFeedback('这枚印记重得像冷石，并非前三页留下的温暖记忆。');
        return;
      }
      libraryAudio.playBrassClick();
      const next = selectedCrests.includes(id)
        ? selectedCrests.filter((c) => c !== id)
        : [...selectedCrests, id];

      onUpdateState((prev) => ({
        ...prev,
        autumn: { ...prev.autumn, selectedCrests: next },
      }));

      if (next.length === 3 && next.includes('tea') && next.includes('hearth') && next.includes('home')) {
        if (!allPreSolved) {
          libraryAudio.playGentleNudge();
          setFeedback('须先集齐前三页印记线索，肖像锁才会彻底开启！');
          return;
        }
        triggerSolved('三枚温暖记忆印记齐亮！请举起黄铜放大镜查看肖像碎片。');
      }
    };

    const sootZones = [
      { idx: 0 as const, cx: 74, cy: 44, rx: 30, ry: 20 },
      { idx: 1 as const, cx: 120, cy: 58, rx: 32, ry: 22 },
      { idx: 2 as const, cx: 162, cy: 84, rx: 30, ry: 20 },
    ];

    return (
      <div className="w-full max-w-[330px] py-1 text-[#241B14]">
        <div className="flex items-center justify-between text-[11px] font-serif-body text-[#6E563B] pb-1.5 border-b border-[#D2BA8F]">
          <span>旧肖像记忆盘</span>
          {frameRepaired && <span className="tabular-nums">{sootCleared.filter(Boolean).length}/3</span>}
        </div>

        <div className="mt-2">
          <ConvergenceHeader
            discoveredClues={puzzleState.discoveredClues}
            expectedLabels={['一印', '二印', '三印']}
          />
        </div>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.getData('text/plain') === 'painting-shard' || draggingItemId === 'painting-shard') {
              repairFrame(true);
            }
          }}
          onClick={() => repairFrame(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') repairFrame(false);
          }}
          className={`mb-2 rounded-[3px] border px-2.5 py-1.5 flex items-center justify-between gap-2 text-[11px] font-serif-body transition-all cursor-pointer ${
            frameRepaired
              ? 'border-[#5D8755] text-[#2B4B27]'
              : isDraggingShard
                ? 'border-2 border-dashed border-[#8E2D20] bg-[#FCECC8] ring-2 ring-[#E5C175] text-[#5D2419]'
                : 'border-dashed border-[#9E783B] text-[#5C4428] hover:bg-[#EFE0BC]/40'
          }`}
        >
          <span>
            {frameRepaired
              ? '右上画框暗格：已嵌合「残画嵌片」'
              : '画框缺角暗格：拖入左页「残画嵌片」'}
          </span>
          {frameRepaired && <Check className="w-3.5 h-3.5 text-[#4B7544] shrink-0" />}
        </div>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const item = e.dataTransfer.getData('text/plain');
            if (item === 'painting-shard' || draggingItemId === 'painting-shard') {
              repairFrame(true);
            }
          }}
          className="rounded-[4px] border border-[#A58451] bg-[#EFE0BC] p-1.5"
        >
          <svg viewBox="0 0 230 112" className="w-full h-24 select-none" aria-label="蒙尘旧肖像机关">
            <rect x="20" y="6" width="190" height="100" rx="4" fill="#FAF2DD" stroke="#9B7538" strokeWidth="2" />
            <ellipse cx="115" cy="56" rx="64" ry="42" fill="#EFE2C4" stroke="#B89456" strokeWidth="1.5" />
            <circle cx="115" cy="44" r="15" fill="#D5BE9A" stroke="#5D4733" strokeWidth="1.6" />
            <path d="M100 42 Q115 33 130 42" fill="#8C735B" />
            <path d="M88 94 Q92 64 115 64 Q138 64 142 94 Z" fill="#6F5947" stroke="#473628" strokeWidth="1.5" />
            {/* Top-Right Frame Corner Notch */}
            <g onClick={() => repairFrame(false)} className="cursor-pointer">
              {frameRepaired ? (
                <polygon points="178,8 208,8 208,34 186,34" fill="#E8C77B" stroke="#7A5A2B" strokeWidth="1.4" />
              ) : (
                <polygon points="178,8 208,8 208,34 186,34" fill="#3B2415" stroke="#8E2D20" strokeWidth="1.4" strokeDasharray="3 2" />
              )}
            </g>
            {sootZones.map(({ idx, cx, cy, rx, ry }) =>
              !sootCleared[idx] ? (
                <g
                  key={idx}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (e.dataTransfer.getData('text/plain') === 'velvet-cloth' || draggingItemId === 'velvet-cloth') {
                      wipePatch(idx, true);
                    }
                  }}
                  onClick={() => wipePatch(idx, false)}
                  className="cursor-pointer"
                >
                  <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#463F3B" opacity="0.92" />
                  <ellipse cx={cx - 8} cy={cy - 5} rx={rx * 0.68} ry={ry * 0.65} fill="#5C534E" opacity="0.88" />
                </g>
              ) : null
            )}
          </svg>
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-1.5">
          {AUTUMN_CREST_OPTIONS.map((crest) => {
            const active = selectedCrests.includes(crest.id);
            return (
              <button
                key={crest.id}
                type="button"
                onClick={() => toggleCrest(crest.id)}
                className={`px-2.5 py-1 rounded-[2px] border text-[11px] font-serif-body transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[#6F3329] text-[#FAF3E2] border-[#C89F55]'
                    : 'bg-[#F3E7C9] text-[#322419] border-[#B89862] hover:bg-[#EAD8B0]'
                }`}
              >
                {crest.label}
              </button>
            );
          })}
        </div>

        {feedback && (
          <p className="mt-2 text-[11px] font-serif-body text-[#7B3325] text-center leading-snug">{feedback}</p>
        )}
      </div>
    );
  }

  /* =========================================================================
   * SEASON 4: WINTER (Backtracking + Satchel Crafting)
   * ========================================================================= */
  if (season === 'winter' && pageNumber === 1) {
    const { pinInserted, warmerPicked, leftShaftGear, rightShaftGear, leverPulled } = puzzleState.winter;
    const isDraggingPin = draggingItemId === 'clock-pin';

    const insertClockPin = (fromDrop = false) => {
      if (isSolved || pinInserted) return;
      if (!fromDrop && selectedSatchel !== 'clock-pin') {
        libraryAudio.playGentleNudge();
        setFeedback(
          hasItem('clock-pin')
            ? '请将工具匣中的「钟楼铜锁栓」手动拖入右侧发条栓孔。'
            : '发条杆底座缺少固定铜栓——先拨动左页钟楼齿轮机构，取出「钟楼铜锁栓」再手动拖入此处。'
        );
        return;
      }
      libraryAudio.playBrassClick();
      onClearDragItem?.();
      onUpdateState((prev) => {
        const withItem = addSatchelItem(prev, 'clock-pin');
        const consumed = consumeSatchelItem(withItem, 'clock-pin');
        return {
          ...consumed,
          winter: {
            ...consumed.winter,
            leftRelicCollected: true,
            pinInserted: true,
          },
        };
      });
      setFeedback('「钟楼铜锁栓」已落入发条栓孔！集齐左右齿轮即可扳动发条杆。');
    };

    const pickEmptyWarmer = () => {
      if (warmerPicked) return;
      libraryAudio.playBrassClick();
      onUpdateState((prev) => {
        const next = addSatchelItem(prev, 'empty-warmer');
        return {
          ...next,
          winter: { ...next.winter, warmerPicked: true },
        };
      });
      setFeedback('已将匣底「空铜手炉壳」收进手提袋——若寻得火炭可试着合成生暖！');
    };

    const placeGearOnShaft = (shaft: 'left' | 'right', gear: 'cold' | 'future') => {
      if (isSolved) return;
      onClearDragItem?.();
      if (shaft === 'left' && gear === 'cold') {
        libraryAudio.playClockTick(false);
        onUpdateState((prev) => ({
          ...prev,
          winter: { ...prev.winter, leftShaftGear: 'cold' },
        }));
        setLocalTool(null);
        setFeedback('「冷钢大齿」已套入左轴。右轴那枚暖铜齿轮或许封在他页寒冰里。');
      } else if (shaft === 'right' && gear === 'future') {
        libraryAudio.playBrassClick();
        onUpdateState((prev) => {
          const next = consumeSatchelItem(prev, 'future-gear');
          return {
            ...next,
            winter: { ...next.winter, rightShaftGear: 'future' },
          };
        });
        setFeedback('「未来之齿」已嵌入右轴！确认铜栓插牢后可拉动右侧发条杆。');
      } else {
        libraryAudio.playClockTick(true);
        setFeedback('齿距不合——细察两枚齿轮各自的齿数与轴孔尺寸。');
      }
    };

    const pullLever = () => {
      if (isSolved || leverPulled) return;
      if (!pinInserted) {
        libraryAudio.playClockTick(true);
        setFeedback('发条杆底座空转无力——先将左页齿轮机关所得「钟楼铜锁栓」手动拖入发条栓孔。');
        return;
      }
      if (leftShaftGear !== 'cold' || rightShaftGear !== 'future') {
        libraryAudio.playClockTick(true);
        setFeedback('尚缺右轴的「未来之齿」，先去第 2、3 页寻火融冰后再回来装配！');
        return;
      }
      libraryAudio.playClockTick(false);
      onUpdateState((prev) => ({
        ...prev,
        discoveredClues: {
          ...prev.discoveredClues,
          1: { label: '齿轮齿比', symbol: '齿比 10:8' },
        },
        winter: { ...prev.winter, leverPulled: true },
      }));
      triggerSolved('双齿咬合运转！细数左右两轮齿数，铭牌震落一枚「黄铜齿轮」。');
    };

    const renderGearSvg = (kind: 'cold' | 'future', spinning = false) => {
      const fill = kind === 'cold' ? '#B9CCD9' : '#E3B962';
      const stroke = kind === 'cold' ? '#495E70' : '#7C5A25';
      const toothAngles =
        kind === 'cold'
          ? [0, 36, 72, 108, 144, 180, 216, 252, 288, 324]
          : [0, 45, 90, 135, 180, 225, 270, 315];
      return (
        <svg viewBox="0 0 60 60" className={`w-12 h-12 ${spinning ? 'animate-gear-spin' : ''}`} aria-hidden="true">
          {toothAngles.map((deg) => (
            <rect
              key={deg}
              x={kind === 'cold' ? '27' : '26'}
              y="4"
              width={kind === 'cold' ? '6' : '8'}
              height="9"
              rx="1.5"
              fill={fill}
              stroke={stroke}
              strokeWidth="1.3"
              transform={`rotate(${deg} 30 30)`}
            />
          ))}
          <circle cx="30" cy="30" r={kind === 'cold' ? '20' : '18'} fill={fill} stroke={stroke} strokeWidth="2" />
          <circle cx="30" cy="30" r="6.5" fill="#FAF4E4" stroke={stroke} strokeWidth="1.6" />
        </svg>
      );
    };

    return (
      <div className="w-full max-w-[330px] py-1 text-[#241B14]">
        <div className="flex items-center justify-between text-[11px] font-serif-body text-[#6E563B] pb-1.5 border-b border-[#D2BA8F]">
          <span>钟楼机芯</span>
        </div>

        {/* Secret Pin Hole for Left-Page Clock Pin */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.getData('text/plain') === 'clock-pin' || draggingItemId === 'clock-pin') {
              insertClockPin(true);
            }
          }}
          onClick={() => insertClockPin(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') insertClockPin(false);
          }}
          className={`mt-2 rounded-[3px] border px-2.5 py-1.5 flex items-center justify-between gap-2 text-[11px] font-serif-body transition-all cursor-pointer ${
            pinInserted
              ? 'border-[#5D8755] text-[#2B4B27]'
              : isDraggingPin
                ? 'border-2 border-dashed border-[#8E2D20] bg-[#FCECC8] ring-2 ring-[#E5C175] text-[#5D2419]'
                : 'border-dashed border-[#6D859B] bg-[#E5EEF5] text-[#2F4659] hover:bg-[#DAE7F2]'
          }`}
        >
          <span>
            {pinInserted
              ? '发条栓孔暗格：已嵌入「钟楼铜锁栓」'
              : '发条栓孔暗格：拖入左页「钟楼铜锁栓」'}
          </span>
          {pinInserted && <Check className="w-3.5 h-3.5 text-[#4B7544] shrink-0" />}
        </div>

        <div className="mt-2 rounded-[4px] border border-[#5B6E7E] bg-[#364452] p-2.5 flex items-center justify-between gap-2">
          <button
            type="button"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const g = e.dataTransfer.getData('text/plain');
              if (g === 'cold' || g === 'future-gear' || draggingItemId === 'future-gear') {
                placeGearOnShaft('left', g === 'future-gear' || draggingItemId === 'future-gear' ? 'future' : 'cold');
              }
            }}
            onClick={() => {
              if (localTool === 'cold') {
                placeGearOnShaft('left', 'cold');
              } else if (selectedSatchel === 'future-gear') {
                placeGearOnShaft('left', 'future');
              } else {
                setFeedback('请先选择或拖动下方「冷钢大齿」装入左轴。');
              }
            }}
            className="flex-1 h-22 rounded-[4px] border border-dashed border-[#9DB3C6] bg-[#293540] flex flex-col items-center justify-center p-1 hover:bg-[#31404D] transition-colors"
          >
            {leftShaftGear === 'cold' ? (
              renderGearSvg('cold', leverPulled)
            ) : (
              <div className="w-8 h-8 rounded-full border-2 border-[#9DB3C6] bg-[#1E2730] flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C89F55]" />
              </div>
            )}
            <span className="mt-1 text-[10px] font-serif-body text-[#DCE8F2]">左轴</span>
          </button>

          <button
            type="button"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const g = e.dataTransfer.getData('text/plain');
              if (g === 'cold' || g === 'future-gear' || draggingItemId === 'future-gear') {
                placeGearOnShaft('right', g === 'future-gear' || draggingItemId === 'future-gear' ? 'future' : 'cold');
              }
            }}
            onClick={() => {
              if (selectedSatchel === 'future-gear') {
                placeGearOnShaft('right', 'future');
              } else if (localTool === 'cold') {
                placeGearOnShaft('right', 'cold');
              } else {
                setFeedback(
                  hasItem('future-gear')
                    ? '请在右侧工具匣点选或拖出刚融出的「未来之齿」再装入右轴。'
                    : '右轴尚空，缺齿轮或许封在后页寒冰中。'
                );
              }
            }}
            className="flex-1 h-22 rounded-[4px] border border-dashed border-[#C89F55] bg-[#293540] flex flex-col items-center justify-center p-1 hover:bg-[#31404D] transition-colors"
          >
            {rightShaftGear === 'future' ? (
              renderGearSvg('future', leverPulled)
            ) : (
              <div className="w-8 h-8 rounded-full border-2 border-[#C89F55] bg-[#1E2730] flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E3B962]" />
              </div>
            )}
            <span className="mt-1 text-[10px] font-serif-body text-[#F5DFAA]">右轴</span>
          </button>

          <button
            type="button"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.getData('text/plain') === 'clock-pin' || draggingItemId === 'clock-pin') {
                insertClockPin(true);
              }
            }}
            onClick={pullLever}
            className="h-22 px-2.5 rounded-[4px] border border-[#C89F55] bg-[#4E3722] hover:bg-[#62452B] flex flex-col items-center justify-center text-[#FAF0D6] transition-colors shrink-0"
          >
            <div className={`w-2 h-8 rounded-full bg-[#E5C175] border border-[#4D3413] transition-transform ${leverPulled ? 'rotate-45 translate-y-1' : '-rotate-12'}`} />
            <span className="mt-1 text-[10px] font-serif-body whitespace-nowrap">发条杆</span>
          </button>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-2">
          {leftShaftGear !== 'cold' ? (
            <button
              type="button"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', 'cold');
                setLocalTool('cold');
              }}
              onClick={() => {
                setLocalTool('cold');
                setFeedback('已拾起「冷钢大齿」，请装入左轴。');
              }}
              className={`flex items-center justify-center gap-1.5 py-1 px-2 rounded-[3px] border text-xs font-serif-body whitespace-nowrap shrink-0 ${
                localTool === 'cold' ? 'bg-[#465B6E] text-[#F5FAFF] border-[#9EC0DB]' : 'bg-[#E6EEF5] text-[#2B3D4E] border-[#8FA8BF]'
              }`}
            >
              <span>冷钢大齿</span>
            </button>
          ) : (
            <div className="flex items-center justify-center py-1 px-2 rounded-[3px] border border-[#8FA8BF]/50 bg-[#E6EEF5]/50 text-[11px] font-serif-body text-[#4D6478]">
              左轴已装妥
            </div>
          )}

          <button
            type="button"
            disabled={warmerPicked}
            onClick={pickEmptyWarmer}
            className={`flex items-center justify-center gap-1.5 py-1 px-2 rounded-[3px] border text-xs font-serif-body whitespace-nowrap shrink-0 ${
              warmerPicked
                ? 'bg-[#EAE0CC] text-[#7D6A52] border-[#C5B392] cursor-default'
                : 'bg-[#F8E9C2] text-[#4E3519] border-[#B8904B] hover:bg-[#F1DB9E]'
            }`}
          >
            <span>{warmerPicked ? '手炉壳已收袋' : '拾起「空铜手炉壳」'}</span>
          </button>
        </div>

        {feedback && (
          <p className="mt-2 text-[11px] font-serif-body text-[#7B3325] text-center leading-snug">{feedback}</p>
        )}
      </div>
    );
  }

  if (season === 'winter' && pageNumber === 2) {
    const { dialAngles } = puzzleState.winter;
    const rotateShard = (idx: 0 | 1 | 2) => {
      if (isSolved) return;
      libraryAudio.playBrassClick();
      const next: [number, number, number] = [...dialAngles] as [number, number, number];
      next[idx] = next[idx] + 90;
      const alignedAll = next.every((deg) => deg % 360 === 0);

      onUpdateState((prev) => {
        let updated: BookPuzzleSessionState = {
          ...prev,
          winter: { ...prev.winter, dialAngles: next },
        };
        if (alignedAll) {
          updated = addSatchelItem(updated, 'glowing-ember');
          updated = {
            ...updated,
            discoveredClues: {
              ...updated.discoveredClues,
              2: { label: '停钟刻度', symbol: '刻度 Ⅵ' },
            },
          };
        }
        return updated;
      });

      if (alignedAll) {
        triggerSolved('碎瓷严丝合缝合拢，钟背暗格露出「余温炭块」并映出一道停摆红痕。');
      } else {
        setFeedback('点击旋转三瓣碎瓷，顺裂纹将钟盘旋正。');
      }
    };

    const shards = [
      { idx: 0 as const, label: '上瓣', numeral: 'Ⅻ', path: 'M8,40 A32,32 0 0,1 72,40 L40,46 Z', tx: 40, ty: 24 },
      { idx: 1 as const, label: '右瓣', numeral: 'Ⅲ', path: 'M40,8 A32,32 0 0,1 40,72 L34,40 Z', tx: 57, ty: 44 },
      { idx: 2 as const, label: '下瓣', numeral: 'Ⅵ', path: 'M8,40 A32,32 0 0,0 72,40 L40,34 Z', tx: 40, ty: 61 },
    ];

    const shardsAligned = dialAngles.every((deg) => deg % 360 === 0);

    return (
      <div className="w-full max-w-[330px] py-1 text-[#241B14]">
        <div className="flex items-center justify-between text-[11px] font-serif-body text-[#6E563B] pb-1.5 border-b border-[#D2BA8F]">
          <span>碎瓷表盘</span>
        </div>

        <div className="mt-2.5 grid grid-cols-3 gap-2 rounded-[4px] border border-[#8DA6BA] bg-[#E8F1F8] p-2">
          {shards.map((s) => {
            const norm = dialAngles[s.idx] % 360;
            const aligned = norm === 0;
            return (
              <button
                key={s.idx}
                type="button"
                onClick={() => rotateShard(s.idx)}
                className={`flex flex-col items-center justify-center rounded-[3px] border p-1.5 transition-colors ${
                  aligned ? 'border-[#4D7291] bg-[#FFFFFF]' : 'border-[#9BB1C4] bg-[#F2F7FB] hover:bg-[#E4EEF6]'
                }`}
              >
                <div className="w-16 h-16 transition-transform duration-200" style={{ transform: `rotate(${dialAngles[s.idx]}deg)` }}>
                  <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden="true">
                    <path d={s.path} fill="#FCFDFE" stroke="#536F87" strokeWidth="2" strokeLinejoin="round" />
                    <text x={s.tx} y={s.ty} textAnchor="middle" fontSize="13" fontWeight="bold" fill={shardsAligned && s.idx === 2 ? '#8E2D20' : '#2D4357'} fontFamily="serif">
                      {s.numeral}
                    </text>
                    {shardsAligned && s.idx === 2 && (
                      <circle cx={s.tx} cy={s.ty - 4} r="10" fill="none" stroke="#8E2D20" strokeWidth="1.2" strokeDasharray="2 1" />
                    )}
                  </svg>
                </div>
              </button>
            );
          })}
        </div>

        {feedback && (
          <p className="mt-2 text-[11px] font-serif-body text-[#7B3325] text-center leading-snug">{feedback}</p>
        )}
      </div>
    );
  }

  if (season === 'winter' && pageNumber === 3) {
    const { iceMeltSteps } = puzzleState.winter;
    const meltIce = (fromDrop = false) => {
      if (isSolved || iceMeltSteps >= 3) return;
      if (!fromDrop && selectedSatchel !== 'lit-warmer') {
        libraryAudio.playClockTick(true);
        if (hasItem('empty-warmer') && hasItem('glowing-ember')) {
          setFeedback('先在右侧「页间工具匣」将「空铜手炉壳」与「余温炭块」合成为「微温手炉」！');
        } else if (hasItem('lit-warmer')) {
          setFeedback('请在右侧工具匣点选已合成的「微温手炉」贴近冰块。');
        } else {
          setFeedback('空手难融寒冰——须先寻齐空铜炉壳与余温炭火合成暖炉。');
        }
        return;
      }

      const next = iceMeltSteps + 1;
      libraryAudio.playWaterDrop(true);
      onUpdateState((prev) => {
        let updated: BookPuzzleSessionState = {
          ...prev,
          winter: { ...prev.winter, iceMeltSteps: next },
        };
        if (next >= 3) {
          updated = consumeSatchelItem(updated, 'lit-warmer');
          updated = addSatchelItem(updated, 'future-gear');
          updated = {
            ...updated,
            discoveredClues: {
              ...updated.discoveredClues,
              3: { label: '冰脉基准', symbol: '冰脉 0°' },
            },
          };
        }
        return updated;
      });

      if (next >= 3) {
        triggerSolved('寒冰融尽！冰心「未来之齿」已收入工具匣（可回第 1 页装配右轴）。');
      } else {
        setFeedback(`手炉余温融开了第 ${next} 层冰霜（${next}/3）。`);
      }
    };

    const iceScale = iceMeltSteps === 0 ? 1 : iceMeltSteps === 1 ? 0.86 : iceMeltSteps === 2 ? 0.72 : 0.45;

    return (
      <div className="w-full max-w-[330px] py-1 text-[#241B14]">
        <div className="flex items-center justify-between text-[11px] font-serif-body text-[#6E563B] pb-1.5 border-b border-[#D2BA8F]">
          <span>封冻冰块</span>
          <span className="tabular-nums">{iceMeltSteps}/3</span>
        </div>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.getData('text/plain') === 'lit-warmer') meltIce(true);
          }}
          onClick={() => meltIce(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') meltIce(false);
          }}
          className="mt-2.5 rounded-[4px] border border-[#7CA0BD] bg-[#E8F2F9] p-2 flex flex-col items-center cursor-pointer hover:bg-[#DFECF6] transition-colors"
        >
          <svg viewBox="0 0 210 112" className="w-52 h-28" aria-hidden="true">
            {iceMeltSteps > 0 && (
              <ellipse cx="105" cy="96" rx={36 + iceMeltSteps * 18} ry="8" fill="#A9D3F0" opacity="0.7" />
            )}
            <g opacity={0.4 + iceMeltSteps * 0.2}>
              <polygon points="56,56 68,44 80,56 68,68" fill="#BCE0FA" stroke="#3F6687" strokeWidth="1.6" />
              <rect x="79" y="53" width="44" height="6" fill="#BCE0FA" stroke="#3F6687" strokeWidth="1.5" />
              {/* 8-tooth Future Gear silhouette beside the key */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <rect
                  key={deg}
                  x="146"
                  y="39"
                  width="4"
                  height="5"
                  rx="1"
                  fill="#E3B962"
                  stroke="#6E4E1B"
                  strokeWidth="0.9"
                  transform={`rotate(${deg} 148 56)`}
                />
              ))}
              <circle cx="148" cy="56" r="13" fill="#E3B962" stroke="#6E4E1B" strokeWidth="1.5" />
              <circle cx="148" cy="56" r="5" fill="#E8F2F9" stroke="#6E4E1B" strokeWidth="1.2" />
            </g>
            {iceMeltSteps >= 3 && (
              <g opacity="0.75">
                <line x1="105" y1="16" x2="105" y2="30" stroke="#537899" strokeWidth="1.4" />
                <text x="105" y="13" textAnchor="middle" fontSize="8" fill="#3F6687" fontFamily="monospace">0°</text>
              </g>
            )}
            {iceMeltSteps < 3 && (
              <g transform={`translate(105 56) scale(${iceScale}) translate(-105 -56)`}>
                <polygon points="44,24 146,18 172,44 162,88 52,92 36,56" fill="#BBE0F7" fillOpacity="0.62" stroke="#5B88AD" strokeWidth="2" />
                <polygon points="44,24 108,30 98,66 36,56" fill="#E3F4FF" fillOpacity="0.55" />
                <line x1="76" y1="24" x2="66" y2="86" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.8" />
              </g>
            )}
          </svg>
        </div>

        {feedback && (
          <p className="mt-2 text-[11px] font-serif-body text-[#7B3325] text-center leading-snug">{feedback}</p>
        )}
      </div>
    );
  }

  // WINTER P4 MASTER LOCK
  const { outerSnowDeg, innerSnowDeg, gearPin, dialPin } = puzzleState.winter;
  const allWinterPreSolved = Boolean(
    puzzleState.discoveredClues[1] && puzzleState.discoveredClues[2] && puzzleState.discoveredClues[3]
  );

  const checkWinterMaster = (nextOuter: number, nextInner: number, nextGear: string, nextDial: string) => {
    if (nextOuter === 0 && nextInner === 0 && nextGear === '10:8' && nextDial === 'Ⅵ') {
      if (!allWinterPreSolved) {
        libraryAudio.playGentleNudge();
        setFeedback('雪晶似已回正，但前几章尚有齿轮或刻痕未曾解封！');
        return;
      }
      triggerSolved('雪晶双环齐响！冰窗暗格开启，请举起黄铜放大镜融霜显影。');
    }
  };

  const rotateOuter = () => {
    if (isSolved) return;
    libraryAudio.playClockTick(false);
    const next = (outerSnowDeg + 15) % 60;
    onUpdateState((prev) => ({
      ...prev,
      winter: { ...prev.winter, outerSnowDeg: next },
    }));
    checkWinterMaster(next, innerSnowDeg, gearPin, dialPin);
  };

  const rotateInner = () => {
    if (isSolved) return;
    libraryAudio.playClockTick(false);
    const next = (innerSnowDeg + 15) % 60;
    onUpdateState((prev) => ({
      ...prev,
      winter: { ...prev.winter, innerSnowDeg: next },
    }));
    checkWinterMaster(outerSnowDeg, next, gearPin, dialPin);
  };

  const cycleGearPin = () => {
    if (isSolved) return;
    libraryAudio.playBrassClick();
    const next = WINTER_GEAR_PIN_OPTIONS[(WINTER_GEAR_PIN_OPTIONS.indexOf(gearPin) + 1) % WINTER_GEAR_PIN_OPTIONS.length];
    onUpdateState((prev) => ({
      ...prev,
      winter: { ...prev.winter, gearPin: next },
    }));
    checkWinterMaster(outerSnowDeg, innerSnowDeg, next, dialPin);
  };

  const cycleDialPin = () => {
    if (isSolved) return;
    libraryAudio.playBrassClick();
    const next = WINTER_DIAL_PIN_OPTIONS[(WINTER_DIAL_PIN_OPTIONS.indexOf(dialPin) + 1) % WINTER_DIAL_PIN_OPTIONS.length];
    onUpdateState((prev) => ({
      ...prev,
      winter: { ...prev.winter, dialPin: next },
    }));
    checkWinterMaster(outerSnowDeg, innerSnowDeg, gearPin, next);
  };

  return (
    <div className="w-full max-w-[330px] py-1 text-[#241B14]">
      <div className="flex items-center justify-between text-[11px] font-serif-body text-[#6E563B] pb-1.5 border-b border-[#D2BA8F]">
        <span>双环雪晶总锁</span>
      </div>

      <div className="mt-2">
        <ConvergenceHeader
          discoveredClues={puzzleState.discoveredClues}
          expectedLabels={['齿比', '钟刻', '冰脉']}
        />
      </div>

      <div className="flex flex-col items-center">
        <svg viewBox="0 0 130 120" className="w-28 h-28 select-none" aria-label="双环雪晶盘">
          <g onClick={rotateOuter} className="cursor-pointer">
            <circle cx="65" cy="60" r="52" fill="#E8F2FA" stroke="#5A7E9E" strokeWidth="2.6" />
            <g transform={`rotate(${outerSnowDeg} 65 60)`}>
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <g key={deg} transform={`rotate(${deg} 65 60)`}>
                  <line x1="65" y1="12" x2="65" y2="30" stroke="#3F6485" strokeWidth="2.3" strokeLinecap="round" />
                  <path d="M59 19 L65 14 L71 19" fill="none" stroke="#3F6485" strokeWidth="1.5" strokeLinecap="round" />
                </g>
              ))}
            </g>
          </g>

          <g onClick={rotateInner} className="cursor-pointer">
            <circle cx="65" cy="60" r="29" fill="#FFFFFF" stroke="#B48A3E" strokeWidth="2.2" />
            <g transform={`rotate(${innerSnowDeg} 65 60)`}>
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <g key={deg} transform={`rotate(${deg} 65 60)`}>
                  <line x1="65" y1="60" x2="65" y2="34" stroke="#8E2D20" strokeWidth="2" strokeLinecap="round" />
                </g>
              ))}
            </g>
            <circle cx="65" cy="60" r="4" fill="#5A7E9E" stroke="#FFFFFF" strokeWidth="1" />
          </g>
        </svg>

        <div className="mt-1 grid grid-cols-2 gap-1.5 w-full">
          <button
            type="button"
            onClick={rotateOuter}
            className="inline-flex items-center justify-center gap-1 px-2 py-1 rounded-[2px] border border-[#6E8FA9] bg-[#E7F0F7] hover:bg-[#DAE8F3] text-[11px] font-serif-body text-[#2C4256] whitespace-nowrap"
          >
            <RotateCw className="w-3 h-3" />
            <span>外环 ({outerSnowDeg}°)</span>
          </button>
          <button
            type="button"
            onClick={rotateInner}
            className="inline-flex items-center justify-center gap-1 px-2 py-1 rounded-[2px] border border-[#B48A3E] bg-[#FAF0D6] hover:bg-[#F2E2BA] text-[11px] font-serif-body text-[#4B3419] whitespace-nowrap"
          >
            <RotateCw className="w-3 h-3" />
            <span>内环 ({innerSnowDeg}°)</span>
          </button>
          <button
            type="button"
            onClick={cycleGearPin}
            className="inline-flex items-center justify-center gap-1 px-2 py-1 rounded-[2px] border border-[#8E6F42] bg-[#F4E6C5] hover:bg-[#EAD7AD] text-[11px] font-serif-body text-[#352416] whitespace-nowrap"
          >
            <Sparkles className="w-3 h-3" />
            <span>齿比栓：{gearPin}</span>
          </button>
          <button
            type="button"
            onClick={cycleDialPin}
            className="inline-flex items-center justify-center gap-1 px-2 py-1 rounded-[2px] border border-[#8E6F42] bg-[#F4E6C5] hover:bg-[#EAD7AD] text-[11px] font-serif-body text-[#352416] whitespace-nowrap"
          >
            <Sparkles className="w-3 h-3" />
            <span>刻度栓：{dialPin}</span>
          </button>
        </div>
      </div>

      {feedback && (
        <p className="mt-2 text-[11px] font-serif-body text-[#7B3325] text-center leading-snug">{feedback}</p>
      )}
    </div>
  );
};

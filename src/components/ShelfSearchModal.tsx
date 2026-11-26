import React, { useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  LampDesk,
  Search,
} from 'lucide-react';
import {
  SHELF_BOOKS,
  SHELF_CURIOS,
  SHELF_DRAWERS,
  SHELF_POCKET_ITEMS,
  SHELF_ZONES,
} from '../data/libraryCases';
import {
  GuestCase,
  ShelfBookItem,
  ShelfCurioItem,
  ShelfDrawerItem,
  ShelfPocketItemId,
  ShelfZoneId,
} from '../types/game';
import { libraryAudio } from '../utils/audio';
import { ResilientImage } from './EvidenceIcon';
import {
  MiniBookBadge,
  OwlBookendArt,
  SeasonSigilIcon,
  ShelfCurioIllustration,
} from './VisualKeepsakes';
import {
  AutumnWaxSealOverlay,
  BookTextureSvgDefs,
  EnhancedBookSpine,
  HorizontalBookStackArt,
  InkedWoodenLadderArt,
  PaintedDrawerHotspot,
  PocketItemArt,
  RustyOpenDrawerTray,
  RustyRegulatorClockArt,
  ShelfFillerBookCluster,
  SpringGlassCabinetOverlay,
  WING_VISUAL_THEMES,
  WingAmbientAtmosphere,
  WinterFrostCaseOverlay,
} from './ShelfVisuals';

interface ShelfSearchModalProps {
  currentCase: GuestCase;
  isLampOn: boolean;
  isMagnifierActive: boolean;
  onToggleMagnifier: () => void;
  onSelectTargetBook: () => void;
  onBackToDesk: () => void;
}

type LadderBay = 0 | 1 | 2;

type ShelfObservation =
  | { kind: 'book'; book: ShelfBookItem }
  | { kind: 'curio'; curio: ShelfCurioItem; extraCutNote?: string }
  | { kind: 'message'; title: string; body: string; secret?: string }
  | null;

const DRAWER_TOOL_MAP: Record<string, ShelfPocketItemId> = {
  'drw-spr-3': 'brass-key',
  'drw-sum-1': 'winding-key',
  'drw-aut-3': 'letter-opener',
  'drw-win-3': 'thaw-key',
};

const POCKET_GUIDE: Record<
  ShelfPocketItemId,
  { shortUse: string; emptyHint: string }
> = {
  'brass-key': {
    shortUse: '开春架玻璃柜',
    emptyHint:
      '【随身物品提示】「黄铜小钥匙」藏在春季区底座 A-03 抽屉里，拿到后可打开顶层上锁的玻璃标本柜。',
  },
  'winding-key': {
    shortUse: '拨夏钟至3:15',
    emptyHint:
      '【随身物品提示】「发条上弦匙」藏在夏季区底座 B-01 抽屉里，拿到后可为剧院座钟上弦并拨到 3:15。',
  },
  'letter-opener': {
    shortUse: '裁秋封红绳',
    emptyHint:
      '【随身物品提示】「铜柄拆信刀」藏在秋季区底座 C-03 抽屉里，拿到后可裁开红绳封印书与飞信束。',
  },
  'thaw-key': {
    shortUse: '融冬架冰匣',
    emptyHint:
      '【随身物品提示】「暖铜融雪匙」藏在冬季区底座 D-03 抽屉里，拿到后可融开下层冻结的冰晶铜匣。',
  },
};

const BOOKEND_NOTES: Record<ShelfZoneId, { note: string; secret: string }> = {
  spring: {
    note: '推开猫头鹰木雕书挡后，背面木槽贴着纸条：“顶层玻璃标本柜的钥匙收在 A-03 抽屉。”',
    secret: '放大镜照出淡绿笔迹：目标手札编号 SPR-217，浅草绿亚麻书脊。',
  },
  summer: {
    note: '猫头鹰书挡底刻着音符与钟面——写着“演出停在下午三点一刻”。',
    secret: '放大镜下露出暗槽小字：“B-01 抽屉藏有发条上弦匙，把剧院座钟拨到 3:15。”',
  },
  autumn: {
    note: '书挡后压着一片枯叶和纸条：“红绳封印的暖灰紫布脊信札，需用拆信刀裁开。”',
    secret: '放大镜照出紫光浅痕：“铜柄拆信刀收在 C-03 文具抽屉里。”',
  },
  winter: {
    note: '书挡脚边凝着细霜，背面刻着：“下层冰晶铜匣冻住了 WIN-519，去找带着余温的融雪匙。”',
    secret: '放大镜下可见细字：“D-03 炭炉暖匙匣中收着暖铜融雪匙。”',
  },
};

const STACK_NOTES: Record<ShelfZoneId, { title: string; note: string }> = {
  spring: {
    title: '翻开春架底层横叠的画册',
    note: '书页滑出一张绿芽卡片，写着“SPR-217 归入顶层玻璃格”。',
  },
  summer: {
    title: '抬起夏架叠放的乐谱残集',
    note: '书堆底下压着半张节目单：“下午 3:15 终曲落幕时，主架暗扣会松开”。',
  },
  autumn: {
    title: '翻动秋架捆扎的旧信叠册',
    note: '叠册之间夹着一根紫光羽毛，写着“AUT-408 就在中层正中”。',
  },
  winter: {
    title: '拂去冬架横册上的薄雪',
    note: '底层压着一张钟楼草图：“WIN-519 封在下层冰晶锁扣之内”。',
  },
};

export const ShelfSearchModal: React.FC<ShelfSearchModalProps> = ({
  currentCase,
  isLampOn,
  isMagnifierActive,
  onToggleMagnifier,
  onSelectTargetBook,
  onBackToDesk,
}) => {
  const [activeZone, setActiveZone] = useState<ShelfZoneId>(currentCase.shelfZone);
  const [ladderBay, setLadderBay] = useState<LadderBay>(1);
  const [isNightLampMode, setIsNightLampMode] = useState(false);

  const [pulledBookIds, setPulledBookIds] = useState<string[]>([]);
  const [nudgedBookendZones, setNudgedBookendZones] = useState<ShelfZoneId[]>([]);
  const [liftedStackZones, setLiftedStackZones] = useState<ShelfZoneId[]>([]);
  const [activeDrawer, setActiveDrawer] = useState<ShelfDrawerItem | null>(null);
  const [collectedTools, setCollectedTools] = useState<ShelfPocketItemId[]>([]);
  const [selectedToolId, setSelectedToolId] = useState<ShelfPocketItemId | null>(null);

  // Per-wing mechanisms
  const [isGlassCabinetUnlocked, setIsGlassCabinetUnlocked] = useState(false);
  const [isClockWound, setIsClockWound] = useState(false);
  const [clockMinutes, setClockMinutes] = useState(0);
  const [isClockSolved, setIsClockSolved] = useState(false);
  const [isRibbonCut, setIsRibbonCut] = useState(false);
  const [isLetterBundleCut, setIsLetterBundleCut] = useState(false);
  const [isWinterCaseThawed, setIsWinterCaseThawed] = useState(false);

  const [spinningAstrolabe, setSpinningAstrolabe] = useState(false);
  const [tickingMetronome, setTickingMetronome] = useState(false);
  const [openTeaLid, setOpenTeaLid] = useState(false);

  const [observation, setObservation] = useState<ShelfObservation>(null);
  const stageScrollRef = useRef<HTMLDivElement | null>(null);
  const drawerRowRef = useRef<HTMLDivElement | null>(null);

  const activeZoneIndex = SHELF_ZONES.findIndex((z) => z.id === activeZone);
  const zoneMeta = SHELF_ZONES[activeZoneIndex] ?? SHELF_ZONES[0];
  const wingTheme = WING_VISUAL_THEMES[activeZone];
  const prevZone =
    SHELF_ZONES[(activeZoneIndex - 1 + SHELF_ZONES.length) % SHELF_ZONES.length];
  const nextZone = SHELF_ZONES[(activeZoneIndex + 1) % SHELF_ZONES.length];

  const topBooks = SHELF_BOOKS.filter((b) => b.zone === activeZone && b.tier === 'top');
  const middleBooks = SHELF_BOOKS.filter(
    (b) => b.zone === activeZone && b.tier === 'middle'
  );
  const lowerBooks = SHELF_BOOKS.filter(
    (b) => b.zone === activeZone && b.tier === 'lower'
  );

  const upperCurio = SHELF_CURIOS.find(
    (c) => c.zone === activeZone && c.tier === 'upper'
  );
  const mainCurio = SHELF_CURIOS.find(
    (c) => c.zone === activeZone && c.tier === 'main'
  );
  const drawersInZone = SHELF_DRAWERS.filter((d) => d.zone === activeZone);

  const isBookendNudged = nudgedBookendZones.includes(activeZone);
  const isStackLifted = liftedStackZones.includes(activeZone);
  const selectedBookId =
    observation?.kind === 'book' ? observation.book.id : undefined;
  const isTargetBook =
    observation?.kind === 'book' &&
    observation.book.id === currentCase.targetBookId;

  const ladderTopPct = parseFloat(wingTheme.shelfBounds.top.top);
  const ladderBottomPct =
    parseFloat(wingTheme.shelfBounds.lower.top) +
    parseFloat(wingTheme.shelfBounds.lower.height);
  const ladderHeightPct = `${(ladderBottomPct - ladderTopPct).toFixed(1)}%`;
  const ladderLeftPct = ladderBay === 0 ? '24%' : ladderBay === 2 ? '76%' : '50%';

  const formatClockTime = (mins: number) => {
    const normalized = ((mins % 720) + 720) % 720;
    const h = Math.floor(normalized / 60) || 12;
    const m = normalized % 60;
    return `${h}:${String(m).padStart(2, '0')}`;
  };

  const switchWing = (targetZone: ShelfZoneId) => {
    if (targetZone === activeZone) return;
    libraryAudio.playWoodSlide();
    setActiveZone(targetZone);
    setActiveDrawer(null);
    setObservation(null);
    stageScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToDrawers = () => {
    drawerRowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  const scrollToTopShelves = () => {
    stageScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stepWing = (delta: -1 | 1) => {
    const nextIdx =
      (activeZoneIndex + delta + SHELF_ZONES.length) % SHELF_ZONES.length;
    switchWing(SHELF_ZONES[nextIdx].id);
  };

  const handleMoveLadder = (bay: LadderBay) => {
    if (ladderBay !== bay) {
      libraryAudio.playWoodSlide();
      setLadderBay(bay);
    }
  };

  const handleCollectTool = (toolId: ShelfPocketItemId) => {
    libraryAudio.playEvidenceCollect();
    setCollectedTools((prev) => (prev.includes(toolId) ? prev : [...prev, toolId]));
    setSelectedToolId(toolId);
    const meta = SHELF_POCKET_ITEMS.find((t) => t.id === toolId);
    setObservation({
      kind: 'message',
      title: `已拾取随身道具：${meta?.name ?? toolId}`,
      body: `${meta?.subtitle ?? ''}（已自动选持在右侧工具架中，对应机关正亮起金色提示框！）`,
    });
  };

  const handleClickPocketSlot = (itemId: ShelfPocketItemId) => {
    const isCollected = collectedTools.includes(itemId);
    if (!isCollected) {
      libraryAudio.playGentleNudge();
      const itemMeta = SHELF_POCKET_ITEMS.find((i) => i.id === itemId);
      setObservation({
        kind: 'message',
        title: `尚未拾取：${itemMeta?.name ?? itemId}`,
        body: POCKET_GUIDE[itemId].emptyHint,
      });
      return;
    }

    libraryAudio.playBrassClick();
    const nextSelected = selectedToolId === itemId ? null : itemId;
    setSelectedToolId(nextSelected);
    if (nextSelected) {
      const meta = SHELF_POCKET_ITEMS.find((t) => t.id === itemId);
      setObservation({
        kind: 'message',
        title: `已手持「${meta?.name}」`,
        body: `${meta?.subtitle ?? ''}——直接点击书架上亮着金框的目标位置即可使用！`,
      });
    }
  };

  const handleInteractGlassCabinet = () => {
    if (isGlassCabinetUnlocked) return;
    if (selectedToolId === 'brass-key') {
      libraryAudio.playEvidenceCollect();
      setIsGlassCabinetUnlocked(true);
      setLadderBay(1);
      setObservation({
        kind: 'message',
        title: '用黄铜小钥匙打开了春季彩玻标本柜',
        body: '清脆一响，铅条花窗玻璃门向两侧滑开！现在可以抽出顶层《漂浮温室梦芽志》了。',
      });
    } else if (collectedTools.includes('brass-key')) {
      libraryAudio.playGentleNudge();
      setObservation({
        kind: 'message',
        title: '顶层彩玻柜上着铜锁',
        body: '点击右侧工具架中的「黄铜小钥匙」选中它，再来开启这扇玻璃柜门。',
      });
    } else {
      libraryAudio.playGentleNudge();
      setObservation({
        kind: 'message',
        title: '顶层彩玻柜上着铜锁',
        body: '玻璃门内放着《漂浮温室梦芽志》，拉开春季底座 A-03 抽屉能找到黄铜小钥匙。',
      });
    }
  };

  const handleInteractShelfClock = () => {
    if (!isClockWound) {
      if (selectedToolId === 'winding-key') {
        libraryAudio.playBrassClick();
        setIsClockWound(true);
        setObservation({
          kind: 'message',
          title: '用发条上弦匙给剧院座钟上紧发条',
          body: '铜齿轮咬合响起！点击钟座旁的「+1时 / +15分」把指针拨到 3:15（对应 B-02 演出时刻）。',
        });
      } else if (collectedTools.includes('winding-key')) {
        libraryAudio.playGentleNudge();
        setObservation({
          kind: 'message',
          title: '剧院座钟停在 12:00',
          body: '点击右侧工具架中的「发条上弦匙」选中它，再来为座钟上弦。',
        });
      } else {
        libraryAudio.playGentleNudge();
        setObservation({
          kind: 'message',
          title: '架上剧院座钟停在 12:00',
          body: '钟面发条孔空着，先打开夏季底座 B-01 抽屉找找发条上弦匙吧。',
        });
      }
    } else {
      handleAdvanceClock(15);
    }
  };

  const handleAdvanceClock = (deltaMins: number) => {
    if (!isClockWound) return;
    const nextMins = ((clockMinutes + deltaMins) % 720 + 720) % 720;
    setClockMinutes(nextMins);
    if (nextMins === 195) {
      libraryAudio.playKnotResolved();
      setIsClockSolved(true);
      setNudgedBookendZones((prev) =>
        prev.includes('summer') ? prev : [...prev, 'summer']
      );
      setObservation({
        kind: 'message',
        title: '当——！剧院座钟敲响三点一刻',
        body: '清脆钟鸣落定，中层暗扣弹开，《永夏空剧院乐谱集》微微探出书架！',
      });
    } else {
      libraryAudio.playBrassClick();
      setObservation({
        kind: 'message',
        title: `座钟指针拨至 ${formatClockTime(nextMins)}`,
        body: isClockSolved
          ? '暗扣已经解开，可以随时翻阅《永夏空剧院乐谱集》。'
          : '齿轮咔哒走动了一格，试着拨到下午三点一刻（3:15）。',
      });
    }
  };

  const handleCutRibbonSeal = () => {
    if (isRibbonCut) return;
    if (selectedToolId === 'letter-opener') {
      libraryAudio.playBrassClick();
      setIsRibbonCut(true);
      setObservation({
        kind: 'message',
        title: '用拆信刀裁开了红绳火漆封印',
        body: '细红绳散落，《秋风消散的记忆信札》终于可以取出了！',
      });
    } else if (collectedTools.includes('letter-opener')) {
      libraryAudio.playGentleNudge();
      setObservation({
        kind: 'message',
        title: '书身缠着火漆红绳',
        body: '点击右侧工具架中的「铜柄拆信刀」选中它，再来裁开红绳封印。',
      });
    } else {
      libraryAudio.playGentleNudge();
      setObservation({
        kind: 'message',
        title: '火漆红绳锁住了这本书',
        body: '《秋风消散的记忆信札》外面缠着红绳，秋季底座 C-03 抽屉里收着铜柄拆信刀。',
      });
    }
  };

  const handleThawWinterCase = () => {
    if (isWinterCaseThawed) return;
    if (selectedToolId === 'thaw-key') {
      libraryAudio.playEvidenceCollect();
      setIsWinterCaseThawed(true);
      setObservation({
        kind: 'message',
        title: '暖铜融雪匙融开了下层冰晶铜匣',
        body: '霜花化作一阵温热白雾，被冻住的《雪停在钟面的那一刻》松动探出书脊！',
      });
    } else if (collectedTools.includes('thaw-key')) {
      libraryAudio.playGentleNudge();
      setObservation({
        kind: 'message',
        title: '下层书脊覆着厚厚冰霜',
        body: '点击右侧工具架中的「暖铜融雪匙」选中它，再来融开这层冰晶锁扣。',
      });
    } else {
      libraryAudio.playGentleNudge();
      setObservation({
        kind: 'message',
        title: '冰晶封住了《雪停在钟面的那一刻》',
        body: '这本书被寒霜封住，先拉开冬季底座 D-03 炭炉暖匙匣寻找「暖铜融雪匙」。',
      });
    }
  };

  const handleInspectBook = (book: ShelfBookItem, bayForTop?: LadderBay) => {
    if (book.zone === 'spring' && book.tier === 'top' && !isGlassCabinetUnlocked) {
      handleInteractGlassCabinet();
      return;
    }
    if (book.id === 'book-arthur' && !isClockSolved) {
      libraryAudio.playGentleNudge();
      setObservation({
        kind: 'message',
        title: '乐谱集被中层黄铜暗扣卡住',
        body: '先把旁边剧院座钟上弦并拨到下午 3:15（B-01 抽屉藏有发条上弦匙），暗扣就会弹开。',
      });
      return;
    }
    if (book.id === 'book-martha' && !isRibbonCut) {
      handleCutRibbonSeal();
      return;
    }
    if (book.id === 'book-samuel' && !isWinterCaseThawed) {
      handleThawWinterCase();
      return;
    }
    if (book.tier === 'top' && bayForTop !== undefined) {
      handleMoveLadder(bayForTop);
    }
    libraryAudio.playPageTurn();
    setPulledBookIds((prev) =>
      prev.includes(book.id) ? prev : [...prev, book.id]
    );
    setObservation({ kind: 'book', book });
  };

  const handleInspectCurio = (curio: ShelfCurioItem, bayForTop?: LadderBay) => {
    if (curio.zone === 'spring' && curio.tier === 'upper' && !isGlassCabinetUnlocked) {
      handleInteractGlassCabinet();
      return;
    }
    if (curio.tier === 'upper' && bayForTop !== undefined) {
      handleMoveLadder(bayForTop);
    }

    if (
      curio.kind === 'letter-bundle' &&
      selectedToolId === 'letter-opener' &&
      !isLetterBundleCut
    ) {
      libraryAudio.playEvidenceCollect();
      setIsLetterBundleCut(true);
      setObservation({
        kind: 'curio',
        curio,
        extraCutNote:
          '拆信刀划开绳结后，最上层的信封滑出一张短笺：“写给亲爱的玛莎——只把最温暖的三段抱在怀里。”',
      });
      return;
    }

    libraryAudio.playBrassClick();
    if (curio.kind === 'astrolabe') setSpinningAstrolabe((v) => !v);
    if (curio.kind === 'metronome') setTickingMetronome((v) => !v);
    if (curio.kind === 'tea-caddy') setOpenTeaLid((v) => !v);
    setObservation({
      kind: 'curio',
      curio,
      extraCutNote:
        curio.kind === 'letter-bundle' && isLetterBundleCut
          ? '信封已拆开：“写给亲爱的玛莎——只把最温暖的三段抱在怀里。”'
          : undefined,
    });
  };

  const handleNudgeBookend = () => {
    libraryAudio.playWoodSlide();
    const next = !isBookendNudged;
    setNudgedBookendZones((prev) =>
      next ? [...prev, activeZone] : prev.filter((z) => z !== activeZone)
    );
    const info = BOOKEND_NOTES[activeZone];
    setObservation({
      kind: 'message',
      title: '拨动猫头鹰木雕书挡',
      body: info.note,
      secret: info.secret,
    });
  };

  const handleLiftBookStack = () => {
    libraryAudio.playPageTurn();
    const next = !isStackLifted;
    setLiftedStackZones((prev) =>
      next ? [...prev, activeZone] : prev.filter((z) => z !== activeZone)
    );
    const info = STACK_NOTES[activeZone];
    setObservation({
      kind: 'message',
      title: info.title,
      body: info.note,
    });
  };

  const cabinetMaxWidthClass =
    activeZone === 'winter'
      ? 'max-w-[700px]'
      : activeZone === 'spring'
        ? 'max-w-[750px]'
        : 'max-w-[840px]';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="四季手绘复古梦境藏书阁"
      className="fixed inset-0 z-40 flex items-center justify-center bg-[#1D130C]/88 backdrop-blur-sm p-1 sm:p-2"
    >
      <BookTextureSvgDefs />

      <div className="relative w-full max-w-[1440px] h-[97vh] flex flex-col rounded-lg overflow-hidden border-[1.5px] border-[#9E8460] bg-[#FAF4E6] shadow-[0_24px_56px_rgba(8,5,2,0.72)]">
        {/* TOP HEADER BAR */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 bg-[#F6EFE0] border-b border-[#CBB998] shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={onBackToDesk}
              className="inline-flex items-center gap-1 text-xs font-serif-body text-[#5C3A24] hover:text-[#8E2D20] transition-colors whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>返回书桌</span>
            </button>

            <span aria-hidden="true" className="h-4 w-[1px] bg-[#D8C8AA]" />

            <div className="flex items-center gap-2.5 min-w-0">
              <MiniBookBadge
                spineColor={currentCase.spineColor}
                accentColor={currentCase.spineAccent}
                caseId={currentCase.id}
              />
              <div className="min-w-0">
                <h2 className="font-display text-sm sm:text-[15px] font-semibold text-[#262019] leading-tight truncate">
                  《{currentCase.bookTitle}》
                  <span className="ml-2 font-mono text-[11px] font-normal text-[#746856] tabular-nums">
                    {currentCase.bookCallNumber}
                  </span>
                </h2>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                libraryAudio.playBrassClick();
                setIsNightLampMode((v) => !v);
              }}
              className={`inline-flex items-center gap-1.5 text-xs font-serif-body transition-colors whitespace-nowrap shrink-0 ${
                isNightLampMode ? 'text-[#7A3A28] font-medium' : 'text-[#5D5244] hover:text-[#241B14]'
              }`}
              title="调暗架灯可看见目标书脊的夜光荧光粉笔字"
            >
              <LampDesk className="w-3.5 h-3.5" />
              <span>{isNightLampMode ? '夜光显影' : '调暗架灯'}</span>
            </button>

            <button
              type="button"
              onClick={onToggleMagnifier}
              className={`inline-flex items-center gap-1.5 text-xs font-serif-body transition-colors whitespace-nowrap shrink-0 ${
                isMagnifierActive ? 'text-[#7A3A28] font-medium' : 'text-[#5D5244] hover:text-[#241B14]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{isMagnifierActive ? '放大镜持握' : '放大镜'}</span>
            </button>

            <span aria-hidden="true" className="hidden sm:inline-block h-4 w-[1px] bg-[#D8C8AA]" />

            <div className="flex items-center gap-3">
              {SHELF_ZONES.map((zone) => {
                const hasShimmer = isLampOn && zone.id === currentCase.shelfZone;
                return (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => switchWing(zone.id)}
                    className={`inline-flex items-center gap-1 text-xs font-serif-body transition-colors whitespace-nowrap shrink-0 ${
                      activeZone === zone.id
                        ? 'text-[#241B14] font-semibold underline underline-offset-4 decoration-[#8E2D20]/60'
                        : 'text-[#5D5244]/85 hover:text-[#241B14]'
                    }`}
                  >
                    <SeasonSigilIcon
                      season={zone.id}
                      glowing={activeZone === zone.id}
                      className="w-3.5 h-3.5 shrink-0"
                    />
                    {hasShimmer && (
                      <span className="text-[#B55C40]" aria-label="台灯微光">
                        ✦
                      </span>
                    )}
                    <span>{zone.seasonName}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* CENTER STAGE: SEASONAL MURAL BACKDROP + LARGE HAND-PAINTED BOOKCASE + TOOL RACK */}
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden">
          <div
            className="relative flex-1 min-h-0 overflow-hidden"
            style={{ background: wingTheme.wallFallbackGradient }}
          >
            {/* Dedicated Seasonal Hand-Painted Watercolor Backdrop */}
            <ResilientImage
              key={wingTheme.backdropUrl}
              src={wingTheme.backdropUrl}
              alt={wingTheme.backdropAlt}
              fallbackTitle={wingTheme.plaqueTitle}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 ${
                isNightLampMode
                  ? 'brightness-[0.38] saturate-75 contrast-110'
                  : 'brightness-[0.98]'
              }`}
            />

            {/* Subtle Seasonal Depth Scrim */}
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                isNightLampMode
                  ? 'bg-[#17111A]/60'
                  : 'bg-[radial-gradient(ellipse_at_center,rgba(255,248,232,0.04)_38%,rgba(28,19,11,0.34)_100%)]'
              }`}
            />

            {/* 顶部薄纱渐隐：让叠加在图上的小字可读，而不需要再加一层卡片 */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-20 z-20 bg-gradient-to-b from-[#150C07]/72 via-[#150C07]/38 to-transparent"
            />

            {/* Compact Brass Wing Plaque & Controls */}
            <div className="hidden sm:flex absolute top-2 left-2.5 z-30 items-center gap-2 text-[#F6E7C6] drop-shadow-[0_1px_3px_rgba(18,10,5,0.9)]">
              <span className="font-display text-xs font-semibold tracking-wide">
                {wingTheme.plaqueTitle}
              </span>
            </div>

            <div className="absolute top-2 right-2.5 z-30 flex items-center gap-1.5">
              <div className="flex items-center gap-1.5 text-[#F6E7C6] drop-shadow-[0_1px_3px_rgba(18,10,5,0.9)]">
                <span className="text-[10.5px] font-serif-body font-medium text-[#F6E7C6] whitespace-nowrap">
                  扶梯
                </span>
                {([0, 1, 2] as LadderBay[]).map((bay) => (
                  <button
                    key={bay}
                    type="button"
                    onClick={() => handleMoveLadder(bay)}
                    className={`px-1.5 py-0.5 rounded-xs text-[10px] font-serif-body transition-colors whitespace-nowrap shrink-0 ${
                      ladderBay === bay
                        ? 'bg-[#E2BD6B] text-[#241B14] font-semibold'
                        : 'text-[#EBD8B3] hover:bg-[#493221]'
                    }`}
                  >
                    {bay === 0 ? '左' : bay === 1 ? '中' : '右'}
                  </button>
                ))}
              </div>

              <div className="hidden sm:flex items-center gap-1.5 text-[#F6E7C6] drop-shadow-[0_1px_3px_rgba(18,10,5,0.9)]">
                <button
                  type="button"
                  onClick={scrollToTopShelves}
                  title="回到书架顶层"
                  className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-xs text-[10px] font-serif-body text-[#EBD8B3] hover:bg-[#493221] whitespace-nowrap shrink-0"
                >
                  <ArrowUp className="w-3 h-3" />
                  <span>书格</span>
                </button>
                <button
                  type="button"
                  onClick={scrollToDrawers}
                  title="滑到底座抽屉"
                  className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-xs text-[10px] font-serif-body text-[#F2CE7A] hover:bg-[#493221] whitespace-nowrap shrink-0"
                >
                  <ArrowDown className="w-3 h-3" />
                  <span>抽屉</span>
                </button>
              </div>
            </div>

            {/* SCROLLABLE FULL-SCALE BOOKCASE STAGE */}
            <div
              ref={stageScrollRef}
              className="absolute inset-0 overflow-y-auto overflow-x-hidden px-2 sm:px-12 pt-10 pb-3 flex flex-col items-center"
            >
              {/* THE 2D HAND-PAINTED CUTOUT BOOKCASE (Large Hero Scale) */}
              <div
                className={`relative z-10 w-full ${cabinetMaxWidthClass} shrink-0 my-auto select-none`}
                style={{
                  aspectRatio: wingTheme.cabinetAspectRatio,
                }}
              >
              {/* Actual Hand-Painted Transparent Cabinet Cutout PNG */}
              <img
                key={wingTheme.cabinetCutoutUrl}
                src={wingTheme.cabinetCutoutUrl}
                alt={`${wingTheme.plaqueTitle}复古手绘三层木质藏书柜`}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-contain pointer-events-none transition-all duration-300 ${
                  isNightLampMode
                    ? 'brightness-[0.58] contrast-110'
                    : 'brightness-100'
                }`}
              />

              {/* Subtle Lamp Glow & Seasonal Motes inside Cabinet */}
              <WingAmbientAtmosphere
                zone={activeZone}
                isNightLampMode={isNightLampMode}
              />

              {/* Rolling Hand-Inked Wooden Ladder Sliding Across the 3 Bays */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -translate-x-1/2 w-[14%] z-20 transition-[left] duration-300 ease-out opacity-80"
                style={{
                  top: wingTheme.shelfBounds.top.top,
                  height: ladderHeightPct,
                  left: ladderLeftPct,
                }}
              >
                <InkedWoodenLadderArt />
              </div>

              {/* TIER 3 (TOP SHELF) */}
              <div
                className="absolute z-10 flex items-end justify-around gap-0.5 sm:gap-1 px-1"
                style={wingTheme.shelfBounds.top}
              >
                <ShelfFillerBookCluster zone={activeZone} variant="left" />

                {topBooks.slice(0, 2).map((book, i) => (
                  <EnhancedBookSpine
                    key={book.id}
                    book={book}
                    styleIndex={i}
                    selected={selectedBookId === book.id}
                    pulled={pulledBookIds.includes(book.id)}
                    isTarget={book.id === currentCase.targetBookId}
                    isNightMode={isNightLampMode}
                    onClick={() => handleInspectBook(book, i === 0 ? 0 : 1)}
                  />
                ))}

                {upperCurio && (
                  <button
                    type="button"
                    onClick={() => handleInspectCurio(upperCurio, 1)}
                    className={`group relative z-10 h-full flex flex-col items-center justify-end px-0.5 rounded-xs transition-transform duration-200 ${
                      observation?.kind === 'curio' &&
                      observation.curio.id === upperCurio.id
                        ? '-translate-y-1.5 ring-2 ring-[#E6C06E]'
                        : 'hover:-translate-y-1'
                    }`}
                  >
                    <div
                      className={`h-[80%] flex items-end transition-transform duration-300 ${
                        upperCurio.kind === 'astrolabe' && spinningAstrolabe
                          ? 'rotate-[20deg]'
                          : upperCurio.kind === 'tea-caddy' && openTeaLid
                            ? '-translate-y-1'
                            : ''
                      }`}
                    >
                      <ShelfCurioIllustration
                        kind={upperCurio.kind}
                        className="h-full w-auto"
                      />
                    </div>
                    <span className="pointer-events-none absolute -top-5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#2B1D13]/92 border border-[#C6A25E]/60 text-[9.5px] font-serif-body text-[#FAF2DE] whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                      {upperCurio.title}
                    </span>
                  </button>
                )}

                {topBooks.slice(2).map((book, i) => (
                  <EnhancedBookSpine
                    key={book.id}
                    book={book}
                    styleIndex={i + 3}
                    selected={selectedBookId === book.id}
                    pulled={pulledBookIds.includes(book.id)}
                    isTarget={book.id === currentCase.targetBookId}
                    isNightMode={isNightLampMode}
                    onClick={() => handleInspectBook(book, 2)}
                  />
                ))}

                <ShelfFillerBookCluster zone={activeZone} variant="right" />

                {activeZone === 'spring' && !isGlassCabinetUnlocked && (
                  <SpringGlassCabinetOverlay
                    hasKeySelected={selectedToolId === 'brass-key'}
                    onClick={handleInteractGlassCabinet}
                  />
                )}
              </div>

              {/* TIER 2 (MIDDLE EYE-LEVEL SHELF) */}
              <div
                className="absolute z-10 flex items-end justify-around gap-0.5 sm:gap-1 px-1"
                style={wingTheme.shelfBounds.middle}
              >
                <ShelfFillerBookCluster zone={activeZone} variant="left" />

                {middleBooks.slice(0, 2).map((book, i) => {
                  const isMarthaSealed =
                    book.id === 'book-martha' && !isRibbonCut;
                  return (
                    <div
                      key={book.id}
                      className="relative h-full flex items-end shrink-0"
                    >
                      <EnhancedBookSpine
                        book={book}
                        styleIndex={i + 1}
                        selected={selectedBookId === book.id}
                        pulled={pulledBookIds.includes(book.id)}
                        isTarget={book.id === currentCase.targetBookId}
                        isNightMode={isNightLampMode}
                        highlighted={isClockSolved && book.id === 'book-arthur'}
                        onClick={() => handleInspectBook(book)}
                      />
                      {isMarthaSealed && (
                        <AutumnWaxSealOverlay
                          hasOpenerSelected={selectedToolId === 'letter-opener'}
                          onClick={handleCutRibbonSeal}
                        />
                      )}
                    </div>
                  );
                })}

                {/* Summer Wing: Theater Regulator Clock */}
                {activeZone === 'summer' && (
                  <div
                    className={`relative z-10 h-[94%] flex items-end gap-1 px-1.5 py-1 rounded-t border-[1.5px] transition-colors shrink-0 ${
                      selectedToolId === 'winding-key' && !isClockWound
                        ? 'border-[#FCE2A6] bg-[#222D3D]/95 ring-2 ring-[#E6C06E]'
                        : 'border-[#241B14] bg-[#222D3D]/90'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={handleInteractShelfClock}
                      title="剧院黄铜座钟（需发条上弦匙并拨至 3:15）"
                      className="h-full flex items-end shrink-0 focus-visible:outline-2 focus-visible:outline-[#E6C06E]"
                    >
                      <RustyRegulatorClockArt
                        minutesTotal={clockMinutes}
                        isWound={isClockWound}
                        isSolved={isClockSolved}
                        className="h-full w-auto"
                      />
                    </button>
                    <div className="flex flex-col gap-0.5 pb-0.5">
                      <span className="px-1 py-0.5 rounded-xs bg-[#FAF3E2] border border-[#241B14] font-mono text-[9px] font-semibold text-[#241B14] tabular-nums text-center">
                        {formatClockTime(clockMinutes)}
                      </span>
                      {isClockWound ? (
                        <>
                          <button
                            type="button"
                            onClick={() => handleAdvanceClock(60)}
                            className="px-1 py-0.5 text-[8.5px] font-serif-body bg-[#FAF3E2] hover:bg-[#E7D8BA] border border-[#241B14] rounded-xs text-[#241B14] whitespace-nowrap shrink-0"
                          >
                            +1时
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAdvanceClock(15)}
                            className="px-1 py-0.5 text-[8.5px] font-serif-body font-medium bg-[#E2BD6B] hover:bg-[#D4AD58] border border-[#241B14] rounded-xs text-[#241B14] whitespace-nowrap shrink-0"
                          >
                            +15分
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={handleInteractShelfClock}
                          className="px-1 py-0.5 text-[8.5px] font-serif-body font-medium bg-[#E2BD6B] hover:bg-[#D4AD58] border border-[#241B14] rounded-xs text-[#241B14] whitespace-nowrap shrink-0"
                        >
                          {selectedToolId === 'winding-key' ? '上弦' : '需发条'}
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Movable Carved Owl Bookend */}
                <button
                  type="button"
                  onClick={handleNudgeBookend}
                  title="轻推猫头鹰木雕书挡"
                  className={`relative z-10 h-[78%] flex items-end shrink-0 transition-transform duration-300 ${
                    isBookendNudged
                      ? 'translate-x-2 rotate-[5deg]'
                      : 'hover:-translate-x-1'
                  }`}
                >
                  <OwlBookendArt className="h-full w-auto" />
                </button>

                {middleBooks.slice(2).map((book, i) => (
                  <EnhancedBookSpine
                    key={book.id}
                    book={book}
                    styleIndex={i + 4}
                    selected={selectedBookId === book.id}
                    pulled={pulledBookIds.includes(book.id)}
                    isTarget={book.id === currentCase.targetBookId}
                    isNightMode={isNightLampMode}
                    onClick={() => handleInspectBook(book)}
                  />
                ))}

                <ShelfFillerBookCluster zone={activeZone} variant="right" />
              </div>

              {/* TIER 1 (LOWER SHELF) */}
              <div
                className="absolute z-10 flex items-end justify-around gap-0.5 sm:gap-1 px-1"
                style={wingTheme.shelfBounds.lower}
              >
                <button
                  type="button"
                  onClick={handleLiftBookStack}
                  title="点击翻开底层横放的书叠"
                  className="relative z-10 shrink-0 focus-visible:outline-2 focus-visible:outline-[#E6C06E]"
                >
                  <HorizontalBookStackArt isLifted={isStackLifted} />
                </button>

                {lowerBooks.map((book, i) => {
                  const isWinterFrozen =
                    book.id === 'book-samuel' && !isWinterCaseThawed;
                  return (
                    <div
                      key={book.id}
                      className="relative h-full flex items-end shrink-0"
                    >
                      <EnhancedBookSpine
                        book={book}
                        styleIndex={i + 2}
                        selected={selectedBookId === book.id}
                        pulled={pulledBookIds.includes(book.id)}
                        isTarget={book.id === currentCase.targetBookId}
                        isNightMode={isNightLampMode}
                        onClick={() => handleInspectBook(book)}
                      />
                      {isWinterFrozen && (
                        <WinterFrostCaseOverlay
                          hasThawSelected={selectedToolId === 'thaw-key'}
                          onClick={handleThawWinterCase}
                        />
                      )}
                    </div>
                  );
                })}

                {mainCurio && (
                  <button
                    type="button"
                    onClick={() => handleInspectCurio(mainCurio)}
                    className={`group relative z-10 h-full flex flex-col items-center justify-end px-0.5 rounded-xs shrink-0 transition-transform duration-200 ${
                      mainCurio.kind === 'letter-bundle' &&
                      selectedToolId === 'letter-opener' &&
                      !isLetterBundleCut
                        ? 'ring-2 ring-[#E6C06E] bg-[#FCE2A6]/18'
                        : observation?.kind === 'curio' &&
                            observation.curio.id === mainCurio.id
                          ? '-translate-y-1.5 ring-2 ring-[#E6C06E]'
                          : 'hover:-translate-y-1'
                    }`}
                  >
                    <div
                      className={`h-[78%] flex items-end transition-transform duration-300 ${
                        mainCurio.kind === 'metronome' && tickingMetronome
                          ? 'rotate-[6deg]'
                          : ''
                      }`}
                    >
                      <ShelfCurioIllustration
                        kind={mainCurio.kind}
                        className="h-full w-auto"
                      />
                    </div>
                    <span className="pointer-events-none absolute -top-5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-[#2B1D13]/92 border border-[#C6A25E]/60 text-[9.5px] font-serif-body text-[#FAF2DE] whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                      {mainCurio.title}
                    </span>
                  </button>
                )}

                <ShelfFillerBookCluster zone={activeZone} variant="right" />
              </div>

              {/* PEDESTAL CATALOG DRAWERS (Transparent Hotspots Over Painted Drawers) */}
              <div
                ref={drawerRowRef}
                className="absolute z-20"
                style={wingTheme.shelfBounds.drawers}
              >
                {activeDrawer && activeDrawer.zone === activeZone && (
                  <div className="absolute inset-x-0 bottom-full mb-2 z-40">
                    <RustyOpenDrawerTray
                      drawer={activeDrawer}
                      isMagnifierActive={isMagnifierActive}
                      toolId={DRAWER_TOOL_MAP[activeDrawer.id]}
                      isToolCollected={
                        DRAWER_TOOL_MAP[activeDrawer.id]
                          ? collectedTools.includes(
                              DRAWER_TOOL_MAP[activeDrawer.id]
                            )
                          : false
                      }
                      onCollectTool={handleCollectTool}
                      onCloseDrawer={() => setActiveDrawer(null)}
                    />
                  </div>
                )}

                <div className="grid grid-cols-3 gap-1.5 sm:gap-2 h-full w-full">
                  {drawersInZone.map((drawer) => {
                    const isOpened = activeDrawer?.id === drawer.id;
                    const toolInside = DRAWER_TOOL_MAP[drawer.id];
                    const toolStillInside = Boolean(
                      toolInside && !collectedTools.includes(toolInside)
                    );
                    return (
                      <PaintedDrawerHotspot
                        key={drawer.id}
                        drawer={drawer}
                        isOpened={isOpened}
                        hasToolInside={toolStillInside}
                        onClick={() => {
                          libraryAudio.playWoodSlide();
                          setActiveDrawer(isOpened ? null : drawer);
                          if (!isOpened) {
                            setTimeout(() => {
                              drawerRowRef.current?.scrollIntoView({
                                behavior: 'smooth',
                                block: 'nearest',
                              });
                            }, 50);
                          }
                        }}
                      />
                    );
                  })}
                </div>
              </div>
              </div>
            </div>
          </div>

          {/* RIGHT EDGE: LEATHER & BRASS POCKET TOOL RACK */}
          <aside
            aria-label="书架探索随身物品栏"
            className="w-full lg:w-32 bg-gradient-to-b from-[#3E2A1B] to-[#2B1C11] border-t lg:border-t-0 lg:border-l-2 border-[#241B14] p-2 flex lg:flex-col justify-between gap-2 text-[#FAF2DF] shrink-0"
          >
            <div className="space-y-2 flex-1">
              <div className="border-b border-[#C6A25E]/35 pb-1.5">
                <p className="font-display text-[11px] font-semibold tracking-wide text-[#F6E2BA]">
                  随身工具架
                </p>
              </div>

              <div className="grid grid-cols-4 lg:grid-cols-1 gap-1.5">
                {SHELF_POCKET_ITEMS.map((item) => {
                  const isCollected = collectedTools.includes(item.id);
                  const isSelected = selectedToolId === item.id;
                  const guide = POCKET_GUIDE[item.id];
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleClickPocketSlot(item.id)}
                      title={
                        isCollected
                          ? `${item.name}：${item.subtitle}`
                          : guide.emptyHint
                      }
                      className={`flex flex-col items-center gap-1 rounded-[2px] py-2 text-center transition-colors ${
                        isSelected ? 'text-[#F2CE7A]' : 'text-[#E8D6B4] hover:text-[#FBF0D8]'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-[2px] border border-[#8A6B45]/70 flex items-center justify-center">
                        {isCollected ? (
                          <PocketItemArt id={item.id} className="w-6 h-6" />
                        ) : (
                          <span className="font-mono text-xs text-[#8A7960]">?</span>
                        )}
                      </div>
                      <span className="text-[10px] font-serif-body font-medium leading-tight whitespace-nowrap">
                        {isCollected ? item.name : '查看线索'}
                      </span>
                      <span className="text-[9px] font-serif-body text-[#E2CFAD] leading-tight whitespace-nowrap">
                        {isSelected ? '使用中' : guide.shortUse}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>

        {/* BOTTOM PARCHMENT OBSERVATION BAR */}
        <div className="relative z-20 px-4 py-2.5 bg-[#FBF6EA] border-t border-[#CBB998] shrink-0">
          {observation?.kind === 'book' && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
              <div className="space-y-0.5 flex-1 min-w-0">
                <div className="flex items-center gap-2 text-xs font-serif-body text-[#645A4A] font-medium tabular-nums">
                  <span>《{observation.book.title}》</span>
                  <span aria-hidden="true">·</span>
                  <span>{observation.book.callNumber}</span>
                </div>
                <p className="font-serif-body text-xs sm:text-sm text-[#241B14] leading-snug">
                  {observation.book.flavorNote}
                  {observation.book.hiddenBehindNote && (
                    <span className="ml-2 text-[#965219] font-medium">
                      （{observation.book.hiddenBehindNote}）
                    </span>
                  )}
                </p>
              </div>
              {isTargetBook ? (
                <button
                  type="button"
                  onClick={onSelectTargetBook}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs sm:text-sm font-serif-body font-medium text-[#FAF6EE] victorian-wax-btn rounded-md transition-colors whitespace-nowrap shrink-0"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>正是这本 · 带回书桌</span>
                </button>
              ) : (
                <span className="text-xs font-serif-body text-[#756A58] whitespace-nowrap shrink-0">
                  放回书格，继续翻找其他书层与抽屉
                </span>
              )}
            </div>
          )}

          {observation?.kind === 'curio' && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
              <div className="space-y-0.5 flex-1 min-w-0">
                <p className="text-xs font-serif-body font-semibold text-[#241B14]">
                  书格器物 · {observation.curio.title}
                </p>
                <p className="font-serif-body text-xs sm:text-sm text-[#241B14]">
                  {observation.extraCutNote ?? observation.curio.description}
                  {observation.curio.magnifierSecret && isMagnifierActive && (
                    <span className="ml-2 text-[#965219] font-medium">
                      [{observation.curio.magnifierSecret}]
                    </span>
                  )}
                </p>
              </div>
              {!isMagnifierActive && observation.curio.magnifierSecret && (
                <button
                  type="button"
                  onClick={onToggleMagnifier}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-serif-body font-medium bg-[#E2BD6B] border border-[#9C7830] text-[#241B14] rounded-md whitespace-nowrap shrink-0"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>举起放大镜细看</span>
                </button>
              )}
            </div>
          )}

          {observation?.kind === 'message' && (
            <div className="space-y-0.5">
              <p className="text-xs font-serif-body font-semibold text-[#241B14]">
                {observation.title}
              </p>
              <p className="font-serif-body text-xs sm:text-sm text-[#241B14]">
                {observation.body}
                {observation.secret && isMagnifierActive && (
                  <span className="ml-2 text-[#965219] font-medium">
                    [{observation.secret}]
                  </span>
                )}
              </p>
            </div>
          )}

          {!observation && (
            <div className="flex items-center gap-2 text-xs font-serif-body text-[#645A4A]">
              <BookOpen className="w-4 h-4 shrink-0 text-[#8D6E48]" />
              <span>
                先翻抽屉找钥匙与工具，再解开书架上亮金框的机关。
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import { useEffect, useState } from 'react';
import { ArchiveDrawer } from './components/ArchiveDrawer';
import { BookInspectionModal } from './components/BookInspectionModal';
import { DeskWorkbench } from './components/DeskWorkbench';
import { DreamkeeperPrologue } from './components/DreamkeeperPrologue';
import { ResilientImage } from './components/EvidenceIcon';
import { KnotResolutionModal } from './components/KnotResolutionModal';
import { LibraryStage } from './components/LibraryStage';
import { ShelfSearchModal } from './components/ShelfSearchModal';
import { TopHudBar } from './components/TopHudBar';
import {
  BrassCornerPlate,
  CrimsonWaxSealMedallion,
  PaperFiberOverlay,
  VictorianCornerFiligree,
} from './components/VictorianOrnaments';
import { SeasonSigilIcon } from './components/VisualKeepsakes';
import { GUEST_CASES } from './data/libraryCases';
import { GamePhase } from './types/game';
import { libraryAudio } from './utils/audio';

const LIBRARY_BACKDROP = '/src/assets/images/library_interior_rusty_fresh_1795439953648.jpg';

const TEA_NOTES = [
  '微甜的洋甘菊热气散开，让桌面显得更安静了。',
  '茶杯边缘温热，窗外恰好有晨风拂过树梢。',
  '轻啜一口花茶，四季梦境的回响似乎更清晰了。',
];

export default function App() {
  const [phase, setPhase] = useState<GamePhase>('TITLE_MENU');
  const [guestIndex, setGuestIndex] = useState(0);
  const [collectedEvidenceIds, setCollectedEvidenceIds] = useState<string[]>([]);
  const [resolvedCaseIds, setResolvedCaseIds] = useState<string[]>([]);
  const [collectedGiftIds, setCollectedGiftIds] = useState<string[]>([]);
  const [servedTeaCaseIds, setServedTeaCaseIds] = useState<string[]>([]);

  // Tactile desk & modal states
  const [isLampOn, setIsLampOn] = useState(true);
  const [isMagnifierActive, setIsMagnifierActive] = useState(false);
  const [propNotice, setPropNotice] = useState<string | null>(null);

  // Overlays & Audio
  const [isMuted, setIsMuted] = useState(false);
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isKnotModalOpen, setIsKnotModalOpen] = useState(false);
  const [phaseBeforeShelf, setPhaseBeforeShelf] = useState<GamePhase>('DESK_DIALOGUE');

  const currentCase = GUEST_CASES[guestIndex];
  const hasServedTea = servedTeaCaseIds.includes(currentCase.id);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isArchiveOpen) {
          setIsArchiveOpen(false);
        } else if (isBookModalOpen) {
          setIsBookModalOpen(false);
        } else if (isKnotModalOpen) {
          setIsKnotModalOpen(false);
        } else if (phase === 'SHELF_SEARCH') {
          setPhase(phaseBeforeShelf);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isArchiveOpen, isBookModalOpen, isKnotModalOpen, phase, phaseBeforeShelf]);

  const resetCaseProgress = (targetIdx: number, startPhase: GamePhase = 'GUEST_ARRIVING') => {
    setGuestIndex(targetIdx);
    setCollectedEvidenceIds([]);
    setIsMagnifierActive(false);
    setPropNotice(null);
    setIsBookModalOpen(false);
    setIsKnotModalOpen(false);
    setPhaseBeforeShelf('DESK_DIALOGUE');
    setPhase(startPhase);
  };

  const handleStartGame = (startIdx = 0, showPrologue = false) => {
    libraryAudio.playDoorBell();
    resetCaseProgress(startIdx, showPrologue ? 'INTRO_PROLOGUE' : 'GUEST_ARRIVING');
  };

  const handleWelcomeGuest = () => {
    libraryAudio.playPageTurn();
    setPropNotice(null);
    setPhase('DESK_DIALOGUE');
  };

  const handleOpenShelves = () => {
    libraryAudio.playPageTurn();
    setPropNotice(null);
    if (phase !== 'SHELF_SEARCH') {
      setPhaseBeforeShelf(phase);
    }
    setPhase('SHELF_SEARCH');
  };

  const handleSelectTargetBook = () => {
    libraryAudio.playEvidenceCollect();
    setPropNotice(null);
    setPhase('BOOK_INSPECTION');
    setIsBookModalOpen(true);
  };

  const handleCollectEvidence = (evidenceId: string) => {
    if (collectedEvidenceIds.includes(evidenceId)) return;
    libraryAudio.playEvidenceCollect();
    setCollectedEvidenceIds((prev) => [...prev, evidenceId]);
  };

  const handleEnterKnotResolution = () => {
    libraryAudio.playMagicChime();
    setIsBookModalOpen(false);
    setPhase('KNOT_RESOLUTION');
    setIsKnotModalOpen(true);
  };

  const handleResolveSuccess = (feedback: string) => {
    setResolvedCaseIds((prev) =>
      prev.includes(currentCase.id) ? prev : [...prev, currentCase.id]
    );
    setIsKnotModalOpen(false);
    setPhase('CASE_CLEARED');
    setPropNotice(`${feedback} 馆外已显现「${currentCase.easterEgg.title}」彩蛋。`);
  };

  const handleCollectGift = (giftId: string) => {
    if (collectedGiftIds.includes(giftId)) return;
    libraryAudio.playMagicChime();
    setCollectedGiftIds((prev) => [...prev, giftId]);
  };

  const handleNextGuest = () => {
    const nextIdx = (guestIndex + 1) % GUEST_CASES.length;
    libraryAudio.playDoorBell();
    resetCaseProgress(nextIdx, 'GUEST_ARRIVING');
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    libraryAudio.setMuted(nextMuted);
  };

  useEffect(() => {
    if (!propNotice) return;
    const timer = window.setTimeout(() => setPropNotice(null), 5500);
    return () => window.clearTimeout(timer);
  }, [propNotice]);

  const handleToggleLamp = () => {
    libraryAudio.playSlotPlace();
    const next = !isLampOn;
    setIsLampOn(next);
    setPropNotice(
      next
        ? '台灯已点亮：全馆暖光升起，前往书架时目标馆区会浮现「✦」微光指引。'
        : '台灯已熄灭：馆内转入微暗晨雾光影，书架区将不再显示微光提示。'
    );
  };

  const handleServeTea = () => {
    libraryAudio.playTeaClink();
    if (phase === 'GUEST_ARRIVING') {
      setPhase('DESK_DIALOGUE');
    }
    if (!hasServedTea) {
      setServedTeaCaseIds((prev) => [...prev, currentCase.id]);
      setPropNotice(
        `已邀 ${currentCase.guestName} 入座并奉上洋甘菊茶：对方透露了破咒秘语，并已在对话笺中标出关键指引！`
      );
    } else {
      const phaseTeaGuide: Record<GamePhase, string> = {
        TITLE_MENU: TEA_NOTES[0],
        INTRO_PROLOGUE: TEA_NOTES[0],
        GUEST_ARRIVING: `轻啜一口洋甘菊茶，窗外晨风正拂过书廊。`,
        DESK_DIALOGUE: `花茶余温提示：请留意对话笺右上角书脊号 ${currentCase.bookCallNumber}，前往书架寻回《${currentCase.bookTitle}》。`,
        SHELF_SEARCH: `花茶余温提示：目标《${currentCase.bookTitle}》的索书号为 ${currentCase.bookCallNumber}。`,
        BOOK_INSPECTION: `花茶余温提示：若第 4 页印记模糊，记得拿起左上角的黄铜放大镜照亮淡墨线索。`,
        KNOT_RESOLUTION: `花茶余温提示：洋甘菊茶已安抚 ${currentCase.guestName} 的心绪，入梦牌桌上已自动浮现破咒护佑。`,
        CASE_CLEARED: TEA_NOTES[guestIndex % TEA_NOTES.length],
      };
      setPropNotice(phaseTeaGuide[phase]);
    }
  };

  const handleToggleMagnifier = () => {
    libraryAudio.playPageTurn();
    const next = !isMagnifierActive;
    setIsMagnifierActive(next);
    setPropNotice(
      next
        ? '已握持黄铜放大镜：现在可点击馆内访客肖像细察隐秘痕迹，也可在书架抽屉与梦境书第 4 页照出暗字。'
        : '已将黄铜放大镜放回橡木案头。'
    );
  };

  const handleQuickClearAll = () => {
    libraryAudio.playKnotResolved();
    setResolvedCaseIds(GUEST_CASES.map((c) => c.id));
    setCollectedGiftIds(GUEST_CASES.map((c) => c.giftKeepsake.id));
    setServedTeaCaseIds(GUEST_CASES.map((c) => c.id));
    setCollectedEvidenceIds(currentCase.evidence.map((e) => e.id));
    setIsBookModalOpen(false);
    setIsKnotModalOpen(false);
    setPhaseBeforeShelf('CASE_CLEARED');
    setPhase('CASE_CLEARED');
    setPropNotice('测试模式：已一键通关四季全部章节，并解锁所有隐藏信物与手帐彩蛋！');
  };

  const SEASON_BADGES: Record<string, string> = {
    spring: '春之卷',
    summer: '夏之卷',
    autumn: '秋之卷',
    winter: '冬之卷',
  };

  if (phase === 'TITLE_MENU') {
    return (
      <main className="relative h-screen w-screen overflow-hidden flex flex-col justify-between bg-[#24160D]">
        <ResilientImage
          src={LIBRARY_BACKDROP}
          alt="晨露梦境图书馆大厅"
          fallbackTitle="晨露梦境图书馆"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#23140C]/42 via-[#24150C]/52 to-[#160C07]/88" />

        {/* Centered Victorian Burgundy Leather-Bound Ex-Libris Registry Folio */}
        <div className="relative z-10 flex-1 min-h-0 flex items-center justify-center p-4 sm:p-6">
          <div className="relative w-full max-w-[740px] rounded-[6px] bg-embossed-leather border-[2px] border-[#26110E] p-2.5 sm:p-3.5 shadow-[0_28px_64px_rgba(8,4,2,0.78)]">
            <BrassCornerPlate position="tl" />
            <BrassCornerPlate position="tr" />
            <BrassCornerPlate position="bl" />
            <BrassCornerPlate position="br" />

            {/* Gilt Blind-Tooled Cover Frame */}
            <div className="rounded-[3px] border border-[#D4AF63]/65 p-1 sm:p-1.5">
              {/* Watercolor Ivory Bookplate Sheet */}
              <div className="relative bg-vintage-folio rounded-[2px] gilt-hairline-frame text-[#241B14] shadow-[inset_0_0_24px_rgba(124,88,42,0.12)] overflow-hidden">
                <PaperFiberOverlay idSuffix="title-folio" light />
                <VictorianCornerFiligree color="#9B753D" sizeClass="w-5 h-5" />

                {/* Upper Editorial Title */}
                <div className="relative z-10 px-6 pt-6 pb-5 sm:px-8 sm:pt-7 sm:pb-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h1 className="font-display text-3xl sm:text-[38px] font-semibold tracking-tight text-[#241B14] leading-tight text-balance">
                        晨露梦境图书馆
                      </h1>
                      <p className="mt-1.5 text-xs sm:text-[13px] font-serif-body italic text-[#7A5E3E]">
                        以四季梦书为引，为迷途旅人解开被时光封存的执念
                      </p>
                    </div>
                    <CrimsonWaxSealMedallion glyph="梦" className="w-12 h-12 shrink-0 -mt-0.5" />
                  </div>
                </div>

                {/* LOWER DUTY LEDGER PLINTH: Solid Walnut & Brass-Riveted Action Dock */}
                <div className="relative border-t-[2px] border-[#3B291C] bg-gradient-to-b from-[#4B2F1B] via-[#3C2414] to-[#2C190D] px-6 py-4 sm:px-8 sm:py-4.5 text-[#FAF2E2]">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-[#E2BD76]/45"
                  />

                  {/* Primary Action Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-[#C89F55]/28">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleStartGame(0, true)}
                        className="px-6 py-2.5 text-sm font-serif-body font-medium text-[#FAF6EE] victorian-wax-btn rounded-[3px] transition-transform hover:-translate-y-0.5 whitespace-nowrap shrink-0"
                      >
                        入座开始值班
                      </button>

                      <button
                        type="button"
                        onClick={handleQuickClearAll}
                        className="px-4 py-2.5 text-xs font-serif-body font-medium text-[#F5DEC0] bg-[#5B2228] hover:bg-[#6E2A31] border border-[#C89F55]/60 rounded-[3px] shadow-sm transition-colors whitespace-nowrap shrink-0"
                      >
                        测试：一键通关
                      </button>
                    </div>
                  </div>

                  {/* 4 Rectangular Antique Visitor Index Tabs */}
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {GUEST_CASES.map((c, idx) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => handleStartGame(idx, false)}
                        className="group relative text-left rounded-[2px] border border-[#CFA95E]/80 bg-gradient-to-b from-[#FCF7E8] to-[#EFE1C4] hover:from-[#FFFDF6] hover:to-[#F6E9CB] px-2.5 py-2 text-[#241B14] shadow-[0_3px_8px_rgba(10,5,2,0.32),inset_0_0_0_1px_rgba(255,252,240,0.65)] transition-all hover:-translate-y-0.5"
                      >
                        <div className="flex items-center justify-between gap-1.5">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <SeasonSigilIcon season={c.season} className="w-4 h-4 shrink-0" />
                            <span className="font-display text-xs font-semibold text-[#241B14] group-hover:text-[#8E2D20] truncate">
                              {c.guestName}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-[#7C5B34] tabular-nums shrink-0">
                            0{idx + 1}
                          </span>
                        </div>
                        <p className="mt-0.5 text-[10px] font-serif-body text-[#644D36] truncate">
                          {SEASON_BADGES[c.season] ?? c.fantasyProfile.seasonLabel}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grounded Oak Desk Sill Footer */}
        <footer className="relative z-10 w-full border-t-[2px] border-[#241B14] bg-gradient-to-b from-[#553620] to-[#341E10] px-6 py-2 text-center shadow-[0_-6px_20px_rgba(10,5,2,0.45)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-[#E2BC7B]/40"
          />
          <p className="text-[11px] font-serif-body tracking-wider text-[#DFC79C]">
            晨露梦境图书馆
          </p>
        </footer>
      </main>
    );
  }

  if (phase === 'INTRO_PROLOGUE') {
    return (
      <DreamkeeperPrologue
        onComplete={() => {
          libraryAudio.playDoorBell();
          setPhase('GUEST_ARRIVING');
        }}
      />
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#E7DFCE]">
      {/* Top 3-Zone Unobtrusive HUD */}
      <TopHudBar
        phase={phase}
        season={currentCase.season}
        guestIndex={guestIndex}
        totalGuests={GUEST_CASES.length}
        guestName={currentCase.guestName}
        collectedCount={collectedEvidenceIds.length}
        totalEvidenceCount={currentCase.evidence.length}
        collectedGiftCount={collectedGiftIds.length}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenArchive={() => setIsArchiveOpen(true)}
        onOpenPrologue={() => {
          libraryAudio.playPageTurn();
          setPhase('INTRO_PROLOGUE');
        }}
        onQuickClearAll={handleQuickClearAll}
        onReturnTitle={() => setPhase('TITLE_MENU')}
      />

      {/* Dominant Upper/Mid Background: First-Person Dream Library Vista & Guest */}
      <LibraryStage
        phase={phase}
        currentCase={currentCase}
        resolvedCaseIds={resolvedCaseIds}
        isLampOn={isLampOn}
        isMagnifierActive={isMagnifierActive}
        hasServedTea={hasServedTea}
        propNotice={propNotice}
        isGiftCollected={collectedGiftIds.includes(currentCase.giftKeepsake.id)}
        onDismissNotice={() => setPropNotice(null)}
        onToggleLamp={handleToggleLamp}
        onServeTea={handleServeTea}
        onToggleMagnifier={handleToggleMagnifier}
        onWelcomeGuest={handleWelcomeGuest}
        onOpenShelves={handleOpenShelves}
        onOpenBookModal={() => setIsBookModalOpen(true)}
        onOpenKnotModal={() => {
          libraryAudio.playMagicChime();
          setIsKnotModalOpen(true);
        }}
        onCollectGift={handleCollectGift}
        onOpenArchive={() => setIsArchiveOpen(true)}
      />

      {/* Minimalist Vintage Archival Ledger Bar */}
      <DeskWorkbench
        key={currentCase.id}
        phase={phase}
        currentCase={currentCase}
        collectedEvidenceIds={collectedEvidenceIds}
        collectedGiftIds={collectedGiftIds}
        hasServedTea={hasServedTea}
        hasMoreGuests={resolvedCaseIds.length < GUEST_CASES.length}
        onOpenShelves={handleOpenShelves}
        onOpenBookModal={() => setIsBookModalOpen(true)}
        onOpenKnotModal={() => {
          libraryAudio.playMagicChime();
          setIsKnotModalOpen(true);
        }}
        onCollectGift={handleCollectGift}
        onNextGuest={handleNextGuest}
        onOpenArchive={() => setIsArchiveOpen(true)}
      />

      {/* Shelf Search View Overlay */}
      {phase === 'SHELF_SEARCH' && (
        <ShelfSearchModal
          currentCase={currentCase}
          isLampOn={isLampOn}
          isMagnifierActive={isMagnifierActive}
          onToggleMagnifier={handleToggleMagnifier}
          onSelectTargetBook={handleSelectTargetBook}
          onBackToDesk={() => setPhase(phaseBeforeShelf)}
        />
      )}

      {/* Open Dream Book Spread with Clickable Keepsakes & Movable Brass Lens */}
      <BookInspectionModal
        key={`book-${currentCase.id}`}
        isOpen={isBookModalOpen}
        currentCase={currentCase}
        collectedEvidenceIds={collectedEvidenceIds}
        isMagnifierActive={isMagnifierActive}
        onToggleMagnifier={handleToggleMagnifier}
        onCollectEvidence={handleCollectEvidence}
        onEnterKnotResolution={handleEnterKnotResolution}
        onClose={() => setIsBookModalOpen(false)}
      />

      {/* Dream Magic Modal with Seasonal Puzzles & Good/Bad Endings */}
      <KnotResolutionModal
        key={`knot-${currentCase.id}`}
        isOpen={isKnotModalOpen}
        currentCase={currentCase}
        hasServedTea={hasServedTea}
        onResolveSuccess={handleResolveSuccess}
        onBackToBook={() => {
          setIsKnotModalOpen(false);
          setPhase('BOOK_INSPECTION');
          setIsBookModalOpen(true);
        }}
        onClose={() => setIsKnotModalOpen(false)}
      />

      {/* Leather-Bound Dream Journal / Scrapbook Modal */}
      <ArchiveDrawer
        isOpen={isArchiveOpen}
        cases={GUEST_CASES}
        resolvedCaseIds={resolvedCaseIds}
        collectedGiftIds={collectedGiftIds}
        currentPhase={phase}
        currentGuestIndex={guestIndex}
        onClose={() => setIsArchiveOpen(false)}
        onJumpToCase={(idx) => {
          libraryAudio.playDoorBell();
          resetCaseProgress(idx, 'GUEST_ARRIVING');
        }}
        onCollectGift={handleCollectGift}
      />
    </div>
  );
}

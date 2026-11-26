import React, { useState } from 'react';
import {
  BookMarked,
  Check,
  ChevronLeft,
  ChevronRight,
  Feather,
  Music,
  Sparkles,
  Stamp,
  X,
} from 'lucide-react';
import { GamePhase, GuestCase } from '../types/game';
import { libraryAudio } from '../utils/audio';
import { ResilientImage } from './EvidenceIcon';
import {
  AntiquePhotoCorners,
  BrassBookClasp,
  BrassCornerPlate,
  CrimsonWaxSealMedallion,
  DeckledPaperEdge,
  PaperFiberOverlay,
  VictorianCornerFiligree,
} from './VictorianOrnaments';
import {
  GiftKeepsakeIllustration,
  MagicRelicFrame,
  SeasonSigilIcon,
} from './VisualKeepsakes';

interface ArchiveDrawerProps {
  isOpen: boolean;
  cases: GuestCase[];
  resolvedCaseIds: string[];
  collectedGiftIds: string[];
  currentPhase: GamePhase;
  currentGuestIndex: number;
  onClose: () => void;
  onJumpToCase: (index: number) => void;
  onCollectGift: (giftId: string) => void;
}

const ARCHIVAL_ENTRIES: Record<
  string,
  {
    folioTag: string;
    roleLabel: string;
    waxGlyph: string;
    storyBrief: string;
    clueNote: string;
  }
> = {
  'case-isolde': {
    folioTag: '卷壹 · 早春温室',
    roleLabel: '梦芽守林人',
    waxGlyph: '春',
    storyBrief:
      '挚友失踪于花期前夜，她独自守在漂浮温室里，因害怕告别而让满园春花一同停在初绽之时。',
    clueNote: '线索记：温室玻璃上浮着「嫩芽暗纹」，台角那只「空花盆」正等下一粒种子。',
  },
  'case-arthur': {
    folioTag: '卷贰 · 盛夏剧院',
    roleLabel: '幻声钢琴师',
    waxGlyph: '夏',
    storyBrief:
      '三年前盛夏独奏弹偏了一个音，学徒随回声消散在舞台尽头，他的银壳怀表便永远停在了那刻。',
    clueNote: '线索记：第一排空座留着「剧院余票」，怀表盖内尚余学徒未尽的尾音。',
  },
  'case-martha': {
    folioTag: '卷叁 · 深秋邮局',
    roleLabel: '笔迹抄写员',
    waxGlyph: '秋',
    storyBrief:
      '丈夫远逝后，她试图用书信与火漆封存全部过往，却险些让过度执着的思念沉重化作顽石。',
    clueNote: '线索记：羽笔在纸边自行写下回音——只留壁炉低笑、热茶与那句「回家」。',
  },
  'case-samuel': {
    folioTag: '卷肆 · 严冬钟楼',
    roleLabel: '时间钟表匠',
    waxGlyph: '冬',
    storyBrief:
      '为等一人归来，他亲手冻住整座钟楼的雪花与秒针，却也将重逢的脚步一同挡在了零点之外。',
    clueNote: '线索记：勿填满所有表齿，独留温热的「未来之齿」转动，门外雪阶自有足印。',
  },
};

export const ArchiveDrawer: React.FC<ArchiveDrawerProps> = ({
  isOpen,
  cases,
  resolvedCaseIds,
  collectedGiftIds,
  currentGuestIndex,
  onClose,
  onJumpToCase,
  onCollectGift,
}) => {
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const [inspectedGiftId, setInspectedGiftId] = useState<string | null>(null);
  const [turnSeq, setTurnSeq] = useState(0);
  const [turnDir, setTurnDir] = useState<'next' | 'prev'>('next');

  if (!isOpen) return null;

  const activeCase = cases[selectedCaseIdx] ?? cases[0];
  const isResolved = resolvedCaseIds.includes(activeCase.id);
  const isGiftCollected = collectedGiftIds.includes(activeCase.giftKeepsake.id);
  const isGiftInspected = inspectedGiftId === activeCase.giftKeepsake.id;
  const entry = ARCHIVAL_ENTRIES[activeCase.id] ?? {
    folioTag: '晨露馆手记',
    roleLabel: activeCase.occupation,
    waxGlyph: '梦',
    storyBrief: activeCase.fantasyProfile.heartKnot,
    clueNote: activeCase.fantasyProfile.correctWay,
  };

  const handleTurnToPage = (targetIdx: number) => {
    if (targetIdx === selectedCaseIdx || targetIdx < 0 || targetIdx >= cases.length) return;
    libraryAudio.playPageTurn();
    setTurnDir(targetIdx > selectedCaseIdx ? 'next' : 'prev');
    setTurnSeq((s) => s + 1);
    setSelectedCaseIdx(targetIdx);
    setInspectedGiftId(null);
  };

  const handleInspectKeepsake = () => {
    if (activeCase.giftKeepsake.interactiveType === 'silver-bell') {
      libraryAudio.playSilverBellMelody();
    } else {
      libraryAudio.playMagicChime();
    }
    setInspectedGiftId((prev) =>
      prev === activeCase.giftKeepsake.id ? null : activeCase.giftKeepsake.id
    );
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="四季精装梦境手帐本"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#140C07]/90 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto library-scroll"
    >
      {/* Minimal Walnut & Brass Top Header Bar */}
      <div className="w-full max-w-[920px] flex items-center justify-between gap-3 mb-3 text-[#FAF2E2]">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#2D1B11]/94 border border-[#B08A48]/75 rounded-[3px] shadow-md text-xs font-serif-body">
          <BookMarked className="w-4 h-4 text-[#E5C175] shrink-0" />
          <span className="font-medium tracking-wide">
            四季手帐档案 · 已收录 {collectedGiftIds.length}/{cases.length} 枚信物
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="合上手帐本"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-serif-body font-medium bg-[#3B2316]/94 hover:bg-[#4B2D1C] border border-[#B08A48]/75 rounded-[3px] shadow-md transition-colors whitespace-nowrap shrink-0"
        >
          <X className="w-3.5 h-3.5 text-[#E5C175]" />
          <span>合上手帐</span>
        </button>
      </div>

      {/* Heavy Antique Embossed Burgundy Leather Hardcover Book */}
      <div className="relative w-full max-w-[920px]">
        <div className="relative rounded-[10px] p-3.5 sm:p-5 bg-embossed-leather border-[2.5px] border-[#1F0709] shadow-[0_36px_74px_rgba(6,3,1,0.86)]">
          <BrassCornerPlate position="tl" />
          <BrassCornerPlate position="tr" />
          <BrassCornerPlate position="bl" />
          <BrassCornerPlate position="br" />
          <BrassBookClasp side="left" />
          <BrassBookClasp side="right" />

          {/* Gold Blind-Tooled Embossed Foil Rules Inside Leather Cover */}
          <div className="pointer-events-none absolute inset-2 rounded-[7px] border border-[#D4AF63]/50" />
          <div className="pointer-events-none absolute inset-[12px] rounded-[5px] border border-dashed border-[#D4AF63]/28" />

          {/* Raised Stitched Leather Spine Hubs (aligned to 45% split on md+) */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-[45%] top-2 -translate-x-1/2 w-14 h-3 rounded-t-sm bg-gradient-to-r from-[#4A1418] via-[#E5C175] to-[#4A1418] border border-[#24080A] shadow-sm z-20"
          />
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-[45%] bottom-2 -translate-x-1/2 w-14 h-3 rounded-b-sm bg-gradient-to-r from-[#4A1418] via-[#E5C175] to-[#4A1418] border border-[#24080A] shadow-sm z-20"
          />

          {/* Hanging Burgundy Silk Bookmark Ribbon */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-[43.8%] -bottom-8 w-5 h-11 bg-gradient-to-b from-[#8A261B] to-[#56140E] border-x border-[#350B07] shadow-lg z-10"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 74%, 0 100%)' }}
          />

          <div className="relative">
            {/* Underlying Fanned Antique Ivory Book Block Leaves */}
            <div
              aria-hidden="true"
              className="pointer-events-none hidden md:block absolute inset-x-1.5 -bottom-1.5 top-1 rounded-[4px] bg-[#EFE3C8] border border-[#B59A6C] -rotate-[0.35deg] opacity-95"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none hidden md:block absolute inset-x-0.5 -bottom-0.5 top-0.5 rounded-[4px] bg-[#F5ECD7] border border-[#C3AA7E] rotate-[0.3deg]"
            />

            {/* Asymmetrical Left-Text / Right-Illustration Spread (9fr : 11fr) */}
            <div className="relative grid grid-cols-1 md:grid-cols-[9fr_11fr] min-h-[490px] sm:min-h-[530px] border-b-[6px] border-b-[#D5C097] rounded-[4px]">
              {/* Gentle Curved Center Stitched Spine Gutter & Crease Shadow */}
              <div
                aria-hidden="true"
                className="hidden md:block pointer-events-none absolute left-[45%] top-0 bottom-0 -translate-x-1/2 w-9 z-20 bg-gradient-to-r from-transparent via-[#7A5430]/14 to-transparent"
              />
              <div
                aria-hidden="true"
                className="hidden md:block pointer-events-none absolute left-[45%] top-2 bottom-2 -translate-x-1/2 w-[1.5px] z-20 border-l border-dashed border-[#7A5430]/28"
              />

              {/* Animated Page-Turn Shadow Sweep Overlay */}
              {turnSeq > 0 && (
                <div
                  key={turnSeq}
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-y-0 left-[45%] -translate-x-1/2 w-1/2 z-30 bg-gradient-to-r from-transparent via-[#281408]/38 to-transparent ${
                    turnDir === 'next' ? 'animate-page-sweep-next' : 'animate-page-sweep-prev'
                  }`}
                />
              )}

              {/* ================= LEFT FOLIO PAGE: Handwritten Archival Notes (左文) ================= */}
              <div className="relative bg-parchment journal-ruled-page deckle-edge-sheet deckle-edge-left book-heavy-stack-left p-5 sm:p-6 flex flex-col justify-between text-[#241B14] overflow-visible">
                <PaperFiberOverlay idSuffix="archive-left" />
                <DeckledPaperEdge side="left" />
                <VictorianCornerFiligree color="#8C6634" sizeClass="w-4 h-4" />

                <div className="relative z-10 space-y-5">
                  {/* Level 1: Archival Folio Header */}
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#B79867]">
                    <span className="font-handwriting text-[18px] text-[#5F3719] leading-none">
                      {entry.folioTag}
                    </span>
                    <span className="text-[11px] font-serif-body text-[#5A422B] truncate">
                      《{activeCase.bookTitle}》
                    </span>
                  </div>

                  {/* Level 2: Pasted Subject Portrait & Title */}
                  <div className="flex items-center gap-3.5 pt-0.5">
                    <div className="relative shrink-0">
                      <div
                        aria-hidden="true"
                        className="mx-auto w-8 h-2.5 bg-[#D4B782]/90 border border-[#9E7C4B]/80 -mb-1 rotate-[3deg] relative z-20"
                      />
                      <div className="relative w-16 sm:w-18 aspect-[3/4] p-0.5 bg-[#F5E8C8] border border-[#8D6C3E] shadow-[0_6px_14px_rgba(28,15,6,0.3)] -rotate-2">
                        <AntiquePhotoCorners tone="brass" />
                        <ResilientImage
                          src={activeCase.portraitUrl}
                          alt={activeCase.guestName}
                          fallbackTitle={activeCase.guestName}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <SeasonSigilIcon
                            season={activeCase.season}
                            glowing={isResolved}
                            className="w-4 h-4 shrink-0"
                          />
                          <h2 className="font-display text-lg font-semibold leading-tight truncate text-[#241B14]">
                            {activeCase.guestName}
                          </h2>
                        </div>
                        {isResolved && (
                          <CrimsonWaxSealMedallion
                            glyph={entry.waxGlyph}
                            className="w-8 h-8 shrink-0 -rotate-12"
                          />
                        )}
                      </div>
                      <p className="mt-1 text-xs font-serif-body text-[#5E442C]">
                        {entry.roleLabel}
                      </p>
                    </div>
                  </div>

                  {/* Level 3: Concise Human Story Background (纪事) */}
                  <div className="pt-2 space-y-1.5">
                    <p className="text-[11px] font-serif-body tracking-widest text-[#7A4B24] uppercase">
                      纪事
                    </p>
                    <p className="font-serif-body text-[13.5px] leading-[1.9] text-[#2C1E12]">
                      {entry.storyBrief}
                    </p>
                  </div>

                  {/* Level 4: Handwritten Clue Margin Note & Healing Seal (线索 / 批注) */}
                  <div className="pt-3 border-t border-dashed border-[#B79867] space-y-3">
                    <div className="flex items-start gap-2">
                      <Feather className="w-3.5 h-3.5 text-[#7D4B23] shrink-0 mt-1" />
                      <p className="font-handwriting text-[17px] leading-snug text-[#543018]">
                        {entry.clueNote}
                      </p>
                    </div>

                    {isResolved ? (
                      <div className="pt-1.5 pl-3 border-l-2 border-[#8E2D20]/75 space-y-1">
                        <p className="inline-flex items-center gap-1.5 text-[11.5px] font-serif-body font-semibold text-[#8E2D20]">
                          <Stamp className="w-3.5 h-3.5 shrink-0" />
                          <span>{activeCase.knot.archiveStamp}</span>
                        </p>
                        <p className="font-handwriting text-[17.5px] text-[#4A2813] leading-snug">
                          “{activeCase.knot.healingMotto}”
                        </p>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          onJumpToCase(selectedCaseIdx);
                          onClose();
                        }}
                        className="mt-1 px-3.5 py-1.5 text-xs font-serif-body font-medium text-[#FAF6EE] victorian-wax-btn rounded-[2px] transition-colors whitespace-nowrap"
                      >
                        前往接待 {activeCase.guestName}
                      </button>
                    )}
                  </div>
                </div>

                {/* Bottom Left Pagination */}
                <div className="relative z-10 mt-5 pt-2.5 border-t border-[#B79867] flex items-center justify-between gap-2">
                  <button
                    type="button"
                    disabled={selectedCaseIdx === 0}
                    onClick={() => handleTurnToPage(selectedCaseIdx - 1)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-serif-body font-medium text-[#46311E] hover:text-[#8E2D20] border border-[#B2905B] bg-[#F5E8C8]/90 rounded-[2px] disabled:opacity-35 disabled:pointer-events-none transition-colors whitespace-nowrap"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>翻回上卷</span>
                  </button>

                  <span className="font-handwriting text-[15px] text-[#6A4223]">
                    {selectedCaseIdx === currentGuestIndex
                      ? '当前访客'
                      : isResolved
                        ? '已钤印存档'
                        : `第 0${selectedCaseIdx + 1} 页`}
                  </span>
                </div>
              </div>

              {/* ================= RIGHT FOLIO PAGE: Grand Museum Keepsake Exhibit (右图) ================= */}
              <div className="relative bg-parchment journal-ruled-page deckle-edge-sheet deckle-edge-right book-heavy-stack-right p-5 sm:p-7 flex flex-col justify-between text-[#241B14] overflow-visible">
                <PaperFiberOverlay idSuffix="archive-right" />
                <DeckledPaperEdge side="right" />
                <VictorianCornerFiligree color="#8C6634" sizeClass="w-4 h-4" />

                <div className="relative z-10 flex items-center justify-between text-[11px] font-serif-body text-[#5C432B] pb-2 mb-2 border-b border-[#B79867]">
                  <span className="italic">博物信物图版 · PLATE 0{selectedCaseIdx + 1}</span>
                  <span className="font-handwriting text-[16px] text-[#6A4223]">
                    守梦人珍藏
                  </span>
                </div>

                {isGiftCollected ? (
                  <div className="relative z-10 my-auto flex flex-col items-center text-center py-2">
                    <div
                      aria-hidden="true"
                      className="w-24 h-4 bg-[#D8BC88]/92 border border-[#9E7C4B]/75 -mb-2 rotate-[1.8deg] z-20 shadow-xs"
                    />

                    {/* Elevated Museum Specimen Plate */}
                    <div className="relative w-full max-w-[360px]">
                      <AntiquePhotoCorners tone="kraft" />
                      <MagicRelicFrame season={activeCase.season}>
                        <div className="relative flex flex-col items-center text-center px-2 py-2">
                          <CrimsonWaxSealMedallion
                            glyph={entry.waxGlyph}
                            withRibbons
                            className="absolute -bottom-6 -right-4 w-14 h-16 rotate-12 pointer-events-none drop-shadow-md z-20"
                          />

                          {/* Double-Matted Large Visual Showcase with Delicate Gold-Foil Hairline */}
                          <div className="p-3 sm:p-4 rounded-[3px] gilt-hairline-frame bg-[#FBF6E8] shadow-[inset_0_2px_8px_rgba(124,88,42,0.10)]">
                            <div className="p-2 border border-dashed border-[#C9A660]">
                              <GiftKeepsakeIllustration
                                giftId={activeCase.giftKeepsake.id}
                                className="w-36 h-36 sm:w-44 sm:h-44 drop-shadow-md"
                              />
                            </div>
                          </div>

                          <h3 className="mt-3.5 font-display text-lg font-semibold text-[#241B14] tracking-wide">
                            {activeCase.giftKeepsake.title}
                          </h3>

                          <p className="mt-1 font-serif-body text-xs text-[#4F3822] max-w-[270px] leading-relaxed">
                            {activeCase.giftKeepsake.journalCaption}
                          </p>

                          <button
                            type="button"
                            onClick={handleInspectKeepsake}
                            className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1 text-[11px] font-serif-body font-medium text-[#5B2228] bg-[#F6E8C7] hover:bg-[#ECD9AD] border border-[#A57D42] rounded-[2px] transition-colors whitespace-nowrap shrink-0"
                          >
                            {activeCase.giftKeepsake.interactiveType === 'silver-bell' ? (
                              <Music className="w-3.5 h-3.5 text-[#9B6B28]" />
                            ) : (
                              <Feather className="w-3.5 h-3.5 text-[#8E2D20]" />
                            )}
                            <span>
                              {activeCase.giftKeepsake.interactiveType === 'silver-bell'
                                ? '轻摇银铃聆听'
                                : isGiftInspected
                                  ? '收起封存密语'
                                  : '启封查看密语'}
                            </span>
                          </button>

                          {isGiftInspected && (
                            <p className="mt-2.5 px-3 py-1.5 rounded-[2px] bg-[#FAF0D6] border border-[#BFA06C] font-handwriting text-[16px] text-[#5B311A] leading-snug max-w-[280px]">
                              “{activeCase.giftKeepsake.hiddenWhisper}”
                            </p>
                          )}
                        </div>
                      </MagicRelicFrame>
                    </div>
                  </div>
                ) : isResolved ? (
                  <div className="relative z-10 my-auto flex flex-col items-center text-center">
                    <div className="relative w-full max-w-[340px]">
                      <AntiquePhotoCorners tone="brass" />
                      <MagicRelicFrame season={activeCase.season}>
                        <div className="flex flex-col items-center text-center py-2">
                          <div className="p-3 rounded-[3px] border border-[#8E6A34] bg-[#F8EED7] shadow-inner">
                            <GiftKeepsakeIllustration
                              giftId={activeCase.giftKeepsake.id}
                              className="w-34 h-34 sm:w-40 sm:h-40 opacity-95"
                            />
                          </div>
                          <p className="mt-3 font-display text-base font-semibold text-[#241B14]">
                            {activeCase.giftKeepsake.title}
                          </p>
                          <p className="font-handwriting text-[16px] text-[#5E462F] mt-1 mb-3">
                            {activeCase.guestName} 留下的临别信物
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              libraryAudio.playMagicChime();
                              onCollectGift(activeCase.giftKeepsake.id);
                            }}
                            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-serif-body font-medium text-[#FAF6EE] victorian-wax-btn rounded-[2px] transition-colors whitespace-nowrap shrink-0"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>装裱并钤火漆入册</span>
                          </button>
                        </div>
                      </MagicRelicFrame>
                    </div>
                  </div>
                ) : (
                  <div className="relative z-10 my-auto mx-auto w-full max-w-[330px] flex flex-col items-center text-center p-7 rounded-[3px] border border-dashed border-[#A98852] bg-[#EAD6AA]/72">
                    <AntiquePhotoCorners tone="kraft" />
                    <div className="w-32 h-32 rounded-[3px] border-2 border-dashed border-[#9E7C4B] bg-[#F3E5C3]/55 flex items-center justify-center text-[#7D5E36] mb-4">
                      <SeasonSigilIcon season={activeCase.season} className="w-12 h-12 opacity-70" />
                    </div>
                    <p className="font-display text-base font-semibold text-[#42301F]">
                      待装裱信物图版
                    </p>
                    <p className="font-handwriting text-[16px] text-[#63482D] mt-1.5 leading-snug">
                      解开 {activeCase.guestName} 的心结后，信物将装裱于此页并钤印红泥火漆。
                    </p>
                  </div>
                )}

                {/* Bottom Right Pagination */}
                <div className="relative z-10 mt-5 pt-2.5 border-t border-[#B79867] flex items-center justify-between gap-2">
                  <p className="font-handwriting text-[15px] text-[#63482D] truncate">
                    {isGiftCollected ? activeCase.giftKeepsake.subtitle : '一物一梦 · 见字如面'}
                  </p>

                  <button
                    type="button"
                    disabled={selectedCaseIdx >= cases.length - 1}
                    onClick={() => handleTurnToPage(selectedCaseIdx + 1)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-serif-body font-medium text-[#46311E] hover:text-[#8E2D20] border border-[#B2905B] bg-[#F5E8C8]/90 rounded-[2px] disabled:opacity-35 disabled:pointer-events-none transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>翻至下卷</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tactile Satin Bookmark Ribbon Tabs Below Heavy Hardcover Book */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
        {cases.map((c, idx) => {
          const selected = idx === selectedCaseIdx;
          const hasGift = collectedGiftIds.includes(c.giftKeepsake.id);
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => handleTurnToPage(idx)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-serif-body rounded-[3px] border transition-all whitespace-nowrap shrink-0 ${
                selected
                  ? 'bg-[#EFE0BA] border-[#C89F55] text-[#241B14] font-semibold shadow-md -translate-y-0.5'
                  : 'bg-[#3D161A]/94 border-[#8D6839]/75 text-[#EAD8B8] hover:bg-[#521D22]'
              }`}
            >
              <SeasonSigilIcon season={c.season} glowing={hasGift} className="w-4 h-4 shrink-0" />
              <span>{c.guestName}</span>
              {hasGift && <Check className="w-3.5 h-3.5 text-[#8E2D20]" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

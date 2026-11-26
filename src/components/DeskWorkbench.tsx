import React, { useState } from 'react';
import { BookOpen, Check, Search, Sparkles, X } from 'lucide-react';
import { EvidenceItem, GamePhase, GuestCase } from '../types/game';
import { VictorianCornerFiligree } from './VictorianOrnaments';
import {
  GiftKeepsakeIllustration,
  KeepsakeIllustration,
  SeasonSigilIcon,
} from './VisualKeepsakes';

const ROMAN_SLOTS = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ'] as const;
const DESK_OAK_ART = '/src/assets/images/desk_foreground_oak_clean.jpg';

const BrassCornerMount: React.FC<{ position: 'tl' | 'tr' | 'bl' | 'br' }> = ({
  position,
}) => {
  const rotateMap = {
    tl: '',
    tr: 'scale-x-[-1]',
    bl: 'scale-y-[-1]',
    br: 'scale-[-1]',
  };
  const posMap = {
    tl: '-top-[2px] -left-[2px]',
    tr: '-top-[2px] -right-[2px]',
    bl: '-bottom-[2px] -left-[2px]',
    br: '-bottom-[2px] -right-[2px]',
  };

  return (
    <svg
      viewBox="0 0 28 28"
      aria-hidden="true"
      className={`pointer-events-none absolute ${posMap[position]} ${rotateMap[position]} w-6 h-6 z-10`}
    >
      <path
        d="M2 24 L2 4 Q2 2 4 2 L24 2 L20 7.5 L7.5 7.5 L7.5 20 Z"
        fill="url(#deskBrassGrad)"
        stroke="#241B14"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="5.2" cy="5.2" r="1.2" fill="#4A3519" />
      <defs>
        <linearGradient id="deskBrassGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E4C178" />
          <stop offset="55%" stopColor="#B89049" />
          <stop offset="100%" stopColor="#7C5C28" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const BrassDrawerPull: React.FC = () => (
  <svg
    viewBox="0 0 88 24"
    aria-hidden="true"
    className="w-20 h-5 shrink-0 opacity-95"
  >
    {/* Left & Right Rosette Backplates */}
    <circle cx="16" cy="9" r="4.5" fill="#C7A055" stroke="#241B14" strokeWidth="1.4" />
    <circle cx="16" cy="9" r="1.6" fill="#5A401B" />
    <circle cx="72" cy="9" r="4.5" fill="#C7A055" stroke="#241B14" strokeWidth="1.4" />
    <circle cx="72" cy="9" r="1.6" fill="#5A401B" />
    {/* Bail Handle */}
    <path
      d="M16 10 C16 19, 26 20, 44 20 C62 20, 72 19, 72 10"
      fill="none"
      stroke="#241B14"
      strokeWidth="4.4"
      strokeLinecap="round"
    />
    <path
      d="M16 10 C16 19, 26 20, 44 20 C62 20, 72 19, 72 10"
      fill="none"
      stroke="#CFA95E"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

interface DeskWorkbenchProps {
  phase: GamePhase;
  currentCase: GuestCase;
  collectedEvidenceIds: string[];
  collectedGiftIds: string[];
  hasServedTea: boolean;
  hasMoreGuests: boolean;
  onOpenShelves: () => void;
  onOpenBookModal: () => void;
  onOpenKnotModal: () => void;
  onCollectGift: (giftId: string) => void;
  onNextGuest: () => void;
  onOpenArchive: () => void;
}

export const DeskWorkbench: React.FC<DeskWorkbenchProps> = ({
  phase,
  currentCase,
  collectedEvidenceIds,
  collectedGiftIds,
  hasServedTea,
  hasMoreGuests,
  onOpenShelves,
  onOpenBookModal,
  onOpenKnotModal,
  onCollectGift,
  onNextGuest,
  onOpenArchive,
}) => {
  const [previewItem, setPreviewItem] = useState<EvidenceItem | null>(null);
  const [deskImgFailed, setDeskImgFailed] = useState(false);

  const allCollected = collectedEvidenceIds.length >= currentCase.evidence.length;
  const isGiftCollected = collectedGiftIds.includes(currentCase.giftKeepsake.id);

  return (
    <footer
      aria-label="馆长橡木书桌"
      className="relative z-20 w-full shrink-0 border-t-[3px] border-[#241B14] bg-[#5E3E25] select-none"
    >
      {/* Top Sunlit Beveled Wood Edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-[#E2BC7B]/60 z-20"
      />

      {/* UPPER DESK SURFACE: Warm Hand-Painted Oak Desktop + Inlaid Green Leather Blotter */}
      <div className="relative px-4 sm:px-8 pt-3 pb-3.5 sm:pt-3.5 sm:pb-4 bg-gradient-to-b from-[#8A5F3D] via-[#714B2E] to-[#563720]">
        {/* Isolated Woodgrain Texture Backdrop (clipped separately so floating keepsake tips never clip) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          {!deskImgFailed && (
            <img
              src={DESK_OAK_ART}
              alt=""
              referrerPolicy="no-referrer"
              onError={() => setDeskImgFailed(true)}
              className="w-full h-full object-cover object-top opacity-35 mix-blend-multiply"
            />
          )}
          <div className="absolute inset-x-0 top-[28%] h-[1px] bg-[#241B14]/25" />
          <div className="absolute inset-x-0 top-[68%] h-[1px] bg-[#241B14]/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#241B14]/22 via-transparent to-[#241B14]/22" />
        </div>

        {/* Centered Inlaid Victorian Burgundy Oxblood Leather Blotter Pad with Brass Corners */}
        <div className="relative z-10 max-w-5xl mx-auto rounded-[3px] border-[2px] border-[#241B14] bg-burgundy-blotter p-2 sm:p-2.5">
          <BrassCornerMount position="tl" />
          <BrassCornerMount position="tr" />
          <BrassCornerMount position="bl" />
          <BrassCornerMount position="br" />

          {/* Stitched Inner Gold-Brass Leather Border */}
          <div className="rounded-[2px] border border-dashed border-[#C89F55]/50 p-2 sm:p-2.5">
            <div className="grid grid-cols-1 md:grid-cols-[1.35fr_1fr] gap-2.5 sm:gap-3.5 items-stretch">
              {/* LEFT ARCHIVAL STATIONERY SHEET: Current Case Duty & Primary Desk Action */}
              <div className="relative bg-vintage-folio desk-ink-card rounded-[2px] p-1 text-[#262019]">
                <VictorianCornerFiligree color="#9B753D" sizeClass="w-4 h-4" />
                <div className="h-full gilt-hairline-frame rounded-[1px] px-3.5 py-2 sm:px-4 sm:py-2.5 flex flex-col justify-between gap-2">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <SeasonSigilIcon
                      season={currentCase.season}
                      glowing={phase === 'CASE_CLEARED' || phase === 'KNOT_RESOLUTION'}
                      className="w-7 h-7 shrink-0 mt-0.5"
                    />
                    <div className="min-w-0">
                      {phase === 'GUEST_ARRIVING' && (
                        <>
                          <p className="font-display text-xs sm:text-[13px] font-semibold text-[#231B14] truncate">
                            值班登记笺 · {currentCase.guestName} 候于馆门
                          </p>
                          <p className="mt-0.5 text-[11px] font-serif-body text-[#584D3E] leading-snug">
                            轻触门口的访客，请对方坐到书桌对面倾听心结
                          </p>
                        </>
                      )}

                      {phase === 'DESK_DIALOGUE' && (
                        <>
                          <p className="font-display text-xs sm:text-[13px] font-semibold text-[#231B14] truncate">
                            待寻书目：《{currentCase.bookTitle}》
                            <span className="ml-2 font-mono text-[10.5px] font-normal text-[#725E44] tabular-nums">
                              {currentCase.bookCallNumber}
                            </span>
                          </p>
                          <p className="mt-0.5 text-[11px] font-serif-body text-[#584D3E] leading-snug">
                            {hasServedTea
                              ? '已奉洋甘菊茶解锁深层线索 · 可前往四季书架寻书'
                              : '可点选左上方花茶与暖灯，或直接前往四季书架寻书'}
                          </p>
                        </>
                      )}

                      {(phase === 'BOOK_INSPECTION' || phase === 'SHELF_SEARCH') && (
                        <>
                          <p className="font-display text-xs sm:text-[13px] font-semibold text-[#231B14] truncate">
                            案头摊卷：《{currentCase.bookTitle}》
                          </p>
                          <p className="mt-0.5 text-[11px] font-serif-body text-[#584D3E] tabular-nums leading-snug">
                            已拾取梦境信物 {collectedEvidenceIds.length} / {currentCase.evidence.length} · 翻阅书页以集齐信物
                          </p>
                        </>
                      )}

                      {phase === 'KNOT_RESOLUTION' && (
                        <>
                          <p className="font-display text-xs sm:text-[13px] font-semibold text-[#231B14] truncate">
                            入梦仪式 · {currentCase.knot.dreamTitle}
                          </p>
                          <p className="mt-0.5 text-[11px] font-serif-body text-[#584D3E] leading-snug">
                            信物已陈列妥当，请在书桌垫上推演并解开季节心结
                          </p>
                        </>
                      )}

                      {phase === 'CASE_CLEARED' && (
                        <>
                          <p className="font-display text-xs sm:text-[13px] font-semibold text-[#231B14] truncate">
                            临别回礼：{currentCase.giftKeepsake.title}
                          </p>
                          <p className="mt-0.5 text-[11px] font-serif-body text-[#584D3E] leading-snug">
                            {isGiftCollected
                              ? '已贴入梦境手帐本 · 可迎接下一位季节访客'
                              : '访客临别时留在酒红皮垫桌角的小小信物'}
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Bottom Action Line on the Stationery Sheet */}
                  <div className="pt-1.5 border-t border-dashed border-[#D1BE9B] flex items-center justify-between gap-3">
                    <span className="text-[10.5px] font-serif-body italic text-[#73634D] truncate">
                      {currentCase.guestName} · {currentCase.occupation}
                    </span>

                    <div className="flex items-center gap-2 shrink-0">
                      {phase === 'DESK_DIALOGUE' && (
                        <button
                          type="button"
                          onClick={onOpenShelves}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-serif-body font-medium text-[#FAF6EE] victorian-wax-btn rounded-sm transition-colors whitespace-nowrap shrink-0"
                        >
                          <Search className="w-3.5 h-3.5" />
                          <span>前往书架寻书</span>
                        </button>
                      )}

                      {(phase === 'BOOK_INSPECTION' || phase === 'SHELF_SEARCH') && (
                        <>
                          <button
                            type="button"
                            onClick={onOpenBookModal}
                            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-serif-body font-medium text-[#2A2118] bg-[#EFE3CA] hover:bg-[#E4D3B2] border border-[#8D7654] rounded-sm transition-colors whitespace-nowrap shrink-0"
                          >
                            <BookOpen className="w-3.5 h-3.5 text-[#963E2A]" />
                            <span>翻开梦境书</span>
                          </button>
                          {allCollected && (
                            <button
                              type="button"
                              onClick={onOpenKnotModal}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-serif-body font-medium text-[#FAF6EE] victorian-wax-btn rounded-sm transition-colors whitespace-nowrap shrink-0"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>进入梦境</span>
                            </button>
                          )}
                        </>
                      )}

                      {phase === 'KNOT_RESOLUTION' && (
                        <button
                          type="button"
                          onClick={onOpenKnotModal}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-serif-body font-medium text-[#FAF6EE] victorian-wax-btn rounded-sm transition-colors whitespace-nowrap shrink-0"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>展开梦境解析桌</span>
                        </button>
                      )}

                      {phase === 'CASE_CLEARED' && (
                        <>
                          {!isGiftCollected ? (
                            <button
                              type="button"
                              onClick={() => onCollectGift(currentCase.giftKeepsake.id)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-serif-body font-medium text-[#FAF6EE] victorian-wax-btn rounded-sm transition-colors whitespace-nowrap shrink-0"
                            >
                              <GiftKeepsakeIllustration
                                giftId={currentCase.giftKeepsake.id}
                                className="w-4 h-4 shrink-0"
                              />
                              <span>收入手帐本</span>
                            </button>
                          ) : hasMoreGuests ? (
                            <button
                              type="button"
                              onClick={onNextGuest}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-serif-body font-medium text-[#2A2118] bg-[#EFE3CA] hover:bg-[#E4D3B2] border border-[#8D7654] rounded-sm transition-colors whitespace-nowrap shrink-0"
                            >
                              <Check className="w-3.5 h-3.5 text-[#8E2D20]" />
                              <span>迎接下位客人</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={onOpenArchive}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-serif-body font-medium text-[#FAF6EE] victorian-wax-btn rounded-sm transition-colors whitespace-nowrap shrink-0"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>翻看四季手帐</span>
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT ARCHIVAL SPECIMEN TRAY: 4 Stamped Evidence Slots Mounted on Blotter */}
              <div className="relative bg-vintage-folio desk-ink-card rounded-[2px] p-1 text-[#262019]">
                <VictorianCornerFiligree color="#9B753D" sizeClass="w-4 h-4" />
                <div className="h-full gilt-hairline-frame rounded-[1px] px-3.5 py-2 flex flex-col justify-between gap-1.5">
                  <div className="flex items-center justify-between gap-2 border-b border-dashed border-[#D1BE9B] pb-1">
                    <span className="font-display text-xs font-semibold text-[#2B2219]">
                      案头信物陈列卡
                    </span>
                    <span className="text-[11px] font-serif-body text-[#645745] tabular-nums">
                      入梦凭证 {collectedEvidenceIds.length} / {currentCase.evidence.length}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                    {currentCase.evidence.map((ev, idx) => {
                      const collected = collectedEvidenceIds.includes(ev.id);
                      const activePreview = previewItem?.id === ev.id;

                      return (
                        <button
                          key={ev.id}
                          type="button"
                          disabled={!collected}
                          onClick={() => setPreviewItem(activePreview ? null : ev)}
                          title={
                            collected
                              ? `${ev.title}（点击在桌面查看用途与线索）`
                              : `信物 ${ROMAN_SLOTS[idx]}（翻阅梦境书拾取后作入梦破咒凭证）`
                          }
                          className={`relative min-h-[60px] px-1 py-1.5 rounded-[2px] border flex flex-col items-center justify-center gap-1 transition-all ${
                            collected
                              ? activePreview
                                ? 'bg-gradient-to-b from-[#FFFDF7] to-[#F5E7C4] border-[#8E2D20] ring-1 ring-[#8E2D20]/55 text-[#231B14] shadow-sm -translate-y-0.5'
                                : 'bg-gradient-to-b from-[#FCF7E8] to-[#EFE0BE] border-[#9E783B] text-[#231B14] hover:border-[#8E2D20] hover:-translate-y-0.5 shadow-xs'
                              : 'border-dashed border-[#B59867] bg-[#E8D9B7]/75 text-[#755E3E] cursor-default'
                          }`}
                        >
                          {collected ? (
                            <>
                              <KeepsakeIllustration id={ev.id} className="w-8 h-8 shrink-0" />
                              <span className="text-[10px] font-serif-body font-semibold leading-tight truncate max-w-full">
                                {ev.title}
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="font-display text-xs tracking-wider opacity-75">
                                {ROMAN_SLOTS[idx]}
                              </span>
                              <span className="text-[9.5px] font-serif-body opacity-65">待拾取</span>
                            </>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Unclipped Vintage Specimen Folio Tooltip Floating Cleanly Above Oak Desk */}
                {previewItem && (
                  <div
                    role="region"
                    aria-label={`信物线索 · ${previewItem.title}`}
                    className="absolute bottom-full right-0 mb-3 w-80 sm:w-[360px] rounded-[3px] bg-vintage-folio desk-ink-card text-[#262019] p-1.5 z-40"
                  >
                    <VictorianCornerFiligree color="#9B753D" sizeClass="w-4 h-4" />
                    <div className="gilt-hairline-frame rounded-[1px] px-3.5 py-2.5 space-y-2">
                      <div className="flex items-start justify-between gap-2.5">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="p-1 rounded-[3px] border border-[#9E783B] bg-[#F7ECD4] shrink-0 shadow-xs">
                            <KeepsakeIllustration id={previewItem.id} className="w-12 h-12" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-display text-xs sm:text-[13px] font-semibold text-[#231B14] truncate">
                              {previewItem.title}
                            </p>
                            <p className="text-[10.5px] font-serif-body text-[#7D3222] font-medium">
                              入梦破咒凭证 · 第 {previewItem.originPage} 页拾获
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setPreviewItem(null)}
                          aria-label="收起信物详情"
                          className="p-1 text-[#6C5B46] hover:text-[#231B14] rounded-sm transition-colors shrink-0"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11.5px] font-serif-body text-[#342A21] leading-relaxed">
                        {previewItem.summary}
                      </p>

                      <p className="pt-1 border-t border-dashed border-[#CDB892] text-[10.5px] font-serif-body italic text-[#665643] leading-snug">
                        “{previewItem.quote}”
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LOWER DESK ARCHITECTURE: Beveled Front Wood Lip & Twin Brass-Pull Drawers */}
      <div
        aria-hidden="true"
        className="relative border-t-[2px] border-[#241B14] bg-gradient-to-b from-[#6C472A] via-[#4F321C] to-[#3A2313]"
      >
        {/* Crisp Carved Bevel Highlight */}
        <div className="h-[3px] bg-[#9E7047]/45 border-b border-[#241B14]/70" />

        {/* Recessed Drawer Apron with Symmetrical Tarnished Brass Handles */}
        <div className="max-w-5xl mx-auto px-8 sm:px-14 py-1.5 flex items-center justify-between gap-6">
          <div className="flex-1 h-7 rounded-[2px] border border-[#241B14]/85 bg-gradient-to-b from-[#553620] to-[#3F2614] flex items-center justify-center">
            <BrassDrawerPull />
          </div>

          <div className="hidden sm:flex w-12 h-7 items-center justify-center">
            <div className="w-3 h-4 rounded-t-full rounded-b-xs border border-[#241B14] bg-[#B48E48]" />
          </div>

          <div className="flex-1 h-7 rounded-[2px] border border-[#241B14]/85 bg-gradient-to-b from-[#553620] to-[#3F2614] flex items-center justify-center">
            <BrassDrawerPull />
          </div>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { Volume2, VolumeX, BookMarked, RotateCcw, FastForward, Feather } from 'lucide-react';
import { GamePhase, SeasonId } from '../types/game';
import { SeasonSigilIcon } from './VisualKeepsakes';

interface TopHudBarProps {
  phase: GamePhase;
  season?: SeasonId;
  guestIndex: number;
  totalGuests: number;
  guestName?: string;
  collectedCount: number;
  totalEvidenceCount: number;
  collectedGiftCount: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenArchive: () => void;
  onOpenPrologue: () => void;
  onQuickClearAll: () => void;
  onReturnTitle: () => void;
}

const PHASE_LABELS: Record<GamePhase, string> = {
  TITLE_MENU: '迎客准备',
  INTRO_PROLOGUE: '守梦手谕',
  GUEST_ARRIVING: '门扉轻响',
  DESK_DIALOGUE: '桌前倾听',
  SHELF_SEARCH: '书架寻梦',
  BOOK_INSPECTION: '翻阅取证',
  KNOT_RESOLUTION: '入梦解结',
  CASE_CLEARED: '心结已解',
};

import { PaperFiberOverlay } from './VictorianOrnaments';

export const TopHudBar: React.FC<TopHudBarProps> = ({
  phase,
  season,
  guestIndex,
  totalGuests,
  guestName,
  collectedCount,
  totalEvidenceCount,
  collectedGiftCount,
  isMuted,
  onToggleMute,
  onOpenArchive,
  onOpenPrologue,
  onQuickClearAll,
  onReturnTitle,
}) => {
  return (
    <header className="relative z-30 flex items-center justify-between gap-6 px-5 sm:px-7 py-2 bg-vintage-folio border-b border-[#8B683C]/80 text-[#241B14] shadow-sm overflow-hidden">
      <PaperFiberOverlay idSuffix="top-hud" light />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[2px] h-[1px] bg-gradient-to-r from-[#C89F55]/25 via-[#D5B063]/85 to-[#C89F55]/25 z-10"
      />

      {/* Zone 1: Brand Title (Returns to Title Menu) */}
      <button
        type="button"
        onClick={onReturnTitle}
        title="点击返回图书馆首页主菜单"
        className="relative z-10 group inline-flex items-baseline gap-2 font-display text-base sm:text-lg font-semibold tracking-tight text-[#241B14] hover:text-[#8E2D20] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8E2D20]"
      >
        <span>晨露梦境图书馆</span>
        <span className="hidden lg:inline text-[10.5px] font-serif-body font-normal text-[#7A6142] group-hover:text-[#8E2D20] transition-colors">
          · 回首页
        </span>
      </button>

      {/* Zone 2: Clean unboxed serif metadata status with seasonal sigil */}
      <div className="relative z-10 hidden md:flex items-center gap-3 text-xs font-serif-body text-[#5C4B38] tabular-nums whitespace-nowrap overflow-hidden">
        {season && <SeasonSigilIcon season={season} className="w-4 h-4 shrink-0" />}
        <span>
          来客 {guestIndex + 1} / {totalGuests}
          {guestName ? ` · ${guestName}` : ''}
        </span>
        <span aria-hidden="true" className="text-[#B89352]">·</span>
        <span className="font-semibold text-[#241B14]">{PHASE_LABELS[phase]}</span>
        <span aria-hidden="true" className="text-[#B89352]">·</span>
        <span>
          信物 {collectedCount} / {totalEvidenceCount}
        </span>
      </div>

      {/* Zone 3: Quiet Editorial Action Controls with Delicate Gilt Dividers */}
      <div className="relative z-10 flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          type="button"
          onClick={onQuickClearAll}
          title="测试模式：一键通关四季全部章节"
          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-serif-body font-medium text-[#FAF2E2] bg-[#5B2228] hover:bg-[#49191E] border border-[#C89F55]/75 rounded-[2px] shadow-xs transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#8E2D20]"
        >
          <FastForward className="w-3 h-3 text-[#E5C175]" />
          <span>一键通关</span>
        </button>

        <span aria-hidden="true" className="h-3 w-[1px] bg-[#C8A460]/60" />

        <button
          type="button"
          onClick={onOpenPrologue}
          title="重温守梦人值班手谕"
          className="hidden sm:inline-flex items-center gap-1 px-1.5 py-1 text-xs font-serif-body font-medium text-[#52402C] hover:text-[#8E2D20] transition-colors whitespace-nowrap shrink-0"
        >
          <Feather className="w-3.5 h-3.5 text-[#8E2D20]" />
          <span>手谕</span>
        </button>

        <span aria-hidden="true" className="hidden sm:inline h-3 w-[1px] bg-[#C8A460]/60" />

        <button
          type="button"
          onClick={onOpenArchive}
          className="inline-flex items-center gap-1.5 px-1.5 py-1 text-xs font-serif-body font-medium text-[#3B291C] hover:text-[#8E2D20] transition-colors whitespace-nowrap shrink-0 tabular-nums focus-visible:outline-2 focus-visible:outline-[#8E2D20]"
        >
          <BookMarked className="w-3.5 h-3.5 text-[#8E2D20]" />
          <span>手帐 ({collectedGiftCount}/{totalGuests})</span>
        </button>

        <span aria-hidden="true" className="h-3 w-[1px] bg-[#C8A460]/60" />

        <button
          type="button"
          onClick={onToggleMute}
          aria-label={isMuted ? '开启馆内音效' : '静音'}
          className="inline-flex items-center gap-1.5 px-1.5 py-1 text-xs font-serif-body text-[#5A4936] hover:text-[#241B14] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#8E2D20]"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{isMuted ? '静音' : '音效'}</span>
        </button>

        <span aria-hidden="true" className="h-3 w-[1px] bg-[#C8A460]/60" />

        <button
          type="button"
          onClick={onReturnTitle}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-serif-body font-medium text-[#3A2B1D] hover:text-[#241B14] border border-[#C29C56]/80 bg-[#FAF5E7] hover:bg-[#F2E6CB] rounded-[2px] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C572C]"
        >
          <RotateCcw className="w-3 h-3 text-[#8E6A34]" />
          <span>主菜单</span>
        </button>
      </div>
    </header>
  );
};

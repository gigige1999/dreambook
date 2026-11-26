import React from 'react';
import { BookMarked, Home, Volume2, VolumeX } from 'lucide-react';
import { PaperFiberOverlay } from './VictorianOrnaments';

interface TopHudBarProps {
  collectedGiftCount: number;
  totalGuests: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenArchive: () => void;
  onReturnTitle: () => void;
}

/**
 * 极简顶栏：归位、手帐、静音。不放馆名、阶段、来客姓名等重复信息。
 */
export const TopHudBar: React.FC<TopHudBarProps> = ({
  collectedGiftCount,
  totalGuests,
  isMuted,
  onToggleMute,
  onOpenArchive,
  onReturnTitle,
}) => {
  return (
    <header className="relative z-30 flex items-center justify-between px-4 sm:px-6 py-1.5 bg-vintage-folio border-b border-[#8B683C]/70 text-[#241B14] overflow-hidden">
      <PaperFiberOverlay idSuffix="top-hud" light />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[1px] h-[1px] bg-gradient-to-r from-transparent via-[#D5B063]/70 to-transparent z-10"
      />

      <button
        type="button"
        onClick={onReturnTitle}
        title="回到首页"
        aria-label="回到首页"
        className="relative z-10 inline-flex items-center gap-1.5 py-1 text-[#5A4936] hover:text-[#8E2D20] transition-colors focus-visible:outline-2 focus-visible:outline-[#8E2D20]"
      >
        <Home className="w-3.5 h-3.5" />
      </button>

      <div className="relative z-10 flex items-center gap-4">
        <button
          type="button"
          onClick={onOpenArchive}
          title="梦境手帐"
          className="inline-flex items-center gap-1.5 py-1 text-[11px] font-serif-body text-[#3B291C] hover:text-[#8E2D20] transition-colors tabular-nums"
        >
          <BookMarked className="w-3.5 h-3.5 text-[#8E2D20]" />
          <span>
            {collectedGiftCount}/{totalGuests}
          </span>
        </button>

        <button
          type="button"
          onClick={onToggleMute}
          aria-label={isMuted ? '开启音效' : '静音'}
          title={isMuted ? '开启音效' : '静音'}
          className="py-1 text-[#5A4936] hover:text-[#241B14] transition-colors"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>
    </header>
  );
};

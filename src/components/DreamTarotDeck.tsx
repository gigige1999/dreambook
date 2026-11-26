import React from 'react';
import { RefreshCw, RotateCw } from 'lucide-react';

export type TarotArtworkId =
  | 'sow'
  | 'wait'
  | 'bloom'
  | 'farewell'
  | 'forever'
  | 'lie'
  | 'prelude'
  | 'watch'
  | 'seats'
  | 'crack'
  | 'gold-key'
  | 'forgive'
  | 'ticket'
  | 'erase'
  | 'metronome'
  | 'hearth'
  | 'tea'
  | 'home'
  | 'ledger'
  | 'chain'
  | 'gilded-photo'
  | 'past-gear'
  | 'ice-crystal'
  | 'future-gear'
  | 'warm-ember'
  | 'frost-flame';

export type CardOrientation = 'upright' | 'reversed';

export interface TarotCardData {
  id: string;
  roman: string;
  title: string;
  motif: string;
  artwork: TarotArtworkId;
  tone?: 'ivory' | 'taboo' | 'ember' | 'stone';
  supportsOrientation?: boolean;
  backTitle: string;
  backInscription: string;
  backTag?: string;
}

export const TarotArtwork: React.FC<{
  id: TarotArtworkId;
  inverted?: boolean;
  className?: string;
}> = ({ id, inverted = false, className = 'w-14 h-14' }) => {
  const stroke = inverted ? '#F6EBCE' : '#241B14';
  const accent = inverted ? '#E8C574' : '#963E2A';
  const leaf = inverted ? '#9FD4A4' : '#4D7B55';
  const frost = inverted ? '#B7DCF8' : '#4F7492';

  switch (id) {
    case 'sow':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <path d="M8 35 Q24 29 40 35 L38 41 H10 Z" fill="#8C6342" stroke={stroke} strokeWidth="1.4" />
          <ellipse cx="24" cy="24" rx="5.5" ry="7.8" fill="#DFBD6E" stroke={stroke} strokeWidth="1.4" />
          <path d="M24 14 V7 M18 16 L14 11 M30 16 L34 11" stroke={accent} strokeWidth="1.4" strokeLinecap="round" />
          <path d="M13 38 H35" stroke="#533721" strokeWidth="0.9" strokeDasharray="2 2" />
        </svg>
      );
    case 'wait':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <path d="M24 9 C18 19, 14 27, 18 34 C21 38, 27 38, 30 34 C34 27, 30 19, 24 9 Z" fill="#A6D4C2" stroke={stroke} strokeWidth="1.5" />
          <path d="M21 26 Q23 31 26 32" stroke="#FFFFFF" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <circle cx="24" cy="24" r="15" fill="none" stroke={stroke} strokeWidth="0.7" strokeDasharray="1.5 3" opacity="0.5" />
        </svg>
      );
    case 'bloom':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <path d="M24 41 V24" stroke={leaf} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M24 34 Q18 32 16 28 M24 32 Q30 30 32 26" stroke={leaf} strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <circle cx="24" cy="18" r="4.5" fill="#EBBF59" stroke={stroke} strokeWidth="1.3" />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <ellipse
              key={deg}
              cx="24"
              cy="10.2"
              rx="3.2"
              ry="5"
              fill="#FCF7E8"
              stroke={stroke}
              strokeWidth="1.1"
              transform={`rotate(${deg} 24 18)`}
            />
          ))}
        </svg>
      );
    case 'farewell':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <path d="M32 9 A12 12 0 1 0 38 25 A9 9 0 1 1 32 9 Z" fill="#F2D27B" stroke={stroke} strokeWidth="1.3" />
          <path d="M10 35 Q20 27 34 29" stroke={leaf} strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
          <ellipse cx="16" cy="24" rx="4.2" ry="2.2" fill="#E8C26E" stroke={stroke} strokeWidth="1.1" transform="rotate(-24 16 24)" />
          <ellipse cx="26" cy="18" rx="3.8" ry="2" fill="#FAF2DE" stroke={stroke} strokeWidth="1.1" transform="rotate(-12 26 18)" />
        </svg>
      );
    case 'forever':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <circle cx="24" cy="24" r="13" fill="none" stroke="#C98D54" strokeWidth="3.8" />
          <circle cx="24" cy="24" r="13" fill="none" stroke={stroke} strokeWidth="1.2" />
          <path d="M12 14 Q24 22 36 14 M12 34 Q24 26 36 34" stroke={accent} strokeWidth="1.6" fill="none" />
        </svg>
      );
    case 'lie':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <path d="M24 38 V20" stroke="#7A736D" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M24 22 C16 18, 16 28, 22 29" fill="none" stroke="#7A736D" strokeWidth="1.6" />
          <circle cx="24" cy="17" r="6" fill="#6E6661" stroke={stroke} strokeWidth="1.3" />
          <path d="M16 13 L32 29 M32 13 L16 29" stroke="#C96452" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    // --- SUMMER ---
    case 'prelude':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <rect x="10" y="12" width="28" height="24" rx="2" fill="#FBF2DA" stroke={stroke} strokeWidth="1.4" />
          <path d="M14 20 H34 M14 25 H34 M14 30 H28" stroke="#8C7B63" strokeWidth="1.2" />
          <path d="M25 11 L22 24 L27 28 L23 37" stroke={accent} strokeWidth="1.6" fill="none" />
        </svg>
      );
    case 'watch':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <rect x="21" y="7" width="6" height="4" rx="1" fill="#C9A255" stroke={stroke} strokeWidth="1.2" />
          <circle cx="24" cy="26" r="13" fill="#FAF4E4" stroke="#8B6A36" strokeWidth="2.4" />
          <path d="M24 26 V18 M24 26 L31 29" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'seats':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <path d="M12 16 H36 V28 H12 Z" fill="#9E483C" stroke={stroke} strokeWidth="1.4" />
          <rect x="10" y="28" width="28" height="7" rx="1.5" fill="#B55B4D" stroke={stroke} strokeWidth="1.4" />
          <path d="M14 35 V40 M34 35 V40" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'crack':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <polygon points="10,10 38,10 38,38 10,38" fill="#2A2F38" stroke="#8C4238" strokeWidth="1.5" />
          <path d="M14 10 L25 22 L19 27 L31 38" stroke="#E06D58" strokeWidth="2.2" fill="none" />
        </svg>
      );
    case 'gold-key':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <rect x="16" y="10" width="16" height="28" rx="2" fill="#FFFDF5" stroke={stroke} strokeWidth="1.5" />
          <rect x="20" y="10" width="8" height="14" fill="#262E38" />
          <circle cx="24" cy="31" r="3.5" fill="#E8BE5E" />
        </svg>
      );
    case 'forgive':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <circle cx="18" cy="31" r="4.5" fill="#E8BE5E" stroke={stroke} strokeWidth="1.3" />
          <path d="M22.5 31 V14 L34 11 V27" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="30" cy="27" r="4.5" fill="#E8BE5E" stroke={stroke} strokeWidth="1.3" />
        </svg>
      );
    case 'ticket':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <rect x="8" y="16" width="32" height="16" rx="2" fill="#FAF1DA" stroke={stroke} strokeWidth="1.5" />
          <line x1="29" y1="16" x2="29" y2="32" stroke={stroke} strokeWidth="1.2" strokeDasharray="2 2" />
          <circle cx="35" cy="24" r="2.5" fill="#DFB459" />
        </svg>
      );
    case 'erase':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <path d="M12 34 L34 12 M12 12 L34 34" stroke="#D96854" strokeWidth="3" strokeLinecap="round" />
          <circle cx="23" cy="23" r="13" fill="none" stroke="#B65B4A" strokeWidth="1.6" strokeDasharray="4 3" />
        </svg>
      );
    case 'metronome':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <polygon points="17,11 31,11 36,38 12,38" fill="#8E6C42" stroke={stroke} strokeWidth="1.5" />
          <polygon points="20,14 28,14 31,34 17,34" fill="#F4E6C4" stroke={stroke} strokeWidth="1" />
          <line x1="24" y1="34" x2="34" y2="12" stroke={accent} strokeWidth="2" strokeLinecap="round" />
          <rect x="28" y="17" width="5" height="4" fill="#C9A255" stroke={stroke} strokeWidth="1" />
        </svg>
      );

    // --- AUTUMN ---
    case 'hearth':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <path d="M11 36 V20 C11 13, 37 13, 37 20 V36 Z" fill="#8C5943" stroke={stroke} strokeWidth="1.5" />
          <path d="M24 34 C19 28, 21 20, 24 18 C27 20, 29 28, 24 34 Z" fill="#F09C52" stroke={stroke} strokeWidth="1.1" />
        </svg>
      );
    case 'tea':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <path d="M13 22 H33 C33 32, 28 36, 23 36 C18 36, 13 32, 13 22 Z" fill="#FAF4E4" stroke={stroke} strokeWidth="1.5" />
          <path d="M33 24 C38 24, 38 30, 32 30" fill="none" stroke={stroke} strokeWidth="1.6" />
          <path d="M19 17 Q21 13 19 10 M26 17 Q28 13 26 10" stroke="#C89E54" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      );
    case 'home':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <rect x="10" y="15" width="28" height="20" rx="2" fill="#FAF2DF" stroke={stroke} strokeWidth="1.5" />
          <path d="M10 16 L24 27 L38 16" fill="none" stroke={stroke} strokeWidth="1.3" />
          <circle cx="24" cy="27" r="3.5" fill="#B64B38" stroke={stroke} strokeWidth="1" />
        </svg>
      );
    case 'ledger':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <polygon points="12,35 17,17 31,17 36,35" fill="#6F6D75" stroke={stroke} strokeWidth="1.6" />
          <path d="M18 24 H30 M19 29 H29" stroke="#2D2B30" strokeWidth="1.4" />
        </svg>
      );
    case 'chain':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <rect x="11" y="18" width="14" height="10" rx="5" fill="none" stroke="#64626A" strokeWidth="3.2" transform="rotate(-25 18 23)" />
          <rect x="22" y="19" width="14" height="10" rx="5" fill="none" stroke="#4D4B52" strokeWidth="3.2" transform="rotate(-25 29 24)" />
        </svg>
      );
    case 'gilded-photo':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <rect x="11" y="10" width="26" height="28" rx="1.5" fill="#DFBE74" stroke={stroke} strokeWidth="1.5" />
          <rect x="15" y="14" width="18" height="20" fill="#B79D78" stroke={stroke} strokeWidth="1" />
          <circle cx="24" cy="22" r="4" fill="#6E5A44" />
          <path d="M17 33 C18 28, 30 28, 31 33" fill="#6E5A44" />
        </svg>
      );

    // --- WINTER ---
    case 'past-gear':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <circle cx="24" cy="24" r="11" fill="#8998A8" stroke={stroke} strokeWidth="1.5" />
          <circle cx="24" cy="24" r="4" fill="#323F4D" />
          <path d="M14 14 A14 14 0 1 0 34 14" fill="none" stroke={stroke} strokeWidth="1.5" strokeDasharray="3 2" />
        </svg>
      );
    case 'ice-crystal':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <polygon points="24,8 37,17 33,36 15,36 11,17" fill="#BFE0F7" stroke={frost} strokeWidth="1.6" />
          <path d="M24 12 V34 M14 23 H34" stroke="#FFFFFF" strokeWidth="1.4" />
        </svg>
      );
    case 'future-gear':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <circle cx="24" cy="24" r="11" fill="#DFB664" stroke={stroke} strokeWidth="1.5" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <rect
              key={deg}
              x="22.5"
              y="9"
              width="3"
              height="5"
              fill="#DFB664"
              stroke={stroke}
              strokeWidth="1"
              transform={`rotate(${deg} 24 24)`}
            />
          ))}
          <circle cx="24" cy="24" r="4.2" fill="#63451D" />
        </svg>
      );
    case 'frost-flame':
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <path d="M24 9 C16 19, 14 29, 24 37 C34 29, 32 19, 24 9 Z" fill="#89BFE4" stroke={frost} strokeWidth="1.5" />
          <path d="M24 19 C20 24, 20 30, 24 33 C28 30, 28 24, 24 19 Z" fill="#EBF7FF" />
        </svg>
      );
    case 'warm-ember':
    default:
      return (
        <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
          <path d="M24 9 C16 19, 14 29, 24 37 C34 29, 32 19, 24 9 Z" fill="#E89248" stroke={stroke} strokeWidth="1.5" />
          <path d="M24 19 C20 24, 20 30, 24 33 C28 30, 28 24, 24 19 Z" fill="#FBE094" />
        </svg>
      );
  }
};

/** Delicate Victorian copperplate corner scrollwork */
const CopperplateCorners: React.FC<{ color: string }> = ({ color }) => (
  <>
    <svg viewBox="0 0 18 18" className="pointer-events-none absolute top-1 left-1 w-3.5 h-3.5 opacity-80" aria-hidden="true">
      <path d="M1 14 V3 C1 1.5 1.5 1 3 1 H14 M4 8 C4 5 5 4 8 4" fill="none" stroke={color} strokeWidth="1.15" />
      <circle cx="3.2" cy="3.2" r="0.9" fill={color} />
    </svg>
    <svg viewBox="0 0 18 18" className="pointer-events-none absolute top-1 right-1 w-3.5 h-3.5 opacity-80 scale-x-[-1]" aria-hidden="true">
      <path d="M1 14 V3 C1 1.5 1.5 1 3 1 H14 M4 8 C4 5 5 4 8 4" fill="none" stroke={color} strokeWidth="1.15" />
      <circle cx="3.2" cy="3.2" r="0.9" fill={color} />
    </svg>
    <svg viewBox="0 0 18 18" className="pointer-events-none absolute bottom-1 left-1 w-3.5 h-3.5 opacity-80 scale-y-[-1]" aria-hidden="true">
      <path d="M1 14 V3 C1 1.5 1.5 1 3 1 H14 M4 8 C4 5 5 4 8 4" fill="none" stroke={color} strokeWidth="1.15" />
      <circle cx="3.2" cy="3.2" r="0.9" fill={color} />
    </svg>
    <svg viewBox="0 0 18 18" className="pointer-events-none absolute bottom-1 right-1 w-3.5 h-3.5 opacity-80 scale-[-1]" aria-hidden="true">
      <path d="M1 14 V3 C1 1.5 1.5 1 3 1 H14 M4 8 C4 5 5 4 8 4" fill="none" stroke={color} strokeWidth="1.15" />
      <circle cx="3.2" cy="3.2" r="0.9" fill={color} />
    </svg>
  </>
);

interface TarotCardViewProps {
  card: TarotCardData;
  isFlipped?: boolean;
  hasInspected?: boolean;
  orientation?: CardOrientation;
  isSelected?: boolean;
  isStackedPair?: boolean;
  compact?: boolean;
  hideFlipButton?: boolean;
  isVerifyTargetMode?: boolean;
  verifiedBadgeText?: string | null;
  onSelect?: () => void;
  onToggleFlip?: () => void;
  onToggleOrientation?: () => void;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd?: () => void;
  actionHint?: string;
}

export const TarotCardView: React.FC<TarotCardViewProps> = ({
  card,
  isFlipped = false,
  hasInspected = false,
  orientation = 'upright',
  isSelected = false,
  isStackedPair = false,
  compact = false,
  hideFlipButton = false,
  isVerifyTargetMode = false,
  verifiedBadgeText = null,
  onSelect,
  onToggleFlip,
  onToggleOrientation,
  onDragStart,
  onDragEnd,
  actionHint,
}) => {
  const isTaboo = card.tone === 'taboo';
  const isStone = card.tone === 'stone';
  const isEmber = card.tone === 'ember';
  const isReversed = card.supportsOrientation && orientation === 'reversed';

  const vellumClass = isStackedPair
    ? 'tarot-paired-vellum border-[#D8B264] text-[#FAF3E2]'
    : isTaboo
      ? 'tarot-taboo-vellum border-[#C98574] text-[#FCEBE7]'
      : isStone
        ? 'tarot-stone-vellum border-[#4A474B] text-[#242126]'
        : isEmber
          ? 'tarot-ember-vellum border-[#8A541C] text-[#2B1B0C]'
          : 'tarot-vellum border-[#2B1E14] text-[#241B14]';

  const cornerColor = isStackedPair
    ? '#D8B264'
    : isTaboo
      ? '#D39282'
      : isStone
        ? '#58535B'
        : '#6F4F2B';

  const innerRuleColor = isStackedPair
    ? 'border-[#D8B264]/55'
    : isTaboo
      ? 'border-[#C98574]/55'
      : 'border-[#7E603B]/70';

  return (
    <div
      draggable={Boolean(onDragStart)}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`tarot-perspective relative w-full aspect-[3/4] select-none ${
        isSelected ? 'z-30' : ''
      }`}
    >
      <div className={`tarot-inner ${isFlipped ? 'tarot-flipped' : ''}`}>
        {/* ================= FRONT FACE: 3:4 COPPERPLATE VELLUM ================= */}
        <div
          className={`tarot-face rounded-[5px] border-[1.5px] p-[5px] overflow-hidden ${vellumClass} ${
            isFlipped ? 'pointer-events-none' : ''
          } ${
            isSelected
              ? 'ring-2 ring-[#E8C272] shadow-[0_14px_26px_rgba(10,6,3,0.62)]'
              : isVerifyTargetMode
                ? 'ring-1 ring-[#F2CF7E]/85 shadow-[0_0_12px_rgba(232,194,114,0.28)] cursor-zoom-in'
                : ''
          }`}
        >
          <CopperplateCorners color={cornerColor} />

          <button
            type="button"
            onClick={onSelect}
            aria-label={`${card.title}（${isReversed ? '逆位' : '正位'}）`}
            className={`w-full h-full rounded-[3px] border ${innerRuleColor} flex flex-col items-center justify-between text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A656] ${
              compact ? 'px-1.5 py-1.5' : 'px-2 py-2'
            }`}
          >
            {/* Top Header Row: Roman Numeral & Orientation / Inspection Marker */}
            <div className="w-full flex items-center justify-between text-[9.5px] font-display leading-none px-0.5">
              <span className="font-semibold tracking-wider opacity-90">{card.roman}</span>
              {verifiedBadgeText ? (
                <span className="font-serif-body text-[8.5px] font-semibold text-[#8E2D20]">
                  已照验
                </span>
              ) : isVerifyTargetMode ? (
                <span className="font-serif-body text-[8.5px] font-semibold text-[#96681F]">
                  轻触照验
                </span>
              ) : actionHint ? (
                <span className="font-mono text-[8.5px] font-semibold opacity-90">
                  {actionHint}
                </span>
              ) : card.supportsOrientation ? (
                <span
                  className={`font-serif-body text-[9px] font-semibold ${
                    isReversed ? 'text-[#963E2A]' : 'opacity-80'
                  }`}
                >
                  {isReversed ? '逆位 ↓' : '正位 ↑'}
                </span>
              ) : (
                <span className="text-[9px] opacity-75">
                  {hasInspected ? '已读' : '✦'}
                </span>
              )}
            </div>

            {/* Central Arched Copperplate Engraving Frame */}
            <div
              className={`relative w-[84%] flex-1 my-1 rounded-t-[999px] rounded-b-[4px] border ${innerRuleColor} flex items-center justify-center overflow-hidden ${
                isStackedPair || isTaboo ? 'bg-black/15' : 'bg-[#FFF9EB]/55'
              }`}
            >
              {/* Faint Radial Etching Lines */}
              <svg
                viewBox="0 0 80 100"
                className="pointer-events-none absolute inset-0 w-full h-full opacity-20"
                aria-hidden="true"
              >
                <circle cx="40" cy="52" r="26" fill="none" stroke={cornerColor} strokeWidth="0.8" strokeDasharray="2 2" />
                <line x1="40" y1="10" x2="40" y2="92" stroke={cornerColor} strokeWidth="0.6" />
                <line x1="10" y1="52" x2="70" y2="52" stroke={cornerColor} strokeWidth="0.6" />
              </svg>

              <div
                className={`transition-transform duration-300 ${
                  isReversed ? 'rotate-180' : ''
                }`}
              >
                <TarotArtwork
                  id={card.artwork}
                  inverted={isTaboo || isStackedPair}
                  className={compact ? 'w-9 h-9' : 'w-12 h-12 sm:w-14 sm:h-14'}
                />
              </div>
            </div>

            {/* Bottom Engraved Title & Motif Cartouche */}
            <div className="w-full pt-0.5 space-y-0.5 border-t border-current/20">
              <p
                className={`font-display font-semibold leading-tight truncate ${
                  compact ? 'text-[11px]' : 'text-[12.5px]'
                }`}
              >
                {card.title}
              </p>
              {!compact && (
                <p className="text-[9px] font-serif-body opacity-80 leading-tight truncate">
                  {card.motif}
                </p>
              )}
            </div>
          </button>

          {/* Miniature Corner Flip Trigger */}
          {!hideFlipButton && onToggleFlip && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFlip();
              }}
              title="翻面查看背面铭文"
              aria-label={`翻面查看${card.title}背面铭文`}
              className="absolute bottom-1.5 right-1.5 w-5 h-5 rounded-full bg-[#2B1D13]/85 hover:bg-[#191009] text-[#F5E6C4] border border-[#C69C53]/80 flex items-center justify-center shadow transition-colors"
            >
              <RefreshCw className="w-2.5 h-2.5" />
            </button>
          )}

          {/* Miniature Top-Right Orientation Rotate Trigger (if supported & placed/selected) */}
          {!hideFlipButton && card.supportsOrientation && onToggleOrientation && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleOrientation();
              }}
              title="旋转正逆位"
              aria-label={`旋转${card.title}正逆位`}
              className="absolute bottom-1.5 left-1.5 w-5 h-5 rounded-full bg-[#2B1D13]/85 hover:bg-[#191009] text-[#F5E6C4] border border-[#C69C53]/80 flex items-center justify-center shadow transition-colors"
            >
              <RotateCw className="w-2.5 h-2.5" />
            </button>
          )}
        </div>

        {/* ================= BACK FACE: COPPERPLATE ENGRAVING & SECRET INSCRIPTION ================= */}
        <div
          className={`tarot-face tarot-back tarot-copperplate-back rounded-[5px] border-[1.5px] border-[#C89F55] p-[5px] overflow-hidden text-[#F7EBD0] ${
            !isFlipped ? 'pointer-events-none' : ''
          } ${
            isSelected ? 'ring-2 ring-[#E8C272] shadow-[0_14px_26px_rgba(10,6,3,0.62)]' : ''
          }`}
        >
          <CopperplateCorners color="#C89F55" />

          <button
            type="button"
            onClick={onSelect ?? onToggleFlip}
            aria-label={`牌背铭文 · ${card.backTitle}`}
            className="w-full h-full rounded-[3px] border border-[#C89F55]/55 px-2 py-2 flex flex-col items-center justify-between text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C272]"
          >
            {/* Top Symmetrical Celestial Mark */}
            <div className="w-full flex items-center justify-between text-[9px] font-display text-[#DFBE77] px-0.5 leading-none">
              <span>☽</span>
              <span className="tracking-wider font-serif-body">{card.backTitle}</span>
              <span>☀</span>
            </div>

            {/* Engraved Copperplate Rose & Aged Parchment Clue Slip */}
            <div className="relative w-full flex-1 my-1.5 rounded-[3px] bg-[#F7ECD2] border border-[#96703C] px-1.5 py-2 flex flex-col items-center justify-center text-[#241B14] shadow-inner">
              <p className="text-[10px] font-serif-body leading-[1.48] font-medium text-[#2A1F16]">
                {card.backInscription}
              </p>
              {verifiedBadgeText && (
                <span className="mt-1.5 pt-1 border-t border-[#B99C6B] w-full text-[9px] font-serif-body font-semibold text-[#7A3526]">
                  {verifiedBadgeText}
                </span>
              )}
            </div>

            {/* Bottom Prompt */}
            <span className="text-[9px] font-serif-body text-[#DFCBA1] tracking-wide leading-none">
              {isVerifyTargetMode
                ? '轻触以信物照验'
                : hasInspected
                  ? '轻触角标翻回正面'
                  : '已读铭文 · 翻正出牌'}
            </span>
          </button>

          {!hideFlipButton && onToggleFlip && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFlip();
              }}
              title="翻回正面"
              aria-label="翻回正面"
              className="absolute bottom-1.5 right-1.5 w-5 h-5 rounded-full bg-[#F5E7C4] hover:bg-white text-[#2B1D13] border border-[#8E6A36] flex items-center justify-center shadow transition-colors"
            >
              <RefreshCw className="w-2.5 h-2.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

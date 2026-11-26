import React from 'react';

/** Ornate Victorian brass/copperplate corner scrollwork for parchment folios */
export const VictorianCornerFiligree: React.FC<{
  color?: string;
  sizeClass?: string;
}> = ({ color = '#7C572C', sizeClass = 'w-5 h-5' }) => (
  <>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`pointer-events-none absolute top-1.5 left-1.5 ${sizeClass} opacity-80`}
    >
      <path
        d="M2 18 V4 C2 2.5 2.5 2 4 2 H18 M5.5 11 C5.5 7 7 5.5 11 5.5"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
      />
      <circle cx="4.2" cy="4.2" r="1.1" fill={color} />
    </svg>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`pointer-events-none absolute top-1.5 right-1.5 ${sizeClass} opacity-80 scale-x-[-1]`}
    >
      <path
        d="M2 18 V4 C2 2.5 2.5 2 4 2 H18 M5.5 11 C5.5 7 7 5.5 11 5.5"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
      />
      <circle cx="4.2" cy="4.2" r="1.1" fill={color} />
    </svg>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`pointer-events-none absolute bottom-1.5 left-1.5 ${sizeClass} opacity-80 scale-y-[-1]`}
    >
      <path
        d="M2 18 V4 C2 2.5 2.5 2 4 2 H18 M5.5 11 C5.5 7 7 5.5 11 5.5"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
      />
      <circle cx="4.2" cy="4.2" r="1.1" fill={color} />
    </svg>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`pointer-events-none absolute bottom-1.5 right-1.5 ${sizeClass} opacity-80 scale-[-1]`}
    >
      <path
        d="M2 18 V4 C2 2.5 2.5 2 4 2 H18 M5.5 11 C5.5 7 7 5.5 11 5.5"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
      />
      <circle cx="4.2" cy="4.2" r="1.1" fill={color} />
    </svg>
  </>
);

/** Embossed 3D sculpted crimson clay wax seal stamp emblem */
export const CrimsonWaxSealMedallion: React.FC<{
  glyph?: string;
  className?: string;
  withRibbons?: boolean;
}> = ({ glyph = '✦', className = 'w-11 h-11', withRibbons = false }) => (
  <svg viewBox="0 0 60 64" aria-hidden="true" className={className}>
    <defs>
      <radialGradient id="waxClayRim" cx="38%" cy="32%" r="68%">
        <stop offset="0%" stopColor="#C14332" />
        <stop offset="55%" stopColor="#8E281C" />
        <stop offset="100%" stopColor="#52120B" />
      </radialGradient>
      <radialGradient id="waxClayWell" cx="62%" cy="65%" r="70%">
        <stop offset="0%" stopColor="#A63425" />
        <stop offset="65%" stopColor="#7C2016" />
        <stop offset="100%" stopColor="#490F09" />
      </radialGradient>
      <linearGradient id="waxRibbonGold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7A2218" />
        <stop offset="50%" stopColor="#A23526" />
        <stop offset="100%" stopColor="#5A150E" />
      </linearGradient>
    </defs>

    {withRibbons && (
      <g>
        <polygon
          points="19,36 10,62 18,56 25,62 28,38"
          fill="url(#waxRibbonGold)"
          stroke="#3E0E09"
          strokeWidth="1"
        />
        <polygon
          points="32,38 35,62 42,56 50,62 41,36"
          fill="url(#waxRibbonGold)"
          stroke="#3E0E09"
          strokeWidth="1"
        />
      </g>
    )}

    {/* Soft drop shadow underneath poured wax */}
    <ellipse cx="31" cy="31" rx="22" ry="21" fill="rgba(26, 8, 4, 0.34)" />

    {/* Organic hand-poured irregular wax lip */}
    <path
      d="M30 5 C35 5 38 8 43 9 C48 10 51 15 53 20 C54 25 54 32 51 37 C50 42 46 47 41 49 C36 52 29 53 24 51 C18 50 13 46 9 41 C6 36 6 28 7 22 C8 16 12 11 18 8 C23 6 25 5 30 5 Z"
      fill="url(#waxClayRim)"
      stroke="#3F0E08"
      strokeWidth="1.6"
    />
    {/* Specular molten ridge highlight */}
    <path
      d="M15 17 C18 11 25 8 33 9"
      fill="none"
      stroke="#E68F7E"
      strokeWidth="1.6"
      strokeLinecap="round"
      opacity="0.65"
    />

    {/* Recessed inner brass-die stamped well */}
    <circle cx="30" cy="29" r="15.5" fill="url(#waxClayWell)" stroke="#49110A" strokeWidth="1.4" />
    <circle
      cx="30"
      cy="29"
      r="13"
      fill="none"
      stroke="#E8B89A"
      strokeWidth="0.8"
      strokeDasharray="2.2 1.6"
      opacity="0.72"
    />
    <text
      x="30"
      y="34"
      textAnchor="middle"
      fontSize="15"
      fontWeight="bold"
      fill="#FBEBD6"
      fontFamily="serif"
      style={{ textShadow: '0 1px 1px rgba(40,8,4,0.8)' }}
    >
      {glyph}
    </text>
  </svg>
);

/** Heavy hammered antique brass corner mount for embossed leather hardcover books */
export const BrassCornerPlate: React.FC<{ position: 'tl' | 'tr' | 'bl' | 'br' }> = ({
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
      viewBox="0 0 36 36"
      aria-hidden="true"
      className={`pointer-events-none absolute ${posMap[position]} ${rotateMap[position]} w-8 h-8 z-20 drop-shadow-sm`}
    >
      <path
        d="M2 32 L2 5 Q2 2 5 2 L32 2 L25 9.5 L9.5 9.5 L9.5 25 Z"
        fill="url(#journalBrassPlate)"
        stroke="#2C1A0C"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="6" cy="6" r="1.4" fill="#4A3216" />
      <circle cx="22" cy="5.8" r="1" fill="#4A3216" />
      <circle cx="5.8" cy="22" r="1" fill="#4A3216" />
      <defs>
        <linearGradient id="journalBrassPlate" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EAC981" />
          <stop offset="55%" stopColor="#BC9144" />
          <stop offset="100%" stopColor="#7C5924" />
        </linearGradient>
      </defs>
    </svg>
  );
};

/** Four vintage triangular kraft-and-gilt photo corners for journal portraits & specimens */
export const AntiquePhotoCorners: React.FC<{ tone?: 'brass' | 'kraft' }> = ({
  tone = 'brass',
}) => {
  const fill = tone === 'brass' ? '#C2984E' : '#8A633C';
  const stroke = '#3A2514';

  const corner = (posClass: string, rotClass: string) => (
    <svg
      viewBox="0 0 18 18"
      aria-hidden="true"
      className={`pointer-events-none absolute ${posClass} ${rotClass} w-3.5 h-3.5 z-10`}
    >
      <polygon points="1,1 16,1 1,16" fill={fill} stroke={stroke} strokeWidth="1.1" strokeLinejoin="round" />
      <line x1="2.5" y1="9" x2="9" y2="2.5" stroke="#FAF0D4" strokeWidth="0.7" opacity="0.7" />
    </svg>
  );

  return (
    <>
      {corner('-top-1 -left-1', '')}
      {corner('-top-1 -right-1', 'scale-x-[-1]')}
      {corner('-bottom-1 -left-1', 'scale-y-[-1]')}
      {corner('-bottom-1 -right-1', 'scale-[-1]')}
    </>
  );
};

/** Organic deckled / hand-torn antique ivory paper edge strip along book outer margins */
export const DeckledPaperEdge: React.FC<{ side: 'left' | 'right' }> = ({ side }) => (
  <svg
    viewBox="0 0 14 400"
    preserveAspectRatio="none"
    aria-hidden="true"
    className={`pointer-events-none absolute top-0 bottom-0 ${
      side === 'left' ? '-left-[5px]' : '-right-[5px] scale-x-[-1]'
    } w-[10px] h-full z-20`}
  >
    <path
      d="M7 0 L3 18 L6 36 L2 56 L7 74 L3 94 L6 116 L2 138 L7 158 L4 180 L2 204 L6 226 L3 248 L7 270 L2 292 L6 314 L3 336 L7 358 L3 380 L7 400 L14 400 L14 0 Z"
      fill="#F3E8CE"
      stroke="#AF9265"
      strokeWidth="0.75"
    />
    <path
      d="M8 0 L5 18 L8 36 L4 56 L8 74 L5 94 L8 116 L4 138 L8 158 L5 180 L4 204 L8 226 L5 248 L8 270 L4 292 L8 314 L5 336 L8 358 L5 380 L8 400"
      fill="none"
      stroke="#CEB68B"
      strokeWidth="0.65"
      opacity="0.7"
    />
  </svg>
);

/** Heavy riveted antique brass clasp mounted on hardcover leather fore-edge */
export const BrassBookClasp: React.FC<{ side: 'left' | 'right' }> = ({ side }) => (
  <div
    aria-hidden="true"
    className={`hidden md:flex pointer-events-none absolute top-1/2 -translate-y-1/2 ${
      side === 'left' ? '-left-3' : '-right-3 scale-x-[-1]'
    } z-30 items-center`}
  >
    <svg viewBox="0 0 22 48" className="w-4.5 h-11 drop-shadow-md">
      <defs>
        <linearGradient id="claspBrassGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ECCB82" />
          <stop offset="52%" stopColor="#B88D42" />
          <stop offset="100%" stopColor="#6D4E1D" />
        </linearGradient>
      </defs>
      <rect
        x="2"
        y="4"
        width="17"
        height="40"
        rx="3"
        fill="url(#claspBrassGrad)"
        stroke="#2B180A"
        strokeWidth="1.5"
      />
      <rect x="6" y="16" width="8" height="16" rx="1.5" fill="#7D5A24" stroke="#36210E" strokeWidth="1" />
      <circle cx="10.5" cy="9.5" r="1.6" fill="#3B2510" />
      <circle cx="10.5" cy="38.5" r="1.6" fill="#3B2510" />
    </svg>
  </div>
);

/** Multi-scale cold-press watercolor cotton-rag paper tooth, subtle pulp clouding & laid-paper wire lines */
export const PaperFiberOverlay: React.FC<{ idSuffix?: string; light?: boolean }> = ({
  idSuffix = 'journal',
  light = false,
}) => {
  const bumpId = `paper-bump-${idSuffix}`;
  const mottleId = `paper-mottle-${idSuffix}`;
  const laidId = `paper-laid-${idSuffix}`;

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 w-full h-full z-[3]"
    >
      <defs>
        {/* Physical paper grain & cold-press watercolor tooth relief */}
        <filter id={bumpId} x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.22"
            numOctaves="4"
            seed="17"
            stitchTiles="stitch"
            result="grain"
          />
          <feDiffuseLighting
            in="grain"
            lightingColor="#FFFDF7"
            surfaceScale={light ? '1.65' : '1.95'}
            diffuseConstant="1.06"
            result="lit"
          >
            <feDistantLight azimuth="132" elevation="60" />
          </feDiffuseLighting>
          <feColorMatrix
            in="lit"
            type="matrix"
            values="1 0 0 0 0  0 0.98 0 0 0  0 0 0.93 0 0  0 0 0 1 0"
          />
        </filter>

        {/* Delicate watercolor pulp clouding & soft amber wash */}
        <filter id={mottleId} x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.028"
            numOctaves="3"
            seed="42"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="0.45 0 0 0 0.42  0 0.38 0 0 0.34  0 0 0.25 0 0.22  0 0 0 0.32 0"
          />
        </filter>

        {/* Traditional fine laid-paper wire & chain lines */}
        <pattern id={laidId} width="48" height="4" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="48" y2="0" stroke="#9A784C" strokeWidth="0.4" strokeOpacity="0.24" />
          <line x1="24" y1="0" x2="24" y2="4" stroke="#8C6A3E" strokeWidth="0.45" strokeOpacity="0.18" />
        </pattern>
      </defs>

      <rect
        width="100%"
        height="100%"
        filter={`url(#${bumpId})`}
        opacity={light ? '0.24' : '0.28'}
        style={{ mixBlendMode: 'multiply' }}
      />
      <rect
        width="100%"
        height="100%"
        filter={`url(#${mottleId})`}
        opacity={light ? '0.11' : '0.14'}
        style={{ mixBlendMode: 'multiply' }}
      />
      <rect width="100%" height="100%" fill={`url(#${laidId})`} opacity={light ? '0.18' : '0.22'} />
    </svg>
  );
};



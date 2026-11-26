export type GamePhase =
  | 'TITLE_MENU'
  | 'INTRO_CINEMATIC'
  | 'INTRO_PROLOGUE'
  | 'GUEST_ARRIVING'
  | 'DESK_DIALOGUE'
  | 'SHELF_SEARCH'
  | 'BOOK_INSPECTION'
  | 'KNOT_RESOLUTION'
  | 'CASE_CLEARED';

export type SeasonId = 'spring' | 'summer' | 'autumn' | 'winter';
export type ShelfZoneId = SeasonId;

export type EvidenceSymbol =
  | 'pollen'
  | 'promise'
  | 'pot'
  | 'sprout'
  | 'score'
  | 'piano-key'
  | 'watch'
  | 'ticket'
  | 'letter'
  | 'wax'
  | 'quill'
  | 'portrait'
  | 'gear'
  | 'dial'
  | 'ice-key'
  | 'snowflake';

export interface EvidenceItem {
  id: string;
  title: string;
  originPage: number;
  requiresMagnifier?: boolean;
  category: string;
  summary: string;
  quote: string;
  symbol: EvidenceSymbol;
}

export interface BookHotspot {
  evidenceId: string;
  label: string;
  snippet: string;
  requiresMagnifier?: boolean;
  marginHint?: string;
}

export interface BookPage {
  pageNumber: number;
  chapterTitle: string;
  paragraphs: string[];
  hotspots: BookHotspot[];
  keepsakeNote?: string;
}

export type DreamPuzzleMode =
  | 'sequence'
  | 'melody_sequence'
  | 'portrait_select'
  | 'clock_gears';

export interface DreamPuzzleCard {
  id: string;
  label: string;
  subtitle: string;
  symbol: string;
  isWarmMemory?: boolean;
  isFutureGear?: boolean;
}

export interface KnotInterpretation {
  id: string;
  shortPhrase: string;
  text: string;
  isHealingTruth: boolean;
  isForbiddenTrap?: boolean;
  feedback: string;
  badEndingTitle?: string;
  badEndingDesc?: string;
}

export interface GiftKeepsake {
  id: string;
  title: string;
  subtitle: string;
  partingNote: string;
  journalCaption: string;
  hiddenWhisper: string;
  interactiveType: 'glass-flower' | 'silver-bell' | 'reply-letter' | 'ice-crystal';
}

export interface FantasyProfile {
  seasonLabel: string;
  fantasyIdentity: string;
  coreMagic: string;
  dreamRealm: string;
  heartKnot: string;
  magicRelic: string;
  curseTrace: string;
  correctWay: string;
  endingSealGood: string;
  endingSealBad: string;
}

export interface SeasonEasterEgg {
  id: string;
  season: SeasonId;
  title: string;
  badge: string;
  detail: string;
}

export interface GuestCase {
  id: string;
  season: SeasonId;
  guestName: string;
  englishName: string;
  occupation: string;
  portraitUrl: string;
  arrivalLine: string;
  greetingDialogue: string;
  bookHint: string;
  teaBonusHint: string;
  targetBookId: string;
  bookTitle: string;
  bookCallNumber: string;
  shelfZone: ShelfZoneId;
  spineColor: string;
  spineAccent: string;
  fantasyProfile: FantasyProfile;
  pages: BookPage[];
  evidence: EvidenceItem[];
  knot: {
    dreamTitle: string;
    dreamAtmosphere: string;
    puzzleMode: DreamPuzzleMode;
    puzzleInstruction: string;
    puzzleCards: DreamPuzzleCard[];
    correctOrderIds?: string[];
    question: string;
    guestWorry: string;
    interpretations: KnotInterpretation[];
    badEndingDefault: {
      title: string;
      subtitle: string;
      desc: string;
    };
    resolutionDialogue: string;
    healingMotto: string;
    archiveStamp: string;
  };
  giftKeepsake: GiftKeepsake;
  easterEgg: SeasonEasterEgg;
}

export interface ShelfBookItem {
  id: string;
  title: string;
  author: string;
  callNumber: string;
  zone: ShelfZoneId;
  tier: 'top' | 'middle' | 'lower';
  spineColor: string;
  textColor: string;
  heightClass: string;
  tilt?: 'left' | 'right';
  hiddenBehindNote?: string;
  flavorNote: string;
  guestCaseId?: string;
}

export interface ShelfDrawerItem {
  id: string;
  zone: ShelfZoneId;
  label: string;
  brassCode: string;
  itemName: string;
  note: string;
  magnifierSecret?: string;
  relatedCaseId?: string;
}

export interface ShelfCurioItem {
  id: string;
  zone: ShelfZoneId;
  tier: 'upper' | 'main';
  title: string;
  kind:
    | 'terrarium'
    | 'pressed-frame'
    | 'metronome'
    | 'astrolabe'
    | 'tea-caddy'
    | 'letter-bundle'
    | 'ice-lantern'
    | 'pocket-stand';
  description: string;
  magnifierSecret?: string;
  relatedCaseId?: string;
}

export type ShelfPocketItemId = 'brass-key' | 'winding-key' | 'letter-opener' | 'thaw-key';

export interface ShelfPocketItem {
  id: ShelfPocketItemId;
  name: string;
  subtitle: string;
  foundInZone: ShelfZoneId;
}

export interface ShelfZoneMeta {
  id: ShelfZoneId;
  seasonName: string;
  name: string;
  englishSubtitle: string;
  description: string;
  ambientNote: string;
}

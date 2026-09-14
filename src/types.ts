export interface Partner {
  name: string;
  nickname: string;
  birthday: string;
  avatar: string;
  favFood: string;
  favDrink: string;
  favPlace: string;
  favMovie: string;
  favSong: string;
  favColor: string;
  quote: string;
  favoriteThingAboutOther?: string;
}

export type PartnerProfile = Partner;

export interface LoveStoryData {
  profile: CoupleProfile;
  events: TimelineEvent[];
  memories: Memory[];
  locations: LoveLocation[];
  gifts: Gift[];
  recipes: Recipe[];
  letters: LoveLetter[];
  futureLetters: FutureLetter[];
  bucketList: BucketItem[];
  specialDays: SpecialDay[];
  songs: Song[];
  dailyNotes: DailyNote[];
  passcode: string;
  secretMessage: string;
}

export interface CoupleProfile {
  id: string;
  partner1: Partner;
  partner2: Partner;
  relationshipStart: string; // ISO string e.g. "2023-11-08T00:00:00"
  anniversaryDate: string; // MM-DD e.g. "11-08"
  couplePhoto: string;
  romanticQuote: string;
  secretMessage: string;
  passcode: string;
  thingsWeLove: string[];
}

export interface TimelineEvent {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  location: string;
  description: string;
  image: string;
  sticker: string; // 'heart' | 'star' | 'coffee' | 'trip' | 'gift' | 'ring'
  mood: string; // 'Hạnh phúc' | 'Lãng mạn' | 'Đáng nhớ' | 'Ấm áp' | 'Hài hước'
  favorite: boolean;
}

export interface Memory {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  coordinates?: { lat: number; lng: number };
  photos: string[];
  tags: string[];
  favorite: boolean;
  notes?: string;
}

export interface LoveLocation {
  id: string;
  placeName: string;
  date: string;
  description: string;
  photos: string[];
  memoryId?: string;
  lat: number;
  lng: number;
  favorite: boolean;
  mood?: string;
}

export interface Gift {
  id: string;
  name: string;
  photos: string[];
  giver: string;
  receiver: string;
  date: string;
  occasion: string; // 'Anniversary' | 'Sinh nhật' | 'Valentine' | 'Giáng sinh' | 'Ngày kỷ niệm' | 'Không nhân dịp gì'
  description: string;
  story: string;
  favorite: boolean;
}

export interface Recipe {
  id: string;
  name: string;
  photos: string[];
  dateCooked: string;
  recipeUrl?: string;
  ingredients: string[];
  instructions: string[];
  cookTime: string;
  difficulty: 'Dễ làm' | 'Vừa sức' | 'Cầu kỳ';
  cookedBy: string;
  rating: number; // 1 - 5
  review: string;
  notes?: string;
  favorite: boolean;
}

export interface LoveLetter {
  id: string;
  title: string;
  date: string;
  sender: string;
  recipient: string;
  category: string; // "Open when you're sad" | "Open when you miss me" | "Open when you can't sleep" | "Open when we had a fight" | "Open on our anniversary" | "Open on your birthday" | "Thư tình bình thường"
  content: string;
  image?: string;
  isOpened?: boolean;
  mood?: string;
}

export interface FutureLetter {
  id: string;
  title: string;
  writeDate: string;
  unlockDate: string; // YYYY-MM-DD
  sender: string;
  recipient: string;
  content: string;
  sealed: boolean;
}

export interface BucketItem {
  id: string;
  title: string;
  description: string;
  category: 'Travel' | 'Food' | 'Experiences' | 'Photos' | 'Future' | 'Random';
  completed: boolean;
  completedDate?: string;
  image?: string;
}

export interface SpecialDay {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  category: 'Kỷ niệm' | 'Sinh nhật' | 'Lễ hội' | 'Cột mốc';
  description?: string;
  icon?: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  cover: string;
  url: string;
  note: string;
  isOurSong?: boolean;
}

export interface DailyNote {
  id: string;
  date: string;
  note: string;
  author: string;
}

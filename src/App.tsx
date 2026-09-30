import React, { useState, useEffect } from 'react';
import {
  LoveStoryData,
  TimelineEvent,
  Memory,
  LoveLocation,
  Gift,
  Recipe,
  LoveLetter,
  FutureLetter,
  BucketItem,
  SpecialDay,
  Song,
  CoupleProfile,
} from './types';
import { initialLoveStoryData } from './data/initialData';
import { soundFx } from './utils/soundEffects';
import {
  subscribeLoveStory,
  saveLoveStoryToFirestore,
  changedFields,
  mergeRemote,
  SyncStatus,
} from './utils/firebaseSync';

// Components
import { Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { TimelineSection } from './components/TimelineSection';
import { GallerySection } from './components/GallerySection';
import { LoveMapSection } from './components/LoveMapSection';
import { GiftsSection } from './components/GiftsSection';
import { KitchenSection } from './components/KitchenSection';
import { LettersSection } from './components/LettersSection';
import { BucketListSection } from './components/BucketListSection';
import { SpecialDaysSection } from './components/SpecialDaysSection';
import { SoundtrackSection } from './components/SoundtrackSection';
import { SurpriseModal } from './components/SurpriseModal';
import { SecretMascotButton } from './components/SecretMessageModal';
import { CoupleProfilesModal } from './components/CoupleProfilesModal';
import { SettingsModal } from './components/SettingsModal';
import { PasscodeGate } from './components/PasscodeGate';
import { Heart, Sparkles, Stars } from 'lucide-react';

const STORAGE_KEY = 'our_love_story_thang_ngoc_v3';

export default function App() {
  // Main data state with localStorage persistence
  const [data, setData] = useState<LoveStoryData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure it has Quang Thắng and Bảo Ngọc
        if (parsed?.profile?.partner1?.name === 'Quang Thắng') {
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return initialLoveStoryData;
  });

  // No autosave until the server's copy has arrived, otherwise a stale local copy overwrites real data
  const hasLoadedRemoteRef = React.useRef(false);
  // Latest data known to be on the server. Starts as the data we opened with, so edits made
  // before the first snapshot count as local changes and survive the merge.
  const lastSyncedRef = React.useRef<LoveStoryData>(data);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('connecting');

  // Subscribe to Cloud Firestore real-time updates (sync across devices in background)
  useEffect(() => {
    const unsubscribe = subscribeLoveStory(
      (remoteData) => {
        const base = lastSyncedRef.current;
        lastSyncedRef.current = remoteData;
        hasLoadedRemoteRef.current = true;
        // Keep keys edited locally (still waiting to be saved), take the rest from the server
        setData((prev) => mergeRemote(prev, base, remoteData));
      },
      setSyncStatus
    );

    return () => unsubscribe();
  }, []);

  // Save changes to localStorage and Cloud Firestore in background
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }

    if (!hasLoadedRemoteRef.current) return;

    // Debounced save to Firestore: only top-level keys that differ from the server copy.
    // Cancelling this timer is safe: the next run diffs again, so pending edits are never dropped.
    const timer = setTimeout(async () => {
      const base = lastSyncedRef.current;
      const changed = changedFields(data, base);
      if (Object.keys(changed).length === 0) return;
      try {
        await saveLoveStoryToFirestore(changed);
        // If a snapshot replaced base meanwhile, it is already the newer server copy
        if (lastSyncedRef.current === base) lastSyncedRef.current = { ...base, ...changed };
      } catch (err) {
        console.error('Failed to push update to Firestore', err);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [data]);

  // Section navigation state
  const [currentSection, setCurrentSection] = useState<string>('home');

  // Dark / Twilight Mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('love_story_dark_mode') === 'true';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('love_story_dark_mode', String(isDarkMode));
  }, [isDarkMode]);

  // Edit Mode toggle
  const [isEditMode, setIsEditMode] = useState(false);

  // Passcode gate state
  const [isLocked, setIsLocked] = useState<boolean>(() => {
    const hasPin = Boolean(data.passcode && data.passcode.trim().length > 0);
    const sessionUnlocked = sessionStorage.getItem('love_story_unlocked') === 'true';
    return hasPin && !sessionUnlocked;
  });

  // Modals state
  const [surpriseMemory, setSurpriseMemory] = useState<Memory | null>(null);
  const [isProfilesOpen, setIsProfilesOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Open a random memory for "Surprise Me!"
  const handleOpenSurprise = () => {
    const allMemories = data.memories;
    if (allMemories.length === 0) return;
    const randomIndex = Math.floor(Math.random() * allMemories.length);
    setSurpriseMemory(allMemories[randomIndex]);
  };

  const handleNextSurprise = () => {
    const allMemories = data.memories;
    if (allMemories.length <= 1) return;
    let nextIndex = Math.floor(Math.random() * allMemories.length);
    while (allMemories[nextIndex].id === surpriseMemory?.id) {
      nextIndex = Math.floor(Math.random() * allMemories.length);
    }
    setSurpriseMemory(allMemories[nextIndex]);
  };

  const handleUnlock = () => {
    sessionStorage.setItem('love_story_unlocked', 'true');
    setIsLocked(false);
  };

  // Timeline handlers
  const handleAddEvent = (event: Omit<TimelineEvent, 'id'>) => {
    const newEvent: TimelineEvent = {
      ...event,
      id: `evt-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      events: [newEvent, ...prev.events],
    }));
  };

  const handleUpdateEvent = (event: TimelineEvent) => {
    setData((prev) => ({
      ...prev,
      events: prev.events.map((e) => (e.id === event.id ? event : e)),
    }));
  };

  const handleDeleteEvent = (id: string) => {
    setData((prev) => ({
      ...prev,
      events: prev.events.filter((e) => e.id !== id),
    }));
  };

  // Memory handlers
  const handleAddMemory = (memory: Omit<Memory, 'id'>) => {
    const newMemory: Memory = {
      ...memory,
      id: `mem-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      memories: [newMemory, ...prev.memories],
    }));
  };

  const handleUpdateMemory = (memory: Memory) => {
    setData((prev) => ({
      ...prev,
      memories: prev.memories.map((m) => (m.id === memory.id ? memory : m)),
    }));
  };

  const handleDeleteMemory = (id: string) => {
    setData((prev) => ({
      ...prev,
      memories: prev.memories.filter((m) => m.id !== id),
    }));
  };

  // Love Location handlers
  const handleAddLocation = (location: Omit<LoveLocation, 'id'>) => {
    const newLoc: LoveLocation = {
      ...location,
      id: `loc-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      locations: [...prev.locations, newLoc],
    }));
  };

  const handleUpdateLocation = (location: LoveLocation) => {
    setData((prev) => ({
      ...prev,
      locations: prev.locations.map((l) => (l.id === location.id ? location : l)),
    }));
  };

  const handleDeleteLocation = (id: string) => {
    setData((prev) => ({
      ...prev,
      locations: prev.locations.filter((l) => l.id !== id),
    }));
  };

  // Gift handlers
  const handleAddGift = (gift: Omit<Gift, 'id'>) => {
    const newGift: Gift = {
      ...gift,
      id: `gift-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      gifts: [newGift, ...prev.gifts],
    }));
  };

  const handleUpdateGift = (gift: Gift) => {
    setData((prev) => ({
      ...prev,
      gifts: prev.gifts.map((g) => (g.id === gift.id ? gift : g)),
    }));
  };

  const handleDeleteGift = (id: string) => {
    setData((prev) => ({
      ...prev,
      gifts: prev.gifts.filter((g) => g.id !== id),
    }));
  };

  // Recipe handlers
  const handleAddRecipe = (recipe: Omit<Recipe, 'id'>) => {
    const newRecipe: Recipe = {
      ...recipe,
      id: `rec-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      recipes: [newRecipe, ...prev.recipes],
    }));
  };

  const handleUpdateRecipe = (recipe: Recipe) => {
    setData((prev) => ({
      ...prev,
      recipes: prev.recipes.map((r) => (r.id === recipe.id ? recipe : r)),
    }));
  };

  const handleDeleteRecipe = (id: string) => {
    setData((prev) => ({
      ...prev,
      recipes: prev.recipes.filter((r) => r.id !== id),
    }));
  };

  // Letters handlers
  const handleAddLetter = (letter: Omit<LoveLetter, 'id'>) => {
    const newLetter: LoveLetter = {
      ...letter,
      id: `let-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      letters: [newLetter, ...prev.letters],
    }));
  };

  const handleAddFutureLetter = (fl: Omit<FutureLetter, 'id'>) => {
    const newFL: FutureLetter = {
      ...fl,
      id: `fl-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      futureLetters: [newFL, ...prev.futureLetters],
    }));
  };

  // Bucket list handlers
  const handleToggleBucketItem = (id: string) => {
    setData((prev) => ({
      ...prev,
      bucketList: prev.bucketList.map((item) => {
        if (item.id === id) {
          const willComplete = !item.completed;
          return {
            ...item,
            completed: willComplete,
            completedDate: willComplete ? new Date().toISOString().split('T')[0] : undefined,
          };
        }
        return item;
      }),
    }));
  };

  const handleAddBucketItem = (item: Omit<BucketItem, 'id'>) => {
    const newItem: BucketItem = {
      ...item,
      id: `buck-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      bucketList: [...prev.bucketList, newItem],
    }));
  };

  const handleDeleteBucketItem = (id: string) => {
    setData((prev) => ({
      ...prev,
      bucketList: prev.bucketList.filter((b) => b.id !== id),
    }));
  };

  // Special Days handlers
  const handleAddSpecialDay = (day: Omit<SpecialDay, 'id'>) => {
    const newDay: SpecialDay = {
      ...day,
      id: `sd-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      specialDays: [...prev.specialDays, newDay],
    }));
  };

  const handleDeleteSpecialDay = (id: string) => {
    setData((prev) => ({
      ...prev,
      specialDays: prev.specialDays.filter((s) => s.id !== id),
    }));
  };

  // Songs handlers
  const handleAddSong = (song: Omit<Song, 'id'>) => {
    const newSong: Song = {
      ...song,
      id: `song-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      songs: [newSong, ...prev.songs],
    }));
  };

  const handleUpdateSong = (song: Song) => {
    setData((prev) => ({
      ...prev,
      songs: prev.songs.map((s) => (s.id === song.id ? song : s)),
    }));
  };

  const handleDeleteSong = (id: string) => {
    setData((prev) => ({
      ...prev,
      songs: prev.songs.filter((s) => s.id !== id),
    }));
  };

  // Profile and Settings update
  const handleUpdateProfile = (newProfile: CoupleProfile) => {
    setData((prev) => ({
      ...prev,
      profile: newProfile,
    }));
  };

  const handleUpdateSettings = (
    newProfile: CoupleProfile,
    newPasscode: string,
    newSecretMessage: string
  ) => {
    setData((prev) => ({
      ...prev,
      profile: newProfile,
      passcode: newPasscode,
      secretMessage: newSecretMessage,
    }));
  };

  const handleRestoreData = (restored: LoveStoryData) => {
    setData(restored);
  };

  const handleResetData = () => {
    setData(initialLoveStoryData);
    soundFx.playCelebration();
  };

  const coupleNames = `${data.profile.partner1.name} & ${data.profile.partner2.name}`;

  // If locked, render passcode gate screen
  if (isLocked) {
    return (
      <PasscodeGate
        correctPasscode={data.passcode}
        onUnlock={handleUnlock}
        coupleNames={coupleNames}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#fff9f9] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300 font-sans selection:bg-rose-200 selection:text-rose-900">
      {/* Ambient background romantic gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40 dark:opacity-20">
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-pink-300/40 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-rose-200/40 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-amber-100/40 blur-3xl" />
      </div>

      {/* Top sticky navigation bar */}
      <Navbar
        currentSection={currentSection}
        onNavigate={(sec) => {
          setCurrentSection(sec);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        isEditMode={isEditMode}
        onToggleEditMode={() => hasLoadedRemoteRef.current && setIsEditMode(!isEditMode)}
        onOpenSurprise={handleOpenSurprise}
        onOpenProfiles={() => setIsProfilesOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        coupleNames={coupleNames}
      />

      {/* Main Content Area */}
      <main className="relative z-10 min-h-[calc(100vh-140px)]">
        {currentSection === 'home' && (
          <HomeHero
            profile={data.profile}
            memories={data.memories}
            locations={data.locations}
            recipes={data.recipes}
            gifts={data.gifts}
            letters={data.letters}
            songs={data.songs}
            bucketList={data.bucketList}
            specialDays={data.specialDays}
            dailyNotes={data.dailyNotes}
            onNavigate={(sec) => {
              setCurrentSection(sec);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenSurprise={handleOpenSurprise}
            onOpenProfiles={() => setIsProfilesOpen(true)}
          />
        )}

        {currentSection === 'timeline' && (
          <TimelineSection
            events={data.events}
            onAddEvent={handleAddEvent}
            onUpdateEvent={handleUpdateEvent}
            onDeleteEvent={handleDeleteEvent}
            isEditMode={isEditMode}
          />
        )}

        {currentSection === 'gallery' && (
          <GallerySection
            memories={data.memories}
            onAddMemory={handleAddMemory}
            onUpdateMemory={handleUpdateMemory}
            onDeleteMemory={handleDeleteMemory}
            isEditMode={isEditMode}
          />
        )}

        {currentSection === 'map' && (
          <LoveMapSection
            locations={data.locations}
            onAddLocation={handleAddLocation}
            onUpdateLocation={handleUpdateLocation}
            onDeleteLocation={handleDeleteLocation}
            isEditMode={isEditMode}
          />
        )}

        {currentSection === 'gifts' && (
          <GiftsSection
            gifts={data.gifts}
            profile={data.profile}
            onAddGift={handleAddGift}
            onUpdateGift={handleUpdateGift}
            onDeleteGift={handleDeleteGift}
            isEditMode={isEditMode}
          />
        )}

        {currentSection === 'kitchen' && (
          <KitchenSection
            recipes={data.recipes}
            onAddRecipe={handleAddRecipe}
            onUpdateRecipe={handleUpdateRecipe}
            onDeleteRecipe={handleDeleteRecipe}
            isEditMode={isEditMode}
          />
        )}

        {currentSection === 'letters' && (
          <LettersSection
            letters={data.letters}
            futureLetters={data.futureLetters}
            onAddLetter={handleAddLetter}
            onAddFutureLetter={handleAddFutureLetter}
            isEditMode={isEditMode}
          />
        )}

        {currentSection === 'bucket-list' && (
          <BucketListSection
            items={data.bucketList}
            onToggleItem={handleToggleBucketItem}
            onAddItem={handleAddBucketItem}
            onDeleteItem={handleDeleteBucketItem}
            isEditMode={isEditMode}
          />
        )}

        {currentSection === 'special-days' && (
          <SpecialDaysSection
            specialDays={data.specialDays}
            onAddSpecialDay={handleAddSpecialDay}
            onDeleteSpecialDay={handleDeleteSpecialDay}
            isEditMode={isEditMode}
          />
        )}

        {currentSection === 'soundtrack' && (
          <SoundtrackSection
            songs={data.songs}
            onAddSong={handleAddSong}
            onUpdateSong={handleUpdateSong}
            onDeleteSong={handleDeleteSong}
            isEditMode={isEditMode}
          />
        )}
      </main>

      {/* Sync status: shown only while loading or on error */}
      {(syncStatus === 'connecting' || syncStatus === 'error') && (
        <div role="status" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full text-xs font-semibold shadow-lg bg-white/95 dark:bg-zinc-900/95 border border-pink-200 dark:border-zinc-700 text-rose-600 dark:text-rose-300">
          {syncStatus === 'connecting'
            ? 'Đang tải dữ liệu từ server… (chưa thể chỉnh sửa)'
            : hasLoadedRemoteRef.current
              ? 'Mất kết nối server – thay đổi có thể chưa được đồng bộ'
              : 'Không tải được dữ liệu từ server – chưa thể chỉnh sửa'}
        </div>
      )}

      {/* Secret Mascot Bear in corner for romantic easter egg */}
      <SecretMascotButton message={data.secretMessage} />

      {/* Surprise Me Memory Modal */}
      {surpriseMemory && (
        <SurpriseModal
          memory={surpriseMemory}
          onClose={() => setSurpriseMemory(null)}
          onAnother={handleNextSurprise}
        />
      )}

      {/* Couple Profiles Modal */}
      <CoupleProfilesModal
        profile={data.profile}
        isOpen={isProfilesOpen}
        onClose={() => setIsProfilesOpen(false)}
        onUpdateProfile={handleUpdateProfile}
        isEditMode={isEditMode}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        fullData={data}
        onUpdateSettings={handleUpdateSettings}
        onRestoreData={handleRestoreData}
        onResetData={handleResetData}
      />

      {/* Romantic Scrapbook Footer */}
      <footer className="relative z-10 border-t border-pink-100 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/80 backdrop-blur-md py-8 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
            <span className="font-romantic text-2xl text-rose-600 dark:text-rose-400 font-bold">
              {coupleNames}
            </span>
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
          </div>
          <p className="font-handwriting text-2xl text-pink-700/80 dark:text-pink-300/80 max-w-md mx-auto leading-tight">
            "Mỗi khoảnh khắc bên nhau đều là một trang ký ức vô giá được viết bằng sự chân thành."
          </p>
          <div className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-4">
            Our Little Love Story • Private digital couple scrapbook • Forever & Always 💕
          </div>
        </div>
      </footer>
    </div>
  );
}

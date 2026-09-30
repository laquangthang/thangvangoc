import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import { LoveStoryData } from '../types';
import { initialLoveStoryData } from '../data/initialData';

const COLLECTION_NAME = 'love_stories';
const DOC_ID = 'thang_ngoc_main';

export type SyncStatus = 'connecting' | 'synced' | 'saving' | 'error';

/**
 * Listen for real-time changes to the love story from Firestore.
 * When data is changed by either partner, the callback is invoked with latest data.
 */
export function subscribeLoveStory(
  onData: (data: LoveStoryData) => void,
  onStatusChange?: (status: SyncStatus) => void
) {
  const docRef = doc(db, COLLECTION_NAME, DOC_ID);

  if (onStatusChange) onStatusChange('connecting');

  // includeMetadataChanges: also get the event when a cached snapshot is confirmed by the server
  const unsubscribe = onSnapshot(
    docRef,
    { includeMetadataChanges: true },
    async (snapshot) => {
      const { fromCache } = snapshot.metadata;
      if (snapshot.exists()) {
        const firestoreData = snapshot.data() as Partial<LoveStoryData>;
        // Merge with initial structure to guarantee any missing fields exist
        const mergedData: LoveStoryData = {
          ...initialLoveStoryData,
          ...firestoreData,
          profile: {
            ...initialLoveStoryData.profile,
            ...(firestoreData.profile || {}),
            partner1: {
              ...initialLoveStoryData.profile.partner1,
              ...(firestoreData.profile?.partner1 || {}),
            },
            partner2: {
              ...initialLoveStoryData.profile.partner2,
              ...(firestoreData.profile?.partner2 || {}),
            },
          },
        };
        onData(mergedData);
        if (onStatusChange) onStatusChange('synced');
      } else {
        // "Not found" from local cache (offline / not yet reached server) is not trustworthy: never seed on it
        if (fromCache) return;
        // Document does not exist yet in Firestore, seed it with current local or initial data
        console.log('Firebase document not found, initializing...');
        try {
          if (onStatusChange) onStatusChange('saving');
          await setDoc(docRef, initialLoveStoryData);
          onData(initialLoveStoryData);
          if (onStatusChange) onStatusChange('synced');
        } catch (err) {
          console.error('Failed to initialize love story in Firestore', err);
          if (onStatusChange) onStatusChange('error');
        }
      }
    },
    (error) => {
      console.error('Firestore subscription error:', error);
      if (onStatusChange) onStatusChange('error');
    }
  );

  return unsubscribe;
}

/**
 * Save updated love story data to Cloud Firestore.
 */
export async function saveLoveStoryToFirestore(data: LoveStoryData): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, DOC_ID);
    await setDoc(docRef, data);
  } catch (error) {
    console.error('Error saving to Firestore:', error);
    throw error;
  }
}

/**
 * One-time fetch of the love story data
 */
export async function fetchLoveStoryOnce(): Promise<LoveStoryData | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, DOC_ID);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return snapshot.data() as LoveStoryData;
    }
    return null;
  } catch (error) {
    console.error('Error fetching from Firestore:', error);
    return null;
  }
}

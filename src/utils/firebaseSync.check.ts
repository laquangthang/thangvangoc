// Run: npx tsx src/utils/firebaseSync.check.ts
import assert from 'node:assert/strict';
import { changedFields, mergeRemote } from './firebaseSync';
import { initialLoveStoryData as base } from '../data/initialData';

const mem = { ...base.memories[0], id: 'mem-local' };
const local = { ...base, memories: [mem, ...base.memories] };
const remote = { ...base, songs: [], memories: [] };

// Only the edited top-level key is written
assert.deepEqual(Object.keys(changedFields(local, base)), ['memories']);
// Equal content in a new object is not a change
assert.deepEqual(changedFields(structuredClone(base), base), {});

// Remote update arrives while a local edit is pending: keep local memories, take remote songs
const merged = mergeRemote(local, base, remote);
assert.equal(merged.memories, local.memories);
assert.equal(merged.songs, remote.songs);
// No local edits: remote wins entirely
assert.deepEqual(mergeRemote(base, base, remote), remote);

console.log('firebaseSync.check OK');
process.exit(0);

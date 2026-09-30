// Run: npx tsx src/utils/cloudinary.check.ts
import assert from 'node:assert/strict';
import { optimizeImage } from './cloudinary';

const up = 'https://res.cloudinary.com/abl79ylj/image/upload/v1712345/ThangvaNgoc/a_b.jpg';
assert.equal(optimizeImage(up, 600), 'https://res.cloudinary.com/abl79ylj/image/upload/f_auto,q_auto,c_limit,w_600/v1712345/ThangvaNgoc/a_b.jpg');
// Already transformed, other hosts, base64 and empty values are untouched
const done = 'https://res.cloudinary.com/abl79ylj/image/upload/w_300/v1712345/a.jpg';
assert.equal(optimizeImage(done, 600), done);
assert.equal(optimizeImage('https://images.unsplash.com/photo-1?w=800', 600), 'https://images.unsplash.com/photo-1?w=800');
assert.equal(optimizeImage('data:image/png;base64,AAAA/upload/v1/', 600), 'data:image/png;base64,AAAA/upload/v1/');
assert.equal(optimizeImage(undefined, 600), undefined);

console.log('cloudinary.check OK');

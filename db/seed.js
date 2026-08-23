import db from "#db/client";
import { createPlaylist } from "./queries/playlists.js";
import { createPlaylistsTracks } from "./queries/playlists_tracks.js";
import { createTrack } from "./queries/tracks.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

function generateRandomString(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    // Pick a random index from the chars string
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars.charAt(randomIndex);
  }
  return result;
}

async function seed() {
  for (let i = 1; i <= 20; i++) {
    await createTrack(generateRandomString(20), Math.round(Math.random() * 9000 + 180000));
    if (i <= 15) {
      await createPlaylist(generateRandomString(30), generateRandomString(500));
      await createPlaylistsTracks(i, i);
    }
  }
}

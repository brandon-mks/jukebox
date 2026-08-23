import db from "#db/client";

//POST SQL functions
export async function createTrack(name, duration) {
  const SQL = `
    INSERT INTO tracks
    (name, duration_ms)
    VALUES ($1, $2)
    RETURNING *;
    `;

  try {
    const res = await db.query(SQL, [name, duration]);
    return res.rows[0];
  } catch (err) {
    console.log(err);
  }
}

//GET SQL functions
export async function getTracks() {
  const SQL = `
    SELECT * FROM tracks;
    `;

  try {
    const res = await db.query(SQL);
    return res.rows;
  } catch (err) {
    console.log(err);
  }
}

export async function getTrackById(id) {
  const SQL = `
    SELECT * FROM tracks
    WHERE id = $1;
    `;

  try {
    const res = await db.query(SQL, [id]);
    return res.rows[0];
  } catch (err) {
    console.log(err);
  }
}

export async function getPlaylistTracks(id) {
  const SQL = `
  SELECT * FROM tracks
  WHERE id IN (SELECT track_id FROM playlists_tracks
  WHERE playlist_id = $1);
  `;

  try {
    const res = await db.query(SQL, [id]);
    return res.rows;
  } catch (err) {
    console.log(err);
  }
}

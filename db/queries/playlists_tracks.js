import db from "#db/client";

export async function createPlaylistsTracks(pID, tID) {
  const SQL = `
    INSERT INTO playlists_tracks
    (
    playlist_id,
    track_id
    )
    VALUES ($1, $2)
    RETURNING *;
    `;

  try {
    const res = await db.query(SQL, [pID, tID]);
    return res.rows[0];
  } catch (err) {
    console.log(err);
    return err;
  }
}

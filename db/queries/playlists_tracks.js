import db from "#db/client";

//POST SQL functions
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
  }
}

//GET SQL functions
export async function getPlaylistTrack(pID, tID) {
  const SQL = `
  IF EXISTS (SELECT * FROM playlists_tracks
  WHERE playlist_id = $1
  AND track_id = $2)
  BEGIN
    NULL
  END
  ELSE
  BEGIN
    INSERT INTO playlists_tracks
    (playlist_id, track_id)
    VALUES ($1, $2)
    RETURNING *
  END;
  `;

  try {
    const res = await db.query(SQL, [pID, tID]);
    return res[0];
  } catch (err) {
    console.log(err);
  }
}

import db from "#db/client";

export async function createPlaylist(name, description) {
  const SQL = `
    INSERT INTO playlists (
    name,
    description
    )
    VALUES ($1, $2)
    RETURNING *;
    `;

  try {
    const res = await db.query(SQL, [name, description]);
    return res.rows[0];
  } catch (err) {
    console.log(err);
    return err;
  }
}

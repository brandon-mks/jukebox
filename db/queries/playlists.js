import db from "#db/client";

//POST SQL functions
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
  }
}

//GET SQL functions
export async function getPlaylists() {
  const SQL = `
  SELECT * FROM playlists;
  `;

  try {
    const res = await db.query(SQL);
    return res.rows;
  } catch (err) {
    console.log(err);
  }
}

export async function getPlaylistById(id) {
  const SQL = `
  SELECT * FROM playlists
  WHERE id = $1;
  `;

  try {
    const res = await db.query(SQL, [id]);
    return res.rows[0];
  } catch (err) {
    console.log(err);
  }
}

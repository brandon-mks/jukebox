import db from "#db/client";

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
    return err;
  }
}

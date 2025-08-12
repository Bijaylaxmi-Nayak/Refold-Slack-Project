import { initDB } from '../database.js';

export const saveTokens = async (team_id, access_token, refresh_token, expires_in) => {
  const db = await initDB();
  const expires_at = Date.now() + expires_in * 1000;
  await db.run(
    `INSERT INTO tokens (team_id, access_token, refresh_token, expires_at)
     VALUES (?, ?, ?, ?)
     ON CONFLICT(team_id) DO UPDATE SET
       access_token = excluded.access_token,
       refresh_token = excluded.refresh_token,
       expires_at = excluded.expires_at`,
    [team_id, access_token, refresh_token, expires_at]
  );
};

export const getToken = async (team_id) => {
  const db = await initDB();
  return db.get(`SELECT * FROM tokens WHERE team_id = ?`, [team_id]);
};

export const updateAccessToken = async (team_id, new_access_token, new_expires_in) => {
  const db = await initDB();
  const expires_at = Date.now() + new_expires_in * 1000;
  await db.run(
    `UPDATE tokens SET access_token = ?, expires_at = ? WHERE team_id = ?`,
    [new_access_token, expires_at, team_id]
  );
};

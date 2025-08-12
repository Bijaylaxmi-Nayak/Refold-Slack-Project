import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const initDB = async () => {
  const db = await open({
    filename: './slack-connect.db',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS tokens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      team_id TEXT UNIQUE,
      access_token TEXT,
      refresh_token TEXT,
      expires_at INTEGER
    );

    CREATE TABLE IF NOT EXISTS scheduled_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      channel_id TEXT,
      text TEXT,
      send_at INTEGER
    );
  `);

  return db;
};

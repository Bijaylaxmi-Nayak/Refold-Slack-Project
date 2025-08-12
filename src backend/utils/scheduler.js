import { initDB } from '../database.js';
import { sendSlackMessage } from './slackApi.js';

export const scheduleMessage = async (channel_id, text, send_at, team_id) => {
  const db = await initDB();
  await db.run(
    `INSERT INTO scheduled_messages (channel_id, text, send_at) VALUES (?, ?, ?)`,
    [channel_id, text, send_at]
  );
};

export const getScheduledMessages = async () => {
  const db = await initDB();
  return db.all(`SELECT * FROM scheduled_messages ORDER BY send_at ASC`);
};

export const deleteScheduledMessage = async (id) => {
  const db = await initDB();
  await db.run(`DELETE FROM scheduled_messages WHERE id = ?`, [id]);
};

export const startScheduler = () => {
  setInterval(async () => {
    const db = await initDB();
    const now = Date.now();
    const dueMessages = await db.all(`SELECT * FROM scheduled_messages WHERE send_at <= ?`, [now]);

    for (let msg of dueMessages) {
      await sendSlackMessage(msg.channel_id, msg.text, "YOUR_TEAM_ID");
      await deleteScheduledMessage(msg.id);
    }
  }, 60000);
};

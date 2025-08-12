import express from 'express';
import { sendSlackMessage } from '../utils/slackApi.js';
import { scheduleMessage, getScheduledMessages, deleteScheduledMessage } from '../utils/scheduler.js';

const router = express.Router();

router.post('/send', async (req, res) => {
  const { channel_id, text, team_id } = req.body;
  await sendSlackMessage(channel_id, text, team_id);
  res.json({ success: true });
});

router.post('/schedule', async (req, res) => {
  const { channel_id, text, send_at, team_id } = req.body;
  await scheduleMessage(channel_id, text, send_at, team_id);
  res.json({ success: true });
});

router.get('/scheduled', async (req, res) => {
  const messages = await getScheduledMessages();
  res.json(messages);
});

router.delete('/scheduled/:id', async (req, res) => {
  await deleteScheduledMessage(req.params.id);
  res.json({ success: true });
});

export default router;

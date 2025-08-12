import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { saveTokens } from '../utils/tokenStore.js';

dotenv.config();
const router = express.Router();

router.get('/connect', (req, res) => {
  const url = `https://slack.com/oauth/v2/authorize?client_id=${process.env.SLACK_CLIENT_ID}&scope=chat:write,channels:read&redirect_uri=${process.env.SLACK_REDIRECT_URI}`;
  res.redirect(url);
});

router.get('/callback', async (req, res) => {
  const { code } = req.query;
  const response = await axios.post('https://slack.com/api/oauth.v2.access', null, {
    params: {
      code,
      client_id: process.env.SLACK_CLIENT_ID,
      client_secret: process.env.SLACK_CLIENT_SECRET,
      redirect_uri: process.env.SLACK_REDIRECT_URI
    }
  });

  const data = response.data;
  await saveTokens(data.team.id, data.access_token, data.refresh_token, data.expires_in);

  res.send("Slack connected successfully!");
});

export default router;

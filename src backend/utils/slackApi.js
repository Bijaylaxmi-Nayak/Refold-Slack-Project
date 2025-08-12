import axios from 'axios';
import dotenv from 'dotenv';
import { getToken, updateAccessToken } from './tokenStore.js';

dotenv.config();

export const sendSlackMessage = async (channel_id, text, team_id) => {
  let tokenData = await getToken(team_id);

  // Refresh token if expired
  if (Date.now() >= tokenData.expires_at) {
    const refreshed = await axios.post('https://slack.com/api/oauth.v2.access', null, {
      params: {
        grant_type: 'refresh_token',
        refresh_token: tokenData.refresh_token,
        client_id: process.env.SLACK_CLIENT_ID,
        client_secret: process.env.SLACK_CLIENT_SECRET
      }
    });
    await updateAccessToken(team_id, refreshed.data.access_token, refreshed.data.expires_in);
    tokenData = await getToken(team_id);
  }

  // Send message
  return axios.post('https://slack.com/api/chat.postMessage', {
    channel: channel_id,
    text
  }, {
    headers: { Authorization: `Bearer ${tokenData.access_token}` }
  });
};

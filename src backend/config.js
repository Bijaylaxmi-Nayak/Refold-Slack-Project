import dotenv from 'dotenv'
dotenv.config()

export default {
  PORT: process.env.PORT || 3000,
  SLACK_CLIENT_ID: process.env.SLACK_CLIENT_ID,
  SLACK_CLIENT_SECRET: process.env.SLACK_CLIENT_SECRET,
  BASE_URL: process.env.BASE_URL,
  FRONTEND_URL: process.env.FRONTEND_URL,
  DB_FILE: process.env.DB_FILE || './src/db.json'
}
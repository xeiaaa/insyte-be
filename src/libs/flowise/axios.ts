import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const FLOWISE_API_URL = process.env.FLOWISE_API_URL as string;
const FLOWISE_API_KEY = process.env.FLOWISE_API_KEY as string;

export const flowiseApi = axios.create({
  baseURL: FLOWISE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${FLOWISE_API_KEY}`,
  },
});

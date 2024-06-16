import axios from 'axios';

export const nextAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

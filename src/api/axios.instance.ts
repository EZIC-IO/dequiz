import { generateSignature } from '@/utils/signature';
import axios from 'axios';

const nextAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

nextAPI.interceptors.request.use(
  async function (config) {
    if (config.method === 'post') {
      const secret = process.env.NEXT_PUBLIC_SIGNATURE_KEY ?? '';
      const timestamp = Date.now();

      const message = `${config.url}?timestamp=${timestamp}`;
      const signature = await generateSignature(message, secret);

      config.headers['x-signature'] = signature;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { nextAPI };

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
      const url = `${config.url}?timestamp=${timestamp}`;

      const signature = await generateSignature(url, secret);

      config.url = url;
      config.headers['x-signature'] = signature;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { nextAPI };

import CryptoJS from 'crypto-js';

export const generateSignature = async (message: string, secret: string) => {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const messageData = encoder.encode(message);

  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, messageData);
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

export const hashWalletAddress = (walletAddress: string) => {
  const hash = CryptoJS.SHA256(walletAddress.toLowerCase());

  return hash.toString(CryptoJS.enc.Hex);
};

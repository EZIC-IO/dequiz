import { createWallet } from 'thirdweb/wallets';

export const wallets = [
  createWallet('io.metamask'),
  createWallet('io.rabby'),
  createWallet('me.rainbow'),
  createWallet('com.coinbase.wallet'),
  createWallet('com.trustwallet.app'),
  createWallet('org.uniswap'),
  createWallet('io.1inch.wallet'),
];

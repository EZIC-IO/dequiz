import { createThirdwebClient } from 'thirdweb';

export const contractAddress = '0x7c5F081a98fd78665F8cEAD1863E75E8619D3f85';

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

export const thirdwebClient = createThirdwebClient({ clientId: clientId! });

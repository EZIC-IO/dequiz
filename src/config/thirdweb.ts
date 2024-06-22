import { createThirdwebClient } from 'thirdweb';

export const contractAddress = '0x0Ddb253Dee9de334aE831d1757a2833256ee0Ff2';

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

export const thirdwebClient = createThirdwebClient({ clientId: clientId! });

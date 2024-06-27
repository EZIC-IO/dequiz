import { useEffect, useState } from 'react';
import { Wand } from 'lucide-react';
import { useWriteContract } from 'wagmi';
import { toEther } from 'thirdweb/utils';
import { baseSepolia } from 'thirdweb/chains';
import { Hex } from 'thirdweb';
import {
  useActiveAccount,
  useActiveWalletChain,
  useConnectModal,
  useContractEvents,
  useSwitchActiveWalletChain,
} from 'thirdweb/react';
import { useRouter } from 'next/router';

import { abi } from '@/config/abi';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import {
  GenerationAction,
  GenerationActionStatus,
} from '@/api/models/generation.dto';
import { contract, contractAddress } from '@/constants/contract';
import { useReportSuccessfulMint } from '@/api/hooks/useReportSuccessfulMint';
import MintResult from './MintResult';
import useGetQuizContractData from '@/api/hooks/useGetQuizContractData';
import { thirdwebClient } from '@/config/thirdweb';
import { wallets } from '@/constants/wallets';
type Props = {
  open: boolean;
  isLoading: boolean;
  mintPrice: bigint;
  generationAction?: GenerationAction;
  onOpenChange: (open: boolean) => void;
};

const NftPreview = (props: Props) => {
  const { isLoading, open, onOpenChange, mintPrice, generationAction } = props;

  const router = useRouter();

  const [mintTx, setMintTx] = useState('');
  const [isMintResultModalOpen, setIsMintResultModalOpen] = useState(false);
  const [isMinting, setIsMinting] = useState(false);

  const { isConnected } = useGetQuizContractData();
  const account = useActiveAccount();
  const chain = useActiveWalletChain();
  const { connect } = useConnectModal();
  const switchChain = useSwitchActiveWalletChain();

  const { writeContract: mint } = useWriteContract({
    mutation: {
      onSuccess: (tx) => setMintTx(tx),
      onError: (e) => {
        console.error('Error minting', e);
      },
    },
  });

  const { data: contractEvents } = useContractEvents({
    contract,
    enabled: !!mintTx,
    events: [
      {
        hash: mintTx as Hex,
        topics: [],
        abiEvent: {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: 'address',
              name: '_from',
              type: 'address',
            },
            {
              indexed: false,
              internalType: 'uint256',
              name: '_tokenId',
              type: 'uint256',
            },
          ],
          name: 'MintSuccessful',
          type: 'event',
        },
      },
    ],
  });

  const { reportSuccessfulMint, data: mintData } = useReportSuccessfulMint({
    onSuccess: () => {
      setMintTx('');
      setIsMinting(false);
      setIsMintResultModalOpen(true);
    },
  });

  const isCorrectChain = chain?.id === baseSepolia.id;

  useEffect(() => {
    if (contractEvents?.length) {
      const event = contractEvents.find(
        (event) =>
          event.eventName === 'MintSuccessful' &&
          event.transactionHash === mintTx &&
          event.args._from === account?.address
      );

      if (event && event.args._tokenId && generationAction?._id && mintTx) {
        reportSuccessfulMint({
          nftTokenId: Number(event.args._tokenId),
          genActionId: generationAction?._id,
          mintTx,
        });
      }
    }
  }, [contractEvents, account, generationAction, mintTx, reportSuccessfulMint]);

  const handleChangeNetwork = () => {
    switchChain(baseSepolia);
  };

  const handleMint = async () => {
    setIsMinting(true);

    mint({
      abi,
      functionName: 'safeMint',
      address: contractAddress,
      args: [generationAction?.metadataBareIPFS],
      value: mintPrice,
      chainId: baseSepolia.id,
    });
  };

  const handleMintResulModalOpenChange = (open: boolean) => {
    setIsMintResultModalOpen(open);

    if (!open) {
      onOpenChange(false);
      router.replace('/minted');
    }
  };

  const handleConnect = async () => {
    try {
      await connect({ client: thirdwebClient, wallets });
    } catch (e) {
      console.error(e);
      return '';
    }
  };

  const renderActionButton = () => {
    if (!isConnected) {
      return <Button onClick={handleConnect}>Connect to mint</Button>;
    }

    if (!isCorrectChain) {
      return <Button onClick={handleChangeNetwork}>Change Network</Button>;
    }

    return (
      <Button disabled={isMinting} onClick={handleMint}>
        {isMinting ? 'Minting...' : 'Mint'}
      </Button>
    );
  };

  return (
    <>
      {generationAction && (
        <MintResult
          generationAction={generationAction}
          onOpenChange={handleMintResulModalOpenChange}
          open={
            isMintResultModalOpen &&
            mintData?.status === GenerationActionStatus.MINTED
          }
        />
      )}

      <Drawer dismissible={false} open={open}>
        <DrawerContent>
          <div className='flex h-full w-full flex-col items-center justify-center py-[112px]'>
            {isLoading ? (
              <>
                <Wand width={60} height={60} color='#fff' />

                <div className='max-w-[805px] pt-10 text-center text-5xl font-extrabold leading-tight'>
                  We are preparing your NFT.
                  <br />
                  Please do not close this page.
                </div>
              </>
            ) : (
              generationAction && (
                <div className='flex gap-4'>
                  <img
                    style={{ width: 299, height: 311 }}
                    alt='Nft Preview'
                    src={generationAction.imageGatewayIPFS}
                  />

                  <div>
                    <div className='mb-10 text-xl'>Your NFT is ready!</div>
                    {renderActionButton()}

                    <div className='mt-4'>{toEther(mintPrice)} ETH</div>
                  </div>
                </div>
              )
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NftPreview;

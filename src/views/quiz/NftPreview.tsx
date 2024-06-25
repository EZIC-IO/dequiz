import { useState } from 'react';
import { Wand } from 'lucide-react';
import { useWriteContract } from 'wagmi';
import { toEther } from 'thirdweb/utils';

import { abi } from '@/config/abi';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { GenerationAction } from '@/api/models/generation.dto';
import { contractAddress } from '@/constants/contract';
import { useReportSuccessfulMint } from '@/api/hooks/useReportSuccessfulMint';
import MintResult from './MintResult';

type Props = {
  open: boolean;
  isLoading: boolean;
  mintPrice: bigint;
  generationAction?: GenerationAction;
  onOpenChange: (open: boolean) => void;
};

const NftPreview = (props: Props) => {
  const { isLoading, open, onOpenChange, mintPrice, generationAction } = props;

  const [isMintResultModalOpen, setIsMintResultModalOpen] = useState(false);

  const { reportSuccessfulMint } = useReportSuccessfulMint();

  const handleMintSuccess = (minTx: string) => {
    setIsMintResultModalOpen(true);

    // TODO: invoke reportSuccessfulMint
  };

  const { writeContract: mint, isPending: claimIsPending } = useWriteContract({
    mutation: {
      onSuccess: handleMintSuccess,
    },
  });

  const handleMint = () => {
    mint({
      abi,
      functionName: 'safeMint',
      address: contractAddress,
      args: [generationAction?.metadataBareIPFS],
      value: mintPrice,
    });
  };

  const handleMintResulModalOpenChange = (open: boolean) => {
    setIsMintResultModalOpen(open);

    if (!open) {
      onOpenChange(false);
    }
  };

  return (
    <>
      {generationAction?.imageGatewayIPFS && (
        <MintResult
          open={isMintResultModalOpen}
          image={generationAction.imageGatewayIPFS}
          onOpenChange={handleMintResulModalOpenChange}
        />
      )}

      <Drawer open={open} onOpenChange={onOpenChange}>
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
                    <div className='text-xl'>Your NFT is ready!</div>
                    <Button
                      disabled={claimIsPending}
                      className='mt-10'
                      onClick={handleMint}
                    >
                      {claimIsPending ? 'Minting...' : 'Mint'}
                    </Button>
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

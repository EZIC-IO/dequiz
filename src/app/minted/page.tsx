'use client';

import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';
import { FullScreenText } from '@/components/ui/fullscreen-text';
import useGetMintedAction from '@/api/hooks/useGetMintedAction';
import { CHARACTER_PROPERTIES } from '@/constants/character';
import IconExplorer from '@/components/icons/IconExplorer';
import IconOpenSea from '@/components/icons/IconOpenSea';
import useGetQuizContractData from '@/api/hooks/useGetQuizContractData';
import { GenerationActionStatus } from '@/api/models/generation.dto';
import { BlurredImage } from '@/components/ui/blurred-image';

const NftDetails = () => {
  const { mintedAction, isLoading, error } = useGetMintedAction();
  const { isConnected } = useGetQuizContractData();

  if (isLoading) {
    return <Loader title='Prepairing your nft...' />;
  }

  if (!isConnected) {
    return <FullScreenText title='Please connect your wallet!' />;
  }

  if (error) {
    return (
      <FullScreenText title='Oops, something went wrong, please refresh your page.' />
    );
  }

  if (!mintedAction || mintedAction.status !== GenerationActionStatus.MINTED) {
    return <FullScreenText title='You do not have any NFT minted.' />;
  }

  const properties = CHARACTER_PROPERTIES[mintedAction.vocation];

  return (
    <div className='flex gap-8'>
      <Card className='relative w-[44%]'>
        <div
          className='absolute h-full w-full'
          style={{ background: 'url(/quiz/frame.svg) no-repeat center center' }}
        ></div>

        <div className='relative z-[-1] h-full w-full rounded-3xl'>
          <BlurredImage
            fill
            loading='eager'
            className='p-20 px-[53px] py-[124px]'
            alt={mintedAction.metadata.name}
            src={mintedAction.imageGatewayIPFS}
          />
        </div>
      </Card>

      <Card
        className='max-h-[769px] w-[56%] overflow-y-auto px-20 py-16'
        background='/gradient/results-gradient.webp'
      >
        <div className='flex flex-col gap-10'>
          <h2 className='font-tangak text-6xl font-bold'>
            {mintedAction.metadata.name} -{' '}
            <span className='text-bright-green'>Minted</span>
          </h2>

          <h3 className='font-tangak mt-8 text-5xl font-semibold'>
            <TypeAnimation
              cursor={false}
              sequence={[properties.title, 1000]}
              speed={50}
            />
          </h3>

          <div className='mt-5 flex flex-wrap gap-2'>
            {properties.skills.map((skill, index) => (
              <Badge
                key={`${skill}-${index}`}
                className='flex gap-2 text-sm font-normal text-primary'
              >
                {skill.icon}

                <span>{skill.label}</span>
              </Badge>
            ))}
          </div>

          <div className='mt-5 text-sm leading-7'>{properties.description}</div>

          {(mintedAction?.txBlockExplorerUrl || mintedAction?.openSeaUrl) && (
            <div className='mt-6 flex gap-6'>
              {mintedAction?.txBlockExplorerUrl && (
                <Link target='_blank' href={mintedAction.txBlockExplorerUrl}>
                  <Button size='lg' variant='secondary' className='flex gap-2'>
                    <IconExplorer />
                    Transaction
                  </Button>
                </Link>
              )}

              {mintedAction?.openSeaUrl && (
                <Link target='_blank' href={mintedAction.openSeaUrl}>
                  <Button size='lg' variant='secondary' className='flex gap-2'>
                    <IconOpenSea />
                    OpenSea
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default NftDetails;

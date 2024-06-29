'use client';

import Link from 'next/link';

import Loader from '@/components/loader';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import useGetMintedAction from '@/api/hooks/useGetMintedAction';
import { CHARACTER_PROPERTIES } from '@/constants/character';
import IconExplorer from '@/components/icons/IconExplorer';
import IconOpenSea from '@/components/icons/IconOpenSea';
import useGetQuizContractData from '@/api/hooks/useGetQuizContractData';
import { GenerationActionStatus } from '@/api/models/generation.dto';

const NftDetails = () => {
  const { mintedAction, isLoading, error } = useGetMintedAction();
  const { isConnected } = useGetQuizContractData();

  if (isLoading) {
    return <Loader title='Prepairing your nft...' />;
  }

  if (!isConnected) {
    return <Loader title='Please connect your wallet!' />;
  }

  if (error) {
    return (
      <Loader title='Oops, something went wrong, please refresh your page.' />
    );
  }

  if (!mintedAction || mintedAction.status !== GenerationActionStatus.MINTED) {
    return <Loader title='You do not have any NFT minted.' />;
  }

  const properties = CHARACTER_PROPERTIES[mintedAction.vocation];

  return (
    <div className='h-full w-full pl-4'>
      <Card className='flex' background='/gradient/results-gradient.webp'>
        <div className='w-[60%]'>
          <img
            alt='Quiz results'
            style={{ width: 773, height: 769 }}
            src={mintedAction.imageGatewayIPFS}
          />
        </div>

        <div className='w-[40%] pl-[51px] pr-[66px] pt-[60px]'>
          <div className='flex flex-col gap-10'>
            <h2 className='font-tangak text-6xl font-bold'>
              {mintedAction.metadata.name} -{' '}
              <span className='text-green'>Minted</span>
            </h2>

            <h3 className='font-tangak mt-8 text-5xl font-semibold'>
              {properties.title}
            </h3>

            <div className='flex gap-2'>
              {properties.skills.map((skill, index) => (
                <Badge
                  key={`${skill}-${index}`}
                  variant='outline'
                  className='flex gap-2 text-sm font-normal text-primary'
                >
                  {skill.icon}

                  <span>{skill.label}</span>
                </Badge>
              ))}
            </div>

            <div>{properties.description}</div>

            {(mintedAction?.txBlockExplorerUrl || mintedAction?.openSeaUrl) && (
              <div className='mt-12 flex justify-center gap-6'>
                {mintedAction?.txBlockExplorerUrl && (
                  <Link target='_blank' href={mintedAction.txBlockExplorerUrl}>
                    <Button variant='secondary' className='flex gap-2'>
                      <IconExplorer />
                      Transaction
                    </Button>
                  </Link>
                )}

                {mintedAction?.openSeaUrl && (
                  <Link target='_blank' href={mintedAction.openSeaUrl}>
                    <Button variant='secondary' className='flex gap-2'>
                      <IconOpenSea />
                      OpenSea
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NftDetails;

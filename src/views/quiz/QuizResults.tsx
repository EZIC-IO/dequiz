import { BadgeInfo, Hammer, RotateCw } from 'lucide-react';
import pluralize from 'pluralize';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useState } from 'react';
import Image from 'next/image';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RPGVocation } from '@/api/models/gen-image.dto';
import { CHARACTER_PROPERTIES } from '@/constants/character';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import NftPreview from './NftPreview';
import { useInitPublishImage } from '@/api/hooks/useInitPublish';
import { GenerationAction } from '@/api/models/generation.dto';
import ShimmerButton from '@/components/ui/shimmer-button';
import { useGenerateImageAttempts } from '@/hooks/useGenerateImageAttempts';
import useGetQuizContractData from '@/api/hooks/useGetQuizContractData';

type Props = {
  character: RPGVocation;
  onRegenerate: () => void;
  mintPrice: bigint;
  alreadyMintedGlobalAmount: number;
  totalSupply: number;
  generationAction: GenerationAction;
};

type FormValues = {
  name: string;
};

const QuizResults = (props: Props) => {
  const {
    character,
    mintPrice,
    onRegenerate,
    alreadyMintedGlobalAmount,
    totalSupply,
    generationAction,
  } = props;

  const [isNftPreviewOpen, setIsNftPreviewOpen] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'all',
    defaultValues: { name: '' },
  });

  const { isConnected } = useGetQuizContractData();
  const { hasAttempts, attemptsLeft } = useGenerateImageAttempts();
  const { initPublish, isPending: isLoading, data } = useInitPublishImage();

  const properties = CHARACTER_PROPERTIES[character];

  const handleProceed = (values: FormValues) => {
    setIsNftPreviewOpen(true);
    initPublish({ ...values, genActionId: generationAction._id });
  };

  return (
    <>
      <NftPreview
        mintPrice={mintPrice}
        isLoading={isLoading}
        open={isNftPreviewOpen}
        generationAction={data}
      />

      <Card
        className='flex max-h-[761px]'
        background='/gradient/results-gradient.webp'
      >
        <div className='relative w-[57%]'>
          <Image
            layout='fill'
            quality={100}
            alt={generationAction.vocation}
            src={generationAction.imageUrl}
          />
        </div>

        <div className='w-[43%] overflow-y-auto py-16 pl-12 pr-14'>
          <div className='flex flex-col'>
            <h3 className='font-tangak text-5xl'>{properties.title}</h3>

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

            <div className='mt-5 text-sm leading-7'>
              {properties.description}
            </div>

            <div className='mt-5'>
              <Label htmlFor='character-name'>Name your Character</Label>

              <form
                className='mt-1 flex flex-wrap gap-2'
                onSubmit={handleSubmit(handleProceed)}
              >
                <Controller
                  name='name'
                  control={control}
                  rules={{ required: 'Fill in the name' }}
                  render={({ field }) => (
                    <div>
                      <Input
                        id='character-name'
                        placeholder='Name'
                        className='w-[288px]'
                        {...field}
                      />

                      <ErrorMessage
                        errors={errors}
                        name='name'
                        render={({ message }: { message: string }) => (
                          <p className='pt-0.5 text-xs text-danger'>
                            {message}
                          </p>
                        )}
                      />
                    </div>
                  )}
                />

                <ShimmerButton
                  className='h-10'
                  type='submit'
                  disabled={!isValid}
                >
                  Proceed
                </ShimmerButton>
              </form>
            </div>

            <div className='mt-10'>
              <div className='flex justify-between gap-4'>
                <Button
                  size='lg'
                  disabled={!hasAttempts}
                  variant='secondary'
                  className='flex gap-1.5'
                  onClick={onRegenerate}
                >
                  Generate Again
                  <RotateCw size={15} />
                </Button>

                {alreadyMintedGlobalAmount && totalSupply && (
                  <div className='flex'>
                    <Badge className='flex gap-2 text-lg'>
                      <Hammer />

                      <span>
                        Minted: {Number(alreadyMintedGlobalAmount)}/
                        {Number(totalSupply)}
                      </span>
                    </Badge>
                  </div>
                )}
              </div>

              {isConnected && (
                <div className='mt-6 flex items-center gap-1 text-xs'>
                  <BadgeInfo size={16} />
                  Note: you have{' '}
                  {pluralize('generation attempt', attemptsLeft, true)}{' '}
                  remaining
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default QuizResults;

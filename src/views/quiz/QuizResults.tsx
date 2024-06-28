import { BadgeInfo, Hammer, RotateCw } from 'lucide-react';
import pluralize from 'pluralize';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useState } from 'react';

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

  const { hasAttempts, attemptsLeft } = useGenerateImageAttempts();
  const { initPublish, isPending: isLoading, data } = useInitPublishImage();

  const properties = CHARACTER_PROPERTIES[character];

  const handleProceed = (values: FormValues) => {
    setIsNftPreviewOpen(true);
    initPublish({ ...values, genActionId: generationAction._id });
  };

  const handleNftPreviewOpenChange = (open: boolean) => {
    setIsNftPreviewOpen(open);
  };

  return (
    <>
      <NftPreview
        mintPrice={mintPrice}
        isLoading={isLoading}
        open={isNftPreviewOpen}
        generationAction={data}
        onOpenChange={handleNftPreviewOpenChange}
      />

      <Card className='flex' background='/gradient/results-gradient.png'>
        <div className='w-[60%]'>
          <img
            alt='Quiz results'
            style={{ width: 773, height: 769 }}
            src={generationAction.imageUrl}
          />
        </div>

        <div className='w-[40%] pl-[51px] pr-[66px] pt-[60px]'>
          <div className='flex flex-col gap-5'>
            <h3 className='text-2xl font-semibold'>{properties.title}</h3>

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

            <div>
              <Label className='pb-2' htmlFor='character-name'>
                Name your Character
              </Label>

              <form
                className='flex gap-2'
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

                <ShimmerButton type='submit' disabled={!isValid}>
                  Proceed
                </ShimmerButton>
              </form>
            </div>

            <div className='mt-5'>
              <div className='flex justify-between gap-2'>
                <Button
                  disabled={!hasAttempts}
                  variant='secondary'
                  onClick={onRegenerate}
                >
                  Generate Again
                  <RotateCw className='ml-2 h-4 w-4' />
                </Button>

                {alreadyMintedGlobalAmount && totalSupply && (
                  <div className='flex'>
                    <Badge variant='outline' className='flex gap-2 text-lg'>
                      <Hammer />

                      <span>
                        Minted: {Number(alreadyMintedGlobalAmount)}/
                        {Number(totalSupply)}
                      </span>
                    </Badge>
                  </div>
                )}
              </div>

              <div className='mt-3 flex items-center gap-2 text-xs'>
                <BadgeInfo />
                Note: you have {pluralize('attempt', attemptsLeft, true)}{' '}
                remaining
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default QuizResults;

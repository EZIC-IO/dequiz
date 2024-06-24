import Image from 'next/image';
import { BadgeInfo, Hammer, RotateCw } from 'lucide-react';
import pluralize from 'pluralize';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RPGVocation } from '@/api/models/gen-image.dto';
import { CHARACTER_PROPERTIES } from '@/constants/character';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { GenerationActionResponse } from '@/api/hooks/useGenerateImage';

type Props = {
  character: RPGVocation;
  onRegenerate: () => void;
  mintPrice: number;
  alreadyMintedGlobalAmount: number;
  totalSupply: number;
  attemptsLeft: number;
  generationAction: GenerationActionResponse;
};

const QuizResults = (props: Props) => {
  const {
    character,
    mintPrice,
    onRegenerate,
    attemptsLeft,
    alreadyMintedGlobalAmount,
    totalSupply,
    generationAction,
  } = props;

  const [characterName, setCharacterName] = useState('');

  const properties = CHARACTER_PROPERTIES[character];
  const hasAttempts = attemptsLeft > 0;

  return (
    <Card className='flex' background='/gradient/results-gradient.png'>
      <div className='w-[60%]'>
        <Image
          alt='Quiz results'
          width={773}
          height={769}
          quality={100}
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

            <div className='flex gap-2'>
              <Input
                id='character-name'
                placeholder='Name'
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
              />

              <Button variant='secondary'>Proceed</Button>
            </div>
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
  );
};

export default QuizResults;

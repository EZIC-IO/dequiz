import Image from 'next/image';
import { Hammer } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RPGVocation } from '@/api/models/gen-image';
import { CHARACTER_PROPERTIES } from '@/constants/character';
import { Badge } from '@/components/ui/badge';
import { weiToEth } from '@/utils/convert';

type Props = {
  character: RPGVocation;
  onRegenerate: () => void;
  mintPrice: number;
  alreadyMintedGlobalAmount: number;
  totalSupply: number;
};

const QuizResults = (props: Props) => {
  const {
    character,
    mintPrice,
    onRegenerate,
    alreadyMintedGlobalAmount,
    totalSupply,
  } = props;
  const properties = CHARACTER_PROPERTIES[character];

  return (
    <Card className='flex' background='/gradient/results-gradient.png'>
      <div className='w-[60%]'>
        <Image
          // TODO: replace w/ image from the API
          src='/quiz/quiz-results.png'
          alt='Quiz results'
          width={773}
          height={769}
          quality={100}
        />
      </div>

      <div className='w-[40%] pl-[51px] pr-[66px] pt-[60px]'>
        <div className='flex flex-col gap-10'>
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

          <div className='flex gap-8'>
            <Button variant='secondary'>
              Claim Mint - {weiToEth(mintPrice)}
            </Button>

            <Button variant='secondary' onClick={onRegenerate}>
              Generate Again
            </Button>
          </div>

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
      </div>
    </Card>
  );
};

export default QuizResults;

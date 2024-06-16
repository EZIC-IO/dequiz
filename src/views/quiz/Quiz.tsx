import Link from 'next/link';
import Image from 'next/image';

import { QuizType } from '@/api/models/quiz';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Props = {
  quiz: QuizType;
};

const Quiz = (props: Props) => {
  const { quiz } = props;

  return (
    <Link href={`/quiz/${quiz.id}`}>
      <Card className='flex bg-gray-400 bg-opacity-10 bg-clip-padding p-4 backdrop-blur-sm backdrop-filter'>
        <Image src={quiz.image} alt={quiz.title} width={600} height={350} />

        <CardContent className='flex flex-[1_1_auto] flex-col justify-between'>
          <div className='flex items-center justify-between'>
            <CardTitle>{quiz.title}</CardTitle>

            {quiz.isLive && (
              <div>
                <Badge>Live</Badge>
              </div>
            )}
          </div>

          <div>{quiz.description}</div>

          <div className='flex items-center justify-between'>
            <div>
              <Badge variant='outline'>Minted: {quiz.mintedCount}/1000</Badge>
            </div>

            <div className='font-semibold'>{quiz.mintPrice} ETH</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Quiz;

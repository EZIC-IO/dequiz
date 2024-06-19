import { Wand } from 'lucide-react';
import Image from 'next/image';

import { Card } from './ui/card';

type Props = {
  title: string;
};

const Loader = (props: Props) => {
  const { title } = props;

  return (
    <Card
      className='relative flex flex-col items-center justify-center'
      background='/quiz/gradient-1.png'
    >
      <Wand width={60} height={60} color='#fff' />

      <div className='max-w-[805px] pt-10 text-center text-5xl font-extrabold leading-tight'>
        {title}
      </div>
    </Card>
  );
};

export default Loader;

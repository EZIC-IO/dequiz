import { Controller, Control } from 'react-hook-form';
import Slider from 'rc-slider';

import Radio from '@/components/ui/radio';
import {
  FormValues,
  CharacterAppearanceFormValues,
  GENDER_OPTIONS,
} from './utils';

type Props = {
  control: Control<FormValues, CharacterAppearanceFormValues>;
};

const CharacterAppearance = (props: Props) => {
  const { control } = props;

  return (
    <div>
      <h3 className='text-2xl font-semibold'>
        Shape Your Hero&apos;s Appearance
      </h3>

      <div className='flex flex-col gap-10'>
        <div className='text-xxs mt-3'>
          Craft a distinctive appearance that fits your fantasy persona.
        </div>

        <ul className='flex gap-2'>
          {GENDER_OPTIONS.map((option) => (
            <li key={option.value}>
              <Controller
                name='gender'
                control={control}
                render={({ field }) => <Radio {...field} {...option} />}
              />
            </li>
          ))}
        </ul>

        {/* TODO: add colors fields */}
        {/* <div className='space-y-6'>
          <div className='font-lg'>Eye Color</div>
        </div>

        <div className='space-y-6'>
          <div className='font-lg'>Hair Color</div>
        </div> */}

        <div className='space-y-6'>
          <div className='font-lg'>Hair Length</div>

          <Controller
            name='hairLength'
            control={control}
            render={({ field }) => (
              <Slider
                {...field}
                className='m-2'
                styles={{
                  track: {
                    backgroundColor: '#64748B',
                    height: 8,
                  },
                  rail: {
                    backgroundColor: '#1E293B',
                    height: 8,
                  },
                }}
                dotStyle={{
                  width: 20,
                  height: 20,
                }}
                activeDotStyle={{
                  width: 20,
                  height: 20,
                }}
              />
            )}
          />
        </div>

        <div className='space-y-6'>
          <div className='font-lg'>Facial Hair</div>

          <Controller
            name='facialHair'
            control={control}
            render={({ field }) => (
              <Slider
                {...field}
                className='m-2'
                styles={{
                  track: {
                    backgroundColor: '#64748B',
                    height: 8,
                  },
                  rail: {
                    backgroundColor: '#1E293B',
                    height: 8,
                  },
                }}
                dotStyle={{
                  width: 20,
                  height: 20,
                }}
                activeDotStyle={{
                  width: 20,
                  height: 20,
                }}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default CharacterAppearance;

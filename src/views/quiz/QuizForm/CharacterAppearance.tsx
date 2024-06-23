import { Controller, Control, useWatch } from 'react-hook-form';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

import Radio from '@/components/ui/radio';
import {
  FormValues,
  CharacterAppearanceFormValues,
  GENDER_OPTIONS,
  HAIR_LENGTH_OPTIONS,
} from './utils';
import { Gender } from '@/api/models/gen-image';

type Props = {
  control: Control<FormValues, CharacterAppearanceFormValues>;
};

const CharacterAppearance = (props: Props) => {
  const { control } = props;

  // Watch the value of the gender field
  const selectedGender = useWatch({
    control,
    name: 'gender',
  });

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
          <ul className='flex gap-2'>
            {HAIR_LENGTH_OPTIONS.map((option) => (
              <li key={option.value}>
                <Controller
                  name='hairLength'
                  control={control}
                  render={({ field }) => <Radio {...field} {...option} />}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Render beard option only for Male */}
        {selectedGender === Gender.MALE && (
          <div className='space-y-6'>
            <div className='flex items-center space-x-2'>
              <Switch id='facial-hair' />
              <Label className='pl-4' htmlFor='facial-hair'>
                Facial Hair
              </Label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterAppearance;
function useFormValues() {
  throw new Error('Function not implemented.');
}

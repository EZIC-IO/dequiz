import { Controller, Control, useWatch } from 'react-hook-form';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

import Radio from '@/components/ui/radio';
import {
  FormValues,
  CharacterAppearanceFormValues,
  GENDER_OPTIONS,
  HAIR_LENGTH_OPTIONS,
  EYE_COLOR_OPTONS,
  HAIR_COLOR_OPTIONS,
} from './utils';
import { Gender } from '@/api/models/gen-image.dto';

type Props = {
  control: Control<FormValues, CharacterAppearanceFormValues>;
};

const CharacterAppearance = (props: Props) => {
  const { control } = props;

  const selectedGender = useWatch({
    control,
    name: 'gender',
  });

  return (
    <div>
      <h3 className='font-tangak text-3xl'>
        Shape Your Hero&apos;s Appearance
      </h3>

      <div className='flex flex-col gap-10'>
        <div className='mt-3 text-sm'>
          Craft a distinctive appearance that fits your fantasy persona.
        </div>

        <ul className='flex gap-2'>
          {GENDER_OPTIONS.map((option) => (
            <li key={option.value}>
              <Controller
                name='gender'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Radio
                    {...field}
                    {...option}
                    checked={field.value === option.value}
                  />
                )}
              />
            </li>
          ))}
        </ul>

        <div className='space-y-6'>
          <div className='font-lg'>Eye Color</div>
          <ul className='flex gap-2'>
            {EYE_COLOR_OPTONS.map((color) => (
              <li key={`${color.value}-${color.label}`}>
                <Controller
                  name='eyeColor'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Radio
                      {...field}
                      value={color.value}
                      checked={field.value === color.value}
                      labelStyles={{ backgroundColor: color.label }}
                      className='h-[32px] w-[32px] rounded-full p-3'
                    />
                  )}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className='space-y-6'>
          <div className='font-lg'>Hair Color</div>
          <ul className='flex gap-2'>
            {HAIR_COLOR_OPTIONS.map((color) => (
              <li key={`${color.value}-${color.label}`}>
                <Controller
                  name='hairColor'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Radio
                      {...field}
                      value={color.value}
                      checked={field.value === color.value}
                      labelStyles={{ backgroundColor: color.label }}
                      className='h-[32px] w-[32px] rounded-full p-3'
                    />
                  )}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className='space-y-6'>
          <div className='font-lg'>Hair Length</div>
          <ul className='flex gap-2'>
            {HAIR_LENGTH_OPTIONS.map((option) => (
              <li key={option.value}>
                <Controller
                  name='hairLength'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Radio
                      {...field}
                      {...option}
                      checked={field.value === option.value}
                    />
                  )}
                />
              </li>
            ))}
          </ul>
        </div>

        {selectedGender === Gender.MALE && (
          <div className='flex items-center space-x-2'>
            <Controller
              name='facialHair'
              control={control}
              render={({ field: { value, onChange, ...rest } }) => (
                <>
                  <Switch
                    id='facial-hair'
                    checked={value}
                    onCheckedChange={onChange}
                    {...rest}
                  />
                  <Label className='pl-4' htmlFor='facial-hair'>
                    Facial Hair
                  </Label>
                </>
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterAppearance;

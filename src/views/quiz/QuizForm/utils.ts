import {
  EyeColor,
  EyeColorHEX,
  Gender,
  GenPayloadDto,
  HairColor,
  HairColorHEX,
  HairLength,
} from '@/api/models/gen-image.dto';

export type CharacterAppearanceFormValues = Omit<
  GenPayloadDto,
  'rpgVocation' | 'facialHair'
> & {
  facialHair: boolean;
};

export type FormValues = Record<string, string> & CharacterAppearanceFormValues;

export const GENDER_OPTIONS = [
  {
    label: 'Male',
    value: Gender.MALE,
  },
  {
    label: 'Female',
    value: Gender.FEMALE,
  },
  {
    label: 'Other/Prefer not to say',
    value: Gender.OTHER,
  },
];

export const HAIR_LENGTH_OPTIONS = [
  {
    label: 'Short',
    value: HairLength.SHORT,
  },
  {
    label: 'Medium',
    value: HairLength.MEDIUM,
  },
  {
    label: 'Long',
    value: HairLength.LONG,
  },
];

export const EYE_COLOR_OPTONS = [
  {
    value: EyeColor.DARK_BROWN,
    label: EyeColorHEX.DARK_BROWN,
  },
  {
    value: EyeColor.BROWN,
    label: EyeColorHEX.BROWN,
  },
  {
    value: EyeColor.HAZEL,
    label: EyeColorHEX.HAZEL,
  },
  {
    value: EyeColor.AMBER,
    label: EyeColorHEX.AMBER,
  },
  {
    value: EyeColor.GREEN,
    label: EyeColorHEX.GREEN,
  },
  {
    value: EyeColor.BLUE,
    label: EyeColorHEX.BLUE,
  },
  {
    value: EyeColor.GRAY,
    label: EyeColorHEX.GRAY,
  },
  {
    value: EyeColor.LIGHT_BLUE,
    label: EyeColorHEX.LIGHT_BLUE,
  },
  {
    value: EyeColor.VIOLET,
    label: EyeColorHEX.VIOLET,
  },
];

export const HAIR_COLOR_OPTIONS = [
  {
    value: HairColor.BLACK,
    label: HairColorHEX.BLACK,
  },
  {
    value: HairColor.DARK_BROWN,
    label: HairColorHEX.DARK_BROWN,
  },
  {
    value: EyeColor.BROWN,
    label: HairColorHEX.BROWN,
  },
  {
    value: HairColor.LIGHT_BROWN,
    label: HairColorHEX.LIGHT_BROWN,
  },
  {
    value: HairColor.FAIR,
    label: HairColorHEX.FAIR,
  },
  {
    value: HairColor.BLONDE,
    label: HairColorHEX.BLONDE,
  },
  {
    value: HairColor.DIRTY_BLONDE,
    label: HairColorHEX.DIRTY_BLONDE,
  },
  {
    value: HairColor.RED,
    label: HairColorHEX.RED,
  },
  {
    value: HairColor.GRAY,
    label: HairColorHEX.GRAY,
  },
  {
    value: HairColor.WHITE,
    label: HairColorHEX.WHITE,
  },
];

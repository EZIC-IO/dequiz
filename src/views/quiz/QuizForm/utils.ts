import {
  EyeColor,
  FacialHair,
  Gender,
  GenPayloadDto,
  HairColor,
  HairLength,
  RPGVocation,
} from '@/api/models/gen-image';

export type CharacterAppearanceFormValues = Omit<
  GenPayloadDto,
  'rpgVocation' | 'hairLength' | 'facialHair'
> & {
  hairLength?: number;
  facialHair?: number;
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

export const EYE_COLORS = Object.values(EyeColor);

export const HAIR_COLORS = Object.values(HairColor);

const getHairLength = (hairLength = 0): HairLength => {
  if (hairLength < 30) {
    return HairLength.SHORT;
  } else if (hairLength < 70) {
    return HairLength.MEDIUM;
  } else {
    return HairLength.LONG;
  }
};

const getFacialHairLabel = (facialHair = 0): FacialHair => {
  if (!facialHair) {
    return FacialHair.NO;
  } else if (facialHair < 30) {
    return FacialHair.SHORT;
  } else if (facialHair < 70) {
    return FacialHair.MEDIUM;
  } else {
    return FacialHair.LONG;
  }
};

export const mapFormValuesToGenPayload = (
  values: CharacterAppearanceFormValues,
  rpgVocation: RPGVocation
): GenPayloadDto => {
  const { facialHair, hairLength, ...rest } = values;

  return {
    ...rest,
    rpgVocation,
    hairLength: getHairLength(hairLength),
    facialHair: getFacialHairLabel(facialHair),
  };
};

import { COLORS } from '../../constants/design';

export const ANIMATION_CONFIG = {
  SPRING: {
    friction: 8,
    tension: 40,
    useNativeDriver: true,
  },
  TIMING: {
    duration: 600,
    useNativeDriver: true,
  },
  STAGGER_DELAY: 150,
};

export const HEADER_SCROLL_DISTANCE = 100;

export const INITIAL_ANIMATION_VALUES = {
  scale: 0.9,
  imageTranslateY: 40,
  detailsTranslateY: 100,
};

export const RIPPLE_CONFIG = {
  color: COLORS.neutral[200],
  borderless: true,
  radius: 20,
};

import { useRef, useCallback } from 'react';
import { Animated } from 'react-native';
import { ANIMATION_CONFIG, INITIAL_ANIMATION_VALUES } from './constants';

export function useAnimations() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(INITIAL_ANIMATION_VALUES.scale)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;
  const imageTranslateY = useRef(new Animated.Value(INITIAL_ANIMATION_VALUES.imageTranslateY)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const detailsTranslateY = useRef(new Animated.Value(INITIAL_ANIMATION_VALUES.detailsTranslateY)).current;
  const detailsOpacity = useRef(new Animated.Value(0)).current;

  const startAnimations = useCallback(() => {
    const animations = [
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          ...ANIMATION_CONFIG.SPRING,
        }),
        Animated.timing(imageOpacity, {
          toValue: 1,
          ...ANIMATION_CONFIG.TIMING,
        }),
        Animated.spring(imageTranslateY, {
          toValue: 0,
          ...ANIMATION_CONFIG.SPRING,
        }),
      ]),
      Animated.parallel([
        Animated.spring(detailsTranslateY, {
          toValue: 0,
          ...ANIMATION_CONFIG.SPRING,
        }),
        Animated.timing(detailsOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ];

    Animated.stagger(ANIMATION_CONFIG.STAGGER_DELAY, animations).start();
  }, []);

  const handleButtonPress = useCallback((isPressed) => {
    Animated.spring(buttonScaleAnim, {
      toValue: isPressed ? 0.95 : 1,
      ...ANIMATION_CONFIG.SPRING,
    }).start();
  }, []);

  return {
    scrollY,
    scaleAnim,
    buttonScaleAnim,
    imageTranslateY,
    imageOpacity,
    detailsTranslateY,
    detailsOpacity,
    startAnimations,
    handleButtonPress,
  };
}

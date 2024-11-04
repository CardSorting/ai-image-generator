import React, { useCallback, useRef, useState } from 'react';
import { View, Text, Pressable, Animated, Easing } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import { COLORS } from '../../constants/design';

const NUM_SPARKLES = 24;
const SPARKLE_ICONS = [
  'star-four-points',
  'sparkle',
  'star',
  'flare',
  'shimmer',
  'star-shooting',
  'star-circle',
];

const SPARKLE_COLORS = [
  COLORS.primary[300],
  COLORS.primary[400],
  COLORS.primary[200],
  '#FFD700', // Gold
  '#FFF5E1', // Light gold
];

const Sparkle = ({ delay, style, duration = 1200 }) => {
  const sparkleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  
  const icon = SPARKLE_ICONS[Math.floor(Math.random() * SPARKLE_ICONS.length)];
  const color = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];
  const size = 10 + Math.random() * 14;
  const rotations = 1 + Math.random() * 2;

  React.useEffect(() => {
    Animated.parallel([
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(sparkleAnim, {
          toValue: 1,
          duration: duration,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          useNativeDriver: true,
        })
      ]),
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: duration,
          easing: Easing.bezier(0.45, 0, 0.55, 1),
          useNativeDriver: true,
        })
      ]),
      Animated.sequence([
        Animated.delay(delay),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: duration * 0.3,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        })
      ])
    ]).start();
  }, [delay, sparkleAnim, rotateAnim, scaleAnim, duration]);

  const sparkleStyle = {
    transform: [
      {
        scale: scaleAnim.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, 1.5, 0],
        }),
      },
      {
        translateX: sparkleAnim.interpolate({
          inputRange: [0, 0.2, 0.8, 1],
          outputRange: [0, style.translateX * 0.3, style.translateX, style.translateX * 1.1],
        }),
      },
      {
        translateY: sparkleAnim.interpolate({
          inputRange: [0, 0.2, 0.8, 1],
          outputRange: [0, style.translateY * 0.3, style.translateY, style.translateY * 1.1],
        }),
      },
      {
        rotate: rotateAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', `${360 * rotations}deg`],
        }),
      }
    ],
    opacity: sparkleAnim.interpolate({
      inputRange: [0, 0.1, 0.4, 0.9, 1],
      outputRange: [0, 1, 1, 0.8, 0],
    }),
  };

  return (
    <Animated.View style={[styles.sparkle, sparkleStyle]}>
      <MaterialCommunityIcons 
        name={icon}
        size={size} 
        color={color}
      />
    </Animated.View>
  );
};

export default function MagicButton({ onPress, disabled, style }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pushAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  const handlePress = useCallback(() => {
    setIsAnimating(true);
    
    // Reset animations
    glowAnim.setValue(0);
    
    Animated.sequence([
      // Initial push effect
      Animated.parallel([
        Animated.timing(pushAnim, {
          toValue: 1,
          duration: 200,
          easing: Easing.bezier(0.2, 0, 0, 1),
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 0.92,
          friction: 3,
          tension: 200,
          useNativeDriver: true,
        }),
      ]),
      // Pop out effect
      Animated.parallel([
        Animated.spring(pushAnim, {
          toValue: -0.2,
          friction: 3,
          tension: 100,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1.1,
          friction: 5,
          tension: 100,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      // Return to normal
      Animated.parallel([
        Animated.spring(pushAnim, {
          toValue: 0,
          friction: 5,
          tension: 100,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 5,
          tension: 100,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setTimeout(() => {
        setIsAnimating(false);
        onPress();
      }, 1000);
    });
  }, [onPress, scaleAnim, pushAnim, glowAnim]);

  const buttonTransform = [
    { scale: scaleAnim },
    {
      translateY: pushAnim.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [-20, 0, 10],
      }),
    },
  ];

  return (
    <View style={[styles.container, style]}>
      <Animated.View style={[
        styles.buttonContainer,
        { transform: buttonTransform },
        disabled && styles.buttonDisabled,
      ]}>
        <Pressable
          style={styles.button}
          onPress={handlePress}
          disabled={disabled || isAnimating}
        >
          <MaterialCommunityIcons 
            name="wand" 
            size={28} 
            color={COLORS.neutral[50]} 
          />
          <Text style={styles.buttonText}>Create Magic</Text>
        </Pressable>
      </Animated.View>

      {isAnimating && (
        <View style={styles.sparklesContainer}>
          {Array.from({ length: NUM_SPARKLES }).map((_, index) => {
            const angle = (index / NUM_SPARKLES) * Math.PI * 2;
            const radius = 180;
            const randomOffset = (Math.random() - 0.5) * 60;
            const randomDelay = Math.random() * 200;
            const randomDuration = 1000 + Math.random() * 500;
            
            return (
              <Sparkle
                key={index}
                delay={randomDelay}
                duration={randomDuration}
                style={{
                  translateX: Math.cos(angle) * radius + randomOffset,
                  translateY: Math.sin(angle) * radius + randomOffset,
                }}
              />
            );
          })}
        </View>
      )}
    </View>
  );
}

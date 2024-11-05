import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import { COLORS } from '../../constants/design';

const SPARKLE_ICONS = [
  'star-four-points',
  'sparkle',
  'star',
  'flare',
  'shimmer',
  'star-shooting',
  'star-circle',
  'star-face',
  'star-three-points',
];

const SPARKLE_COLORS = [
  COLORS.primary[300],
  COLORS.primary[400],
  COLORS.primary[200],
  '#FFD700', // Gold
  '#FFF5E1', // Light gold
  '#FFF9C4', // Light yellow
  '#E8F5E9', // Light mint
];

const MAGIC_PARTICLES = 12;
const FLOATING_SPARKLES = 16;

const MagicParticle = ({ index, total }) => {
  const particleAnim = useRef(new Animated.Value(0)).current;
  const angle = (index / total) * Math.PI * 2;
  const radius = 60;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(particleAnim, {
          toValue: 1,
          duration: 2000,
          delay: index * (2000 / total),
          easing: Easing.bezier(0.4, 0, 0.2, 1),
          useNativeDriver: true,
        }),
        Animated.timing(particleAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.magicParticle,
        {
          transform: [
            {
              translateX: particleAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, Math.cos(angle) * radius],
              }),
            },
            {
              translateY: particleAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, Math.sin(angle) * radius],
              }),
            },
            {
              scale: particleAnim.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, 1, 0],
              }),
            },
            {
              rotate: particleAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
          opacity: particleAnim.interpolate({
            inputRange: [0, 0.2, 0.8, 1],
            outputRange: [0, 1, 1, 0],
          }),
        },
      ]}
    >
      <MaterialCommunityIcons
        name={SPARKLE_ICONS[index % SPARKLE_ICONS.length]}
        size={12}
        color={SPARKLE_COLORS[index % SPARKLE_COLORS.length]}
      />
    </Animated.View>
  );
};

const FloatingSparkle = ({ delay, duration, style }) => {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  
  const icon = SPARKLE_ICONS[Math.floor(Math.random() * SPARKLE_ICONS.length)];
  const color = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];
  const size = 12 + Math.random() * 8;

  useEffect(() => {
    Animated.parallel([
      Animated.sequence([
        Animated.delay(delay),
        Animated.loop(
          Animated.timing(floatAnim, {
            toValue: 1,
            duration: duration,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            useNativeDriver: true,
          })
        )
      ]),
      Animated.sequence([
        Animated.delay(delay),
        Animated.loop(
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: duration * 0.8,
            easing: Easing.linear,
            useNativeDriver: true,
          })
        )
      ]),
      Animated.sequence([
        Animated.delay(delay),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        })
      ])
    ]).start();
  }, []);

  const sparkleStyle = {
    transform: [
      { scale: scaleAnim },
      {
        translateY: floatAnim.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, -20, 0],
        }),
      },
      {
        rotate: rotateAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      }
    ],
    opacity: floatAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.4, 1, 0.4],
    }),
    ...style,
  };

  return (
    <Animated.View style={sparkleStyle}>
      <MaterialCommunityIcons 
        name={icon}
        size={size} 
        color={color}
      />
    </Animated.View>
  );
};

export default function Loading({ loadingText, loadingTextAnim, progressAnim }) {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 3000,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          })
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.1,
            duration: 1500,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1500,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
          })
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 2000,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 2000,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
          })
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 1000,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
          })
        ])
      )
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.wandContainer}>
          <Animated.View style={[
            styles.wandGlow,
            {
              opacity: glowAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0.6],
              }),
              transform: [
                { scale: pulseAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.3],
                })},
              ],
            }
          ]} />
          <Animated.View style={[
            styles.wandWrapper,
            {
              transform: [
                { rotate: rotateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                })},
                { scale: scaleAnim }
              ],
              opacity: glowAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              }),
            }
          ]}>
            <MaterialCommunityIcons 
              name="wand" 
              size={48} 
              color={COLORS.primary[400]} 
            />
          </Animated.View>
          
          {Array.from({ length: MAGIC_PARTICLES }).map((_, i) => (
            <MagicParticle key={`particle-${i}`} index={i} total={MAGIC_PARTICLES} />
          ))}
          
          {Array.from({ length: FLOATING_SPARKLES }).map((_, i) => (
            <FloatingSparkle
              key={`sparkle-${i}`}
              delay={i * 200}
              duration={2000 + Math.random() * 1000}
              style={{
                position: 'absolute',
                top: Math.random() * 160 - 80,
                left: Math.random() * 160 - 80,
              }}
            />
          ))}
        </View>

        <Animated.Text style={[styles.loadingText, { opacity: loadingTextAnim }]}>
          {loadingText}
        </Animated.Text>

        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <Animated.View 
              style={[
                styles.progressFill,
                {
                  transform: [{
                    scaleX: progressAnim
                  }]
                }
              ]} 
            />
            <Animated.View 
              style={[
                styles.progressGlow,
                {
                  opacity: pulseAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 0.6],
                  }),
                  transform: [{
                    scaleX: progressAnim
                  }]
                }
              ]} 
            />
          </View>
          <View style={styles.progressTextContainer}>
            <MaterialCommunityIcons 
              name="percent" 
              size={16} 
              color={COLORS.primary[500]} 
            />
            <Text style={styles.progressText}>
              {Math.round(progressAnim._value * 100)}%
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

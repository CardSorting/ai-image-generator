import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import { COLORS } from '../../constants/design';

const ORBITAL_RINGS = 4;

const OrbitalRing = ({ index, total }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const colorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 4000 + index * 1200,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 1500,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.4,
            duration: 1500,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
          })
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(colorAnim, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
          Animated.timing(colorAnim, {
            toValue: 0,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: false,
          })
        ])
      )
    ]).start();
  }, []);

  const colors = [
    COLORS.primary[300],
    COLORS.primary[400],
    COLORS.primary[200],
    '#FFD700',
  ];

  return (
    <Animated.View
      style={[
        styles.orbitalRing,
        {
          transform: [
            { scale: scaleAnim },
            { rotate: rotateAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '360deg'],
            })},
          ],
          opacity: opacityAnim,
          borderColor: colorAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [
              colors[index % colors.length],
              colors[(index + 1) % colors.length]
            ]
          }),
          width: 120 + index * 40,
          height: 120 + index * 40,
        }
      ]}
    />
  );
};

export default function Loading({ loadingText, loadingTextAnim, progressAnim }) {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const colorAnim = useRef(new Animated.Value(0)).current;
  const wandBounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 4000,
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
            toValue: 1.2,
            duration: 2000,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 2000,
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
            duration: 1500,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 1500,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
          })
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(colorAnim, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
          Animated.timing(colorAnim, {
            toValue: 0,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: false,
          })
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(wandBounceAnim, {
            toValue: 1,
            duration: 1500,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
            useNativeDriver: true,
          }),
          Animated.timing(wandBounceAnim, {
            toValue: 0,
            duration: 1500,
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
          {Array.from({ length: ORBITAL_RINGS }).map((_, i) => (
            <OrbitalRing key={`ring-${i}`} index={i} total={ORBITAL_RINGS} />
          ))}
          
          <Animated.View style={[
            styles.wandGlow,
            {
              opacity: glowAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0.8],
              }),
              transform: [
                { scale: pulseAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.6],
                })},
              ],
              backgroundColor: colorAnim.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [COLORS.primary[200], COLORS.primary[300], COLORS.primary[200]]
              })
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
                { scale: scaleAnim },
                {
                  translateY: wandBounceAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -10],
                  }),
                },
              ],
              opacity: glowAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1],
              }),
              borderColor: colorAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [COLORS.primary[200], COLORS.primary[400]]
              }),
              backgroundColor: colorAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [COLORS.primary[50], COLORS.primary[100]]
              })
            }
          ]}>
            <MaterialCommunityIcons 
              name="wand" 
              size={52} 
              color={colorAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [COLORS.primary[400], COLORS.primary[600]]
              })} 
            />
          </Animated.View>
        </View>

        <Animated.Text style={[
          styles.loadingText,
          { 
            opacity: loadingTextAnim,
            transform: [{
              translateY: wandBounceAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -5],
              }),
            }],
            color: colorAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [COLORS.primary[700], COLORS.primary[500]]
            })
          }
        ]}>
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
                  }],
                  backgroundColor: colorAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [COLORS.primary[500], COLORS.primary[400]]
                  })
                }
              ]} 
            />
            <Animated.View 
              style={[
                styles.progressGlow,
                {
                  opacity: pulseAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 0.8],
                  }),
                  transform: [{
                    scaleX: progressAnim
                  }],
                  backgroundColor: colorAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [COLORS.primary[300], COLORS.primary[200]]
                  })
                }
              ]} 
            />
          </View>
          <Animated.View style={[
            styles.progressTextContainer,
            {
              transform: [{
                translateY: wandBounceAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -3],
                }),
              }],
              borderColor: colorAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [COLORS.primary[200], COLORS.primary[300]]
              }),
              backgroundColor: colorAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [COLORS.primary[50], COLORS.primary[100]]
              })
            }
          ]}>
            <MaterialCommunityIcons 
              name="percent" 
              size={16} 
              color={COLORS.primary[500]} 
            />
            <Animated.Text style={[
              styles.progressText,
              {
                color: colorAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [COLORS.primary[600], COLORS.primary[500]]
                })
              }
            ]}>
              {Math.round(progressAnim._value * 100)}%
            </Animated.Text>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

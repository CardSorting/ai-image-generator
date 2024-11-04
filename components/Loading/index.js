import React from 'react';
import { View, Text, ActivityIndicator, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import commonStyles from '../../styles/common';
import { COLORS } from '../../constants/design';

export default function Loading({ loadingText, loadingTextAnim, progressAnim }) {
  return (
    <View style={commonStyles.step}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons 
            name="palette" 
            size={48} 
            color={COLORS.primary[600]} 
          />
          <ActivityIndicator 
            size="large" 
            color={COLORS.primary[600]}
            style={styles.spinner}
          />
        </View>
        <Animated.Text 
          style={[
            styles.text,
            { opacity: loadingTextAnim }
          ]}
        >
          {loadingText}
        </Animated.Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
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
          </View>
          <View style={styles.progressTextContainer}>
            <MaterialCommunityIcons 
              name="percent" 
              size={16} 
              color={COLORS.neutral[500]} 
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

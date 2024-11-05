import React from 'react';
import { Text, Animated, Platform, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { COLORS } from '../../../constants/design';
import styles from '../styles';
import { AnimatedValueType } from '../types';
import { RIPPLE_CONFIG } from '../constants';

const GalleryButton = React.memo(({ 
  onPress, 
  buttonScaleAnim, 
  onPressIn, 
  onPressOut 
}) => (
  <Pressable 
    onPress={onPress}
    onPressIn={onPressIn}
    onPressOut={onPressOut}
    style={({ pressed }) => [
      Platform.OS === 'ios' && pressed && { opacity: 0.8 }
    ]}
    android_ripple={{
      color: COLORS.primary[600],
      foreground: true,
    }}
    accessibilityRole="button"
    accessibilityLabel="View Gallery"
    testID="gallery-button"
  >
    <Animated.View style={[
      styles.galleryButton,
      {
        transform: [{ scale: buttonScaleAnim }]
      }
    ]}>
      <MaterialCommunityIcons 
        name="image-multiple" 
        size={24} 
        color={COLORS.neutral[50]} 
        accessibilityRole="image"
      />
      <Text 
        style={styles.galleryButtonText}
        accessibilityRole="text"
      >
        View Gallery
      </Text>
    </Animated.View>
  </Pressable>
));

GalleryButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  buttonScaleAnim: AnimatedValueType.isRequired,
  onPressIn: PropTypes.func.isRequired,
  onPressOut: PropTypes.func.isRequired,
};

export default GalleryButton;

import React from 'react';
import { View, Image, Text, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { COLORS } from '../../../constants/design';
import styles from '../styles';
import { AnimatedValueType, ImageType } from '../types';

const ImagePreview = React.memo(({ image, imageOpacity, scaleAnim, imageTranslateY }) => (
  <View 
    style={styles.imageSection}
    accessibilityRole="image"
    accessibilityLabel={`Preview of ${image.prompt}`}
  >
    <Animated.View style={[
      styles.imageContainer,
      {
        opacity: imageOpacity,
        transform: [
          { scale: scaleAnim },
          { translateY: imageTranslateY }
        ],
      }
    ]}>
      <Image
        source={{ uri: image.url }}
        style={styles.image}
        resizeMode="contain"
        accessibilityRole="image"
        accessibilityLabel={image.prompt}
      />
      <View style={styles.imageOverlay}>
        <MaterialCommunityIcons 
          name="image-size-select-actual" 
          size={16} 
          color={COLORS.neutral[50]} 
          accessibilityRole="image"
        />
        <Text 
          style={styles.overlayText}
          accessibilityRole="text"
        >
          Preview
        </Text>
      </View>
    </Animated.View>
  </View>
));

ImagePreview.propTypes = {
  image: ImageType.isRequired,
  imageOpacity: AnimatedValueType.isRequired,
  scaleAnim: AnimatedValueType.isRequired,
  imageTranslateY: AnimatedValueType.isRequired,
};

export default ImagePreview;

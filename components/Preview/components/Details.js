import React from 'react';
import { View, Text, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { COLORS, SIZES } from '../../../constants/design';
import styles from '../styles';
import { AnimatedValueType, ImageType } from '../types';

const SpecificationItem = React.memo(({ icon, label, value }) => (
  <View 
    style={styles.specItem}
    accessibilityRole="text"
    accessibilityLabel={`${label}: ${value}`}
  >
    <MaterialCommunityIcons 
      name={icon}
      size={16} 
      color={COLORS.neutral[500]} 
      accessibilityRole="image"
    />
    <View style={styles.specContent}>
      <Text style={styles.specLabel}>{label}</Text>
      <Text style={styles.specValue}>{value}</Text>
    </View>
  </View>
));

SpecificationItem.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const Details = React.memo(({ image, detailsOpacity, detailsTranslateY }) => {
  const imageSize = SIZES.find(s => s.value === image.size);

  return (
    <Animated.View style={[
      styles.detailsSection,
      {
        opacity: detailsOpacity,
        transform: [{ translateY: detailsTranslateY }],
      }
    ]}>
      <View style={styles.infoContainer}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons 
              name="text-box" 
              size={18} 
              color={COLORS.neutral[500]} 
              accessibilityRole="image"
            />
            <Text 
              style={styles.sectionLabel}
              accessibilityRole="header"
            >
              Prompt
            </Text>
          </View>
          <Text 
            style={styles.prompt}
            accessibilityRole="text"
            accessibilityLabel={`Image prompt: ${image.prompt}`}
          >
            {image.prompt}
          </Text>
        </View>
        
        <View style={styles.sectionDivider} />
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons 
              name="cog" 
              size={18} 
              color={COLORS.neutral[500]} 
              accessibilityRole="image"
            />
            <Text 
              style={styles.sectionLabel}
              accessibilityRole="header"
            >
              Specifications
            </Text>
          </View>
          <View style={styles.specs}>
            <SpecificationItem
              icon="aspect-ratio"
              label="Format"
              value={imageSize?.label || ''}
            />
            <SpecificationItem
              icon="ruler"
              label="Dimensions"
              value={imageSize?.dimensions || ''}
            />
          </View>
        </View>
      </View>
    </Animated.View>
  );
});

Details.propTypes = {
  image: ImageType.isRequired,
  detailsOpacity: AnimatedValueType.isRequired,
  detailsTranslateY: AnimatedValueType.isRequired,
};

export default Details;

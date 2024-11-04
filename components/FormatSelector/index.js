import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import { COLORS, SIZES } from '../../constants/design';

const FORMAT_ICONS = {
  square_hd: {
    icon: 'apps',
    description: 'Perfect for social media posts like Instagram',
  },
  portrait_4_3: {
    icon: 'cellphone-screenshot',
    description: 'Ideal for mobile device screens and stories',
  },
  landscape_16_9: {
    icon: 'monitor-screenshot',
    description: 'Great for desktop wallpapers and presentations',
  },
};

export default function FormatSelector({ selectedSize, onSizeChange }) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        <MaterialCommunityIcons 
          name="image-size-select-actual" 
          size={16} 
          color={COLORS.neutral[700]}
          style={{ marginRight: 4 }}
        />
        Choose format
      </Text>
      <View style={styles.selector}>
        {SIZES.map(size => (
          <Pressable
            key={size.value}
            style={[
              styles.option,
              selectedSize === size.value && styles.selectedOption,
            ]}
            onPress={() => onSizeChange(size.value)}
          >
            <View style={styles.content}>
              <View style={styles.header}>
                <View style={[
                  styles.iconContainer,
                  selectedSize === size.value && styles.selectedIconContainer
                ]}>
                  <MaterialCommunityIcons 
                    name={FORMAT_ICONS[size.value].icon}
                    size={20}
                    color={
                      selectedSize === size.value 
                        ? COLORS.primary[600]
                        : COLORS.neutral[400]
                    }
                  />
                </View>
                <Text style={[
                  styles.label,
                  selectedSize === size.value && styles.selectedLabel
                ]}>
                  {size.label}
                </Text>
              </View>
              <Text style={[
                styles.description,
                selectedSize === size.value && styles.selectedDescription
              ]}>
                {FORMAT_ICONS[size.value].description}
              </Text>
              <View style={styles.dimensionsContainer}>
                <MaterialCommunityIcons 
                  name="ruler" 
                  size={14}
                  color={
                    selectedSize === size.value 
                      ? COLORS.primary[500]
                      : COLORS.neutral[400]
                  }
                />
                <Text style={[
                  styles.dimensions,
                  selectedSize === size.value && styles.selectedDimensions
                ]}>
                  {size.dimensions}
                </Text>
              </View>
            </View>
            {selectedSize === size.value && (
              <View style={styles.selectedIndicator}>
                <MaterialCommunityIcons 
                  name="check-circle" 
                  size={20} 
                  color={COLORS.primary[600]} 
                />
              </View>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

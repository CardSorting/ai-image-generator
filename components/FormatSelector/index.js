import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import { COLORS, SIZES } from '../../constants/design';

export default function FormatSelector({ selectedSize, onSizeChange }) {
  const getFormatIcon = (value) => {
    switch (value) {
      case 'square_hd':
        return 'square';
      case 'portrait_4_3':
        return 'phone-portrait';
      case 'landscape_16_9':
        return 'monitor';
      default:
        return 'square';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        <MaterialCommunityIcons 
          name="aspect-ratio" 
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
                <MaterialCommunityIcons 
                  name={getFormatIcon(size.value)}
                  size={20}
                  color={
                    selectedSize === size.value 
                      ? COLORS.primary[600]
                      : COLORS.neutral[400]
                  }
                />
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
                {size.description}
              </Text>
              <Text style={[
                styles.dimensions,
                selectedSize === size.value && styles.selectedDimensions
              ]}>
                {size.dimensions}
              </Text>
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

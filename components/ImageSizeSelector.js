import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

const IMAGE_SIZES = [
  {
    value: 'square_hd',
    label: 'Square HD',
    dimensions: '1024 × 1024',
    aspectRatio: 1,
    preview: { width: 48, height: 48 }
  },
  {
    value: 'portrait_4_3',
    label: 'Portrait',
    dimensions: '768 × 1024',
    aspectRatio: 3/4,
    preview: { width: 36, height: 48 }
  },
  {
    value: 'landscape_16_9',
    label: 'Landscape',
    dimensions: '1024 × 576',
    aspectRatio: 16/9,
    preview: { width: 64, height: 36 }
  },
];

export default function ImageSizeSelector({ value, onChange }) {
  return (
    <View style={styles.container}>
      {IMAGE_SIZES.map((size) => (
        <TouchableOpacity
          key={size.value}
          style={[
            styles.option,
            value === size.value && styles.optionSelected,
            Platform.OS === 'web' && styles.optionWeb,
          ]}
          onPress={() => onChange(size.value)}
        >
          <View 
            style={[
              styles.preview,
              value === size.value && styles.previewSelected
            ]}
          >
            <View
              style={[
                styles.previewShape,
                {
                  width: size.preview.width,
                  height: size.preview.height,
                },
                value === size.value && styles.previewShapeSelected
              ]}
            >
              <View style={[
                styles.previewInner,
                value === size.value && styles.previewInnerSelected
              ]} />
            </View>
          </View>
          <View style={styles.labelContainer}>
            <Text style={[
              styles.label,
              value === size.value && styles.labelSelected
            ]}>
              {size.label}
            </Text>
            <Text style={styles.dimensions}>{size.dimensions}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
  },
  option: {
    flex: 1,
    minWidth: 150,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    ...(Platform.OS === 'web' ? {
      transition: 'all 0.2s ease',
      cursor: 'pointer',
    } : {}),
  },
  optionWeb: {
    '&:hover': {
      transform: 'translateY(-2px)',
      borderColor: '#2563EB',
      backgroundColor: '#F8FAFC',
    },
  },
  optionSelected: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  preview: {
    width: '100%',
    height: 100,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    ...(Platform.OS === 'web' ? {
      transition: 'all 0.2s ease',
    } : {}),
  },
  previewSelected: {
    backgroundColor: '#DBEAFE',
  },
  previewShape: {
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    padding: 2,
    ...(Platform.OS === 'web' ? {
      transition: 'all 0.2s ease',
    } : {}),
  },
  previewShapeSelected: {
    backgroundColor: '#2563EB',
  },
  previewInner: {
    width: '100%',
    height: '100%',
    backgroundColor: '#CBD5E1',
    borderRadius: 2,
  },
  previewInnerSelected: {
    backgroundColor: '#93C5FD',
  },
  labelContainer: {
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
    textAlign: 'center',
  },
  labelSelected: {
    color: '#2563EB',
  },
  dimensions: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
});

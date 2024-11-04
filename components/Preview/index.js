import React from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import commonStyles from '../../styles/common';
import { COLORS, SIZES } from '../../constants/design';

export default function Preview({ image, onBack, fadeAnim }) {
  return (
    <View style={commonStyles.step}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={onBack}
          >
            <MaterialCommunityIcons 
              name="arrow-left" 
              size={24} 
              color={COLORS.primary[600]} 
            />
            <Text style={styles.backButtonText}>New Image</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Your Creation</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image.url }}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={styles.imageOverlay}>
            <MaterialCommunityIcons 
              name="image" 
              size={24} 
              color={COLORS.neutral[50]} 
            />
          </View>
        </View>

        <View style={styles.details}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons 
                name="text" 
                size={20} 
                color={COLORS.neutral[500]} 
              />
              <Text style={styles.sectionLabel}>Prompt</Text>
            </View>
            <Text style={styles.prompt}>{image.prompt}</Text>
          </View>
          
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons 
                name="information" 
                size={20} 
                color={COLORS.neutral[500]} 
              />
              <Text style={styles.sectionLabel}>Specifications</Text>
            </View>
            <View style={styles.specs}>
              <View style={styles.specItem}>
                <MaterialCommunityIcons 
                  name="aspect-ratio" 
                  size={16} 
                  color={COLORS.neutral[500]} 
                />
                <Text style={styles.specLabel}>Format</Text>
                <Text style={styles.specValue}>
                  {SIZES.find(s => s.value === image.size)?.label}
                </Text>
              </View>
              <View style={styles.specItem}>
                <MaterialCommunityIcons 
                  name="ruler" 
                  size={16} 
                  color={COLORS.neutral[500]} 
                />
                <Text style={styles.specLabel}>Dimensions</Text>
                <Text style={styles.specValue}>
                  {SIZES.find(s => s.value === image.size)?.dimensions}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={commonStyles.primaryButton}
          onPress={() => {/* Share functionality */}}
        >
          <MaterialCommunityIcons 
            name="share-variant" 
            size={24} 
            color={COLORS.neutral[50]} 
          />
          <Text style={commonStyles.primaryButtonText}>Share Creation</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

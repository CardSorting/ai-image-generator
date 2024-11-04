import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Animated, 
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import styles from './styles';
import { COLORS } from '../../constants/design';

const STYLE_PRESETS = [
  'Photographic',
  'Digital Art',
  'Cinematic',
  'Anime',
  'Oil Painting',
  'Watercolor',
  '3D Render',
  'Pixel Art',
];

export default function AdvancedSettings({ 
  settings,
  onSettingsChange,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight] = useState(new Animated.Value(0));

  const toggleExpanded = useCallback(() => {
    const toValue = isExpanded ? 0 : 500; // Approximate max height
    Animated.spring(contentHeight, {
      toValue,
      friction: 10,
      tension: 50,
      useNativeDriver: false,
    }).start();
    setIsExpanded(!isExpanded);
  }, [isExpanded, contentHeight]);

  const updateSettings = useCallback((key, value) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    });
  }, [settings, onSettingsChange]);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.header} 
        onPress={toggleExpanded}
        activeOpacity={0.7}
      >
        <View style={styles.headerText}>
          <MaterialCommunityIcons 
            name="tune" 
            size={20} 
            color={COLORS.neutral[700]}
            style={{ marginRight: 8 }}
          />
          <Text style={styles.headerText}>Advanced Settings</Text>
        </View>
        <MaterialCommunityIcons 
          name={isExpanded ? 'chevron-up' : 'chevron-down'} 
          size={24} 
          color={COLORS.neutral[700]}
        />
      </TouchableOpacity>

      <Animated.View style={[styles.content, { height: contentHeight }]}>
        <View style={styles.settingsContainer}>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Inference Steps (Quality)</Text>
            <View style={styles.sliderContainer}>
              <Slider
                style={styles.slider}
                minimumValue={20}
                maximumValue={50}
                step={1}
                value={settings.num_inference_steps}
                onValueChange={(value) => updateSettings('num_inference_steps', value)}
                minimumTrackTintColor={COLORS.primary[500]}
                maximumTrackTintColor={COLORS.neutral[200]}
                thumbTintColor={COLORS.primary[600]}
              />
              <Text style={styles.sliderValue}>{settings.num_inference_steps}</Text>
            </View>
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Guidance Scale (Creativity)</Text>
            <View style={styles.sliderContainer}>
              <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={20}
                step={0.5}
                value={settings.guidance_scale}
                onValueChange={(value) => updateSettings('guidance_scale', value)}
                minimumTrackTintColor={COLORS.primary[500]}
                maximumTrackTintColor={COLORS.neutral[200]}
                thumbTintColor={COLORS.primary[600]}
              />
              <Text style={styles.sliderValue}>{settings.guidance_scale}</Text>
            </View>
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Style Preset</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.presetScroll}
            >
              {STYLE_PRESETS.map((preset) => (
                <TouchableOpacity
                  key={preset}
                  style={[
                    styles.presetButton,
                    settings.style_preset === preset && styles.presetButtonSelected,
                  ]}
                  onPress={() => updateSettings('style_preset', preset)}
                >
                  <Text style={[
                    styles.presetText,
                    settings.style_preset === preset && styles.presetTextSelected,
                  ]}>
                    {preset}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Negative Prompt</Text>
            <TextInput
              style={styles.negativePromptInput}
              value={settings.negative_prompt}
              onChangeText={(text) => updateSettings('negative_prompt', text)}
              placeholder="Describe what you don't want in the image..."
              placeholderTextColor={COLORS.neutral[400]}
              multiline
              numberOfLines={Platform.OS === 'ios' ? null : 3}
            />
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

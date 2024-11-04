import React, { useState, useCallback, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput,
  Platform,
  ScrollView,
  Pressable,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import { COLORS } from '../../constants/design';

const STYLE_PRESETS = [
  { id: 'photographic', label: 'Photographic', icon: 'camera' },
  { id: 'digital-art', label: 'Digital Art', icon: 'palette-outline' },
  { id: 'cinematic', label: 'Cinematic', icon: 'movie-open' },
  { id: 'anime', label: 'Anime', icon: 'draw' },
  { id: 'oil-painting', label: 'Oil Painting', icon: 'brush' },
  { id: 'watercolor', label: 'Watercolor', icon: 'water' },
  { id: '3d-render', label: '3D Render', icon: 'cube-outline' },
  { id: 'pixel-art', label: 'Pixel Art', icon: 'grid' },
];

const INFERENCE_STEPS = [
  { value: 20, label: 'Fast' },
  { value: 30, label: 'Balanced' },
  { value: 40, label: 'Quality' },
  { value: 50, label: 'Maximum' },
];

const GUIDANCE_SCALE = [
  { value: 5, label: 'Creative' },
  { value: 7.5, label: 'Balanced' },
  { value: 10, label: 'Precise' },
  { value: 15, label: 'Strict' },
];

export default function AdvancedSettings({ 
  settings,
  onSettingsChange,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [canScroll, setCanScroll] = useState(false);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const scrollViewRef = useRef(null);

  const updateSettings = useCallback((key, value) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    });
  }, [settings, onSettingsChange]);

  const handleContentSizeChange = (contentWidth, contentHeight) => {
    setCanScroll(contentHeight > 400);
  };

  const handleScroll = ({ nativeEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const paddingToBottom = 20;
    setIsScrolledToBottom(
      layoutMeasurement.height + contentOffset.y >= 
      contentSize.height - paddingToBottom
    );
  };

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const renderSteps = (steps, value, settingKey) => (
    <View style={styles.stepsContainer}>
      {steps.map((step, index) => (
        <TouchableOpacity
          key={step.value}
          style={styles.stepButton}
          onPress={() => updateSettings(settingKey, step.value)}
        >
          <View style={[
            styles.stepIndicator,
            value === step.value && styles.stepIndicatorActive
          ]} />
          <Text style={[
            styles.stepLabel,
            value === step.value && styles.stepLabelActive
          ]}>
            {step.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.header} 
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.7}
      >
        <View style={styles.headerContent}>
          <MaterialCommunityIcons 
            name="tune-variant" 
            size={20} 
            color={COLORS.neutral[700]}
            style={{ marginRight: 8 }}
          />
          <Text style={styles.headerText}>Advanced Settings</Text>
          {isExpanded && (
            <View style={styles.activeSettingsPill}>
              <Text style={styles.activeSettingsText}>
                {settings.style_preset} • {settings.num_inference_steps} steps
              </Text>
            </View>
          )}
        </View>
        <MaterialCommunityIcons 
          name={isExpanded ? 'chevron-up' : 'chevron-down'} 
          size={24} 
          color={COLORS.neutral[700]}
        />
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.expandedContent}>
          <ScrollView 
            ref={scrollViewRef}
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={handleContentSizeChange}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            <View style={styles.settingsContainer}>
              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>Style Preset</Text>
                <View style={styles.presetGrid}>
                  {STYLE_PRESETS.map((preset) => (
                    <TouchableOpacity
                      key={preset.id}
                      style={[
                        styles.presetButton,
                        settings.style_preset === preset.label && styles.presetButtonSelected,
                      ]}
                      onPress={() => updateSettings('style_preset', preset.label)}
                    >
                      <MaterialCommunityIcons 
                        name={preset.icon} 
                        size={20} 
                        color={settings.style_preset === preset.label ? COLORS.primary[600] : COLORS.neutral[500]} 
                      />
                      <Text style={[
                        styles.presetText,
                        settings.style_preset === preset.label && styles.presetTextSelected,
                      ]}>
                        {preset.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>Quality (Inference Steps)</Text>
                {renderSteps(INFERENCE_STEPS, settings.num_inference_steps, 'num_inference_steps')}
              </View>

              <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>Creativity vs. Accuracy</Text>
                {renderSteps(GUIDANCE_SCALE, settings.guidance_scale, 'guidance_scale')}
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
          </ScrollView>
          
          {canScroll && !isScrolledToBottom && (
            <View style={styles.fadeContainer}>
              <View style={styles.fadeOverlay} />
              <Pressable 
                style={styles.showMoreButton}
                onPress={scrollToBottom}
              >
                <Text style={styles.showMoreText}>Show More</Text>
                <MaterialCommunityIcons 
                  name="chevron-down" 
                  size={20} 
                  color={COLORS.primary[600]}
                />
              </Pressable>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

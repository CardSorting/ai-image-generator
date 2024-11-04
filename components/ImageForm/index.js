import React, { useState } from 'react';
import { View, Text, TextInput, Animated, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import styles from './styles';
import commonStyles from '../../styles/common';
import { COLORS } from '../../constants/design';
import FormatSelector from '../FormatSelector';
import AdvancedSettings from '../AdvancedSettings';

const DEFAULT_SETTINGS = {
  num_inference_steps: 30,
  guidance_scale: 7.5,
  style_preset: 'Photographic',
  negative_prompt: '',
};

export default function ImageForm({
  prompt,
  onPromptChange,
  error,
  isFocused,
  onFocus,
  onBlur,
  imageSize,
  onSizeChange,
  onSubmit,
  inputScaleAnim,
  fadeAnim,
  isValid
}) {
  const [advancedSettings, setAdvancedSettings] = useState(DEFAULT_SETTINGS);

  const handleSubmit = () => {
    onSubmit(advancedSettings);
  };

  const renderInputIcon = () => {
    if (error) {
      return (
        <View style={styles.inputIcon}>
          <MaterialCommunityIcons 
            name="alert-circle" 
            size={24} 
            color={COLORS.feedback.error.main} 
          />
        </View>
      );
    }
    if (prompt.length > 0 && !error) {
      return (
        <View style={styles.inputIcon}>
          <MaterialCommunityIcons 
            name="check-circle" 
            size={24} 
            color={COLORS.feedback.success.main} 
          />
        </View>
      );
    }
    return (
      <View style={styles.inputIcon}>
        <MaterialCommunityIcons 
          name="pencil" 
          size={24} 
          color={COLORS.neutral[400]} 
        />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={commonStyles.step}
    >
      <Animated.ScrollView 
        style={[{ opacity: fadeAnim }]}
        contentContainerStyle={styles.formContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={commonStyles.header}>
          <MaterialCommunityIcons 
            name="brush" 
            size={36} 
            color={COLORS.primary[600]}
            style={commonStyles.headerIcon}
          />
          <Text style={commonStyles.title}>Create AI Image</Text>
          <Text style={commonStyles.subtitle}>
            Transform your ideas into stunning visuals
          </Text>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            <MaterialCommunityIcons 
              name="text" 
              size={16} 
              color={COLORS.neutral[700]}
              style={{ marginRight: 4 }}
            />
            Describe your image
          </Text>
          <Animated.View style={[
            styles.inputWrapper,
            error && styles.inputWrapperError,
            isFocused && styles.inputWrapperFocused,
            { transform: [{ scale: inputScaleAnim }] }
          ]}>
            <TextInput
              style={styles.promptInput}
              value={prompt}
              onChangeText={onPromptChange}
              onFocus={onFocus}
              onBlur={onBlur}
              placeholder="Be creative and detailed in your description..."
              placeholderTextColor={COLORS.neutral[400]}
              multiline
              textAlignVertical="top"
              maxLength={500}
            />
            {renderInputIcon()}
          </Animated.View>
          {error && (
            <View style={styles.errorContainer}>
              <MaterialCommunityIcons 
                name="alert-circle" 
                size={16} 
                color={COLORS.feedback.error.main}
                style={{ marginRight: 4 }}
              />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
          <View style={styles.inputFooter}>
            <MaterialCommunityIcons 
              name={prompt.length > 450 ? 'counter' : 'text-box'}
              size={16}
              color={
                prompt.length === 500 
                  ? COLORS.feedback.error.main 
                  : prompt.length > 450 
                    ? COLORS.feedback.warning.main 
                    : COLORS.neutral[400]
              }
            />
            <Text style={[
              styles.characterCount,
              prompt.length > 450 && styles.characterCountWarning,
              prompt.length === 500 && styles.characterCountLimit
            ]}>
              {prompt.length}/500 characters
            </Text>
          </View>
        </View>

        <FormatSelector
          selectedSize={imageSize}
          onSizeChange={onSizeChange}
        />

        <AdvancedSettings
          settings={advancedSettings}
          onSettingsChange={setAdvancedSettings}
        />

        <TouchableOpacity 
          style={[
            commonStyles.primaryButton,
            !isValid && commonStyles.disabledButton
          ]}
          onPress={handleSubmit}
          disabled={!isValid}
        >
          <MaterialCommunityIcons 
            name="magic" 
            size={24} 
            color={COLORS.neutral[50]} 
          />
          <Text style={commonStyles.primaryButtonText}>Create Image</Text>
        </TouchableOpacity>
      </Animated.ScrollView>
    </KeyboardAvoidingView>
  );
}

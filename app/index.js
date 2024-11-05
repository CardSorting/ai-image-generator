import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { SafeAreaView, Platform, StatusBar, Animated, Keyboard } from 'react-native';
import { initDatabase, saveImage } from '../utils/db';
import ImageForm from '../components/ImageForm';
import Loading from '../components/Loading';
import Preview from '../components/Preview';
import Gallery from '../components/Gallery';
import commonStyles from '../styles/common';
import { STEPS } from '../constants/design';

const FAL_KEY = 'd1984729-bfe7-4d0a-a77d-f278c529ed0f:f285ace37543d80985057f54fce3e744';

export default function Index() {
  const [currentStep, setCurrentStep] = useState(STEPS.FORM);
  const [prompt, setPrompt] = useState('');
  const [imageSize, setImageSize] = useState('square_hd');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const fadeAnim = useMemo(() => new Animated.Value(1), []);
  const progressAnim = useMemo(() => new Animated.Value(0), []);
  const loadingTextAnim = useMemo(() => new Animated.Value(1), []);
  const inputScaleAnim = useMemo(() => new Animated.Value(1), []);
  const [loadingText, setLoadingText] = useState('Preparing your canvas...');

  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const keyboardDidHide = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));

    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);

  useEffect(() => {
    initDatabase();
  }, []);

  useEffect(() => {
    if (currentStep === STEPS.LOADING) {
      startLoadingAnimation();
    } else {
      progressAnim.setValue(0);
    }
  }, [currentStep]);

  const startLoadingAnimation = useCallback(() => {
    const loadingSteps = [
      { text: 'Analyzing your creative vision...', duration: 2000 },
      { text: 'Gathering artistic inspiration...', duration: 2000 },
      { text: 'Crafting your masterpiece...', duration: 2500 },
      { text: 'Adding finishing touches...', duration: 1500 },
    ];

    let currentStep = 0;

    const animateText = () => {
      if (currentStep >= loadingSteps.length) return;

      Animated.sequence([
        Animated.timing(loadingTextAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(loadingTextAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      setLoadingText(loadingSteps[currentStep].text);
      currentStep++;

      setTimeout(animateText, loadingSteps[currentStep - 1].duration);
    };

    Animated.sequence([
      Animated.timing(progressAnim, {
        toValue: 0.3,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(progressAnim, {
        toValue: 0.6,
        duration: 2500,
        useNativeDriver: true,
      }),
      Animated.timing(progressAnim, {
        toValue: 0.9,
        duration: 3000,
        useNativeDriver: true,
      }),
    ]).start();

    animateText();
  }, [progressAnim, loadingTextAnim]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    Animated.spring(inputScaleAnim, {
      toValue: 1.02,
      friction: 8,
      tension: 100,
      useNativeDriver: true,
    }).start();
  }, [inputScaleAnim]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    Animated.spring(inputScaleAnim, {
      toValue: 1,
      friction: 8,
      tension: 100,
      useNativeDriver: true,
    }).start();
  }, [inputScaleAnim]);

  const validatePrompt = useCallback((text) => {
    if (text.trim().length < 3) {
      return 'Please provide a more detailed description';
    }
    if (text.trim().length > 500) {
      return 'Description is too long (max 500 characters)';
    }
    return null;
  }, []);

  const handlePromptChange = useCallback((text) => {
    setPrompt(text);
    setError(validatePrompt(text));
  }, [validatePrompt]);

  const generateImage = useCallback(async (advancedSettings) => {
    const validationError = validatePrompt(prompt);
    if (validationError) {
      setError(validationError);
      return;
    }

    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentStep(STEPS.LOADING);
    });

    setError(null);

    try {
      const response = await fetch('https://110602490-fast-sdxl.gateway.alpha.fal.ai/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Key ${FAL_KEY}`,
        },
        body: JSON.stringify({
          prompt,
          image_size: imageSize,
          ...advancedSettings,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      
      if (result?.images?.[0]?.url) {
        const url = result.images[0].url;
        await saveImage(url, prompt);
        setGeneratedImage({ 
          url, 
          prompt, 
          size: imageSize,
          settings: advancedSettings 
        });
        
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setCurrentStep(STEPS.PREVIEW);
        });
      } else {
        throw new Error('No image generated');
      }
    } catch (error) {
      console.error('Error generating image:', error);
      setError('Failed to generate image. Please try again.');
      setCurrentStep(STEPS.FORM);
    }
  }, [prompt, imageSize, fadeAnim]);

  const startOver = useCallback(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setCurrentStep(STEPS.FORM);
      setPrompt('');
      setGeneratedImage(null);
      setError(null);
    });
  }, [fadeAnim]);

  const handleViewGallery = useCallback(() => {
    setCurrentStep(STEPS.GALLERY);
  }, []);

  const handleGalleryBack = useCallback(() => {
    setCurrentStep(STEPS.PREVIEW);
  }, []);

  return (
    <SafeAreaView style={[
      commonStyles.container,
      { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }
    ]}>
      {currentStep === STEPS.FORM && (
        <ImageForm
          prompt={prompt}
          onPromptChange={handlePromptChange}
          error={error}
          isFocused={isFocused}
          onFocus={handleFocus}
          onBlur={handleBlur}
          imageSize={imageSize}
          onSizeChange={setImageSize}
          onSubmit={generateImage}
          inputScaleAnim={inputScaleAnim}
          fadeAnim={fadeAnim}
          isValid={!error && prompt.trim().length > 0}
        />
      )}
      {currentStep === STEPS.LOADING && (
        <Loading
          loadingText={loadingText}
          loadingTextAnim={loadingTextAnim}
          progressAnim={progressAnim}
        />
      )}
      {currentStep === STEPS.PREVIEW && (
        <Preview
          image={generatedImage}
          onBack={startOver}
          onViewGallery={handleViewGallery}
          fadeAnim={fadeAnim}
        />
      )}
      {currentStep === STEPS.GALLERY && (
        <Gallery onBack={handleGalleryBack} />
      )}
    </SafeAreaView>
  );
}

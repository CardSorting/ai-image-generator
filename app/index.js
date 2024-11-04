import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  ActivityIndicator, 
  ScrollView, 
  SafeAreaView, 
  Platform, 
  StatusBar, 
  TextInput,
  Pressable,
  Animated,
} from 'react-native';
import { initDatabase, saveImage, getImages, deleteImage } from '../utils/db';
import { styles, webStyles } from '../styles/app';
import ImageSizeSelector from '../components/ImageSizeSelector';

const FAL_KEY = 'd1984729-bfe7-4d0a-a77d-f278c529ed0f:f285ace37543d80985057f54fce3e744';

const INFERENCE_STEPS = [1, 2, 4, 8];

export default function Index() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [history, setHistory] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(0));
  
  // Advanced settings state
  const [prompt, setPrompt] = useState('');
  const [imageSize, setImageSize] = useState('square_hd');
  const [inferenceSteps, setInferenceSteps] = useState(4);
  const [seed, setSeed] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    const setup = async () => {
      await initDatabase();
      loadHistory();
    };
    setup();
  }, []);

  useEffect(() => {
    if (showAdvanced) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.spring(slideAnim, {
          toValue: 1,
          tension: 20,
          friction: 7,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 20,
          friction: 7,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ]).start();
    }
  }, [showAdvanced]);

  const loadHistory = async () => {
    try {
      const images = await getImages();
      setHistory(images);
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  const generateImage = async () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt');
      return;
    }

    try {
      setLoading(true);
      
      const requestBody = {
        prompt,
        image_size: imageSize,
        num_inference_steps: inferenceSteps,
      };

      if (seed) {
        requestBody.seed = parseInt(seed);
      }

      const response = await fetch('https://110602490-fast-sdxl.gateway.alpha.fal.ai/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Key ${FAL_KEY}`,
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      
      if (result && result.images && result.images[0]) {
        const url = result.images[0].url;
        setImageUrl(url);
        await saveImage(url, prompt);
        loadHistory();
      }
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Error generating image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (id) => {
    try {
      await deleteImage(id);
      loadHistory();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const renderInferenceStepsSelector = () => {
    if (Platform.OS === 'web') {
      return (
        <select
          value={inferenceSteps}
          onChange={(e) => setInferenceSteps(Number(e.target.value))}
          style={webStyles.select}
        >
          {INFERENCE_STEPS.map((step) => (
            <option key={step} value={step}>
              {step} steps
            </option>
          ))}
        </select>
      );
    }

    return (
      <TextInput
        style={styles.input}
        value={inferenceSteps.toString()}
        onChangeText={(value) => setInferenceSteps(Number(value))}
        editable={false}
      />
    );
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }]}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.title}>AI Image Generator</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Prompt</Text>
            <TextInput
              style={styles.promptInput}
              value={prompt}
              onChangeText={setPrompt}
              placeholder="Describe the image you want to generate..."
              multiline
              placeholderTextColor="#A0AEC0"
            />
          </View>

          <Pressable
            style={styles.advancedButton}
            onPress={() => setShowAdvanced(!showAdvanced)}
          >
            <Text style={styles.advancedButtonText}>
              {showAdvanced ? 'Hide Advanced Settings' : 'Show Advanced Settings'}
            </Text>
          </Pressable>

          {showAdvanced && (
            <Animated.View
              style={[
                styles.advancedSettings,
                Platform.OS === 'web' ? {
                  opacity: fadeAnim,
                  transform: [{
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-20, 0],
                    }),
                  }],
                } : {
                  opacity: fadeAnim,
                  transform: [{
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-20, 0],
                    }),
                  }],
                },
              ]}
            >
              <View style={styles.settingItem}>
                <Text style={styles.label}>Image Size</Text>
                <ImageSizeSelector
                  value={imageSize}
                  onChange={setImageSize}
                />
              </View>

              <View style={styles.settingItem}>
                <Text style={styles.label}>Inference Steps</Text>
                {renderInferenceStepsSelector()}
              </View>

              <View style={styles.settingItem}>
                <Text style={styles.label}>Seed (Optional)</Text>
                <TextInput
                  style={styles.input}
                  value={seed}
                  onChangeText={setSeed}
                  placeholder="Enter seed number"
                  keyboardType="numeric"
                  placeholderTextColor="#A0AEC0"
                />
              </View>
            </Animated.View>
          )}

          {imageUrl && (
            <View style={styles.latestImage}>
              <Text style={styles.subtitle}>Latest Generation</Text>
              <Image
                source={{ uri: imageUrl }}
                style={styles.mainImage}
                resizeMode="cover"
              />
            </View>
          )}

          <TouchableOpacity 
            style={[styles.generateButton, loading && styles.generateButtonDisabled]}
            onPress={generateImage}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.generateButtonText}>Generate Image</Text>
            )}
          </TouchableOpacity>

          {history.length > 0 && (
            <View style={styles.historyContainer}>
              <Text style={styles.historyTitle}>History</Text>
              <View style={styles.historyGrid}>
                {history.map((item) => (
                  <View key={item.id} style={styles.historyItem}>
                    <Image
                      source={{ uri: item.url }}
                      style={styles.historyImage}
                      resizeMode="cover"
                    />
                    <View style={styles.historyItemContent}>
                      <Text style={styles.historyItemPrompt} numberOfLines={2}>
                        {item.prompt}
                      </Text>
                      <TouchableOpacity
                        onPress={() => handleDeleteImage(item.id)}
                        style={styles.deleteButton}
                      >
                        <Text style={styles.deleteButtonText}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {loading && (
        <View style={styles.loadingContainer}>
          <View style={styles.loadingIndicator}>
            <ActivityIndicator size="large" color="#2563EB" />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

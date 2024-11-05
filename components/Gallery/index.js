import React, { useRef } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import { COLORS } from '../../constants/design';

const ImageCard = ({ item, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[
        styles.imageCard,
        { transform: [{ scale: scaleAnim }] }
      ]}>
        <Image
          source={{ uri: item.url }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
        <View style={styles.imageInfo}>
          <Text style={styles.promptText} numberOfLines={2}>
            {item.prompt}
          </Text>
          <Text style={styles.dateText}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const EmptyState = ({ onNewImage }) => (
  <View style={styles.emptyState}>
    <View style={styles.emptyStateIcon}>
      <MaterialCommunityIcons
        name="image-plus"
        size={40}
        color={COLORS.primary[400]}
      />
    </View>
    <View>
      <Text style={styles.emptyStateTitle}>No Images Yet</Text>
      <Text style={styles.emptyStateText}>
        Start creating magical images with AI
      </Text>
    </View>
    <TouchableOpacity
      style={styles.newImageButton}
      onPress={onNewImage}
    >
      <MaterialCommunityIcons
        name="plus"
        size={24}
        color={COLORS.neutral[50]}
      />
      <Text style={styles.newImageButtonText}>Create New Image</Text>
    </TouchableOpacity>
  </View>
);

export default function Gallery({ images = [], onImagePress, onNewImage }) {
  const renderItem = ({ item }) => (
    <ImageCard item={item} onPress={onImagePress} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Gallery</Text>
        <TouchableOpacity
          style={styles.newImageButton}
          onPress={onNewImage}
        >
          <MaterialCommunityIcons
            name="plus"
            size={24}
            color={COLORS.neutral[50]}
          />
          <Text style={styles.newImageButtonText}>New Image</Text>
        </TouchableOpacity>
      </View>

      {images.length > 0 ? (
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyState onNewImage={onNewImage} />
      )}
    </View>
  );
}

import React, { useEffect, useMemo } from 'react';
import {
  View,
  Animated,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import { useAnimations } from './hooks';
import Header from './components/Header';
import ImagePreview from './components/ImagePreview';
import Details from './components/Details';
import GalleryButton from './components/GalleryButton';
import { ImageType } from './types';

function Preview({ image, onBack, onViewGallery }) {
  const {
    scrollY,
    scaleAnim,
    buttonScaleAnim,
    imageTranslateY,
    imageOpacity,
    detailsTranslateY,
    detailsOpacity,
    startAnimations,
    handleButtonPress,
  } = useAnimations();

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    startAnimations();

    return () => {
      StatusBar.setBarStyle('dark-content');
    };
  }, [startAnimations]);

  const handleScroll = useMemo(() => (
    Animated.event(
      [{ nativeEvent: { contentOffset: { y: scrollY } } }],
      { useNativeDriver: true }
    )
  ), [scrollY]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header onBack={onBack} scrollY={scrollY} />

        <Animated.ScrollView
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={true}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          testID="preview-scroll-view"
          accessibilityRole="scrollbar"
        >
          <ImagePreview
            image={image}
            imageOpacity={imageOpacity}
            scaleAnim={scaleAnim}
            imageTranslateY={imageTranslateY}
          />

          <Details
            image={image}
            detailsOpacity={detailsOpacity}
            detailsTranslateY={detailsTranslateY}
          />
        </Animated.ScrollView>

        <View style={styles.footer}>
          <GalleryButton
            onPress={onViewGallery}
            buttonScaleAnim={buttonScaleAnim}
            onPressIn={() => handleButtonPress(true)}
            onPressOut={() => handleButtonPress(false)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

Preview.propTypes = {
  image: ImageType.isRequired,
  onBack: PropTypes.func.isRequired,
  onViewGallery: PropTypes.func.isRequired,
};

export default React.memo(Preview);

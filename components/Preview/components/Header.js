import React, { useMemo } from 'react';
import { View, Text, Animated, Platform, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { COLORS } from '../../../constants/design';
import styles from '../styles';
import { HEADER_SCROLL_DISTANCE, RIPPLE_CONFIG } from '../constants';
import { AnimatedValueType } from '../types';

const HeaderButton = React.memo(({ onPress, children, style, testID }) => (
  <Pressable
    onPress={onPress}
    testID={testID}
    accessibilityRole="button"
    style={({ pressed }) => [
      style,
      Platform.OS === 'ios' && pressed && { opacity: 0.6 },
    ]}
    android_ripple={RIPPLE_CONFIG}
  >
    {children}
  </Pressable>
));

HeaderButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  testID: PropTypes.string,
};

const Header = React.memo(({ onBack, scrollY }) => {
  const headerAnimatedStyle = useMemo(() => {
    const opacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return {
      opacity,
    };
  }, [scrollY]);

  const titleAnimatedStyle = useMemo(() => {
    const opacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return {
      opacity,
    };
  }, [scrollY]);

  return (
    <Animated.View 
      style={styles.header}
      accessibilityRole="header"
    >
      <Animated.View style={[
        styles.headerBackground,
        headerAnimatedStyle
      ]} />
      <View style={styles.headerLeft}>
        <HeaderButton 
          onPress={onBack}
          testID="back-button"
        >
          <View style={styles.backButton}>
            <MaterialCommunityIcons 
              name="arrow-left" 
              size={24} 
              color={COLORS.neutral[50]}
              accessibilityRole="image"
            />
            <Text 
              style={styles.backButtonText}
              accessibilityRole="text"
            >
              New
            </Text>
          </View>
        </HeaderButton>
      </View>
      
      <View style={styles.headerCenter}>
        <Animated.Text 
          style={[styles.title, titleAnimatedStyle]}
          accessibilityRole="header"
          accessibilityLabel="Your Creation"
        >
          Your Creation
        </Animated.Text>
      </View>
      
      <View style={styles.headerRight} />
    </Animated.View>
  );
});

Header.propTypes = {
  onBack: PropTypes.func.isRequired,
  scrollY: AnimatedValueType.isRequired,
};

export default Header;

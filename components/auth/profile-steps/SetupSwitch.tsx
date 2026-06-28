import React, { useEffect } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

export function SetupSwitch({ value, onValueChange }: { value: boolean; onValueChange: (val: boolean) => void }) {
  const toggleProgress = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    toggleProgress.value = withSpring(value ? 1 : 0, { damping: 15, stiffness: 150 });
  }, [value]);

  const animatedKnobStyle = useAnimatedStyle(() => {
    const translateX = interpolate(toggleProgress.value, [0, 1], [0, 20]);
    return {
      transform: [{ translateX }],
    };
  });

  const animatedGradientStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(toggleProgress.value, { duration: 150 }),
    };
  });

  const handlePress = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (e) {}
    onValueChange(!value);
  };

  return (
    <Pressable onPress={handlePress} style={styles.switchTrack}>
      <View style={[StyleSheet.absoluteFill, { backgroundColor: '#3A3A3C' }]} />
      <Animated.View style={[StyleSheet.absoluteFill, animatedGradientStyle]}>
        <LinearGradient
          colors={['#FFCC00', '#D76B00']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
      <Animated.View style={[styles.switchKnob, animatedKnobStyle]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  switchTrack: {
    width: 52,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    paddingHorizontal: 4,
    overflow: 'hidden',
  },
  switchKnob: {
    width: 24,
    height: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});

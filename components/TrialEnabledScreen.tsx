import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

export function TrialEnabledScreen({ onNext }: { onNext: () => void }) {
  const [isEnabled, setIsEnabled] = useState(true);
  
  // Reanimated shared values
  const toggleProgress = useSharedValue(1); // Start enabled (1)

  const handleToggle = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (e) {}

    const nextState = !isEnabled;
    setIsEnabled(nextState);
    
    // Animate transition
    toggleProgress.value = withSpring(nextState ? 1 : 0, {
      damping: 15,
      stiffness: 150,
    });
    
    // Proceed after short visual delay to let animation finish
    setTimeout(() => {
      onNext();
    }, 600);
  };

  // Knob slide animation (translateX from 0 to 36)
  const animatedKnobStyle = useAnimatedStyle(() => {
    const translateX = interpolate(toggleProgress.value, [0, 1], [0, 36]);
    return {
      transform: [{ translateX }],
    };
  });

  // Active state gradient background opacity animation (0 to 1)
  const animatedGradientStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(toggleProgress.value, { duration: 200 }),
    };
  });

  return (
    <View className="flex-1 justify-center items-center bg-[#121212]">
      <View className="items-center">
        {/* Animated Toggle Track */}
        <Pressable 
          onPress={handleToggle}
          style={styles.track}
        >
          {/* Inactive Background (Default Grey) */}
          <View style={[StyleSheet.absoluteFill, { backgroundColor: '#3A3A3C' }]} />

          {/* Active Background (Animated Gradient) */}
          <Animated.View style={[StyleSheet.absoluteFill, animatedGradientStyle]}>
            <LinearGradient 
              colors={['#FFCC00', '#D76B00']} 
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill} 
            />
          </Animated.View>

          {/* Floating Circle Knob */}
          <Animated.View style={[styles.knob, animatedKnobStyle]} />
        </Pressable>

        <Text className={`text-[32px] font-bold text-center mt-6 transition-all duration-300 ${isEnabled ? 'text-[#FFCC00]' : 'text-white/60'}`}>
          7 day's trial
        </Text>
        <Text className="text-white text-[32px] font-bold text-center mt-1">
          {isEnabled ? 'is enabled' : 'is disabled'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 84,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    paddingHorizontal: 6,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  knob: {
    width: 36,
    height: 36,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
});

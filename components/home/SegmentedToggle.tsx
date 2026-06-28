import React, { useState } from 'react';
import { View, Text, Pressable, LayoutChangeEvent } from 'react-native';
import { SymbolView } from 'expo-symbols';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';

interface SegmentedToggleProps {
  options: { label: string; icon: any }[];
  onChange?: (index: number) => void;
}

export function SegmentedToggle({ options, onChange }: SegmentedToggleProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [segmentWidth, setSegmentWidth] = useState(0);
  const translateX = useSharedValue(0);
  const activeIndex = useSharedValue(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width;
    const singleSegment = (width - 8) / options.length; // subtract padding (p-1 = 4*2)
    setSegmentWidth(singleSegment);
  };

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    activeIndex.value = withSpring(index, { damping: 18, stiffness: 160 });
    translateX.value = withSpring(index * segmentWidth, {
      damping: 18,
      stiffness: 160,
    });
    onChange?.(index);
  };

  const slidingStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View
      className="flex-row bg-[#262626] rounded-full p-1 mx-4 mb-4"
      onLayout={handleLayout}
    >
      {/* Sliding White Pill */}
      {segmentWidth > 0 && (
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 4,
              left: 4,
              width: segmentWidth,
              height: '100%',
              borderRadius: 9999,
              backgroundColor: '#FFFFFF',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 4,
              elevation: 3,
            },
            slidingStyle,
          ]}
        />
      )}

      {/* Tab Buttons */}
      {options.map((option, index) => {
        const isSelected = selectedIndex === index;
        return (
          <Pressable
            key={index}
            onPress={() => handleSelect(index)}
            className="flex-1 flex-row items-center justify-center py-2.5 rounded-full"
          >
            <View className="mr-2">
              <SymbolView
                name={option.icon}
                tintColor={isSelected ? '#121212' : '#FFFFFF'}
                size={16}
              />
            </View>
            <Text
              className={`text-[15px] font-semibold ${
                isSelected ? 'text-[#121212]' : 'text-white/80'
              }`}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

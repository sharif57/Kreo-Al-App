import React from 'react';
import { View, Text, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';

export type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3';

interface RatioSelectorProps {
  selected: AspectRatio;
  onChange: (ratio: AspectRatio) => void;
}

interface RatioOption {
  label: AspectRatio;
  widthClass: string;
  heightClass: string;
}

export const RatioSelector: React.FC<RatioSelectorProps> = ({ selected, onChange }) => {
  const options: RatioOption[] = [
    { label: '1:1', widthClass: 'w-7', heightClass: 'h-7' },
    { label: '16:9', widthClass: 'w-9', heightClass: 'h-5' },
    { label: '9:16', widthClass: 'w-5', heightClass: 'h-9' },
    { label: '4:3', widthClass: 'w-8', heightClass: 'h-6' },
  ];

  const handleSelect = async (ratio: AspectRatio) => {
    try {
      await Haptics.selectionAsync();
    } catch (e) {}
    onChange(ratio);
  };

  return (
    <View className="flex-row justify-between w-full">
      {options.map((option) => {
        const isSelected = selected === option.label;
        return (
          <Pressable
            key={option.label}
            onPress={() => handleSelect(option.label)}
            className={`flex-1 items-center justify-center py-3 mx-1 rounded-xl border ${
              isSelected
                ? 'bg-violet-900/40 border-violet-500 bg-violet-600/20'
                : 'bg-dark-card/50 border-dark-border'
            }`}
          >
            {/* Visual shape representations */}
            <View className="h-10 justify-center items-center mb-1">
              <View
                className={`border rounded ${
                  isSelected ? 'border-cyan-400 bg-cyan-400/20' : 'border-dark-muted bg-white/5'
                } ${option.widthClass} ${option.heightClass}`}
              />
            </View>
            <Text
              className={`text-xs font-semibold ${
                isSelected ? 'text-white' : 'text-dark-muted'
              }`}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

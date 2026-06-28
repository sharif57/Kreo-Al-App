import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SymbolView } from 'expo-symbols';

interface SetupHeaderProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onSkip: () => void;
}

export function SetupHeader({ currentStep, totalSteps, onBack, onSkip }: SetupHeaderProps) {
  return (
    <View className="w-full flex-row items-center justify-between px-6 pt-14 pb-4">
      <Pressable onPress={onBack} className="p-2 -ml-2">
        <SymbolView name="chevron.left" tintColor="#FFFFFF" size={24} />
      </Pressable>

      <View className="flex-row items-center gap-1.5">
        {Array.from({ length: totalSteps }).map((_, idx) => {
          const stepNum = idx + 1;
          const isActive = stepNum === currentStep;
          return (
            <View
              key={idx}
              style={{
                width: isActive ? 24 : 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: isActive ? '#FFCC00' : 'rgba(255,255,255,0.2)',
              }}
            />
          );
        })}
      </View>

      <Pressable onPress={onSkip} className="p-2 -mr-2">
        <Text className="text-white/60 text-[15px] font-medium">Skip</Text>
      </Pressable>
    </View>
  );
}

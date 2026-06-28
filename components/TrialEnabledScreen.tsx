import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';

export function TrialEnabledScreen({ onNext }: { onNext: () => void }) {
  const [isEnabled, setIsEnabled] = useState(true);

  const handleToggle = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch(e) {}
    setIsEnabled(!isEnabled);
    
    // Proceed after short visual delay
    setTimeout(() => {
      onNext();
    }, 400);
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#121212]">
      <View className="items-center">
        <Pressable 
          onPress={handleToggle}
          className={`w-[84px] h-[48px] rounded-full justify-center px-1.5 mb-2 overflow-hidden ${isEnabled ? '' : 'bg-[#404040]'}`}
          style={{ alignItems: isEnabled ? 'flex-end' : 'flex-start' }}
        >
          {isEnabled && (
            <LinearGradient colors={['#FFCC00', '#D76B00']} className="absolute inset-0" />
          )}
          <View className="w-[36px] h-[36px] bg-white rounded-full shadow-sm" />
        </Pressable>
        <Text className={`text-[32px] font-bold text-center mt-6 ${isEnabled ? 'text-[#FFCC00]' : 'text-white/60'}`}>
          7 day's trial
        </Text>
        <Text className="text-white text-[32px] font-bold text-center mt-1">
          {isEnabled ? 'is enabled' : 'is disabled'}
        </Text>
      </View>
    </View>
  );
}

import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { ActionButton } from './ActionButton';

interface IntroStepProps {
  onStart: () => void;
  onSkip: () => void;
}

export function IntroStep({ onStart, onSkip }: IntroStepProps) {
  return (
    <View className="flex-1 px-6 justify-between pt-16 pb-12">
      <View className="flex-row items-center">
        <Image
          source={require('../../../assets/images/icon.png')}
          style={{ width: 28, height: 28, marginRight: 8 }}
          resizeMode="contain"
        />
      </View>

      <View className="items-center w-full">
        <Text className="text-white text-[32px] font-bold text-center leading-tight">
          Let's Set
        </Text>
        <Text className="text-white text-[32px] font-bold text-center leading-tight mt-1">
          Up Your Profile
        </Text>
        <Text className="text-white/60 text-[14px] text-center mt-4 px-6 leading-relaxed">
          This helps us personalize your AI creations and refine your unique artistic style.
        </Text>

        <View className="items-center mt-16 mb-10">
          <Image
            source={require('../../../assets/images/icon.png')}
            style={{ width: 120, height: 120, marginBottom: 16 }}
            resizeMode="contain"
          />
          <Text className="text-white text-[24px] font-bold tracking-wide">
            Kreo AI
          </Text>
        </View>
      </View>

      <View className="w-full">
        <ActionButton title="Start Setup" onPress={onStart} />
        <View className="flex-row justify-center items-center mt-5">
          <Text className="text-white/50 text-[13px]">I'll do this later </Text>
          <Pressable onPress={onSkip}>
            <Text className="text-[#FFCC00] text-[13px] font-semibold">Click here</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

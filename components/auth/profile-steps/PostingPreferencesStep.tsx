import React from 'react';
import { View, Text } from 'react-native';
import { SetupHeader } from './SetupHeader';
import { SocialGridCard } from './SocialGridCard';
import { ActionButton } from './ActionButton';

interface PostingPreferencesProps {
  selectedPlatforms: string[];
  togglePlatform: (plat: string) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  platforms: string[];
}

export function PostingPreferencesStep({
  selectedPlatforms,
  togglePlatform,
  onNext,
  onBack,
  onSkip,
  platforms,
}: PostingPreferencesProps) {
  return (
    <View className="flex-1 justify-between pb-12">
      <View>
        <SetupHeader currentStep={6} totalSteps={6} onBack={onBack} onSkip={onSkip} />
        <View className="px-6 pt-6">
          <Text className="text-white text-[32px] font-bold leading-tight">Content Posting{'\n'}Preferences</Text>
          <Text className="text-white/60 text-[14px] mt-2 leading-relaxed">
            We adjust our tools to fit your content workflow
          </Text>

          {/* 2x3 Grid */}
          <View className="flex-row flex-wrap mt-8 justify-between">
            {platforms.map((plat) => (
              <SocialGridCard
                key={plat}
                name={plat}
                isSelected={selectedPlatforms.includes(plat)}
                onPress={() => togglePlatform(plat)}
              />
            ))}
          </View>
        </View>
      </View>

      <View className="px-6 w-full">
        <ActionButton title="Continue" onPress={onNext} />
      </View>
    </View>
  );
}

import React from 'react';
import { View, Text } from 'react-native';
import * as Haptics from 'expo-haptics';
import { SetupHeader } from './SetupHeader';
import { SelectionCard } from './SelectionCard';
import { ActionButton } from './ActionButton';

interface AgeProps {
  ageRange: string | null;
  setAgeRange: (val: string) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  ageOptions: string[];
}

export function AgeStep({ ageRange, setAgeRange, onNext, onBack, onSkip, ageOptions }: AgeProps) {
  return (
    <View className="flex-1 justify-between pb-8">
      <View className="flex-1">
        <SetupHeader currentStep={5} totalSteps={6} onBack={onBack} onSkip={onSkip} />
        <View className="px-6 pt-4 flex-1">
          <Text className="text-white text-[32px] font-bold">May we ask your age?</Text>
          <Text className="text-white/60 text-[14px] mt-2 mb-6">
            We use this to improve and personalize your experience
          </Text>

          <View className="flex-1">
            {ageOptions.map((option, idx, arr) => (
              <SelectionCard
                key={option}
                label={option}
                isSelected={ageRange === option}
                style={{ marginBottom: idx === arr.length - 1 ? 0 : 8 }}
                onSelect={() => {
                  try {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  } catch (e) {}
                  setAgeRange(option);
                }}
              />
            ))}
          </View>
        </View>
      </View>

      <View className="px-6 w-full mt-4">
        <ActionButton title="Continue" onPress={onNext} disabled={!ageRange} />
      </View>
    </View>
  );
}

import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { SetupHeader } from './SetupHeader';
import { ActionButton } from './ActionButton';

interface NameInputProps {
  name: string;
  setName: (val: string) => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

export function NameInputStep({ name, setName, onNext, onBack, onSkip }: NameInputProps) {
  return (
    <View className="flex-1 justify-between pb-12">
      <View>
        <SetupHeader currentStep={2} totalSteps={6} onBack={onBack} onSkip={onSkip} />
        <View className="px-6 pt-6">
          <Text className="text-white text-[32px] font-bold">Your Name, Please</Text>
          <Text className="text-white/60 text-[14px] mt-2 leading-relaxed">
            We'll use it to personalize your Kreo AI experience.
          </Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Name"
            placeholderTextColor="rgba(255,255,255,0.3)"
            className="w-full h-14 bg-[#1C1C1E] border border-white/5 rounded-2xl px-5 text-white mt-8 text-[16px]"
            autoFocus
          />
        </View>
      </View>

      <View className="px-6 w-full">
        <ActionButton title="Continue" onPress={onNext} disabled={!name.trim()} />
      </View>
    </View>
  );
}

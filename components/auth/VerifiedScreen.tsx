import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { SymbolView } from 'expo-symbols';

interface VerifiedScreenProps {
  onNext: () => void;
}

export function VerifiedScreen({ onNext }: VerifiedScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onNext();
    }, 1500); // Wait 1.5 seconds then auto-transition
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <View className="flex-1 bg-[#121212] justify-center items-center">
      <View className="w-24 h-24 rounded-full border-[2px] border-white items-center justify-center mb-6">
        <SymbolView name={{ ios: 'checkmark', android: 'check', web: 'check' }} tintColor="#F59E0B" size={40} weight="bold" />
      </View>
      <Text className="text-white text-[22px] font-bold">Verified</Text>
    </View>
  );
}

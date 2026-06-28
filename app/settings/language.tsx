import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LanguageScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedLanguage, setSelectedLanguage] = useState('Hindi');

  const languages = ['English', 'Hindi', 'Spanish'];

  return (
    <View className="flex-1 bg-[#121212]" style={{ paddingTop: Math.max(insets.top, 20) }}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 mb-4">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2 flex-row items-center">
          <SymbolView name={{ ios: 'chevron.left', android: 'chevron_left', web: 'chevron_left' }} tintColor="#FFFFFF" size={20} />
          <Text className="text-white text-[18px] font-bold ml-2">Change Language</Text>
        </Pressable>
      </View>

      <View className="px-4">
        {languages.map((lang) => (
          <Pressable
            key={lang}
            onPress={() => setSelectedLanguage(lang)}
            className={`py-4 px-4 rounded-xl mb-3 ${selectedLanguage === lang ? 'bg-white' : 'bg-[#1C1C1E]'}`}
          >
            <Text className={`font-semibold text-[15px] ${selectedLanguage === lang ? 'text-black' : 'text-white'}`}>
              {lang}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

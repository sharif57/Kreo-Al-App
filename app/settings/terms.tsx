import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TermsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-[#121212]" style={{ paddingTop: Math.max(insets.top, 20) }}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 mb-2">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2 flex-row items-center">
          <SymbolView name={{ ios: 'chevron.left', android: 'chevron_left', web: 'chevron_left' }} tintColor="#FFFFFF" size={20} />
          <Text className="text-white text-[18px] font-bold ml-2">Terms & Policy</Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Icon Placeholder */}
        <View className="w-12 h-12 bg-[#1C1C1E] border border-white/10 rounded-lg items-center justify-center mb-6">
          <SymbolView name={{ ios: 'doc.text', android: 'description', web: 'description' }} tintColor="#888888" size={24} />
        </View>

        {/* Text Container */}
        <View className="bg-[#1C1C1E] rounded-2xl p-4 min-h-[400px] border border-white/[0.05]">
          <Text className="text-[#888888] text-[14px] leading-relaxed">
            Write here
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

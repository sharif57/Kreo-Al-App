import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SupportScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [text, setText] = useState('');

  return (
    <View className="flex-1 bg-[#121212]" style={{ paddingTop: Math.max(insets.top, 20) }}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 mb-2">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2 flex-row items-center">
          <SymbolView name={{ ios: 'chevron.left', android: 'chevron_left', web: 'chevron_left' }} tintColor="#FFFFFF" size={20} />
          <Text className="text-white text-[18px] font-bold ml-2">Support</Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Text Area */}
        <Text className="text-white font-bold text-[14px] mb-2 mt-2">Opinion/Report/Problem</Text>
        <View className="bg-[#1C1C1E] rounded-2xl p-4 h-40 border border-white/[0.05] mb-6">
          <TextInput
            className="flex-1 text-white text-[14px]"
            placeholder="Write here"
            placeholderTextColor="#888888"
            multiline
            textAlignVertical="top"
            value={text}
            onChangeText={setText}
          />
        </View>

        {/* Upload Block */}
        <Text className="text-white font-bold text-[14px] mb-2">Attached File</Text>
        <Pressable className="bg-[#1C1C1E] rounded-2xl h-32 border border-white/[0.05] items-center justify-center">
          <SymbolView name={{ ios: 'square.and.arrow.up', android: 'upload', web: 'upload' }} tintColor="#FFFFFF" size={24} style={{ marginBottom: 8 }} />
          <Text className="text-[#888888] font-semibold text-[13px]">Click here to upload</Text>
        </Pressable>
      </ScrollView>

      {/* Bottom Action */}
      <View className="pb-8 px-4 pt-2">
        <Pressable 
          onPress={() => router.back()}
          className="bg-white w-full py-4 rounded-full items-center justify-center"
        >
          <Text className="text-black font-bold text-[15px]">Submit Now</Text>
        </Pressable>
      </View>
    </View>
  );
}

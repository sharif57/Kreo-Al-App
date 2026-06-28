import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const faqs = [
  {
    question: 'How does AI image generation work?',
    answer: 'Our engine uses advanced AI models to transform your text prompts into high fidelity visuals.'
  },
  { question: 'How many videos can I create per day?', answer: 'Premium members have a limit of 2000 credits per month.' },
  { question: 'What formats are supported?', answer: 'We support MP4 for video and JPG/PNG for images.' },
  { question: 'How does AI video generation work?', answer: 'Similar to image generation, but it applies temporal consistency to create smooth video frames.' },
  { question: 'Can I use generated content commercially?', answer: 'Yes, all generations on the Premium plan come with a full commercial license.' },
];

export default function FaqScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <View className="flex-1 bg-[#121212]" style={{ paddingTop: Math.max(insets.top, 20) }}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 mb-2">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2 flex-row items-center">
          <SymbolView name={{ ios: 'chevron.left', android: 'chevron_left', web: 'chevron_left' }} tintColor="#FFFFFF" size={20} />
          <Text className="text-white text-[18px] font-bold ml-2">FAQ</Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {faqs.map((faq, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <Pressable
              key={index}
              onPress={() => setExpandedIndex(isExpanded ? null : index)}
              className="bg-[#1C1C1E] rounded-2xl p-4 mb-3"
            >
              <View className="flex-row justify-between items-center">
                <Text className="text-white font-semibold text-[14px] flex-1 pr-4">{faq.question}</Text>
                <SymbolView 
                  name={{ ios: isExpanded ? 'chevron.up' : 'chevron.down', android: isExpanded ? 'expand_less' : 'expand_more', web: isExpanded ? 'expand_less' : 'expand_more' }} 
                  tintColor="#FFFFFF" 
                  size={16} 
                />
              </View>
              {isExpanded && (
                <View className="mt-3 pl-3 border-l border-[#888888]/40">
                  <Text className="text-[#888888] text-[13px] leading-5">{faq.answer}</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Bottom Action */}
      <View className="pb-8 pt-4 px-4 items-center">
        <Text className="text-[#888888] text-[12px] mb-3">Still need help?</Text>
        <Pressable 
          onPress={() => router.push('/settings/support')}
          className="bg-[#1C1C1E] w-full py-4 rounded-full items-center justify-center border border-white/[0.05]"
        >
          <Text className="text-white font-bold text-[15px]">Contact Us</Text>
        </Pressable>
      </View>
    </View>
  );
}

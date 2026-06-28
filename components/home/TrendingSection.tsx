import React from 'react';
import { View, Text, ScrollView, Image, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

interface TrendingCardProps {
  id: string;
  imageUrl: string;
  title: string;
}

function TrendingCard({ id, imageUrl, title }: TrendingCardProps) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push({ pathname: '/template', params: { id, title, image: imageUrl } })}
      className="w-[140px] aspect-[3/4] rounded-2xl overflow-hidden mr-4 active:opacity-80"
    >
      <Image 
        source={{ uri: imageUrl }} 
        className="w-full h-full"
        resizeMode="cover"
      />
      <LinearGradient 
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        className="absolute bottom-0 left-0 right-0 h-1/2 justify-end pb-3 px-2"
      >
        <Text className="text-white text-[13px] font-semibold text-center" numberOfLines={1}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
}

interface TrendingSectionProps {
  title: string;
  items: { id: string; imageUrl: string; title: string }[];
}

export function TrendingSection({ title, items }: TrendingSectionProps) {
  return (
    <View className="mb-6">
      {/* Header */}
      <View className="flex-row justify-between items-end px-4 mb-4">
        <Text className="text-white text-[18px] font-bold">{title}</Text>
        <Pressable>
          <Text className="text-white/60 text-[13px] font-medium">See All</Text>
        </Pressable>
      </View>

      {/* Horizontal List */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 16, paddingRight: 4 }}
      >
        {items.map((item) => (
          <TrendingCard key={item.id} id={item.id} imageUrl={item.imageUrl} title={item.title} />
        ))}
      </ScrollView>
    </View>
  );
}


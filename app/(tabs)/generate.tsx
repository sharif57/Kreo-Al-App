import React from 'react';
import { View, Text, ScrollView, Pressable, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const TOOLS = [
  {
    id: 'image-to-image',
    title: 'Image to Image',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop',
    insetUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop',
    width: 'half'
  },
  {
    id: 'video-to-video',
    title: 'Video to Video',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop',
    insetUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop',
    width: 'half'
  },
  {
    id: 'style-back-light-1',
    title: 'Back Light',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop',
    width: 'half'
  },
  {
    id: 'style-back-light-2',
    title: 'Back Light',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop',
    width: 'half'
  },
  {
    id: 'image-to-video',
    title: 'Image to Video',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop',
    insetUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop',
    width: 'full'
  },
];

export default function CreateDashboardScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#121212]">
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingTop: 60, paddingBottom: 110, paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-white text-[24px] font-bold mb-6">Create</Text>
        
        <View className="flex-row flex-wrap justify-between">
          {TOOLS.map((tool) => (
            <Pressable
              key={tool.id}
              onPress={() => router.push(`/create/${tool.id}`)}
              className={`mb-4 rounded-[20px] overflow-hidden ${
                tool.width === 'full' ? 'w-full aspect-[2/1]' : 'w-[48%] aspect-[4/5]'
              }`}
            >
              <Image 
                source={{ uri: tool.imageUrl }}
                className="w-full h-full"
                resizeMode="cover"
              />
              
              {/* Inset Image */}
              {tool.insetUrl && (
                <View className="absolute bottom-[40px] left-3 w-[50px] h-[50px] rounded-lg overflow-hidden border border-white/20">
                  <Image source={{ uri: tool.insetUrl }} className="w-full h-full" resizeMode="cover" />
                </View>
              )}

              {/* Gradient Overlay for Text */}
              <LinearGradient 
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                className="absolute bottom-0 left-0 right-0 h-1/2 justify-end pb-3 px-4"
              >
                <Text className="text-white text-[14px] font-semibold">
                  {tool.title}
                </Text>
              </LinearGradient>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

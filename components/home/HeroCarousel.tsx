import React, { useState } from 'react';
import { View, Text, Pressable, Image, FlatList, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CAROUSEL_DATA = [
  {
    id: '1',
    title: 'Party Dance',
    subtitle: 'Make your memories come to life',
    image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=800&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Cyber City',
    subtitle: 'Explore the neon future',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Fantasy Realm',
    subtitle: 'Epic landscapes await',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop'
  },
  {
    id: '4',
    title: 'Anime Style',
    subtitle: 'Turn yourself into an anime character',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop'
  }
];

export function HeroCarousel() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    if (roundIndex !== activeIndex) {
      setActiveIndex(roundIndex);
    }
  };

  const renderItem = ({ item }: { item: typeof CAROUSEL_DATA[0] }) => {
    return (
      <View style={{ width: SCREEN_WIDTH }} className="aspect-[4/3.5] relative">
        <Image 
          source={{ uri: item.image }} 
          className="w-full h-full"
          resizeMode="cover"
        />
        
        {/* Bottom Gradient for text readability */}
        <LinearGradient 
          colors={['transparent', 'rgba(18,18,18,0.8)', '#121212']}
          className="absolute bottom-0 left-0 right-0 h-[60%]"
        />

        {/* Content */}
        <View className="absolute bottom-0 left-0 right-0 p-6 flex-row justify-between items-end">
          <View className="flex-1 pr-4">
            <Text className="text-white text-[28px] font-bold tracking-tight">{item.title}</Text>
            <Text className="text-white/80 text-[14px] mt-1">{item.subtitle}</Text>
          </View>

          <Pressable 
            onPress={() => router.push({ pathname: '/template', params: { id: item.id, title: item.title, image: item.image } })}
            className="bg-white px-6 py-2.5 rounded-full active:opacity-80"
          >
            <Text className="text-[#121212] text-[15px] font-semibold">Try It</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View className="w-full aspect-[4/3.5] relative mb-6">
      <FlatList 
        data={CAROUSEL_DATA}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
      />

      {/* Pagination Dots */}
      <View className="absolute bottom-[80px] left-0 right-0 flex-row justify-center items-center gap-1.5" pointerEvents="none">
        {CAROUSEL_DATA.map((_, index) => {
          const isActive = activeIndex === index;
          return (
            <View 
              key={index} 
              className={`h-1.5 rounded-full transition-all duration-300 ${isActive ? 'w-5 bg-white' : 'w-1.5 bg-white/40'}`} 
            />
          );
        })}
      </View>
    </View>
  );
}

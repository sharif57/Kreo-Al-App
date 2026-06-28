import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { HomeHeader } from '@/components/home/HomeHeader';
import { SegmentedToggle } from '@/components/home/SegmentedToggle';

const VIDEO_FILTERS = ['All', 'Trending', 'Dance', 'Cinematic', 'Anime', 'Slow Mo'];
const IMAGE_FILTERS = ['All', 'Studio', 'Viral', 'Trending', 'Restyle'];

const VIDEO_DISCOVER_DATA = [
  { id: 'v1', title: 'Dance Reel', category: 'Dance', imageUrl: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=500&auto=format&fit=crop' },
  { id: 'v2', title: 'Cinematic Walk', category: 'Cinematic', imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop' },
  { id: 'v3', title: 'Anime Transform', category: 'Anime', imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=500&auto=format&fit=crop' },
  { id: 'v4', title: 'Slow Motion', category: 'Slow Mo', imageUrl: 'https://images.unsplash.com/photo-1518676590747-1e3dcf5a5e27?w=500&auto=format&fit=crop' },
  { id: 'v5', title: 'Neon Vibes', category: 'Trending', imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop' },
  { id: 'v6', title: 'Time Lapse', category: 'Cinematic', imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500&auto=format&fit=crop' },
  { id: 'v7', title: 'Hip Hop Beat', category: 'Dance', imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop' },
  { id: 'v8', title: 'Epic Trailer', category: 'Trending', imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&auto=format&fit=crop' },
];

const IMAGE_DISCOVER_DATA = [
  { id: 'i1', title: 'Back Light', category: 'Studio', imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop' },
  { id: 'i2', title: 'Golden Hour', category: 'Trending', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop' },
  { id: 'i3', title: 'Portrait Pro', category: 'Studio', imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop' },
  { id: 'i4', title: 'Cyber Girl', category: 'Viral', imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop' },
  { id: 'i5', title: 'Fantasy Art', category: 'Restyle', imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=500&auto=format&fit=crop' },
  { id: 'i6', title: 'Vintage Film', category: 'Restyle', imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop' },
  { id: 'i7', title: 'Glam Shot', category: 'Trending', imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&auto=format&fit=crop' },
  { id: 'i8', title: 'Neon Portrait', category: 'Viral', imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop' },
];

export default function DiscoverScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [activeVideoFilter, setActiveVideoFilter] = useState('All');
  const [activeImageFilter, setActiveImageFilter] = useState('All');

  const isVideoTab = activeTab === 0;
  const filters = isVideoTab ? VIDEO_FILTERS : IMAGE_FILTERS;
  const activeFilter = isVideoTab ? activeVideoFilter : activeImageFilter;
  const setActiveFilter = isVideoTab ? setActiveVideoFilter : setActiveImageFilter;
  const allData = isVideoTab ? VIDEO_DISCOVER_DATA : IMAGE_DISCOVER_DATA;

  // Filter the data based on active filter
  const filteredData = activeFilter === 'All'
    ? allData
    : allData.filter((item) => item.category === activeFilter);

  return (
    <View className="flex-1 bg-[#121212]">
      <HomeHeader />
      
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <SegmentedToggle 
          options={[
            { label: 'Video AI', icon: { ios: 'video', android: 'videocam', web: 'videocam' } },
            { label: 'Image AI', icon: { ios: 'photo', android: 'image', web: 'image' } }
          ]}
          onChange={setActiveTab}
        />

        <Text className="text-white text-[22px] font-bold px-4 mt-6 mb-4">
          {isVideoTab ? 'Discover Videos' : 'Discover Images'}
        </Text>

        {/* Filters */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="mb-6"
          contentContainerStyle={{ paddingHorizontal: 16, gap: 10 }}
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <Pressable
                key={filter}
                onPress={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full ${isActive ? 'bg-white' : 'bg-[#1E1E1E]'}`}
              >
                <Text className={`font-medium ${isActive ? 'text-black' : 'text-white'}`}>
                  {filter}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Grid */}
        <View className="flex-row flex-wrap justify-between px-4 pb-6">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <Pressable 
                key={item.id}
                onPress={() => router.push({ pathname: '/template', params: { id: item.id, title: item.title, image: item.imageUrl } })}
                className="w-[48%] aspect-[3/4] rounded-[20px] overflow-hidden mb-4 active:opacity-80"
              >
                <Image 
                  source={{ uri: item.imageUrl }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                <LinearGradient 
                  colors={['transparent', 'rgba(0,0,0,0.9)']}
                  className="absolute bottom-0 left-0 right-0 h-1/2 justify-end pb-4 px-3"
                >
                  <Text className="text-white text-[14px] font-semibold text-center" numberOfLines={1}>
                    {item.title}
                  </Text>
                </LinearGradient>
              </Pressable>
            ))
          ) : (
            <View className="w-full py-20 items-center">
              <Text className="text-white/40 text-[16px]">No results found</Text>
            </View>
          )}
        </View>

      </ScrollView>
    </View>
  );
}

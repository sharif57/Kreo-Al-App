import React from 'react';
import { View } from 'react-native';
import { HeroCarousel } from './HeroCarousel';
import { TrendingSection } from './TrendingSection';

const TRENDING_VIDEO_1 = [
  { id: 'v1a', title: 'Cinematic AI', imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&auto=format&fit=crop' },
  { id: 'v2a', title: 'Action Shot', imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop' },
  { id: 'v3a', title: 'Drone Flyby', imageUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=500&auto=format&fit=crop' },
];

const TRENDING_VIDEO_2 = [
  { id: 'v1b', title: 'Neon Nights', imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop' },
  { id: 'v2b', title: 'Cyberpunk', imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop' },
  { id: 'v3b', title: 'Future City', imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop' },
];

export function VideoAITab() {
  return (
    <View className="flex-1 pb-6">
      <HeroCarousel />
      <TrendingSection title="Top AI Videos" items={TRENDING_VIDEO_1} />
      <TrendingSection title="New & Trending" items={TRENDING_VIDEO_2} />
    </View>
  );
}

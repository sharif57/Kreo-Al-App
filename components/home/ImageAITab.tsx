import React from 'react';
import { View } from 'react-native';
import { HeroCarousel } from './HeroCarousel';
import { TrendingSection } from './TrendingSection';

const TRENDING_ROW_1 = [
  { id: '1a', title: 'Back Light', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop' },
  { id: '2a', title: 'Back Light', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop' },
  { id: '3a', title: 'Back Light', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop' },
];

const TRENDING_ROW_2 = [
  { id: '1b', title: 'Back Light', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop' },
  { id: '2b', title: 'Back Light', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop' },
  { id: '3b', title: 'Back Light', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop' },
];

const TRENDING_ROW_3 = [
  { id: '1c', title: 'Back Light', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop' },
  { id: '2c', title: 'Back Light', imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop' },
  { id: '3c', title: 'Back Light', imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop' },
];

export function ImageAITab() {
  return (
    <View className="flex-1 pb-6">
      <HeroCarousel />
      <TrendingSection title="Trending" items={TRENDING_ROW_1} />
      <TrendingSection title="Trending" items={TRENDING_ROW_2} />
      <TrendingSection title="Trending" items={TRENDING_ROW_3} />
    </View>
  );
}

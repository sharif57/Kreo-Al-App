import { HomeHeader } from '@/components/home/HomeHeader';
import { ImageAITab } from '@/components/home/ImageAITab';
import { SegmentedToggle } from '@/components/home/SegmentedToggle';
import { VideoAITab } from '@/components/home/VideoAITab';
import { useState } from 'react';
import { ScrollView, StatusBar, View } from 'react-native';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <View className="flex-1 bg-[#121212]">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <HomeHeader />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <SegmentedToggle
          options={[
            { label: 'Video AI', icon: { ios: 'video', android: 'videocam', web: 'videocam' } },
            { label: 'Image AI', icon: { ios: 'photo', android: 'image', web: 'image' } }
          ]}
          onChange={setActiveTab}
        />

        {activeTab === 0 ? <VideoAITab /> : <ImageAITab />}
      </ScrollView>
    </View>
  );
}

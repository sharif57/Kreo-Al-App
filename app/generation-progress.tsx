import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ActivityIndicator, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { GlassCard } from '@/components/GlassCard';
import { HapticButton } from '@/components/HapticButton';
import { VideoPlayer } from '@/components/VideoPlayer';
import { useAppDispatch, useAppSelector } from '@/store';
import { resetProgress, toggleFavorite } from '@/store/generationSlice';
import * as Haptics from 'expo-haptics';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system/legacy';

// Conditionally require expo-media-library to prevent crashing in Expo Go
let MediaLibrary: any = null;
try {
  MediaLibrary = require('expo-media-library');
} catch (e) {
  // Silent fallback
}

export default function GenerationProgressScreen() {
  const router = useRouter();
  const { title } = useLocalSearchParams<{ title: string }>();
  const dispatch = useAppDispatch();
  const { isGenerating, currentProgress, currentStatus, error, latestGeneration } = useAppSelector(
    (state) => state.generation
  );

  useEffect(() => {
    if (!isGenerating && !error && latestGeneration) {
      // Delay slightly for UX before sliding over to result screen
      const timer = setTimeout(() => {
        router.replace({ pathname: '/result', params: { title } });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isGenerating, error, latestGeneration]);

  const [lastHapticProgress, setLastHapticProgress] = useState(0);

  // Trigger a soft haptic click every 10% progress
  useEffect(() => {
    if (isGenerating && currentProgress > lastHapticProgress + 9) {
      setLastHapticProgress(currentProgress);
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch (e) {}
    }
  }, [currentProgress, isGenerating]);

  // Reset progress state when screen unmounts
  useEffect(() => {
    return () => {
      dispatch(resetProgress());
    };
  }, []);

  const handleGoBack = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (e) {}
    router.back();
  };

  const handleShare = async () => {
    if (!latestGeneration) return;
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (e) {}

    if (!(await Sharing.isAvailableAsync())) {
      Alert.alert('Sharing Unavailable', 'Native sharing is not available on this platform.');
      return;
    }

    try {
      const filename = latestGeneration.url.split('/').pop()?.split('?')[0] || `creation.${latestGeneration.type === 'image' ? 'jpg' : 'mp4'}`;
      const localUri = `${FileSystem.cacheDirectory}${filename}`;
      const downloadResult = await FileSystem.downloadAsync(latestGeneration.url, localUri);
      await Sharing.shareAsync(downloadResult.uri);
    } catch (err: any) {
      Alert.alert('Share Failed', err.message || 'Unable to share this media');
    }
  };

  const handleDownload = async () => {
    if (!latestGeneration) return;
    if (!MediaLibrary) {
      Alert.alert(
        'Save Unsupported',
        'Saving directly to the gallery is not supported in Expo Go. You can still share the media using the Share button.',
        [{ text: 'OK' }]
      );
      return;
    }

    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (e) {}

    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please enable media library access to save creations.');
        return;
      }

      const filename = `${Date.now()}.${latestGeneration.type === 'image' ? 'jpg' : 'mp4'}`;
      const localUri = `${FileSystem.documentDirectory}${filename}`;
      
      const downloadResult = await FileSystem.downloadAsync(latestGeneration.url, localUri);
      await MediaLibrary.saveToLibraryAsync(downloadResult.uri);
      
      Alert.alert('Saved!', `Successfully saved generated ${latestGeneration.type} to your gallery.`);
    } catch (err: any) {
      Alert.alert('Download Failed', err.message || 'Could not download media.');
    }
  };

  const handleGoToLibrary = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (e) {}
    router.replace('/library');
  };

  // Blur calculation based on progress (from 25 down to 0)
  const blurRadius = Math.max(0, Math.min(25, Math.round((100 - currentProgress) / 4)));

  return (
    <View className="flex-1 bg-[#090514] justify-center items-center px-6">
      
      {/* Background blur layer for generating aesthetics */}
      <View className="absolute inset-0 opacity-20 justify-center items-center">
        <View className="w-96 h-96 rounded-full bg-violet-600 blur-[80px]" />
        <View className="w-80 h-80 rounded-full bg-cyan-400 blur-[60px] mt-20" />
      </View>

      {/* 1. Loading Phase */}
      {isGenerating && (
        <View className="w-full items-center">
          
          {/* Progressive blur frame */}
          <View className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 border border-white/10 mb-8 items-center justify-center relative">
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop' }}
              className="w-full h-full absolute inset-0 opacity-40"
              blurRadius={blurRadius}
              resizeMode="cover"
            />
            <ActivityIndicator size="large" color="#22D3EE" />
          </View>

          <Text className="text-white text-2xl font-black text-center mb-2">Generating Art...</Text>
          <Text className="text-cyan-400 text-sm font-semibold text-center mb-6 tracking-wide uppercase">
            {currentProgress}% COMPLETE
          </Text>

          {/* Status logs */}
          <GlassCard className="p-4 w-full border-violet-900/50">
            <View className="flex-row items-center">
              <View className="w-2.5 h-2.5 rounded-full bg-cyan-400 mr-3 animate-pulse" />
              <Text className="text-dark-text text-sm font-medium flex-1">{currentStatus}</Text>
            </View>
          </GlassCard>

          {/* Progress track */}
          <View className="w-full bg-white/5 h-1.5 rounded-full mt-8 overflow-hidden border border-white/5">
            <View 
              className="bg-gradient-to-r from-violet-600 to-cyan-400 h-full rounded-full" 
              style={{ width: `${currentProgress}%`, backgroundColor: '#8B5CF6' }}
            />
          </View>
        </View>
      )}

      {/* 2. Error Phase */}
      {error && (
        <View className="w-full items-center">
          <View className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 items-center justify-center mb-5">
            <SymbolView name={{ ios: 'exclamationmark.triangle.fill', android: 'warning', web: 'warning' }} tintColor="#EF4444" size={28} />
          </View>
          
          <Text className="text-white text-xl font-bold mb-2">Generation Failed</Text>
          <Text className="text-red-400 text-sm text-center mb-8 px-4 leading-relaxed">{error}</Text>
          
          <HapticButton 
            onPress={handleGoBack}
            styleType="secondary"
            className="w-full py-4 rounded-xl border-dark-border"
          >
            Go Back and Edit
          </HapticButton>
        </View>
      )}



    </View>
  );
}

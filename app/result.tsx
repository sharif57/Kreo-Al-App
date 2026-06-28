import { useAppSelector, useAppDispatch } from '@/store';
import { toggleFavorite } from '@/store/generationSlice';
import * as FileSystem from 'expo-file-system/legacy';
import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { SymbolView } from 'expo-symbols';
import { Alert, Image, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';

// Conditionally require expo-media-library to prevent crashing in Expo Go
let MediaLibrary: any = null;
try {
  MediaLibrary = require('expo-media-library');
} catch (e) {
  // Silent fallback
}

export default function ResultScreen() {
  const router = useRouter();
  const { title } = useLocalSearchParams<{ title: string }>();
  const { latestGeneration } = useAppSelector((state) => state.generation);
  const dispatch = useAppDispatch();

  const handleFavorite = async () => {
    if (!latestGeneration) return;
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (e) { }
    dispatch(toggleFavorite(latestGeneration.id));
  };

  const handleShare = async () => {
    if (!latestGeneration) return;
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (e) { }

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
    } catch (e) { }

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

  const handleGoHome = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (e) { }
    router.replace('/(tabs)');
  };

  const imageUrl = latestGeneration?.url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop';

  return (
    <View className="flex-1 bg-black">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Background Image */}
      <View style={StyleSheet.absoluteFill}>
        <Image
          source={{ uri: imageUrl }}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        />
        {/* Soft dark gradient at top to make header text readable */}
        <View className="absolute top-0 left-0 right-0 h-32 bg-black/40" />
      </View>

      {/* Header */}
      <View className="absolute top-14 left-4 right-4 flex-row justify-between items-center z-10 px-2">
        <Text className="text-white font-bold text-xl">{title || 'Party Dance'}</Text>
        <View className="flex-row items-center">
          <Pressable 
            onPress={handleFavorite} 
            className={`w-10 h-10 rounded-full items-center justify-center mr-2 ${latestGeneration?.isFavorite ? 'bg-red-500' : 'bg-black/40'}`}
          >
            <SymbolView 
              name={{ ios: 'heart.fill', android: 'favorite', web: 'favorite' } as any} 
              tintColor="#FFFFFF"
              size={18} 
            />
          </Pressable>
          <Pressable onPress={handleGoHome} className="p-2">
            <SymbolView name={{ ios: 'xmark', android: 'close', web: 'close' } as any} tintColor="#FFFFFF" size={24} />
          </Pressable>
        </View>
      </View>

      {/* Bottom Action Sheet */}
      <View className="absolute bottom-0 left-0 right-0 bg-[#1A1A1A] rounded-t-[32px] pt-8 pb-12 px-6">

        <Pressable
          onPress={handleDownload}
          className="w-full bg-white h-14 rounded-full justify-center items-center mb-4 active:opacity-80"
        >
          <Text className="text-[#121212] font-semibold text-[16px]">Download</Text>
        </Pressable>

        <Pressable
          onPress={handleShare}
          className="w-full bg-[#333333] h-14 rounded-full justify-center items-center mb-8 active:opacity-80"
        >
          <Text className="text-white font-semibold text-[16px]">Share</Text>
        </Pressable>

        <View className="flex-row justify-center items-center">
          <Text className="text-white/60 text-[15px]">Go to Home </Text>
          <Pressable onPress={handleGoHome} hitSlop={10}>
            <Text className="text-[#FFB800] text-[15px] font-medium">Click Here</Text>
          </Pressable>
        </View>

      </View>
    </View>
  );
}

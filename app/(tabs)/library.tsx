import React, { useState } from 'react';
import { View, Text, FlatList, Pressable, Image, Modal, ScrollView, Alert, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { GlassCard } from '@/components/GlassCard';
import { HapticButton } from '@/components/HapticButton';
import { VideoPlayer } from '@/components/VideoPlayer';
import { useAppDispatch, useAppSelector } from '@/store';
import { toggleFavorite, deleteItem, GenerationItem } from '@/store/generationSlice';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system/legacy';
import * as Haptics from 'expo-haptics';

// Conditionally require expo-media-library to prevent crashing in Expo Go
let MediaLibrary: any = null;
try {
  MediaLibrary = require('expo-media-library');
} catch (e) {
  // Silent fallback
}

export default function LibraryScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const history = useAppSelector((state) => state.generation.history);
  const insets = useSafeAreaInsets();

  // Tab filter: 'video' or 'image'
  const [filter, setFilter] = useState<'video' | 'image'>('video');

  // Selected item for modal details
  const [selectedItem, setSelectedItem] = useState<GenerationItem | null>(null);

  // Filter the history based on the selected tab
  const filteredHistory = history.filter((item) => {
    // For this specific screen, we only show favorites (Saved Items)
    if (!item.isFavorite) return false;
    return item.type === filter;
  });

  const handleFavorite = async (id: string) => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (e) {}
    dispatch(toggleFavorite(id));
    if (selectedItem && selectedItem.id === id) {
      setSelectedItem({ ...selectedItem, isFavorite: !selectedItem.isFavorite });
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Creation',
      'Are you sure you want to permanently delete this generated item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            } catch (e) {}
            dispatch(deleteItem(id));
            setSelectedItem(null);
          }
        }
      ]
    );
  };

  const handleShare = async (item: GenerationItem) => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (e) {}
    
    if (!(await Sharing.isAvailableAsync())) {
      Alert.alert('Sharing Unavailable', 'Native sharing is not available on this platform.');
      return;
    }

    try {
      const filename = item.url.split('/').pop()?.split('?')[0] || `creation.${item.type === 'image' ? 'jpg' : 'mp4'}`;
      const localUri = `${FileSystem.cacheDirectory}${filename}`;
      const downloadResult = await FileSystem.downloadAsync(item.url, localUri);
      await Sharing.shareAsync(downloadResult.uri);
    } catch (error: any) {
      Alert.alert('Share Failed', error.message || 'Unable to share this media');
    }
  };

  const handleDownload = async (item: GenerationItem) => {
    if (!MediaLibrary) {
      Alert.alert(
        'Save Unsupported',
        'Saving directly to the gallery is not supported in Expo Go.',
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

      const filename = `${Date.now()}.${item.type === 'image' ? 'jpg' : 'mp4'}`;
      const localUri = `${FileSystem.documentDirectory}${filename}`;
      const downloadResult = await FileSystem.downloadAsync(item.url, localUri);
      await MediaLibrary.saveToLibraryAsync(downloadResult.uri);
      
      Alert.alert('Saved!', `Successfully saved generated ${item.type} to your gallery.`);
    } catch (error: any) {
      Alert.alert('Download Failed', error.message || 'Could not download media.');
    }
  };

  const renderGridItem = ({ item }: { item: GenerationItem }) => {
    // Format date like "01 March, 2025"
    const dateObj = new Date(item.timestamp);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const year = dateObj.getFullYear();
    const formattedDate = `${day} ${month}, ${year}`;

    return (
      <Pressable 
        onPress={() => setSelectedItem(item)}
        className="flex-1 m-2 bg-[#1C1C1E] rounded-[24px] overflow-hidden border border-white/[0.03]"
      >
        {/* Top Image Portion */}
        <View className="aspect-[4/5] w-full relative">
          <Image 
            source={{ uri: item.url }} 
            className="w-full h-full"
            resizeMode="cover"
          />
          {item.type === 'video' && (
            <View className="absolute inset-0 items-center justify-center bg-black/20">
              <SymbolView 
                name={{ ios: 'play.circle.fill', android: 'play_circle', web: 'play_circle' }} 
                tintColor="#FFFFFF" 
                size={24} 
              />
            </View>
          )}
        </View>

        {/* Bottom Details Portion */}
        <View className="p-4">
          <Text className="text-white text-[15px] font-bold mb-1.5 tracking-wide">
            Jolly Jig
          </Text>
          <Text className="text-[#888888] text-[12px] font-medium">
            {formattedDate}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View className="flex-1 bg-[#121212]" style={{ paddingTop: Math.max(insets.top, 20) }}>
      <View className="flex-1 pt-2">
        
        {/* Header */}
        <Text className="text-white text-[24px] font-bold px-4 mb-5">Saved Item</Text>

        {/* Segmented Toggle Control */}
        <View className="px-4 mb-6">
          <View className="bg-[#1C1C1E] rounded-[20px] flex-row p-1.5 h-[52px]">
            {/* Video AI Tab */}
            <Pressable
              onPress={() => setFilter('video')}
              className={`flex-1 flex-row justify-center items-center rounded-full ${filter === 'video' ? 'bg-white' : 'bg-transparent'}`}
            >
              <SymbolView 
                name="video" 
                tintColor={filter === 'video' ? '#000000' : '#888888'} 
                size={16} 
                style={{ marginRight: 8 }}
              />
              <Text className={`font-semibold text-[14px] ${filter === 'video' ? 'text-black' : 'text-[#888888]'}`}>
                Video AI
              </Text>
            </Pressable>

            {/* Image AI Tab */}
            <Pressable
              onPress={() => setFilter('image')}
              className={`flex-1 flex-row justify-center items-center rounded-full ${filter === 'image' ? 'bg-white' : 'bg-transparent'}`}
            >
              <SymbolView 
                name="photo" 
                tintColor={filter === 'image' ? '#000000' : '#888888'} 
                size={16} 
                style={{ marginRight: 8 }}
              />
              <Text className={`font-semibold text-[14px] ${filter === 'image' ? 'text-black' : 'text-[#888888]'}`}>
                Image AI
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Empty State / Grid */}
        {filteredHistory.length === 0 ? (
          <View className="flex-1 items-center justify-center p-8">
            <SymbolView 
              name={filter === 'video' ? 'video.slash' : 'photo'} 
              tintColor="#333333" 
              size={48} 
              style={{ marginBottom: 16 }}
            />
            <Text className="text-white text-lg font-bold text-center mt-4">No Saved Items</Text>
            <Text className="text-[#888888] text-sm text-center mt-2 px-4">
              You haven't saved any {filter === 'video' ? 'videos' : 'images'} yet.
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredHistory}
            renderItem={renderGridItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 110 }}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* Detail slide up modal sheet */}
        {selectedItem && (
          <Modal
            visible={!!selectedItem}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setSelectedItem(null)}
          >
            <View className="flex-1 justify-end bg-black/80">
              <View className="bg-[#1C1C1E] border-t border-white/5 rounded-t-[32px] w-full max-h-[90%] pb-6">
                
                {/* Header handle */}
                <View className="items-center py-3">
                  <View className="w-12 h-1 bg-white/20 rounded-full" />
                </View>

                {/* Close button */}
                <View className="flex-row justify-between px-6 pb-2 items-center">
                  <Text className="text-white font-bold text-lg">Creation Details</Text>
                  <Pressable 
                    onPress={() => setSelectedItem(null)}
                    className="w-8 h-8 rounded-full bg-white/5 items-center justify-center border border-white/10"
                  >
                    <SymbolView name={{ ios: 'xmark', android: 'close', web: 'close' }} tintColor="#FFFFFF" size={14} />
                  </Pressable>
                </View>

                <ScrollView className="px-6" contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
                  {/* Visual Media Viewer */}
                  <View className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 mb-5 relative border border-white/10">
                    {selectedItem.type === 'image' ? (
                      <Image source={{ uri: selectedItem.url }} className="w-full h-full" resizeMode="contain" />
                    ) : (
                      <VideoPlayer source={selectedItem.url} className="w-full h-full" />
                    )}
                  </View>

                  <View className="flex-row justify-between items-center mb-6">
                    <Text className="text-white text-[18px] font-bold">Jolly Jig</Text>
                    <Pressable 
                      onPress={() => handleFavorite(selectedItem.id)}
                      className={`w-10 h-10 rounded-full items-center justify-center border ${
                        selectedItem.isFavorite ? 'bg-red-500 border-red-500' : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <SymbolView 
                        name={{ ios: 'heart.fill', android: 'favorite', web: 'favorite' }} 
                        tintColor="#FFFFFF" 
                        size={18} 
                      />
                    </Pressable>
                  </View>

                  {/* Controls toolbar */}
                  <View className="flex-row justify-between items-center gap-2">
                    <HapticButton 
                      onPress={() => handleShare(selectedItem)}
                      styleType="secondary"
                      className="flex-1 py-3.5 px-4 rounded-xl flex-row items-center border border-white/10"
                    >
                      <SymbolView name={{ ios: 'square.and.arrow.up', android: 'share', web: 'share' }} tintColor="#FFFFFF" size={16} />
                      <Text className="text-white text-xs font-bold ml-1.5">Share</Text>
                    </HapticButton>

                    <HapticButton 
                      onPress={() => handleDownload(selectedItem)}
                      styleType="primary"
                      className="flex-1 py-3.5 px-4 rounded-xl flex-row items-center bg-white"
                    >
                      <SymbolView name={{ ios: 'arrow.down.to.line', android: 'download', web: 'download' }} tintColor="#000000" size={16} />
                      <Text className="text-black text-xs font-bold ml-1.5">Save</Text>
                    </HapticButton>

                    <Pressable 
                      onPress={() => handleDelete(selectedItem.id)}
                      className="w-12 h-12 bg-red-950/40 border border-red-500/30 rounded-xl items-center justify-center"
                    >
                      <SymbolView name={{ ios: 'trash.fill', android: 'delete', web: 'delete' }} tintColor="#EF4444" size={18} />
                    </Pressable>
                  </View>

                </ScrollView>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </View>
  );
}

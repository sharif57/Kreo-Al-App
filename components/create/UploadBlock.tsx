import React, { useState } from 'react';
import { View, Text, Pressable, Image, Alert } from 'react-native';
import { SymbolView } from 'expo-symbols';
import * as ImagePicker from 'expo-image-picker';

interface UploadBlockProps {
  title: string;
  subtitle: string;
  iconName?: 'photo.badge.plus' | 'video.badge.plus';
  mediaType?: 'Images' | 'Videos' | 'All';
  onMediaSelected?: (uri: string) => void;
}

export function UploadBlock({ 
  title, 
  subtitle, 
  iconName = 'photo.badge.plus', 
  mediaType = 'Images',
  onMediaSelected 
}: UploadBlockProps) {
  const [selectedUri, setSelectedUri] = useState<string | null>(null);

  const handlePickMedia = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert("Permission required", "You need to grant camera roll permissions to upload media.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: mediaType === 'Images' 
          ? ImagePicker.MediaTypeOptions.Images 
          : mediaType === 'Videos' 
            ? ImagePicker.MediaTypeOptions.Videos 
            : ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setSelectedUri(uri);
        if (onMediaSelected) {
          onMediaSelected(uri);
        }
      }
    } catch (error) {
      console.log("Error picking media:", error);
    }
  };

  return (
    <Pressable
      onPress={handlePickMedia}
      className="bg-[#222222] rounded-[24px] p-8 mb-4 items-center justify-center border border-white/5 overflow-hidden"
      style={{ minHeight: 140 }}
    >
      {selectedUri ? (
        <>
          <Image source={{ uri: selectedUri }} className="absolute inset-0 w-full h-full opacity-60" resizeMode="cover" />
          <View className="bg-black/50 px-4 py-2 rounded-full flex-row items-center mt-auto z-10">
            <SymbolView name="checkmark.circle.fill" tintColor="#4ADE80" size={16} style={{ marginRight: 6 }} />
            <Text className="text-white text-[12px] font-bold">Media Selected</Text>
          </View>
        </>
      ) : (
        <>
          <View className="flex-row items-center mb-3">
            <SymbolView 
              name={iconName as any}
              tintColor="#FFFFFF" 
              size={24} 
              style={{ marginRight: 10 }}
            />
            <Text className="text-white text-[18px] font-bold">
              {title}
            </Text>
          </View>
          <Text className="text-[#888888] text-[12px] text-center leading-5 px-4">
            {subtitle}
          </Text>
        </>
      )}
    </Pressable>
  );
}

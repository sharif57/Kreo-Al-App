import React, { useState } from 'react';
import { View, Text, Pressable, Image, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppDispatch } from '@/store';
import { generateMedia } from '@/store/generationSlice';

export default function TemplateScreen() {
  const { id, title, image } = useLocalSearchParams<{ id: string; title: string; image: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();

  // 'intro' | 'upload' | 'uploading' | 'ready'
  const [step, setStep] = useState<'intro' | 'upload' | 'uploading' | 'ready'>('intro');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      selectionLimit: 4,
      quality: 0.8,
    });

    if (!result.canceled) {
      setStep('uploading');
      // Simulate network delay
      setTimeout(() => {
        const uris = result.assets.map(a => a.uri);
        setSelectedImages(uris);
        setStep('ready');
      }, 2000);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const newImages = selectedImages.filter((_, idx) => idx !== indexToRemove);
    setSelectedImages(newImages);
    if (newImages.length === 0) {
      setStep('upload');
    }
  };

  const handleCreate = () => {
    if (selectedImages.length > 0) {
      // Start the generation process in Redux
      dispatch(generateMedia({
        type: 'image',
        prompt: `Template: ${title || 'Party Dance'}`,
        ratio: '9:16',
        model: 'Flux.1 (Snel)',
        style: 'Default'
      }) as any);

      // Navigate directly to the result screen, bypassing the loading screen
      router.replace({ pathname: '/result', params: { title: title || 'Party Dance' } });
    }
  };

  return (
    <View className="flex-1 bg-[#1A1A1A]">
      {/* Top Image Area */}
      <View className="w-full h-[60%] relative">
        <Image 
          source={{ uri: image || 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=800&auto=format&fit=crop' }} 
          className="w-full h-full"
          resizeMode="cover"
        />
        
        {/* Close / Back Button */}
        <View className="absolute top-12 left-4 right-4 flex-row justify-between items-center z-10">
          {step === 'intro' ? (
            <Pressable onPress={() => router.back()} className="p-2 flex-row items-center bg-black/20 rounded-full">
              <SymbolView name={{ ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' } as any} tintColor="#FFF" size={24} />
              <Text className="text-white font-bold ml-2">{title || 'Party Dance'}</Text>
            </Pressable>
          ) : (
            <Pressable onPress={() => router.back()} className="p-2 absolute right-0 bg-black/20 rounded-full">
              <SymbolView name={{ ios: 'xmark', android: 'close', web: 'close' } as any} tintColor="#FFF" size={24} />
            </Pressable>
          )}
        </View>
      </View>

      {/* Bottom Sheet Area */}
      <View className="absolute bottom-0 left-0 right-0 h-[45%] bg-[#1A1A1A] rounded-t-2xl px-6 py-6 border-t border-white/5">
        {step === 'intro' && (
          <View className="flex-1">
            <Text className="text-white text-xl font-bold mb-6">Example Photo</Text>
            
            <View className="flex-row items-center mb-8">
              <View className="w-14 h-14 rounded-full overflow-hidden mr-4 bg-[#2A2A2A]">
                <Image source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} className="w-full h-full" />
              </View>
              <View>
                <Text className="text-white font-bold text-[16px] mb-1">Required 1 photo</Text>
                <Text className="text-white/60 text-[13px]">Clen, front facing, good lighting</Text>
              </View>
            </View>

            <View className="flex-1 justify-end pb-8">
              <Pressable 
                onPress={() => setStep('upload')}
                className="w-full bg-white h-[52px] rounded-full flex-row justify-center items-center"
              >
                <Text className="text-[#121212] font-semibold text-[15px] mr-2">Try Template</Text>
                <SymbolView name={{ ios: 'star.circle.fill', android: 'stars', web: 'stars' } as any} tintColor="#121212" size={16} />
                <Text className="text-[#121212] font-semibold text-[15px] ml-1">100</Text>
              </Pressable>
            </View>
          </View>
        )}

        {step !== 'intro' && (
          <View className="flex-1">
            <Text className="text-white text-xl font-bold mb-1">{title || 'Party Dance'}</Text>
            <Text className="text-white/60 text-[13px] mb-6">Make your memories come to life</Text>
            
            {step === 'upload' && (
              <Pressable 
                onPress={handlePickImage}
                className="w-full h-[180px] bg-[#262626] rounded-3xl justify-center items-center border border-white/10"
              >
                <SymbolView name={{ ios: 'photo.badge.plus', android: 'add_photo_alternate', web: 'add_photo_alternate' } as any} tintColor="#FFFFFF" size={32} />
                <Text className="text-white font-semibold mt-4">Tap here to upload</Text>
              </Pressable>
            )}

            {step === 'uploading' && (
              <View className="w-full h-[180px] bg-[#262626] rounded-3xl justify-center items-center border border-white/10">
                <View className="w-16 h-16 rounded-full border-2 border-white/20 items-center justify-center relative mb-4">
                  {/* Fake circle progress indicator */}
                  <View className="absolute top-0 right-0 w-8 h-16 border-r-2 border-t-2 border-b-2 border-white rounded-r-full" />
                  <Text className="text-white font-bold text-xs">50%</Text>
                </View>
                <Text className="text-white font-semibold">Uploading</Text>
              </View>
            )}

            {step === 'ready' && (
              <View className="w-full h-[180px] bg-[#262626] rounded-3xl p-4 border border-white/10 flex-row flex-wrap justify-center items-center gap-2 overflow-hidden">
                {selectedImages.map((uri, idx) => (
                  <View key={idx} className={`relative rounded-2xl overflow-hidden ${selectedImages.length === 1 ? 'w-[140px] h-[140px]' : 'w-[75px] h-[75px]'}`}>
                    <Image source={{ uri }} className="w-full h-full" resizeMode="cover" />
                    <Pressable 
                      onPress={() => handleRemoveImage(idx)}
                      className="absolute top-2 right-2 bg-black/50 rounded-full p-1 z-10"
                    >
                      <SymbolView name={{ ios: 'xmark', android: 'close', web: 'close' } as any} tintColor="#FFF" size={12} />
                    </Pressable>
                  </View>
                ))}
              </View>
            )}

            <View className="flex-1 justify-end pb-8">
              <Pressable 
                onPress={handleCreate}
                disabled={step !== 'ready'}
                className={`w-full h-[52px] rounded-full justify-center items-center ${step === 'ready' ? 'bg-white' : 'bg-[#3A3A3A]'}`}
              >
                <Text className={`font-semibold text-[15px] ${step === 'ready' ? 'text-[#121212]' : 'text-white/40'}`}>Create</Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

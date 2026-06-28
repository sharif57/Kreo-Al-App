import { AdvancedSettingsAccordion } from '@/components/create/AdvancedSettingsAccordion';
import { PromptInput } from '@/components/create/PromptInput';
import { UploadBlock } from '@/components/create/UploadBlock';
import { useAppDispatch } from '@/store';
import { generateMedia } from '@/store/generationSlice';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateToolScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [prompt, setPrompt] = useState('');

  const handleGenerate = () => {
    // Determine type based on id
    const genType = (id === 'video-to-video' || id === 'image-to-video') ? 'video' : 'image';

    // Dispatch generation
    dispatch(generateMedia({
      type: genType,
      prompt: prompt || 'A highly detailed professional render',
      ratio: '1:1',
      model: 'Flux.1 (Snel)',
      style: 'Default'
    }) as any);

    // Skip the progress page and go straight to result
    router.replace({ pathname: '/result', params: { title: title || 'Creation' } });
  };

  // Define dynamic content based on tool ID
  let title = 'Create';
  let hasReferenceImage = false;
  let hasBaseImage = false;
  let hasReferenceVideo = false;

  if (id === 'image-to-image') {
    title = 'Image to Image';
    hasReferenceImage = true;
    hasBaseImage = true;
  } else if (id === 'video-to-video') {
    title = 'Video to Video';
    hasReferenceVideo = true;
    hasBaseImage = true;
  } else if (id === 'text-to-image' || id?.startsWith('style-')) {
    title = id?.startsWith('style-') ? 'Template Generation' : 'Text to Image';
  } else if (id === 'image-to-video') {
    title = 'Image to Video';
    hasBaseImage = true;
  }

  return (
    <SafeAreaView className="flex-1 bg-[#121212]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Header */}
        <View className="flex-row items-center px-4 py-3">
          <Pressable onPress={() => router.back()} className="mr-4 p-2 -ml-2">
            <SymbolView name="chevron.left" tintColor="#FFFFFF" size={20} />
          </Pressable>
          <Text className="text-white text-[18px] font-bold">{title}</Text>
        </View>

        <ScrollView
          className="flex-1 px-4 pt-4"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Upload Blocks */}
          {hasReferenceVideo && (
            <UploadBlock
              title="Upload Video"
              subtitle="Upload your reference video. Upload only MP4 and MOV Videos. File size < 100 MB, Resolution > 720p."
              iconName="video.badge.plus"
            />
          )}

          {hasReferenceImage && (
            <UploadBlock
              title="Upload Image"
              subtitle="Upload your reference image. Upload only JPG and PNG images. File size < 10 MB, Dimension > 300px"
              iconName="photo.badge.plus"
            />
          )}

          {hasBaseImage && (
            <UploadBlock
              title="Upload Image"
              subtitle="Upload your image. Upload only JPG and PNG images. File size < 10 MB, Dimension > 300px"
              iconName="photo.badge.plus"
            />
          )}

          {/* Prompt Input */}
          <PromptInput value={prompt} onChangeText={setPrompt} />

          {/* Advanced Settings */}
          <AdvancedSettingsAccordion />
        </ScrollView>

        {/* Sticky Bottom Bar */}
        <View className="absolute bottom-0 left-0 right-0 p-4 bg-[#121212]">
          <Pressable
            onPress={handleGenerate}
            className="bg-white py-4 rounded-full flex-row justify-center items-center"
          >
            <Text className="text-black font-bold text-[16px] mr-2">Generate</Text>
            <SymbolView name="dollarsign.circle.fill" tintColor="#A0A0A0" size={16} />
            <Text className="text-black font-semibold text-[14px] ml-1">100</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

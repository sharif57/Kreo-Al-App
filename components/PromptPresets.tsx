import React from 'react';
import { ScrollView, Text, Pressable, View } from 'react-native';
import * as Haptics from 'expo-haptics';

interface StylePreset {
  name: string;
  emoji: string;
  tag: string;
}

export const STYLE_PRESETS: StylePreset[] = [
  { name: 'Cinematic', emoji: '🎬', tag: 'highly detailed cinematic movie still, dramatic lighting, 8k resolution' },
  { name: 'Anime', emoji: '🌸', tag: 'beautiful anime art style, vibrant colors, detailed illustration, studio ghibli aesthetic' },
  { name: 'Cyberpunk', emoji: '🌃', tag: 'neon-lit cyberpunk city street, futuristic gadgets, rainy reflection, cyberpunk aesthetic' },
  { name: '3D Render', emoji: '🔮', tag: 'isometric 3D digital render, octane render, smooth pastel clay textures, cute design' },
  { name: 'Oil Painting', emoji: '🎨', tag: 'impasto oil painting, thick visible brushstrokes, classical masterpiece style' },
  { name: 'Pencil Sketch', emoji: '✏️', tag: 'finely detailed graphite pencil sketch, cross-hatching, hand-drawn art' },
  { name: 'Surrealism', emoji: '🍄', tag: 'dreamlike surreal landscape, melting clocks, floating islands, salvador dali style' },
  { name: 'Synthwave', emoji: '🌅', tag: 'synthwave wireframe grid, retro sun background, neon pink and purple hues, 1980s aesthetic' }
];

interface PromptPresetsProps {
  selectedStyle: string;
  onSelectStyle: (styleName: string, tag: string) => void;
}

export const PromptPresets: React.FC<PromptPresetsProps> = ({
  selectedStyle,
  onSelectStyle,
}) => {
  const handlePress = async (preset: StylePreset) => {
    try {
      await Haptics.selectionAsync();
    } catch (e) {}
    onSelectStyle(preset.name, preset.tag);
  };

  return (
    <View className="my-2">
      <Text className="text-white font-semibold text-sm mb-3">Generation Style</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row"
        contentContainerStyle={{ paddingRight: 20 }}
      >
        {STYLE_PRESETS.map((preset) => {
          const isSelected = selectedStyle === preset.name;
          return (
            <Pressable
              key={preset.name}
              onPress={() => handlePress(preset)}
              className={`flex-row items-center px-4 py-2.5 mr-2.5 rounded-full border transition duration-150 ${
                isSelected
                  ? 'bg-violet-600 border-violet-400 shadow-md shadow-violet-500/30'
                  : 'bg-dark-card/60 border-dark-border'
              }`}
            >
              <Text className="text-base mr-1.5">{preset.emoji}</Text>
              <Text
                className={`text-sm font-semibold ${
                  isSelected ? 'text-white' : 'text-dark-muted'
                }`}
              >
                {preset.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

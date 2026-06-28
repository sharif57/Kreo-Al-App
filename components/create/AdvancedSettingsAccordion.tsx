import React, { useState } from 'react';
import { View, Text, Pressable, LayoutAnimation, UIManager, Platform } from 'react-native';
import { SymbolView } from 'expo-symbols';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface OptionProps {
  id: string;
  label: string;
  sublabel: string;
  icon: string;
  isPro?: boolean;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

function OptionCard({ id, label, sublabel, icon, isPro, isSelected, onSelect }: OptionProps) {
  return (
    <Pressable
      onPress={() => onSelect(id)}
      className={`relative w-[100px] aspect-[4/5] p-3 rounded-xl border mr-3 items-center justify-center ${
        isSelected ? 'bg-[#2A2A2A] border-white/20' : 'bg-[#1C1C1C] border-transparent'
      }`}
    >
      <SymbolView name={icon as any} tintColor={isSelected ? '#FFFFFF' : '#888888'} size={24} style={{ marginBottom: 8 }} />
      <Text className={`text-[12px] font-semibold ${isSelected ? 'text-white' : 'text-[#888888]'}`}>{label}</Text>
      <Text className="text-[10px] text-[#666666] font-medium mt-1">{sublabel}</Text>
      
      {isPro && (
        <View className="absolute top-2 right-2 bg-[#F5A623] px-1.5 py-0.5 rounded">
          <Text className="text-black text-[8px] font-bold">Pro</Text>
        </View>
      )}
    </Pressable>
  );
}

export function AdvancedSettingsAccordion() {
  const [expanded, setExpanded] = useState(false);
  const [ratio, setRatio] = useState('9:16');
  const [quality, setQuality] = useState('Standard');

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View className="bg-[#222222] rounded-[24px] mb-24 border border-white/5 overflow-hidden">
      <Pressable onPress={toggleAccordion} className="p-5 flex-row justify-between items-center">
        <Text className="text-white text-[14px] font-semibold">Advanced Settings</Text>
        <SymbolView name={expanded ? "chevron.up" : "chevron.down"} tintColor="#888888" size={16} />
      </Pressable>

      {expanded && (
        <View className="px-5 pb-6">
          <Text className="text-white text-[12px] font-medium mb-3">Aspect Ratio</Text>
          <View className="flex-row mb-6">
            <OptionCard 
              id="9:16" label="9:16" sublabel="Story" icon="rectangle.portrait" 
              isPro isSelected={ratio === '9:16'} onSelect={setRatio} 
            />
            <OptionCard 
              id="16:9" label="16:9" sublabel="Widescreen" icon="rectangle" 
              isPro isSelected={ratio === '16:9'} onSelect={setRatio} 
            />
          </View>

          <Text className="text-white text-[12px] font-medium mb-3">Speed & Quality</Text>
          <View className="flex-row">
            <OptionCard 
              id="Standard" label="Standard" sublabel="Basic" icon="checkmark.shield" 
              isSelected={quality === 'Standard'} onSelect={setQuality} 
            />
            <OptionCard 
              id="Fast" label="Fast" sublabel="Quick" icon="bolt" 
              isPro isSelected={quality === 'Fast'} onSelect={setQuality} 
            />
            <OptionCard 
              id="4k" label="4k" sublabel="Ultra HD" icon="photo.badge.plus" 
              isPro isSelected={quality === '4k'} onSelect={setQuality} 
            />
          </View>
        </View>
      )}
    </View>
  );
}

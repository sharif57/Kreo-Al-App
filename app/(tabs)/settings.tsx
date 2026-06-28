import React, { useState } from 'react';
import { View, Text, Switch, Pressable, ScrollView, Alert, Image } from 'react-native';
import { SymbolView } from 'expo-symbols';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [emailNotifs, setEmailNotifs] = useState(true);

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: () => router.replace('/') }
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert('Delete Account', 'Are you sure? This action is permanent and cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive' }
    ]);
  };

  const SettingsRow = ({ 
    icon, 
    title, 
    rightElement, 
    onPress, 
    isLast 
  }: { 
    icon: any, 
    title: string, 
    rightElement?: React.ReactNode, 
    onPress?: () => void,
    isLast?: boolean
  }) => (
    <Pressable 
      onPress={onPress}
      className={`flex-row items-center py-4 ${!isLast ? 'border-b border-white/[0.05]' : ''}`}
    >
      <View className="w-6 items-center justify-center mr-3">
        <SymbolView name={icon} tintColor="#FFFFFF" size={18} />
      </View>
      <Text className="flex-1 text-white text-[15px]">{title}</Text>
      {rightElement || (
        <SymbolView name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }} tintColor="#666666" size={14} />
      )}
    </Pressable>
  );

  return (
    <View className="flex-1 bg-[#121212]" style={{ paddingTop: Math.max(insets.top, 20) }}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3">
        <Pressable onPress={() => router.back()} className="p-2 -ml-2 flex-row items-center">
          <SymbolView name={{ ios: 'chevron.left', android: 'chevron_left', web: 'chevron_left' }} tintColor="#FFFFFF" size={20} />
          <Text className="text-white text-[18px] font-bold ml-2">Settings</Text>
        </Pressable>
      </View>

      <ScrollView 
        className="flex-1 px-4" 
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <View className="items-center mt-4 mb-6">
          <View className="relative">
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop' }}
              className="w-24 h-24 rounded-full border-2 border-white/10"
            />
            <View className="absolute bottom-0 right-0 bg-white w-7 h-7 rounded-full items-center justify-center border-2 border-[#121212]">
              <SymbolView name={{ ios: 'pencil', android: 'edit', web: 'edit' }} tintColor="#000000" size={12} />
            </View>
          </View>
          <Text className="text-white text-[20px] font-bold mt-4 mb-1">Alex Johnson</Text>
          <Text className="text-[#888888] text-[13px] mb-1">alex.johnson@gmail.com</Text>
          <Text className="text-[#888888] text-[11px] font-medium tracking-wider">USER ID: 12345</Text>
        </View>

        {/* Premium Card */}
        <Pressable 
          onPress={() => router.push('/settings/subscription')}
          className="bg-[#1C1C1E] rounded-2xl p-4 items-center mb-8"
        >
          <Text className="text-white text-[14px] font-semibold mb-3">Premium Member</Text>
          <LinearGradient
            colors={['#FFB800', '#FF8A00']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="rounded-full flex-row items-center py-2 px-6"
          >
            <SymbolView name={{ ios: 'star.fill', android: 'star', web: 'star' }} tintColor="#FFFFFF" size={14} style={{ marginRight: 6 }} />
            <Text className="text-white font-bold text-[13px]">Left 1500/2000 Credits</Text>
          </LinearGradient>
        </Pressable>

        {/* Account Section */}
        <Text className="text-white font-bold text-[16px] mb-3 mt-2">Account</Text>
        <View className="bg-[#1C1C1E] rounded-2xl px-4 mb-6 border border-white/[0.03]">
          <SettingsRow icon={{ ios: 'person', android: 'person', web: 'person' }} title="Edit Profile Setup" />
          <SettingsRow icon={{ ios: 'globe', android: 'language', web: 'language' }} title="Change Language" onPress={() => router.push('/settings/language')} />
          <SettingsRow icon={{ ios: 'rosette', android: 'workspace_premium', web: 'workspace_premium' }} title="Subscription Plan" onPress={() => router.push('/settings/subscription')} />
          <SettingsRow 
            icon={{ ios: 'bell', android: 'notifications', web: 'notifications' }} 
            title="Received Notification Via Email" 
            isLast
            rightElement={
              <Switch
                value={emailNotifs}
                onValueChange={setEmailNotifs}
                trackColor={{ false: '#333333', true: '#FFFFFF' }}
                thumbColor={emailNotifs ? '#000000' : '#888888'}
                ios_backgroundColor="#333333"
                style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
              />
            }
          />
        </View>

        {/* Support Section */}
        <Text className="text-white font-bold text-[16px] mb-3 mt-2">Support</Text>
        <View className="bg-[#1C1C1E] rounded-2xl px-4 mb-6 border border-white/[0.03]">
          <SettingsRow icon={{ ios: 'list.bullet', android: 'format_list_bulleted', web: 'format_list_bulleted' }} title="FAQ" onPress={() => router.push('/settings/faq')} />
          <SettingsRow icon={{ ios: 'globe', android: 'public', web: 'public' }} title="Contact Support" isLast onPress={() => router.push('/settings/support')} /> 
          {/* Note: using globe/public icon for Contact Support as shown in the screenshot */}
        </View>

        {/* Legal Section */}
        <Text className="text-white font-bold text-[16px] mb-3 mt-2">Legal</Text>
        <View className="bg-[#1C1C1E] rounded-2xl px-4 mb-6 border border-white/[0.03]">
          <SettingsRow icon={{ ios: 'doc.text', android: 'description', web: 'description' }} title="About Kreo AI" onPress={() => router.push('/settings/about')} />
          <SettingsRow icon={{ ios: 'lock.shield', android: 'privacy_tip', web: 'privacy_tip' }} title="Privacy Policy" onPress={() => router.push('/settings/terms')} />
          <SettingsRow icon={{ ios: 'doc.plaintext', android: 'article', web: 'article' }} title="Terms & Service" isLast onPress={() => router.push('/settings/terms')} />
        </View>

        {/* App Section */}
        <Text className="text-white font-bold text-[16px] mb-3 mt-2">App</Text>
        <View className="bg-[#1C1C1E] rounded-2xl px-4 mb-8 border border-white/[0.03]">
          <SettingsRow icon={{ ios: 'star', android: 'star_rate', web: 'star_rate' }} title="Rate Kreo AI" isLast />
        </View>

        {/* Action Buttons */}
        <Pressable 
          onPress={handleLogout}
          className="bg-white rounded-full h-[52px] flex-row justify-center items-center mb-4 active:opacity-80"
        >
          <SymbolView name={{ ios: 'rectangle.portrait.and.arrow.right', android: 'logout', web: 'logout' }} tintColor="#000000" size={18} style={{ marginRight: 8 }} />
          <Text className="text-black font-bold text-[15px]">Log Out</Text>
        </Pressable>

        <Pressable 
          onPress={handleDeleteAccount}
          className="bg-[#262626] rounded-full h-[52px] flex-row justify-center items-center mb-4 active:opacity-80 border border-white/[0.03]"
        >
          <Text className="text-white font-bold text-[15px]">Delete Account</Text>
        </Pressable>

        <Text className="text-[#666666] text-[10px] text-center px-6 leading-relaxed mt-2">
          Deleting your account is permanent. All your data{'\n'}and generations will be removed forever.
        </Text>

      </ScrollView>
    </View>
  );
}

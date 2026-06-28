import { Image, Pressable, Text, View } from 'react-native';
import { AuthButton } from '../ui/AuthButton';

interface AuthOptionsScreenProps {
  onSkip: () => void;
  onSelectEmail: () => void;
}

export function AuthOptionsScreen({ onSkip, onSelectEmail }: AuthOptionsScreenProps) {
  return (
    <View className="flex-1 bg-[#121212] px-4">
      <Pressable onPress={onSkip} className="absolute top-14 right-6 z-10 p-2">
        <Text className="text-white/70 text-[15px] font-medium">Skip</Text>
      </Pressable>

      <View className="flex-1 justify-center items-center pt-10">
        {/* Placeholder for the Kreo Logo */}
        <Image
          source={require('../../assets/images/icon.png')}
          className="w-24 h-24 mb-6"
          resizeMode="contain"
        />

        <Text className="text-white text-[26px] font-semibold text-center leading-tight mb-10 px-4">
          Create Stunning AI Photos &{'\n'}Videos
        </Text>

        <View className="w-full">
          <AuthButton
            title="Continue in with Apple"
            onPress={() => { }}
            iconName={{ ios: 'applelogo', android: 'apple', web: 'apple' }}
            variant="dark"
          />
          <AuthButton
            title="Continue in with Google"
            onPress={() => { }}
            iconName={{ ios: 'globe', android: 'public', web: 'public' }} // Using globe as a placeholder for Google if logo missing
            variant="dark"
          />
          <AuthButton
            title="Continue in with Email"
            onPress={onSelectEmail}
            iconName={{ ios: 'envelope', android: 'mail', web: 'mail' }}
            variant="light"
          />
        </View>
      </View>

      <View className="pb-10 pt-4 items-center px-4">
        <Text className="text-white/60 text-[11px] text-center leading-relaxed font-medium">
          By continuing, you agree to the <Text className="text-[#F59E0B] underline">Terms of{'\n'}Use</Text> and acknowledge that you have read the{'\n'}<Text className="text-[#F59E0B] underline">Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
}

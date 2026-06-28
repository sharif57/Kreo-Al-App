import * as Haptics from 'expo-haptics';
import { Text, View } from 'react-native';
import { ActionButton } from './ActionButton';
import { SelectionCard } from './SelectionCard';
import { SetupHeader } from './SetupHeader';

interface IdentityProps {
  name: string;
  identity: 'Male' | 'Female' | 'Other' | null;
  setIdentity: (val: 'Male' | 'Female' | 'Other') => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

export function IdentityStep({ name, identity, setIdentity, onNext, onBack, onSkip }: IdentityProps) {
  return (
    <View className="flex-1 justify-between pb-12">
      <View>
        <SetupHeader currentStep={3} totalSteps={6} onBack={onBack} onSkip={onSkip} />
        <View className="px-6 pt-6">
          <Text className="text-white text-[32px] font-bold">How do you identify?</Text>
          <Text className="text-white/60 text-[14px] mt-2 leading-relaxed">
            Personalize your experience for a better fit{name.trim() ? `, ${name.trim()}` : ''}.
          </Text>

          <View className="mt-8">
            {['Female', 'Male', 'Other'].map((option, idx, arr) => (
              <SelectionCard
                key={option}
                label={option}
                isSelected={identity === option}
                style={{ marginBottom: idx === arr.length - 1 ? 0 : 12 }}
                onSelect={() => {
                  try {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  } catch (e) { }
                  setIdentity(option as any);
                }}
              />
            ))}
          </View>
        </View>
      </View>

      <View className="px-6 w-full">
        <ActionButton title="Continue" onPress={onNext} disabled={!identity} />
      </View>
    </View>
  );
}

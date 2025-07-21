// components/FloatingButton.tsx
import { useRouter } from 'expo-router';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Sparkles } from 'lucide-react-native'; 
export default function FloatingButton() {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push('/generate-story')}
      activeOpacity={0.9}
      className="absolute bottom-[120] right-[20] bg-[#7C3AED] rounded-full p-6 z-[999]"
    >
      <Sparkles color="#fff" size={20} />
    </TouchableOpacity>
  );
}

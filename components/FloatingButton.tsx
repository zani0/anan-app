// components/FloatingButton.tsx
import { useRouter } from 'expo-router';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Sparkles } from 'lucide-react-native'; // you can replace with another if preferred

export default function FloatingButton() {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => router.push('/(screens)/generate-story')}
      activeOpacity={0.9}
      className="absolute bottom-[90] right-[20]"
    >
      <Sparkles color="#fff" size={24} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    // position: 'absolute',
    // bottom: 90, 
    // right: 20,
    backgroundColor: '#7C3AED',
    borderRadius: 100,
    padding: 16,
    elevation: 10,
    zIndex: 999,
  },
});

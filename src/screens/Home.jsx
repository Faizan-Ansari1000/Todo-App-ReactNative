import { useNavigation } from '@react-navigation/native';
import { useEffect, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from '../config/redux/ThemeContext';

export default function Home() {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('TaskList');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Welcome to ToDo App</Text>
      <Text style={[styles.subtitle, { color: theme.colors.text }]}>Explore this App and Enjoy</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '300',
    textAlign: 'center',
    color: '#999',
  },
});

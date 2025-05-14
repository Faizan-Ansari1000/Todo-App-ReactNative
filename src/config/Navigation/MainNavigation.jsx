import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import Home from '../../screens/Home';
import AddTask from '../../screens/AddTask';
import TaskList from '../../screens/TaskList';
import { ThemeContext } from '../redux/ThemeContext';
import { StatusBar } from 'react-native';

export default function MainNavigation() {
    const Stack = createNativeStackNavigator();
    const { theme, isDark } = useContext(ThemeContext);

    return (
        <>
            <StatusBar
                barStyle={isDark ? 'light-content' : 'dark-content'}
                backgroundColor={isDark ? '#2C2C2C' : '#F7F9FC'}
            />
            <NavigationContainer theme={theme}>
                <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen
                        name="AddTask"
                        options={{
                            headerShown: true,
                            headerStyle: {
                                backgroundColor: isDark ? '#2C2C2C' : '#F7F9FC'
                            },
                            headerTintColor: isDark ? '#FFFFFF' : '#1E1E1E',
                            headerBackVisible: false
                        }}
                        component={AddTask}
                    />
                    <Stack.Screen name="TaskList" component={TaskList} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

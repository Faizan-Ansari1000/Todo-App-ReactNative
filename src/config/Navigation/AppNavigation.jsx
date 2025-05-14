import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { ThemeProvider } from '../redux/ThemeContext';
import MainNavigation from './MainNavigation';

export default function AppNavigation() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <MainNavigation />
      </ThemeProvider>
    </Provider>
  );
}

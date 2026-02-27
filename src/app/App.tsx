import { useDarkModeStore } from '../shared/store/useDarkModeStore';
import ChatPage from '../pages/chat/ui/ChatPage';
import './index.css';

function App() {
  const isDarkMode = useDarkModeStore((s) => s.isDarkMode);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <ChatPage />
    </div>
  );
}

export default App;

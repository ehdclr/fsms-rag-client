import { useDarkModeStore } from "../shared/store/useDarkModeStore";
import ChatPage from "../pages/chat/ui/ChatPage";
import "./index.css";

function App() {
  const isDarkMode = useDarkModeStore((s) => s.isDarkMode);

  return (
    <div className={`${isDarkMode ? "dark" : ""} bg-bg-light text-slate-900 min-h-screen flex flex-col font-sans dark:bg-bg-dark dark:text-slate-100`}>
      <ChatPage />
    </div>
  );
}

export default App;

import Header from "./components/header/Header";
import MainContent from "./components/mapContainer/MainContent";
import { ThemeProvider } from "@/components/theme-provider";
const App = () => {
  return (
    <div className="min-w-[375px] max-w-[1440px] w-full mx-auto h-full">
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Header />
        <MainContent />
      </ThemeProvider>
    </div>
  );
};

export default App;

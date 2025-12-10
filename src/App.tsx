import { AppProvider } from "@/core/providers/app-provider";
import { AppConfigProvider } from "@/core/providers/app-config-provider";
import { appConfig } from "@/app/config";
import "./App.css";

function App() {
  return (
    <AppConfigProvider config={appConfig}>
      <AppProvider languages={appConfig.supportedLanguages} />
    </AppConfigProvider>
  );
}

export default App;

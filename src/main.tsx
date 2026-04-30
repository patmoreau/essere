import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {ConfigProvider} from "./share/config/ui/ConfigProvider.tsx";
import {Config} from "./share/config/core/config.ts";
import {Directus} from "./share/directus/core/directus.ts";
import {DirectusProvider} from "./share/directus/ui/DirectusProvider.tsx";

const initializeApp = async () => {
  const config = await Config.load();
  const directus = Directus(config);

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ConfigProvider config={config}>
        <DirectusProvider directus={directus}>
          <App/>
        </DirectusProvider>
      </ConfigProvider>
    </StrictMode>,
  )
}

initializeApp();
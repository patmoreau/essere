import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {CssBaseline, ThemeProvider} from '@mui/material'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import {ConfigProvider} from './shared/config/ui/ConfigProvider.tsx'
import {Config} from './shared/config/core/config.ts'
import {Directus} from './shared/directus/core/directus.ts'
import {DirectusProvider} from './shared/directus/ui/DirectusProvider.tsx'
import {materialTheme} from './theme/material-theme.ts'

const initializeApp = async () => {
  const config = await Config.load()
  const directus = Directus(config)

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ThemeProvider theme={materialTheme}>
        <CssBaseline/>
        <BrowserRouter>
          <ConfigProvider config={config}>
            <DirectusProvider directus={directus}>
              <App/>
            </DirectusProvider>
          </ConfigProvider>
        </BrowserRouter>
      </ThemeProvider>
    </StrictMode>,
  )
}

initializeApp()

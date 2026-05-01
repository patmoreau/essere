import { Box } from '@mui/material'
import { Suspense } from 'react'
import Navbar from './share/navbar/ui/Navbar'
import Hero from './home/ui/Hero'

export default function App() {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ pt: { xs: 11, md: 13 } }}>
        <Suspense fallback={null}>
          <Hero />
        </Suspense>
      </Box>
    </Box>
  )
}

import {Box} from '@mui/material'
import { Suspense } from 'react'
import Navbar from './shared/navbar/ui/Navbar'
import Hero from './home/ui/Hero'
import LoadingFallback from './shared/ui/LoadingFallback'

export default function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Box sx={{bgcolor: 'background.default', minHeight: '100vh'}}>
        <Navbar/>
        <Box component="main" sx={{pt: {xs: 11, md: 13}}}>
          <Hero/>
        </Box>
      </Box>
    </Suspense>
  )
}

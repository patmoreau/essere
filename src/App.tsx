import {Box} from '@mui/material'
import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './shared/navbar/ui/Navbar'
import LoadingFallback from './shared/ui/LoadingFallback'
import HomePage from "./home/ui/HomePage.tsx";
import ContactPage from "./contact/ui/ContactPage.tsx";
import EventsPage from "./events/ui/EventsPage.tsx";
import SchedulePage from "./schedule/ui/SchedulePage.tsx";

export default function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Box sx={{bgcolor: 'background.default', minHeight: '100vh'}}>
        <Navbar/>
        <Box component="main" sx={{pt: {xs: 11, md: 13}}}>
          <Routes>
            <Route path="/" element={<Navigate to="/accueil" replace />} />
            <Route path="/accueil" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/evenements" element={<EventsPage />} />
            <Route path="/cours" element={<SchedulePage />} />
          </Routes>
        </Box>
      </Box>
    </Suspense>
  )
}

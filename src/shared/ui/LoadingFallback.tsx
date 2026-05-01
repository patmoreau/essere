import { Box, CircularProgress, Typography } from '@mui/material'

type LoadingFallbackProps = {
  label?: string
  fullScreen?: boolean
}

export default function LoadingFallback({
  label = 'Loading...',
  fullScreen = true,
}: LoadingFallbackProps) {
  return (
    <Box
      role="status"
      aria-live="polite"
      sx={{
        minHeight: fullScreen ? '100vh' : '12rem',
        display: 'grid',
        placeItems: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Box sx={{ display: 'grid', justifyItems: 'center', gap: 1.5 }}>
        <CircularProgress size={36} thickness={4} sx={{ color: 'var(--primary)' }} />
        <Typography variant="body2" sx={{ color: 'var(--on-surface-variant)' }}>
          {label}
        </Typography>
      </Box>
    </Box>
  )
}


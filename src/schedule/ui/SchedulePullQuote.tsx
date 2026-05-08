import { Box, Typography } from '@mui/material';

const SchedulePullQuote = () => (
  <Box
    sx={{
      position: 'absolute',
      bottom: '2rem',
      left: '-2rem',
      width: '18rem',
      bgcolor: 'rgba(250,250,245,0.92)',
      backdropFilter: 'blur(16px)',
      borderRadius: 'var(--radius-md)',
      p: 3,
      boxShadow: '0 12px 40px rgba(46,52,45,0.12)',
      zIndex: 2,
    }}
  >
    <Typography
      sx={{
        fontFamily: 'Noto Serif, serif',
        fontSize: '1rem',
        fontStyle: 'italic',
        lineHeight: 1.5,
        color: 'var(--on-surface)',
        mb: 1.5,
      }}
    >
      "Le mouvement est une méditation, chaque séance un retour à soi."
    </Typography>
    <Typography
      sx={{
        fontFamily: 'Manrope, sans-serif',
        fontSize: '0.75rem',
        fontWeight: 600,
        color: 'var(--primary)',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
      }}
    >
      — Instructeur
    </Typography>
  </Box>
);

export default SchedulePullQuote;

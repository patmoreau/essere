import { Box, Button, Typography } from '@mui/material';

const ScheduleMembershipCta = () => (
  <Box
    component="section"
    sx={{
      bgcolor: 'var(--background)',
      py: { xs: 10, md: 14 },
      px: { xs: 3, md: 6 },
    }}
  >
    <Box
      sx={{
        maxWidth: '72rem',
        mx: 'auto',
        bgcolor: 'var(--surface-container)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'stretch',
      }}
    >
      <Box
        sx={{
          flex: 1,
          p: { xs: 6, md: 8 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--secondary)',
            mb: 2,
          }}
        >
          Abonnements
        </Typography>
        <Typography
          component="h2"
          sx={{
            fontFamily: 'Noto Serif, serif',
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 400,
            lineHeight: 1.2,
            color: 'var(--on-background)',
            mb: 3,
          }}
        >
          Pratiquez sans{' '}
          <Box component="em" sx={{ fontStyle: 'italic', color: 'var(--primary)' }}>
            limites.
          </Box>
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: '1rem',
            color: 'var(--on-surface-variant)',
            lineHeight: 1.7,
            mb: 4,
            maxWidth: '36rem',
          }}
        >
          Accédez à toutes nos séances avec un abonnement mensuel ou annuel. Réservez à l'avance, annulez en toute liberté.
        </Typography>
        <Box>
          <Button
            sx={{
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 600,
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--on-primary)',
              background: 'linear-gradient(135deg, var(--primary), var(--primary-dim))',
              borderRadius: '2rem',
              px: 4,
              py: 1.5,
              boxShadow: 'none',
              '&:hover': {
                opacity: 0.92,
                boxShadow: 'none',
              },
              transition: 'all 300ms ease-out',
            }}
          >
            Explorer les abonnements
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          width: { xs: '100%', md: '38%' },
          minHeight: { xs: '16rem', md: 'auto' },
          position: 'relative',
          overflow: 'hidden',
          bgcolor: 'var(--surface-container-high)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(76,100,75,0.15) 0%, rgba(76,100,75,0.05) 100%)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.12,
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Noto Serif, serif',
              fontSize: '8rem',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'var(--primary)',
              userSelect: 'none',
            }}
          >
            ∞
          </Typography>
        </Box>
      </Box>
    </Box>
  </Box>
);

export default ScheduleMembershipCta;

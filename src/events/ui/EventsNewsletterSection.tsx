import { Box, Button, InputBase, Typography } from '@mui/material';
import { useState } from 'react';

const EventsNewsletterSection = () => {
  const [email, setEmail] = useState('');

  return (
    <Box
      component="section"
      sx={{
        bgcolor: 'background.default',
        py: { xs: 10, md: 16 },
        px: { xs: 3, md: 6 },
        textAlign: 'center',
      }}
    >
      <Box sx={{ maxWidth: '48rem', mx: 'auto' }}>
        <Typography
          component="h2"
          sx={{
            fontFamily: 'Noto Serif, serif',
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontStyle: 'italic',
            fontWeight: 400,
            color: 'secondary.main',
            mb: 3,
          }}
        >
          Soyez les premiers informés.
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Manrope, sans-serif',
            color: 'text.secondary',
            mb: 5,
            maxWidth: '36rem',
            mx: 'auto',
            lineHeight: 1.7,
          }}
        >
          Nos ateliers intensifs et retraites privées affichent souvent complet avant leur annonce
          publique. Rejoignez notre cercle sanctuaire pour un accès prioritaire.
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => e.preventDefault()}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            maxWidth: '32rem',
            mx: 'auto',
          }}
        >
          <InputBase
            type="email"
            placeholder="Adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              flex: 1,
              bgcolor: 'var(--surface-container-high)',
              borderRadius: '9999px',
              px: 3,
              py: 1,
              fontFamily: 'Manrope, sans-serif',
              fontSize: '1rem',
              color: 'text.primary',
              '&.Mui-focused': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: '-2px',
              },
            }}
          />
          <Button
            type="submit"
            sx={{
              bgcolor: 'secondary.main',
              color: 'secondary.contrastText',
              borderRadius: '9999px',
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 700,
              fontSize: '0.75rem',
              px: 4,
              py: 1.5,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              whiteSpace: 'nowrap',
              transition: 'all 300ms ease-out',
              '&:hover': { bgcolor: 'var(--secondary-dim)' },
            }}
          >
            S'abonner
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EventsNewsletterSection;

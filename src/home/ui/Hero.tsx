import {Box, Button, Link, Stack, Typography} from '@mui/material'
import {useHomePage} from "../core/use-home-page.ts";

export default function Hero() {
  const data = useHomePage();

  if (!data) return null;

  return (
    <Box
      component='section'
      sx={{
        minHeight: 'calc(100vh - 104px)',
        display: 'grid',
        gridTemplateColumns: {xs: '1fr', md: '1fr 1fr'},
        alignItems: 'center',
        gap: {xs: 5, md: 8},
        px: {xs: 2, md: 6},
        pb: {xs: 8, md: 10},
      }}
    >
      <Stack spacing={4}>
        <Typography
          variant='overline'
          sx={{
            letterSpacing: '0.15em',
            color: 'secondary.main',
            fontWeight: 600,
          }}
        >
          Est. {data.est_year}
        </Typography>

        <Box component='h1' sx={{m: 0, lineHeight: 1.05, letterSpacing: '-0.02em'}}>
          <Typography
            component='span'
            sx={{
              display: 'block',
              fontFamily: 'Noto Serif, serif',
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            {data.hero_headline_line1}
          </Typography>
          <Typography
            component='span'
            sx={{
              display: 'block',
              fontFamily: 'Noto Serif, serif',
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              fontStyle: 'italic',
              fontWeight: 400,
              color: 'primary.main',
            }}
          >
            {data.hero_headline_line2}
          </Typography>
        </Box>

        <Typography
          sx={{
            fontSize: '1rem',
            fontWeight: 300,
            lineHeight: 1.7,
            color: 'secondary.main',
            maxWidth: '38ch',
          }}
        >
          {data.hero_subheading}
        </Typography>

        <Box sx={{display: 'flex', alignItems: 'center', gap: 3, mt: 1}}>
          <Button
            variant='contained'
            sx={{
              px: 4,
              py: 1.4,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'primary.contrastText',
              background: 'linear-gradient(135deg, #4c644b, #405840)',
              boxShadow: 'none',
              '&:hover': {
                background: 'linear-gradient(135deg, #4c644b, #405840)',
                opacity: 0.92,
                boxShadow: 'none',
              },
            }}
          >
            {data.hero_cta_primary_label}
          </Button>
          <Link
            href='#studio'
            underline='none'
            color='text.primary'
            sx={{fontSize: '0.875rem', fontWeight: 500}}
          >
            {data.hero_cta_secondary_label} →
          </Link>
        </Box>
      </Stack>

      <Box
        sx={{
          backgroundColor: '#ecefe7',
          borderRadius: 3,
          aspectRatio: '4/5',
          overflow: 'hidden',
          boxShadow: '0px 12px 32px rgba(46, 52, 45, 0.06)',
        }}
      />
    </Box>
  );
}

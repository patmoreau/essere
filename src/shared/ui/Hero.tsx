import { Box, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

export type HeroProps = {
  eyebrow?: string;
  headline: string;
  headlineAccent?: string;
  subheading: string;
  imageUrl: string;
  imageAlt?: string;
  actions?: ReactNode;
  floatingCard?: ReactNode;
  fullViewport?: boolean;
};

export default function Hero({
  eyebrow,
  headline,
  headlineAccent,
  subheading,
  imageUrl,
  imageAlt,
  actions,
  floatingCard,
  fullViewport = false,
}: HeroProps) {
  return (
    <Box
      component="section"
      sx={{
        minHeight: fullViewport ? 'calc(100vh - 104px)' : undefined,
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        alignItems: 'center',
        gap: { xs: 5, md: 8 },
        px: { xs: 2, md: 6 },
        pb: { xs: 8, md: 10 },
      }}
    >
      <Stack spacing={4}>
        {eyebrow && (
          <Typography
            variant="overline"
            sx={{ letterSpacing: '0.15em', color: 'secondary.main', fontWeight: 600 }}
          >
            {eyebrow}
          </Typography>
        )}

        <Box component="h1" sx={{ m: 0, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          <Typography
            component="span"
            sx={{
              display: 'block',
              fontFamily: 'Noto Serif, serif',
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              fontWeight: 600,
              color: 'text.primary',
            }}
          >
            {headline}
          </Typography>
          {headlineAccent && (
            <Typography
              component="span"
              sx={{
                display: 'block',
                fontFamily: 'Noto Serif, serif',
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                fontStyle: 'italic',
                fontWeight: 400,
                color: 'primary.main',
              }}
            >
              {headlineAccent}
            </Typography>
          )}
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
          {subheading}
        </Typography>

        {actions}
      </Stack>

      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            backgroundColor: '#ecefe7',
            borderRadius: 3,
            aspectRatio: '4/5',
            overflow: 'hidden',
            boxShadow: '0px 12px 32px rgba(46, 52, 45, 0.06)',
          }}
        >
          {imageUrl ? (
            <Box
              component="img"
              src={imageUrl}
              alt={imageAlt ?? ''}
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #ecefe7 0%, #dee4da 100%)',
              }}
            />
          )}
        </Box>
        {floatingCard}
      </Box>
    </Box>
  );
}

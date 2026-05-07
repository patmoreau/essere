import { Box, Button, Link } from '@mui/material';

import {useLabels} from "../../shared/labels/core/use-labels.ts";
import Hero from '../../shared/ui/Hero.tsx';
import { useHomePage } from '../core/use-home-page.ts';

const HomePage = () => {
  const labels = useLabels();
  const data = useHomePage();

  return (
    <Hero
      eyebrow={`${labels['home.est']} ${data.estYear}`}
      headline={data.heroHeadline}
      headlineAccent={data.heroHeadlineAccent}
      subheading={data.heroSubheading}
      imageUrl={data.heroImage}
      imageAlt={data.heroImageText}
      fullViewport
      actions={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mt: 1 }}>
          <Button
            variant="contained"
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
            {data.heroCtaPrimaryLabel}
          </Button>
          <Link href="/" underline="none" color="text.primary" sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
            {data.heroCtaSecondaryLabel} →
          </Link>
        </Box>
      }
    />
  );
};

export default HomePage;

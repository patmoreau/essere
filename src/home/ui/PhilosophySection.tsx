import { Box, Typography } from '@mui/material';

import PhilosophyCard from './PhilosophyCard.tsx';

type Card = {
  icon: string;
  title: string;
  body: string;
};

type Props = {
  sectionLabel: string;
  card1: Card;
  card2: Card;
};

const PhilosophySection = ({ sectionLabel, card1, card2 }: Props) => (
  <Box
    component="section"
    sx={{
      bgcolor: 'var(--surface-container)',
      py: { xs: 10, md: 16 },
      px: { xs: 3, md: 6 },
    }}
  >
    <Box
      sx={{
        maxWidth: '87.5rem',
        mx: 'auto',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'flex-start',
        gap: { xs: 8, md: 16 },
      }}
    >
      <Box sx={{ flexShrink: 0, width: { xs: '100%', md: '33.333%' } }}>
        <Typography
          component="h2"
          sx={{
            fontFamily: 'Noto Serif, serif',
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 400,
            lineHeight: 1.2,
            color: 'text.primary',
            mb: 4,
          }}
        >
          {sectionLabel}
        </Typography>
        <Box sx={{ width: '5rem', height: '1px', bgcolor: 'divider' }} />
      </Box>

      <Box
        sx={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: { xs: 6, md: 8 },
        }}
      >
        <PhilosophyCard {...card1} />
        <PhilosophyCard {...card2} />
      </Box>
    </Box>
  </Box>
);

export default PhilosophySection;

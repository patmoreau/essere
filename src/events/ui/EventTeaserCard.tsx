import { Box, Typography } from '@mui/material';

import type { Event } from '../core/event.ts';

type Props = {
  headline: string;
  event: Event;
};

const EventTeaserCard = ({ headline, event }: Props) => (
  <Box
    sx={{
      display: { xs: 'none', lg: 'block' },
      position: 'absolute',
      bottom: '-2rem',
      left: '-2rem',
      background: 'rgba(250, 250, 245, 0.90)',
      backdropFilter: 'blur(20px)',
      borderRadius: 'var(--radius-xl)',
      p: 4,
      maxWidth: '18rem',
      boxShadow: '0px 12px 32px rgba(46, 52, 45, 0.06)',
    }}
  >
    <Typography
      sx={{
        fontFamily: 'Noto Serif, serif',
        fontStyle: 'italic',
        color: 'primary.main',
        fontSize: '1.125rem',
        mb: 1,
      }}
    >
      {headline}
    </Typography>
    <Typography
      sx={{
        fontFamily: 'Manrope, sans-serif',
        fontSize: '0.875rem',
        color: 'secondary.main',
        lineHeight: 1.5,
      }}
    >
      {event.title} —{' '}
      {event.description.length > 80
        ? `${event.description.slice(0, 80)}…`
        : event.description}
    </Typography>
  </Box>
);

export default EventTeaserCard;

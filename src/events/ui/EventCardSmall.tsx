import { Box, Button, Typography } from '@mui/material';

import type { Event } from '../core/event.ts';
import { formatEventDateRange } from '../core/format-event-date.ts';

type Props = {
  event: Event;
  ctaLabel: string;
  variant?: 'default' | 'featured';
};

const EventCardSmall = ({ event, ctaLabel, variant = 'default' }: Props) => (
  <Box
    component="article"
    sx={{
      gridColumn: { md: 'span 4' },
      bgcolor: variant === 'featured' ? 'background.paper' : 'var(--surface-container-highest)',
      border: variant === 'featured' ? '1px solid rgba(174, 180, 170, 0.1)' : 'none',
      borderRadius: 'var(--radius-xl)',
      p: 4,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      '& img': { transition: 'transform 700ms ease-out' },
      '&:hover img': { transform: 'scale(1.05)' },
    }}
  >
    <Box>
      <Box
        sx={{ aspectRatio: '1/1', borderRadius: 'var(--radius-md)', overflow: 'hidden', mb: 3 }}
      >
        <Box
          component="img"
          src={event.imageUrl}
          alt={event.title}
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
      <Typography
        sx={{
          fontFamily: 'Manrope, sans-serif',
          fontSize: '0.75rem',
          color: 'secondary.main',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          mb: 1,
        }}
      >
        {event.category} · {formatEventDateRange(event.dateStart, event.dateEnd)}
      </Typography>
      <Typography
        component="h3"
        sx={{
          fontFamily: 'Noto Serif, serif',
          fontSize: '1.5rem',
          fontWeight: 400,
          color: 'text.primary',
          mb: 1.5,
        }}
      >
        {event.title}
      </Typography>
      <Typography
        sx={{
          fontFamily: 'Manrope, sans-serif',
          fontSize: '0.875rem',
          color: 'text.secondary',
          lineHeight: 1.6,
        }}
      >
        {event.description}
      </Typography>
    </Box>
    <Button
      component="a"
      href={event.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        mt: 4,
        ...(variant === 'featured'
          ? {
              background: 'linear-gradient(135deg, #4c644b, #405840)',
              color: 'primary.contrastText',
              '&:hover': { opacity: 0.9, background: 'linear-gradient(135deg, #4c644b, #405840)' },
            }
          : {
              bgcolor: 'background.paper',
              color: 'text.primary',
              '&:hover': { bgcolor: '#ffffff', boxShadow: '0px 4px 12px rgba(46, 52, 45, 0.08)' },
            }),
        borderRadius: '9999px',
        fontFamily: 'Manrope, sans-serif',
        fontWeight: 700,
        fontSize: '0.875rem',
        px: 3,
        py: 1.5,
        alignSelf: 'flex-start',
        transition: 'all 300ms ease-out',
      }}
    >
      {ctaLabel}
    </Button>
  </Box>
);

export default EventCardSmall;

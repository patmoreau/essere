import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Button, Stack, Typography } from '@mui/material';

import type { Event } from '../core/event.ts';
import { formatEventDateRange } from '../core/format-event-date.ts';

const categoryLabel: Record<Event['category'], string> = {
  Intensive: 'Intensif',
  Workshop: 'Atelier',
  'Guest Event': 'Événement Invité',
  Retreat: 'Retraite',
};

type Props = { event: Event };

const EventCardLarge = ({ event }: Props) => (
  <Box
    component="article"
    sx={{
      gridColumn: { md: 'span 8' },
      bgcolor: 'background.paper',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      transition: 'all 300ms ease-out',
      '& img': { transition: 'transform 700ms ease-out' },
      '&:hover img': { transform: 'scale(1.05)' },
    }}
  >
    <Box
      sx={{
        width: { xs: '100%', md: '50%' },
        overflow: 'hidden',
        height: { xs: '16rem', md: 'auto' },
        flexShrink: 0,
      }}
    >
      <Box
        component="img"
        src={event.imageUrl}
        alt={event.title}
        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </Box>
    <Stack sx={{ flex: 1, p: { xs: 4, md: 5 }, justifyContent: 'space-between' }}>
      <Box>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Box
            component="span"
            sx={{
              bgcolor: 'var(--primary-container)',
              color: 'var(--on-primary-container)',
              px: 1.5,
              py: 0.5,
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              fontFamily: 'Manrope, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {categoryLabel[event.category]}
          </Box>
          <Typography
            sx={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: '0.875rem',
              color: 'secondary.main',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            {formatEventDateRange(event.dateStart, event.dateEnd)}
          </Typography>
        </Stack>
        <Typography
          component="h3"
          sx={{
            fontFamily: 'Noto Serif, serif',
            fontSize: '1.75rem',
            fontWeight: 400,
            lineHeight: 1.3,
            color: 'text.primary',
            mb: 2,
          }}
        >
          {event.title}
        </Typography>
        <Typography
          sx={{ fontFamily: 'Manrope, sans-serif', color: 'text.secondary', lineHeight: 1.7, mb: 3 }}
          dangerouslySetInnerHTML={{__html: event.description}}
        />
      </Box>
      <Button
        component="a"
        href={event.bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        endIcon={<ArrowForwardIcon />}
        sx={{
          fontFamily: 'Manrope, sans-serif',
          fontWeight: 700,
          color: 'primary.main',
          p: 0,
          alignSelf: 'flex-start',
          minWidth: 0,
          bgcolor: 'transparent',
          '&:hover': {
            bgcolor: 'transparent',
            '& .MuiButton-endIcon': { transform: 'translateX(4px)' },
          },
          '& .MuiButton-endIcon': { transition: 'transform 300ms ease-out' },
        }}
      >
        En savoir plus
      </Button>
    </Stack>
  </Box>
);

export default EventCardLarge;

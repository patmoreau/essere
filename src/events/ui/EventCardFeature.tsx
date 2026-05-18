import { Box, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';

import { useLabels } from '../../shared/labels/core/use-labels.ts';
import type { Event } from '../core/event.ts';
import { formatEventDateRange } from '../core/format-event-date.ts';
import EventRegistrationModal from './EventRegistrationModal.tsx';

type Props = { event: Event };

const EventCardFeature = ({ event }: Props) => {
  const labels = useLabels();
  const [modalOpen, setModalOpen] = useState(false);

  const handleRegister = () => {
    if (event.bookingUrl) {
      window.open(event.bookingUrl, '_blank', 'noopener,noreferrer');
    } else {
      setModalOpen(true);
    }
  };

  return (
    <>
      <Box
        component="article"
        sx={{
          gridColumn: { md: 'span 12' },
          bgcolor: 'primary.main',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 6, md: 8 },
          textAlign: 'center',
        }}
      >
        <Box
          component="img"
          src={event.imageUrl}
          alt=""
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.2,
            mixBlendMode: 'overlay',
            pointerEvents: 'none',
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: '32rem' }}>
          <Typography
            component="h2"
            sx={{
              fontFamily: 'Noto Serif, serif',
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 400,
              color: 'primary.contrastText',
              mb: 3,
            }}
          >
            {event.title}
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Manrope, sans-serif',
              color: 'rgba(229, 255, 224, 0.8)',
              mb: 4,
              lineHeight: 1.7,
            }}
            dangerouslySetInnerHTML={{ __html: event.description }}
          />
          <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" sx={{ mb: 5 }}>
            <Box
              component="span"
              sx={{
                background: 'rgba(229, 255, 224, 0.1)',
                backdropFilter: 'blur(8px)',
                color: 'primary.contrastText',
                border: '1px solid rgba(229, 255, 224, 0.2)',
                px: 2,
                py: 1,
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontFamily: 'Manrope, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              {formatEventDateRange(event.dateStart, event.dateEnd)}
            </Box>
            {event.location && (
              <Box
                component="span"
                sx={{
                  background: 'rgba(229, 255, 224, 0.1)',
                  backdropFilter: 'blur(8px)',
                  color: 'primary.contrastText',
                  border: '1px solid rgba(229, 255, 224, 0.2)',
                  px: 2,
                  py: 1,
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontFamily: 'Manrope, sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {event.location}
              </Box>
            )}
          </Stack>
          <Button
            onClick={handleRegister}
            sx={{
              bgcolor: 'primary.contrastText',
              color: 'primary.main',
              borderRadius: '9999px',
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 700,
              px: 5,
              py: 2,
              transition: 'all 300ms ease-out',
              '&:hover': { transform: 'scale(1.05)', bgcolor: 'primary.light' },
            }}
          >
            {labels['button_register']}
          </Button>
        </Box>
      </Box>
      {!event.bookingUrl && (
        <EventRegistrationModal open={modalOpen} event={event} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
};

export default EventCardFeature;

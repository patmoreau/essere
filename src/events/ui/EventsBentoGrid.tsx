import { Box } from '@mui/material';

import type { Event } from '../core/event.ts';
import EventCardFeature from './EventCardFeature.tsx';
import EventCardLarge from './EventCardLarge.tsx';
import EventCardSmall from './EventCardSmall.tsx';

type Props = {
  events: Event[];
};

const EventsBentoGrid = ({ events }: Props) => {
  const [card1, card2, card3, card4] = events;

  return (
    <Box
      component="section"
      sx={{ bgcolor: 'var(--surface-container-low)', py: { xs: 8, md: 12 } }}
    >
      <Box
        sx={{
          maxWidth: '87.5rem',
          mx: 'auto',
          px: { xs: 3, md: 6 },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' },
          gap: 4,
        }}
      >
        {card1 && <EventCardLarge event={card1} />}
        {card2 && <EventCardSmall event={card2} ctaLabel="Réserver" />}
        {card3 && <EventCardSmall event={card3} ctaLabel="En savoir plus" variant="featured" />}
        {card4 && <EventCardFeature event={card4} />}
      </Box>
    </Box>
  );
};

export default EventsBentoGrid;

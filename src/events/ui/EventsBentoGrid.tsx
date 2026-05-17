import { Box } from '@mui/material';

import type { Event } from '../core/event.ts';
import EventCardFeature from './EventCardFeature.tsx';
import EventCardLarge from './EventCardLarge.tsx';
import EventCardSmall from './EventCardSmall.tsx';

type Props = {
  events: Event[];
};

const isLargeCard = (index: number): boolean => {
  const pairIndex = Math.floor(index / 2);
  const isFirstInPair = index % 2 === 0;
  const isLargeFirst = pairIndex % 2 === 0;
  return isLargeFirst ? isFirstInPair : !isFirstInPair;
};

const EventsBentoGrid = ({ events }: Props) => {
  let nonFeaturedIndex = 0;

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
        {events.map(event => {
          if (event.featured) {
            return <EventCardFeature key={event.id} event={event} />;
          }
          const i = nonFeaturedIndex++;
          return isLargeCard(i) ? (
            <EventCardLarge key={event.id} event={event} />
          ) : (
            <EventCardSmall key={event.id} event={event} />
          );
        })}
      </Box>
    </Box>
  );
};

export default EventsBentoGrid;

import { Box } from '@mui/material';

import Hero from '../../shared/ui/Hero.tsx';
import { useEvents } from '../core/use-events.ts';
import { useEventsPage } from '../core/use-events-page.ts';
import EventsBentoGrid from './EventsBentoGrid.tsx';
import EventsNewsletterSection from './EventsNewsletterSection.tsx';
import EventTeaserCard from './EventTeaserCard.tsx';

const EventsPage = () => {
  const eventsPage = useEventsPage();
  const events = useEvents();
  const featuredEvent = events.find(e => e.featured);

  return (
    <Box>
      <Hero
        eyebrow={eventsPage.heroEyebrow}
        headline={eventsPage.heroHeadline}
        headlineAccent={eventsPage.heroHeadlineAccent}
        subheading={eventsPage.heroSubheading}
        imageUrl={events[0]?.imageUrl ?? ''}
        imageAlt={events[0]?.title}
        floatingCard={
          featuredEvent && (
            <EventTeaserCard headline={eventsPage.eventFeaturedHeadline} event={featuredEvent} />
          )
        }
      />
      <EventsBentoGrid events={events} />
      <EventsNewsletterSection />
    </Box>
  );
};

export default EventsPage;

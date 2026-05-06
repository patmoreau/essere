import { Box } from '@mui/material';

import Hero from '../../shared/ui/Hero.tsx';
import { useEvents } from '../core/use-events.ts';
import EventsBentoGrid from './EventsBentoGrid.tsx';
import EventsNewsletterSection from './EventsNewsletterSection.tsx';
import EventTeaserCard from './EventTeaserCard.tsx';

const EventsPage = () => {
  const events = useEvents();
  const featuredEvent = events.find((e) => e.featured);

  return (
    <Box>
      <Hero
        eyebrow="Expériences Raffinées"
        headline="Rassemblements"
        headlineAccent="pour l'Âme."
        subheading="Nos ateliers et retraites soigneusement conçus comblent le fossé entre mouvement et pleine conscience, organisés dans nos espaces les plus sereins."
        imageUrl={events[0]?.imageUrl ?? ''}
        imageAlt={events[0]?.title}
        floatingCard={featuredEvent && <EventTeaserCard headline='Prochaine Retraite Signature' event={featuredEvent} />}
      />
      <EventsBentoGrid events={events} />
      <EventsNewsletterSection />
    </Box>
  );
};

export default EventsPage;

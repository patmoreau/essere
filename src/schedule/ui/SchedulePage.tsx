import { Box } from '@mui/material';
import { useState } from 'react';

import Hero from '../../shared/ui/Hero.tsx';
import { addDays, getWeekStart } from '../core/schedule-utils.ts';
import { useClassesPage } from '../core/use-classes-page.ts';
import { useScheduleClasses } from '../core/use-schedule-classes.ts';
import ScheduleFilterBar, { type ScheduleFilter } from './ScheduleFilterBar.tsx';
import ScheduleMembershipCta from './ScheduleMembershipCta.tsx';
import SchedulePullQuote from './SchedulePullQuote.tsx';
import ScheduleWeekGrid from './ScheduleWeekGrid.tsx';

const SchedulePage = () => {
  const page = useClassesPage();
  const classes = useScheduleClasses();
  const [activeFilter, setActiveFilter] = useState<ScheduleFilter>('All');
  const [weekStart, setWeekStart] = useState<Date>(() => getWeekStart(new Date()));

  const filteredClasses =
    activeFilter === 'All' ? classes : classes.filter(c => c.category === activeFilter);

  const handlePrevWeek = () => setWeekStart(d => addDays(d, -7));
  const handleNextWeek = () => setWeekStart(d => addDays(d, 7));

  return (
    <Box>
      <Hero
        eyebrow={page.heroEyebrow}
        headline={page.heroHeadline}
        headlineAccent={page.heroHeadlineAccent}
        subheading={page.heroSubheading}
        imageUrl={page.heroImage}
        floatingCard={<SchedulePullQuote headline={page.classesFeaturedHeadline} />}
      />

      <ScheduleFilterBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        weekStart={weekStart}
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
      />

      <Box
        component="section"
        sx={{
          bgcolor: 'var(--surface-container-low)',
          py: { xs: 6, md: 10 },
          px: { xs: 3, md: 6 },
        }}
      >
        <ScheduleWeekGrid classes={filteredClasses} weekStart={weekStart} />
      </Box>

      <ScheduleMembershipCta />
    </Box>
  );
};

export default SchedulePage;

import { Box } from '@mui/material';

import type { ScheduleClass } from '../core/schedule-class.ts';
import {
  addDays,
  type DayOfWeek,
  DAYS_OF_WEEK,
  getDayOfWeek,
  isActiveInWeek,
} from '../core/schedule-utils.ts';
import ScheduleDayColumn from './ScheduleDayColumn.tsx';

type Props = {
  classes: ScheduleClass[];
  weekStart: Date;
};

const ScheduleWeekGrid = ({ classes, weekStart }: Props) => {
  const activeClasses = classes.filter(c => isActiveInWeek(c, weekStart));

  return (
    <Box sx={{ overflowX: 'auto', pb: 2 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 2,
          minWidth: '980px',
        }}
      >
        {DAYS_OF_WEEK.map((day, i) => {
          const date = addDays(weekStart, i);
          const dayClasses = activeClasses.filter(
            c => getDayOfWeek(c.startDate) === (day as DayOfWeek),
          );
          return (
            <ScheduleDayColumn key={day} day={day as DayOfWeek} date={date} classes={dayClasses} />
          );
        })}
      </Box>
    </Box>
  );
};

export default ScheduleWeekGrid;

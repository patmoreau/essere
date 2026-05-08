import { Box, Typography } from '@mui/material';

import type { ScheduleClass } from '../core/schedule-class.ts';
import { DAY_LABELS_FR, type DayOfWeek, formatDayDate } from '../core/schedule-utils.ts';
import ScheduleClassCard from './ScheduleClassCard.tsx';

type Props = {
  day: DayOfWeek;
  date: Date;
  classes: ScheduleClass[];
};

const ScheduleDayColumn = ({ day, date, classes }: Props) => (
  <Box sx={{ minWidth: 0 }}>
    <Box
      sx={{
        pb: 2,
        mb: 2,
        borderBottom: '1px solid var(--outline-variant)',
        textAlign: 'center',
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Manrope, sans-serif',
          fontSize: '0.75rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--on-surface-variant)',
        }}
      >
        {DAY_LABELS_FR[day]}
      </Typography>
      <Typography
        sx={{
          fontFamily: 'Manrope, sans-serif',
          fontSize: '0.8125rem',
          color: 'var(--on-surface-variant)',
          mt: 0.25,
        }}
      >
        {formatDayDate(date)}
      </Typography>
    </Box>

    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {classes.length === 0 ? (
        <Box
          sx={{
            height: '4rem',
            borderRadius: 'var(--radius-md)',
            border: '1px dashed var(--outline-variant)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: '0.6875rem',
              fontFamily: 'Manrope, sans-serif',
              color: 'var(--outline-variant)',
            }}
          >
            Repos
          </Typography>
        </Box>
      ) : (
        classes.map((cls) => (
          <ScheduleClassCard key={cls.id} scheduleClass={cls} />
        ))
      )}
    </Box>
  </Box>
);

export default ScheduleDayColumn;

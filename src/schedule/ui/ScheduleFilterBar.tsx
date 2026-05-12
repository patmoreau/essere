import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, IconButton, Typography } from '@mui/material';

import type { ScheduleClass } from '../core/schedule-class.ts';
import { formatWeekRange } from '../core/schedule-utils.ts';

export type ScheduleFilter = ScheduleClass['category'] | 'All';

type Props = {
  activeFilter: ScheduleFilter;
  onFilterChange: (filter: ScheduleFilter) => void;
  weekStart: Date;
  onPrevWeek: () => void;
  onNextWeek: () => void;
};

const FILTERS: { value: ScheduleFilter; label: string }[] = [
  { value: 'All', label: 'Toutes les séances' },
  { value: 'Yoga', label: 'Yoga' },
  { value: 'Pilates', label: 'Pilates' },
  { value: 'Meditation', label: 'Méditation' },
];

const ScheduleFilterBar = ({
  activeFilter,
  onFilterChange,
  weekStart,
  onPrevWeek,
  onNextWeek,
}: Props) => (
  <Box
    sx={{
      position: 'sticky',
      top: { xs: 56, md: 64 },
      zIndex: 10,
      bgcolor: 'var(--background)',
      borderBottom: '1px solid rgba(174,180,170,0.30)',
      px: { xs: 3, md: 6 },
      py: 2,
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      alignItems: { xs: 'stretch', sm: 'center' },
      justifyContent: 'space-between',
      gap: 2,
    }}
  >
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {FILTERS.map(({ value, label }) => {
        const isActive = activeFilter === value;
        return (
          <Box
            key={value}
            component="button"
            onClick={() => onFilterChange(value)}
            sx={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: '0.8125rem',
              fontWeight: isActive ? 600 : 400,
              color: isActive ? 'var(--on-primary)' : 'var(--on-surface-variant)',
              bgcolor: isActive ? 'var(--primary)' : 'transparent',
              border: `1px solid ${isActive ? 'var(--primary)' : 'var(--outline-variant)'}`,
              borderRadius: '2rem',
              px: 2,
              py: 0.75,
              cursor: 'pointer',
              transition: 'all 300ms ease-out',
              '&:hover': {
                borderColor: 'var(--primary)',
                color: isActive ? 'var(--on-primary)' : 'var(--primary)',
              },
            }}
          >
            {label}
          </Box>
        );
      })}
    </Box>

    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
      <IconButton size="small" onClick={onPrevWeek} sx={{ color: 'var(--on-surface-variant)' }}>
        <ChevronLeftIcon fontSize="small" />
      </IconButton>
      <Typography
        sx={{
          fontFamily: 'Manrope, sans-serif',
          fontSize: '0.8125rem',
          color: 'var(--on-surface)',
          minWidth: '12rem',
          textAlign: 'center',
        }}
      >
        {formatWeekRange(weekStart)}
      </Typography>
      <IconButton size="small" onClick={onNextWeek} sx={{ color: 'var(--on-surface-variant)' }}>
        <ChevronRightIcon fontSize="small" />
      </IconButton>
    </Box>
  </Box>
);

export default ScheduleFilterBar;

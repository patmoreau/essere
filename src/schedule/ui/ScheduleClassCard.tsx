import { Box, Button, Typography } from '@mui/material';

import { useLabels } from '../../shared/labels/core/use-labels.ts';
import type { ScheduleClass } from '../core/schedule-class.ts';
import { CATEGORY_COLORS, CATEGORY_LABELS_FR } from '../core/schedule-utils.ts';

type Props = {
  scheduleClass: ScheduleClass;
};

const CATEGORY_BG: Record<ScheduleClass['category'], string> = {
  Yoga: 'rgba(206,234,202,0.35)',
  Pilates: 'rgba(242,223,208,0.55)',
  Meditation: 'rgba(98,95,83,0.07)',
};

const ScheduleClassCard = ({ scheduleClass }: Props) => {
  const labels = useLabels();
  const categoryColor = CATEGORY_COLORS[scheduleClass.category];

  return (
    <Box
      sx={{
        bgcolor: CATEGORY_BG[scheduleClass.category],
        borderRadius: 'var(--radius-md)',
        p: 2,
        transition: 'all 300ms ease-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 24px rgba(46,52,45,0.08)',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
          gap: 0.25,
        }}
      >
        <Typography
          sx={{
            fontSize: '0.6875rem',
            fontWeight: 600,
            fontFamily: 'Manrope, sans-serif',
            color: categoryColor,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          {CATEGORY_LABELS_FR[scheduleClass.category]}
        </Typography>
        <Typography
          sx={{
            fontSize: '0.6875rem',
            fontFamily: 'Manrope, sans-serif',
            color: 'var(--on-surface-variant)',
            whiteSpace: 'nowrap',
          }}
        >
          {scheduleClass.startTime} – {scheduleClass.endTime}
        </Typography>
      </Box>

      <Typography
        sx={{
          fontFamily: 'Noto Serif, serif',
          fontSize: '0.9375rem',
          fontWeight: 400,
          color: 'var(--on-surface)',
          lineHeight: 1.3,
          mb: 0.75,
        }}
      >
        {scheduleClass.title}
      </Typography>

      <Typography
        sx={{
          fontSize: '0.75rem',
          fontFamily: 'Manrope, sans-serif',
          color: 'var(--on-surface-variant)',
          mb: 1.5,
        }}
      >
        {scheduleClass.instructorName}
      </Typography>

      {scheduleClass.full ? (
        <Button
          disabled
          size="small"
          sx={{
            fontSize: '0.6875rem',
            fontFamily: 'Manrope, sans-serif',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            px: 1.5,
            py: 0.5,
            borderRadius: 'var(--radius-md)',
          }}
        >
          {labels['button_full']}
        </Button>
      ) : (
        scheduleClass.bookingUrl && (
          <Button
            component="a"
            href={scheduleClass.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            sx={{
              fontSize: '0.6875rem',
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--primary)',
              px: 1.5,
              py: 0.5,
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--primary)',
              '&:hover': {
                bgcolor: 'var(--primary)',
                color: 'var(--on-primary)',
              },
              transition: 'all 300ms ease-out',
            }}
          >
            Réserver
          </Button>
        )
      )}
    </Box>
  );
};

export default ScheduleClassCard;

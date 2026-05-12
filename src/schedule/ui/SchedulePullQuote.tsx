import { Box, Typography } from '@mui/material';

type Props = {
  headline: string;
};

const SchedulePullQuote = ({ headline }: Props) => (
  <Box
    sx={{
      position: 'absolute',
      bottom: '1.5rem',
      left: { xs: '1rem', md: '-1.5rem' },
      width: '18rem',
      bgcolor: 'rgba(250,250,245,0.92)',
      backdropFilter: 'blur(16px)',
      borderRadius: 'var(--radius-md)',
      p: 3,
      boxShadow: '0 12px 40px rgba(46,52,45,0.12)',
      zIndex: 2,
    }}
  >
    <Typography
      sx={{
        fontFamily: 'Noto Serif, serif',
        fontSize: '1rem',
        fontStyle: 'italic',
        lineHeight: 1.5,
        color: 'var(--on-surface)',
      }}
    >
      <Box
        component="span"
        sx={{
          fontSize: '1.5rem',
          color: 'var(--primary)',
          fontStyle: 'normal',
          userSelect: 'none',
        }}
      >
        "
      </Box>
      {headline}
      <Box
        component="span"
        sx={{
          fontSize: '1.5rem',
          color: 'var(--primary)',
          fontStyle: 'normal',
          userSelect: 'none',
        }}
      >
        "
      </Box>
    </Typography>
  </Box>
);

export default SchedulePullQuote;

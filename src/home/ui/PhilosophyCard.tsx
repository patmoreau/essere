import { Box, Typography } from '@mui/material';

import DynamicMuiIcon from '../../shared/ui/DynamicMuiIcon.tsx';

type Props = {
  icon: string;
  title: string;
  body: string;
};

const PhilosophyCard = ({ icon, title, body }: Props) => (
  <Box>
    <DynamicMuiIcon name={icon} sx={{ fontSize: '2.5rem', color: 'primary.main', mb: 3 }} />
    <Typography
      component="h3"
      sx={{
        fontFamily: 'Manrope, sans-serif',
        fontWeight: 700,
        fontSize: '1.125rem',
        color: 'text.primary',
        mb: 2,
      }}
    >
      {title}
    </Typography>
    <Typography
      sx={{
        fontFamily: 'Manrope, sans-serif',
        fontSize: '1rem',
        color: 'text.secondary',
        lineHeight: 1.7,
      }}
    >
      {body}
    </Typography>
  </Box>
);

export default PhilosophyCard;

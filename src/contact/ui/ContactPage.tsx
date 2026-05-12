import { Box } from '@mui/material';

import ConnectWithUsCard from './ConnectWithUsCard';
import InstructorsSection from './InstructorsSection';

const ContactPage = () => {
  return (
    <>
      <InstructorsSection />
      <Box
        component="section"
        sx={{
          bgcolor: 'var(--surface-container-low)',
          py: { xs: 10, md: 16 },
          px: { xs: 2, md: 6 },
        }}
      >
        <Box sx={{ maxWidth: '1400px', mx: 'auto' }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '7fr 5fr' },
              gap: 4,
            }}
          >
            <ConnectWithUsCard />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ContactPage;

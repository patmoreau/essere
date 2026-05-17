import { Box } from '@mui/material';

import { useInstructors } from '../core/use-instructors.ts';
import InstructorCard from './InstructorCard.tsx';

const InstructorsPage = () => {
  const instructors = useInstructors();

  return (
    <Box
      component="section"
      sx={{
        bgcolor: 'var(--background)',
        py: { xs: 10, md: 16 },
        px: { xs: 3, md: 6 },
      }}
    >
      <Box
        sx={{
          maxWidth: '1400px',
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 12, md: 20 },
        }}
      >
        {instructors.map((instructor, index) => (
          <InstructorCard key={instructor.id} instructor={instructor} imageLeft={index % 2 === 0} />
        ))}
      </Box>
    </Box>
  );
};

export default InstructorsPage;

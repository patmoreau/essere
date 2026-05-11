import { Box, Typography } from '@mui/material';

import type { Instructor } from '../core/instructor.ts';

type InstructorCardProps = {
  instructor: Instructor;
  imageLeft: boolean;
};

const InstructorCard = ({ instructor, imageLeft }: InstructorCardProps) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' },
        gap: { xs: 6, md: 12 },
        alignItems: 'center',
      }}
    >
      <Box sx={{ order: { xs: 0, md: imageLeft ? 0 : 1 }, position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            top: -24,
            left: imageLeft ? -24 : 'auto',
            right: imageLeft ? 'auto' : -24,
            width: 128,
            height: 128,
            bgcolor: 'var(--secondary-container)',
            borderRadius: '50%',
            mixBlendMode: 'multiply',
            opacity: 0.4,
          }}
        />
        <Box
          component="img"
          src={instructor.pictureUrl}
          alt={instructor.name}
          sx={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            aspectRatio: '4 / 5',
            objectFit: 'cover',
            borderRadius: 'var(--radius-xl)',
            boxShadow: '0px 24px 48px rgba(46, 52, 45, 0.08)',
          }}
        />
      </Box>

      <Box sx={{ order: { xs: 1, md: imageLeft ? 1 : 0 } }}>
        {instructor.title && (
          <Typography
            sx={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: 'var(--primary)',
              mb: 2,
            }}
          >
            {instructor.title}
          </Typography>
        )}

        <Typography
          component="h2"
          sx={{
            fontFamily: 'Noto Serif, serif',
            fontSize: { xs: '3rem', md: '4.5rem', lg: '5.5rem' },
            fontWeight: 400,
            letterSpacing: '-0.02em',
            color: 'var(--on-background)',
            lineHeight: 1,
            mb: 5,
            ml: '-2px',
          }}
        >
          {instructor.name}
        </Typography>

        <Box
          dangerouslySetInnerHTML={{ __html: instructor.description }}
          sx={{
            color: 'var(--on-surface-variant)',
            fontFamily: 'Manrope, sans-serif',
            fontSize: '1.05rem',
            lineHeight: 1.8,
            maxWidth: '52ch',
            '& p': { m: 0, mb: 3 },
            '& p:last-child': { mb: 0 },
            '& strong': { color: 'var(--on-surface)', fontWeight: 600 },
            '& em': { fontStyle: 'italic' },
            '& ul, & ol': { pl: 3, mb: 3 },
            '& li': { mb: 1 },
          }}
        />
      </Box>
    </Box>
  );
};

export default InstructorCard;

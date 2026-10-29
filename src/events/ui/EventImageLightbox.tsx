import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, IconButton } from '@mui/material';

import { useLabels } from '../../shared/labels/core/use-labels.ts';

type Props = {
  open: boolean;
  src: string;
  alt: string;
  onClose: () => void;
};

const EventImageLightbox = ({ open, src, alt, onClose }: Props) => {
  const labels = useLabels();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      slotProps={{
        paper: {
          sx: {
            bgcolor: 'var(--background)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            m: 2,
            position: 'relative',
          },
        },
      }}
    >
      <IconButton
        onClick={onClose}
        aria-label={labels['events.image_close'] ?? 'Fermer'}
        sx={{
          position: 'absolute',
          top: 12,
          right: 12,
          bgcolor: 'rgba(250, 250, 245, 0.8)',
          backdropFilter: 'blur(20px)',
          color: 'var(--on-surface)',
          '&:hover': { bgcolor: 'var(--background)' },
        }}
      >
        <CloseIcon />
      </IconButton>
      <Box
        component="img"
        src={src}
        alt={alt}
        sx={{
          display: 'block',
          maxWidth: 'calc(100vw - 32px)',
          maxHeight: 'calc(100vh - 32px)',
          objectFit: 'contain',
        }}
      />
    </Dialog>
  );
};

export default EventImageLightbox;

import { ButtonBase, type SxProps, type Theme } from '@mui/material';
import { useState } from 'react';

import { useLabels } from '../../shared/labels/core/use-labels.ts';
import BlurFillImage from '../../shared/ui/BlurFillImage.tsx';
import EventImageLightbox from './EventImageLightbox.tsx';

type Props = {
  src: string;
  alt: string;
  sx?: SxProps<Theme>;
};

const EventImage = ({ src, alt, sx }: Props) => {
  const labels = useLabels();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <ButtonBase
        onClick={() => setLightboxOpen(true)}
        aria-label={`${labels['events.image_enlarge'] ?? 'Agrandir l’image'} : ${alt}`}
        sx={[
          { display: 'block', position: 'relative', overflow: 'hidden', cursor: 'zoom-in' },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <BlurFillImage src={src} alt="" />
      </ButtonBase>
      <EventImageLightbox
        open={lightboxOpen}
        src={src}
        alt={alt}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
};

export default EventImage;

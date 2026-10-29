import { Box } from '@mui/material';

const fillFrame = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
} as const;

type Props = {
  src: string;
  alt: string;
};

// Shows the whole image uncropped; a blurred, enlarged copy fills the leftover space.
// The parent must be positioned and sized (e.g. `position: relative` + aspect ratio).
const BlurFillImage = ({ src, alt }: Props) => (
  <>
    <Box
      component="img"
      src={src}
      alt=""
      aria-hidden="true"
      sx={{
        ...fillFrame,
        objectFit: 'cover',
        filter: 'blur(24px) saturate(1.1)',
        transform: 'scale(1.2)',
        opacity: 0.85,
      }}
    />
    <Box component="img" src={src} alt={alt} sx={{ ...fillFrame, objectFit: 'contain' }} />
  </>
);

export default BlurFillImage;

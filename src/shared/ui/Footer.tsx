import { Box, Stack, Typography } from '@mui/material';

import { useLabels } from '../labels/core/use-labels.ts';

const FooterLink = ({ href, children }: { href: string; children: string }) => (
  <Box
    component="a"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    sx={{
      fontFamily: 'Manrope, sans-serif',
      fontSize: '0.875rem',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'text.secondary',
      textDecoration: 'none',
      transition: 'color 300ms ease-out',
      '&:hover': { color: 'primary.main' },
    }}
  >
    {children}
  </Box>
);

const FooterColumnHeading = ({ children }: { children: string }) => (
  <Typography
    sx={{
      fontFamily: 'Manrope, sans-serif',
      fontSize: '0.75rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'primary.main',
    }}
  >
    {children}
  </Typography>
);

const Footer = () => {
  const labels = useLabels();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.default',
        py: { xs: 8, md: 10 },
        px: { xs: 3, md: 6 },
      }}
    >
      <Box
        sx={{
          maxWidth: '87.5rem',
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: { xs: 6, md: 12 },
        }}
      >
        <Stack gap={3}>
          <Typography
            sx={{
              fontFamily: 'Noto Serif, serif',
              fontSize: '1.25rem',
              letterSpacing: '-0.02em',
              color: 'secondary.main',
            }}
          >
            {labels['footer.brand_title']}
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: '0.875rem',
              color: 'text.secondary',
              lineHeight: 1.6,
            }}
          >
            {labels['footer.tagline']}
          </Typography>
        </Stack>

        <Stack gap={3}>
          <FooterColumnHeading>
            {labels['footer.connect_label'] ?? 'Connexion'}
          </FooterColumnHeading>
          <Stack component="nav" gap={2}>
            <FooterLink href={labels['footer.instagram_url'] ?? '#'}>
              {labels['footer.instagram_label'] ?? 'Instagram'}
            </FooterLink>
            <FooterLink href={labels['footer.facebook_url']}>
              {labels['footer.facebook_label'] ?? 'Facebook'}
            </FooterLink>
          </Stack>
        </Stack>

        <Stack gap={3}>
          <FooterColumnHeading>
            {labels['footer.legal_label'] ?? 'Légal'}
          </FooterColumnHeading>
          <Stack component="nav" gap={2}>
            <FooterLink href={labels['footer.privacy_url'] ?? '#'}>
              {labels['footer.privacy_label'] ?? 'Politique de confidentialité'}
            </FooterLink>
            <Typography
              sx={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'text.secondary',
                mt: 2,
              }}
            >
              © {new Date().getFullYear()} {labels['footer.brand_title']}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;

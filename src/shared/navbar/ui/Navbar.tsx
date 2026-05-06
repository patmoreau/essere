import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Link,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import { useLabels } from '../../labels/core/use-labels.ts';
import { useNavLinks } from '../core/use-nav-links.ts';

export default function Navbar() {
  const labels = useLabels();
  const links = useNavLinks();
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        color="transparent"
        sx={{
          background: 'rgba(250,250,245,0.80)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 6 }, py: 2.5 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontFamily: 'Noto Serif, serif', color: 'text.primary' }}
          >
            {labels['nav.title']}
          </Typography>

          <Box component="nav" sx={{ display: { xs: 'none', md: 'flex' }, gap: 5 }}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                underline="none"
                color="text.primary"
                sx={{ fontSize: '0.875rem', fontWeight: 500, '&:hover': { opacity: 0.72 } }}
              >
                {link.label}
              </Link>
            ))}
          </Box>

          <Button
            variant="contained"
            sx={{
              display: { xs: 'none', md: 'inline-flex' },
              px: 3,
              py: 1.1,
              color: 'primary.contrastText',
              background: 'linear-gradient(135deg, #4c644b, #405840)',
              boxShadow: 'none',
              '&:hover': {
                background: 'linear-gradient(135deg, #4c644b, #405840)',
                opacity: 0.92,
                boxShadow: 'none',
              },
            }}
          >
            {labels['nav.cta'] || 'Book Now'}
          </Button>

          <IconButton
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
            sx={{ display: { xs: 'flex', md: 'none' }, color: 'text.primary' }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            background: 'rgba(250, 250, 245, 0.97)',
            backdropFilter: 'blur(20px)',
            px: 4,
            py: 3,
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
          <IconButton onClick={() => setOpen(false)} aria-label="Fermer le menu">
            <CloseIcon />
          </IconButton>
        </Box>

        <Stack component="nav" spacing={4} sx={{ flex: 1 }}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              underline="none"
              color="text.primary"
              onClick={() => setOpen(false)}
              sx={{
                fontFamily: 'Noto Serif, serif',
                fontSize: '1.375rem',
                fontWeight: 400,
                transition: 'color 300ms ease-out',
                '&:hover': { color: 'primary.main' },
              }}
            >
              {link.label}
            </Link>
          ))}
        </Stack>

        <Button
          variant="contained"
          sx={{
            mt: 6,
            py: 1.5,
            color: 'primary.contrastText',
            background: 'linear-gradient(135deg, #4c644b, #405840)',
            boxShadow: 'none',
            '&:hover': {
              background: 'linear-gradient(135deg, #4c644b, #405840)',
              opacity: 0.92,
              boxShadow: 'none',
            },
          }}
        >
          {labels['nav.cta'] || 'Book Now'}
        </Button>
      </Drawer>
    </>
  );
}

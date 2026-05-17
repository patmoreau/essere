import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';

import type { Event } from '../core/event.ts';

type Props = {
  open: boolean;
  event: Event;
  onClose: () => void;
};

type FormErrors = {
  fullName: string;
  email: string;
};

const EventRegistrationModal = ({ open, event, onClose }: Props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<FormErrors>({ fullName: '', email: '' });

  const validate = (): boolean => {
    const next: FormErrors = { fullName: '', email: '' };
    if (!fullName.trim()) next.fullName = 'Le nom complet est requis.';
    if (!email.trim()) next.email = "L'adresse courriel est requise.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "L'adresse courriel est invalide.";
    setErrors(next);
    return !next.fullName && !next.email;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (event.bookingUrl) window.open(event.bookingUrl, '_blank', 'noopener,noreferrer');
    handleClose();
  };

  const handleClose = () => {
    setFullName('');
    setEmail('');
    setErrors({ fullName: '', email: '' });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: fullScreen ? 0 : 'var(--radius-xl)',
          bgcolor: 'var(--background)',
          boxShadow: '0px 24px 64px rgba(46, 52, 45, 0.12)',
        },
      }}
    >
      <DialogTitle sx={{ p: { xs: 3, md: 4 }, pb: 0 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Box>
            <Typography
              component="p"
              sx={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--primary)',
                mb: 0.5,
              }}
            >
              Inscription
            </Typography>
            <Typography
              component="h2"
              sx={{
                fontFamily: 'Noto Serif, serif',
                fontSize: { xs: '1.375rem', md: '1.75rem' },
                fontWeight: 400,
                color: 'var(--on-background)',
              }}
            >
              {event.title}
            </Typography>
          </Box>
          <IconButton
            onClick={handleClose}
            size="small"
            aria-label="Fermer"
            sx={{ mt: 0.5, color: 'var(--on-surface-variant)' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: { xs: 3, md: 4 } }}>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            label="Nom complet"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            error={!!errors.fullName}
            helperText={errors.fullName}
            fullWidth
            required
            autoComplete="name"
            sx={{ mb: 3 }}
          />
          <TextField
            label="Adresse courriel"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
            required
            autoComplete="email"
            sx={{ mb: 4 }}
          />
          <Button
            type="submit"
            fullWidth
            sx={{
              background: 'linear-gradient(135deg, var(--primary), var(--primary-dim))',
              color: 'var(--on-primary)',
              borderRadius: '9999px',
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 700,
              py: 1.75,
              fontSize: '0.9375rem',
              textTransform: 'none',
              transition: 'all 300ms ease-out',
              '&:hover': { opacity: 0.9, transform: 'translateY(-1px)' },
            }}
          >
            Confirmer l'inscription
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EventRegistrationModal;

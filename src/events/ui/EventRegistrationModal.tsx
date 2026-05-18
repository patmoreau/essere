import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FilledInput,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useCallback, useRef, useState } from 'react';

import TurnstileWidget, {
  type TurnstileInstance,
} from '../../shared/captcha/ui/TurnstileWidget.tsx';
import { useConfig } from '../../shared/config/core/use-config.ts';
import { useDirectus } from '../../shared/directus/core/use-directus.ts';
import type { Event } from '../core/event.ts';
import { useEventsPage } from '../core/use-events-page.ts';

type Props = {
  open: boolean;
  event: Event;
  onClose: () => void;
};

type FormErrors = {
  fullName: string;
  email: string;
};

const fieldSx = {
  width: '100%',
  bgcolor: 'var(--surface-container-high)',
  borderRadius: 'var(--radius-md)',
  fontFamily: 'Manrope, sans-serif',
  fontSize: '1rem',
  color: 'var(--on-surface)',
  transition: 'outline 200ms ease-out',
  '& .MuiInputBase-input': { px: 2, py: 1.5 },
  '&:hover': { bgcolor: 'var(--surface-container-high)' },
  '&.Mui-focused': {
    outline: '2px solid var(--primary)',
    outlineOffset: '-2px',
  },
  '&.Mui-error': {
    outline: '2px solid',
    outlineColor: 'error.main',
    outlineOffset: '-2px',
  },
};

const labelSx = {
  fontFamily: 'Manrope, sans-serif',
  fontSize: '0.65rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.15em',
  color: 'var(--secondary)',
  mb: 0.75,
  display: 'block',
  '&.Mui-error': { color: 'error.main' },
};

const helperTextSx = {
  fontFamily: 'Manrope, sans-serif',
  fontSize: '0.75rem',
  ml: 0.5,
};

const EventRegistrationModal = ({ open, event, onClose }: Props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const config = useConfig();
  const directus = useDirectus();
  const eventsPage = useEventsPage();
  const captchaRef = useRef<TurnstileInstance>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const handleToken = useCallback((token: string | null) => setCaptchaToken(token), []);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<FormErrors>({ fullName: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const next: FormErrors = { fullName: '', email: '' };
    if (!fullName.trim()) next.fullName = eventsPage.registerFullNameError;
    if (!email.trim()) next.email = eventsPage.registerEmailRequiredError;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = eventsPage.registerEmailInvalidError;
    setErrors(next);
    return !next.fullName && !next.email;
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await directus.submitRegistration({
        name: fullName.trim(),
        email: email.trim(),
        event: event.title,
        deposit: event.deposit,
        captchaToken: captchaToken!,
      });
      setSubmitted(true);
      captchaRef.current?.reset();
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (submitting) return;
    setFullName('');
    setEmail('');
    setErrors({ fullName: '', email: '' });
    setSubmitted(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      disableRestoreFocus
      slotProps={{
        paper: {
          sx: {
            borderRadius: fullScreen ? 0 : 'var(--radius-xl)',
            bgcolor: 'var(--background)',
            boxShadow: '0px 24px 64px rgba(46, 52, 45, 0.12)',
          },
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
              {eventsPage.registerEyebrow}
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
            aria-label={eventsPage.registerCloseLabel}
            sx={{ mt: 0.5, color: 'var(--on-surface-variant)' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: { xs: 3, md: 4 } }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: submitted ? 'none' : 'flex', flexDirection: 'column', gap: 3, mt: 2 }}
        >
          <FormControl fullWidth error={!!errors.fullName}>
            <FormLabel htmlFor="reg-full-name" sx={labelSx}>
              {eventsPage.registerFullNameLabel}
            </FormLabel>
            <FilledInput
              id="reg-full-name"
              required
              disableUnderline
              autoComplete="name"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              sx={fieldSx}
            />
            {errors.fullName && (
              <FormHelperText sx={helperTextSx}>{errors.fullName}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth error={!!errors.email}>
            <FormLabel htmlFor="reg-email" sx={labelSx}>
              {eventsPage.registerEmailLabel}
            </FormLabel>
            <FilledInput
              id="reg-email"
              type="email"
              required
              disableUnderline
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              sx={fieldSx}
            />
            {errors.email && <FormHelperText sx={helperTextSx}>{errors.email}</FormHelperText>}
          </FormControl>

          <TurnstileWidget
            ref={captchaRef}
            siteKey={config.TURNSTILE_SITE_KEY}
            onToken={handleToken}
          />

          <Button
            type="submit"
            fullWidth
            disabled={submitting || !captchaToken}
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
            {eventsPage.registerSubmitLabel}
          </Button>
        </Box>

        {submitted && (
          <Box sx={{ textAlign: 'center', py: { xs: 4, md: 6 } }}>
            <CheckCircleOutlineIcon sx={{ fontSize: '3.5rem', color: 'var(--primary)', mb: 2 }} />
            <Typography
              component="h3"
              sx={{
                fontFamily: 'Noto Serif, serif',
                fontSize: '1.5rem',
                fontWeight: 400,
                color: 'var(--on-background)',
                mb: 1.5,
              }}
            >
              {eventsPage.confirmHeadline}
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Manrope, sans-serif',
                color: 'var(--on-surface-variant)',
                lineHeight: 1.7,
                mb: 4,
              }}
            >
              {eventsPage.confirmBodyBeforeName} {fullName.trim().split(' ')[0]}
              {eventsPage.confirmBodyBeforeEmail}{' '}
              <Box component="span" sx={{ fontWeight: 700, color: 'var(--on-surface)' }}>
                {email}
              </Box>{' '}
              {eventsPage.confirmBodyAfterEmail}
            </Typography>
            <Button
              onClick={handleClose}
              sx={{
                background: 'linear-gradient(135deg, var(--primary), var(--primary-dim))',
                color: 'var(--on-primary)',
                borderRadius: '9999px',
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 700,
                py: 1.5,
                px: 4,
                fontSize: '0.9375rem',
                textTransform: 'none',
                transition: 'all 300ms ease-out',
                '&:hover': { opacity: 0.9 },
              }}
            >
              {eventsPage.confirmCloseLabel}
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EventRegistrationModal;

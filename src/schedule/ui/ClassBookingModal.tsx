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
import type { ScheduleClass } from '../core/schedule-class.ts';
import { DAY_LABELS_FR, getDayOfWeek } from '../core/schedule-utils.ts';
import { useClassesPage } from '../core/use-classes-page.ts';

type Props = {
  open: boolean;
  scheduleClass: ScheduleClass;
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

const ClassBookingModal = ({ open, scheduleClass, onClose }: Props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const config = useConfig();
  const directus = useDirectus();
  const classesPage = useClassesPage();
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
    if (!fullName.trim()) next.fullName = classesPage.registerFullNameError;
    if (!email.trim()) next.email = classesPage.registerEmailRequiredError;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = classesPage.registerEmailInvalidError;
    setErrors(next);
    return !next.fullName && !next.email;
  };

  const formatClassDate = (dateStr: string): string => {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Intl.DateTimeFormat('fr-CA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(year, month - 1, day));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await directus.submitClassBooking({
        name: fullName.trim(),
        email: email.trim(),
        className: scheduleClass.title,
        classDate: formatClassDate(scheduleClass.startDate),
        classTime: `${scheduleClass.startTime} – ${scheduleClass.endTime}`,
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
              {DAY_LABELS_FR[getDayOfWeek(scheduleClass.startDate)]}
              {' · '}
              {scheduleClass.startTime} – {scheduleClass.endTime}
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
              {scheduleClass.title}
            </Typography>
          </Box>
          <IconButton
            onClick={handleClose}
            size="small"
            aria-label={classesPage.registerCloseLabel}
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
          sx={{
            display: submitted ? 'none' : 'flex',
            flexDirection: 'column',
            gap: 3,
            mt: 2,
          }}
        >
          <FormControl fullWidth error={!!errors.fullName}>
            <FormLabel htmlFor="booking-full-name" sx={labelSx}>
              {classesPage.registerFullNameLabel}
            </FormLabel>
            <FilledInput
              id="booking-full-name"
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
            <FormLabel htmlFor="booking-email" sx={labelSx}>
              {classesPage.registerEmailLabel}
            </FormLabel>
            <FilledInput
              id="booking-email"
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
            {classesPage.registerSubmitLabel}
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
              {classesPage.confirmHeadline}
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Manrope, sans-serif',
                color: 'var(--on-surface-variant)',
                lineHeight: 1.7,
                mb: 4,
              }}
            >
              {classesPage.confirmBodyBeforeName} {fullName.trim().split(' ')[0]}
              {classesPage.confirmBodyBeforeEmail}{' '}
              <Box component="span" sx={{ fontWeight: 700, color: 'var(--on-surface)' }}>
                {email}
              </Box>{' '}
              {classesPage.confirmBodyAfterEmail}
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
              {classesPage.confirmCloseLabel}
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ClassBookingModal;

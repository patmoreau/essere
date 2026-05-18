import { Box, Button, InputBase, Stack, Typography } from '@mui/material';
import { useCallback, useRef, useState } from 'react';

import TurnstileWidget, {
  type TurnstileInstance,
} from '../../shared/captcha/ui/TurnstileWidget.tsx';
import { useConfig } from '../../shared/config/core/use-config.ts';
import { useDirectus } from '../../shared/directus/core/use-directus.ts';
import { useLabels } from '../../shared/labels/core/use-labels.ts';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

const fieldSx = {
  width: '100%',
  bgcolor: 'var(--surface-container-high)',
  borderRadius: 'var(--radius-md)',
  px: 2,
  py: 1.5,
  fontFamily: 'Manrope, sans-serif',
  fontSize: '1rem',
  color: 'var(--on-surface)',
  transition: 'outline 200ms ease-out',
  '&.Mui-focused': {
    outline: '2px solid var(--primary)',
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
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const ConnectWithUsCard = () => {
  const config = useConfig();
  const directus = useDirectus();
  const labels = useLabels();
  const captchaRef = useRef<TurnstileInstance>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const handleToken = useCallback((token: string | null) => setCaptchaToken(token), []);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [message, setMessage] = useState('');
  const [state, setState] = useState<FormState>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setEmailError(true);
      return;
    }
    setState('submitting');
    try {
      await directus.submitContactForm({
        name,
        email,
        message,
        captchaToken: captchaToken!,
      });
      setState('success');
      setName('');
      setEmail('');
      setMessage('');
      captchaRef.current?.reset();
    } catch {
      setState('error');
    }
  };

  return (
    <Box
      sx={{
        bgcolor: 'var(--surface-container-lowest)',
        borderRadius: 'var(--radius-xl)',
        p: { xs: 4, md: 6 },
        boxShadow: '0px 12px 32px rgba(46, 52, 45, 0.06)',
      }}
    >
      <Typography
        component="h2"
        sx={{
          fontFamily: 'Noto Serif, serif',
          fontSize: { xs: '2rem', md: '2.5rem' },
          fontWeight: 400,
          color: 'var(--on-background)',
          mb: 1,
        }}
      >
        {labels['connect_with_us.headline']}
      </Typography>
      <Typography
        sx={{
          fontFamily: 'Manrope, sans-serif',
          color: 'var(--on-surface-variant)',
          mb: 5,
          lineHeight: 1.7,
        }}
      >
        {labels['connect_with_us.subheading']}
      </Typography>

      {state === 'success' && (
        <Box
          sx={{
            bgcolor: 'var(--primary-container)',
            borderRadius: 'var(--radius-md)',
            p: 4,
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Noto Serif, serif',
              fontStyle: 'italic',
              fontSize: '1.25rem',
              color: 'var(--on-primary-container)',
              mb: 1,
            }}
          >
            {labels['connect_with_us.success_headline']}
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: '0.9rem',
              color: 'var(--on-surface-variant)',
            }}
          >
            {labels['connect_with_us.success_message']}
          </Typography>
        </Box>
      )}
      <Stack
        component="form"
        onSubmit={handleSubmit}
        spacing={4}
        sx={{ display: state === 'success' ? 'none' : 'flex' }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 3,
          }}
        >
          <Box>
            <Typography component="label" htmlFor="contact-name" sx={labelSx}>
              {labels['connect_with_us.name_label']}
            </Typography>
            <InputBase
              id="contact-name"
              required
              placeholder={labels['connect_with_us.name_placeholder']}
              value={name}
              onChange={e => setName(e.target.value)}
              sx={fieldSx}
            />
          </Box>
          <Box>
            <Typography component="label" htmlFor="contact-email" sx={labelSx}>
              {labels['connect_with_us.email_label']}
            </Typography>
            <InputBase
              id="contact-email"
              type="email"
              required
              placeholder={labels['connect_with_us.email_placeholder']}
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                if (emailError) setEmailError(false);
              }}
              onBlur={() => {
                if (email && !EMAIL_RE.test(email)) setEmailError(true);
              }}
              sx={{
                ...fieldSx,
                ...(emailError && {
                  outline: '2px solid',
                  outlineColor: 'error.main',
                  outlineOffset: '-2px',
                }),
              }}
            />
            {emailError && (
              <Typography
                sx={{
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: '0.75rem',
                  color: 'error.main',
                  mt: 0.75,
                  ml: 0.5,
                }}
              >
                {labels['connect_with_us.email_error']}
              </Typography>
            )}
          </Box>
        </Box>

        <Box>
          <Typography component="label" htmlFor="contact-message" sx={labelSx}>
            {labels['connect_with_us.message_label']}
          </Typography>
          <InputBase
            id="contact-message"
            required
            multiline
            rows={5}
            placeholder={labels['connect_with_us.message_placeholder']}
            value={message}
            onChange={e => setMessage(e.target.value)}
            sx={{ ...fieldSx, alignItems: 'flex-start' }}
          />
        </Box>

        {state === 'error' && (
          <Typography
            sx={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: '0.85rem',
              color: 'error.main',
            }}
          >
            {labels['connect_with_us.submit_error']}
          </Typography>
        )}

        <TurnstileWidget
          ref={captchaRef}
          siteKey={config.TURNSTILE_SITE_KEY}
          onToken={handleToken}
        />

        <Box>
          <Button
            type="submit"
            disabled={state === 'submitting' || !captchaToken}
            sx={{
              background: 'linear-gradient(135deg, var(--primary), var(--primary-dim))',
              color: 'var(--on-primary)',
              borderRadius: '9999px',
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 700,
              fontSize: '0.75rem',
              px: 6,
              py: 1.75,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              boxShadow: '0px 8px 24px rgba(76, 100, 75, 0.20)',
              transition: 'all 300ms ease-out',
              '&:hover': {
                background: 'linear-gradient(135deg, var(--primary-dim), var(--primary-dim))',
                boxShadow: '0px 12px 32px rgba(76, 100, 75, 0.28)',
              },
              '&:disabled': { opacity: 0.6 },
            }}
          >
            {state === 'submitting'
              ? labels['connect_with_us.submit_button_loading']
              : labels['connect_with_us.submit_button']}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default ConnectWithUsCard;

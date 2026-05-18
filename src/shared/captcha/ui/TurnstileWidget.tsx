import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { Box } from '@mui/material';
import { forwardRef } from 'react';

export type { TurnstileInstance };

type Props = {
  siteKey: string;
  onToken: (token: string | null) => void;
};

const TurnstileWidget = forwardRef<TurnstileInstance | undefined, Props>(
  ({ siteKey, onToken }, ref) => (
    <Box sx={{ transform: 'translateZ(0)', minHeight: 65 }}>
      <Turnstile
        ref={ref}
        siteKey={siteKey}
        onSuccess={onToken}
        onExpire={() => onToken(null)}
        onError={() => onToken(null)}
        scriptOptions={{ appendTo: 'body' }}
      />
    </Box>
  ),
);

TurnstileWidget.displayName = 'TurnstileWidget';
export default TurnstileWidget;

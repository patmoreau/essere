import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { forwardRef } from 'react';

export type { TurnstileInstance };

type Props = {
  siteKey: string;
  onToken: (token: string | null) => void;
};

const TurnstileWidget = forwardRef<TurnstileInstance | undefined, Props>(
  ({ siteKey, onToken }, ref) => (
    <Turnstile
      ref={ref}
      siteKey={siteKey}
      onSuccess={onToken}
      onExpire={() => onToken(null)}
      onError={() => onToken(null)}
      options={{ size: 'flexible' }}
    />
  ),
);

TurnstileWidget.displayName = 'TurnstileWidget';
export default TurnstileWidget;

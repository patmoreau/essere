import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import type { Ref } from 'react';

export type { TurnstileInstance };

type Props = {
  siteKey: string;
  onToken: (token: string | null) => void;
  ref?: Ref<TurnstileInstance>;
};

const TurnstileWidget = ({ siteKey, onToken, ref }: Props) => (
  <Turnstile
    ref={ref}
    siteKey={siteKey}
    onSuccess={onToken}
    onExpire={() => onToken(null)}
    onError={() => onToken(null)}
  />
);

export default TurnstileWidget;

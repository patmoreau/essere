import type { EventsPage } from '../../../events/core/events-page.ts';

export type EventsPageSchema = {
  hero_eyebrow: string;
  hero_headline: string;
  hero_headline_accent: string;
  hero_subheading: string;
  event_featured_headline: string;
  register_eyebrow: string;
  register_close_label: string;
  register_full_name_label: string;
  register_full_name_error: string;
  register_email_label: string;
  register_email_required_error: string;
  register_email_invalid_error: string;
  register_submit_label: string;
  confirm_headline: string;
  confirm_body_before_name: string;
  confirm_body_before_email: string;
  confirm_body_after_email: string;
  confirm_close_label: string;
};

const toEventsPage = (schema: EventsPageSchema): EventsPage => ({
  heroEyebrow: schema.hero_eyebrow,
  heroHeadline: schema.hero_headline,
  heroHeadlineAccent: schema.hero_headline_accent,
  heroSubheading: schema.hero_subheading,
  eventFeaturedHeadline: schema.event_featured_headline,
  registerEyebrow: schema.register_eyebrow,
  registerCloseLabel: schema.register_close_label,
  registerFullNameLabel: schema.register_full_name_label,
  registerFullNameError: schema.register_full_name_error,
  registerEmailLabel: schema.register_email_label,
  registerEmailRequiredError: schema.register_email_required_error,
  registerEmailInvalidError: schema.register_email_invalid_error,
  registerSubmitLabel: schema.register_submit_label,
  confirmHeadline: schema.confirm_headline,
  confirmBodyBeforeName: schema.confirm_body_before_name,
  confirmBodyBeforeEmail: schema.confirm_body_before_email,
  confirmBodyAfterEmail: schema.confirm_body_after_email,
  confirmCloseLabel: schema.confirm_close_label,
});

export const EventsPageSchema = { toEventsPage: toEventsPage } as const;

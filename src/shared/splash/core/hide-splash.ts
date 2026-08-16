const SPLASH_ID = 'splash';
const HIDDEN_CLASS = 'splash--hidden';
const FADE_OUT_MS = 300;

/**
 * Fades out the boot splash declared in index.html and removes it from the DOM.
 * Safe to call more than once — the element is gone after the first call.
 */
export const hideSplash = () => {
  const splash = document.getElementById(SPLASH_ID);
  if (!splash) {
    return;
  }

  splash.classList.add(HIDDEN_CLASS);
  window.setTimeout(() => splash.remove(), FADE_OUT_MS);
};

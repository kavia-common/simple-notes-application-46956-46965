import { Theme } from '../theme';

/**
 * PUBLIC_INTERFACE
 * createCard
 * Utility to create a surface card with standard styles.
 */
export function createCard(tag = 'div') {
  const el = document.createElement(tag);
  el.style.background = Theme.colors.surface;
  el.style.border = `1px solid ${Theme.colors.border}`;
  el.style.borderRadius = Theme.radii.lg;
  el.style.boxShadow = Theme.shadow;
  el.style.transition = Theme.transition;
  return el;
}

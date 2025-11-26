import { Theme } from '../theme';
import { createCard } from './Card';

/**
 * PUBLIC_INTERFACE
 * Header
 * Render the application header with title and subtle gradient.
 */
export function Header() {
  const wrap = createCard('header');
  wrap.style.padding = '16px 20px';
  wrap.style.display = 'flex';
  wrap.style.alignItems = 'center';
  wrap.style.justifyContent = 'space-between';
  wrap.style.background = `linear-gradient(180deg, rgba(37,99,235,0.08), ${Theme.colors.surface})`;
  wrap.style.border = `1px solid ${Theme.colors.border}`;
  wrap.setAttribute('role', 'banner');

  const title = document.createElement('h1');
  title.textContent = 'Ocean Notes';
  title.style.margin = '0';
  title.style.fontSize = '20px';
  title.style.fontWeight = '700';
  title.style.color = Theme.colors.text;
  title.style.letterSpacing = '0.2px';

  const badge = document.createElement('span');
  badge.textContent = 'LightningJS';
  badge.style.fontSize = '12px';
  badge.style.fontWeight = '600';
  badge.style.color = Theme.colors.primary;
  badge.style.background = 'rgba(37,99,235,0.10)';
  badge.style.padding = '6px 10px';
  badge.style.borderRadius = Theme.radii.full;
  badge.style.border = `1px solid ${Theme.colors.border}`;

  wrap.appendChild(title);
  wrap.appendChild(badge);
  return wrap;
}

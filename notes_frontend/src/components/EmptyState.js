import { Theme } from '../theme';

/**
 * PUBLIC_INTERFACE
 * EmptyState
 * Displayed when there are no notes.
 */
export function EmptyState() {
  const box = document.createElement('div');
  box.style.padding = '24px';
  box.style.textAlign = 'center';
  box.style.color = Theme.colors.muted;

  const h = document.createElement('div');
  h.textContent = 'No notes yet';
  h.style.fontWeight = '600';
  h.style.marginBottom = '4px';

  const p = document.createElement('div');
  p.textContent = 'Create your first note using the form';
  p.style.fontSize = '13px';

  box.appendChild(h);
  box.appendChild(p);
  return box;
}

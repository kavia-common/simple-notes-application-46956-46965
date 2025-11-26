import { Theme } from '../theme';
import { createCard } from './Card';

/**
 * PUBLIC_INTERFACE
 * NotesList
 * List of notes. Emits events onSelect(noteId), onEdit(noteId), onDelete(noteId).
 */
export function NotesList({ onSelect, onEdit, onDelete }) {
  const card = createCard('section');
  card.style.padding = '0';
  card.style.overflow = 'hidden';

  const header = document.createElement('div');
  header.style.display = 'flex';
  header.style.alignItems = 'center';
  header.style.justifyContent = 'space-between';
  header.style.padding = '14px 16px';
  header.style.borderBottom = `1px solid ${Theme.colors.border}`;
  const title = document.createElement('h2');
  title.textContent = 'Your Notes';
  title.style.fontSize = '16px';
  title.style.margin = '0';
  header.appendChild(title);

  const list = document.createElement('div');
  list.style.display = 'flex';
  list.style.flexDirection = 'column';

  card.appendChild(header);
  card.appendChild(list);

  function render(notes, activeId = null) {
    list.innerHTML = '';
    if (!notes || notes.length === 0) {
      const empty = document.createElement('div');
      empty.textContent = 'No notes to display';
      empty.style.padding = '16px';
      empty.style.color = Theme.colors.muted;
      list.appendChild(empty);
      return;
    }
    notes.forEach((n) => {
      const row = document.createElement('div');
      row.style.display = 'grid';
      row.style.gridTemplateColumns = '1fr auto';
      row.style.gap = '10px';
      row.style.alignItems = 'center';
      row.style.padding = '12px 16px';
      row.style.borderTop = `1px solid ${Theme.colors.border}`;
      row.style.transition = Theme.transition;
      row.style.background = activeId === n.id ? 'rgba(37,99,235,0.06)' : 'transparent';
      row.tabIndex = 0;
      row.setAttribute('role', 'button');
      row.setAttribute('aria-label', `Select note ${n.title}`);

      const left = document.createElement('div');
      left.style.minWidth = 0;

      const t = document.createElement('div');
      t.textContent = n.title || '(Untitled)';
      t.style.fontWeight = '600';
      t.style.color = Theme.colors.text;
      t.style.whiteSpace = 'nowrap';
      t.style.overflow = 'hidden';
      t.style.textOverflow = 'ellipsis';

      const sub = document.createElement('div');
      const updated = new Date(n.updatedAt || n.createdAt);
      sub.textContent = `Updated ${updated.toLocaleString()}`;
      sub.style.color = Theme.colors.muted;
      sub.style.fontSize = '12px';

      left.appendChild(t);
      left.appendChild(sub);

      const actions = document.createElement('div');
      actions.style.display = 'flex';
      actions.style.gap = '8px';

      const edit = document.createElement('button');
      edit.textContent = 'Edit';
      styleSmallAmber(edit);

      const del = document.createElement('button');
      del.textContent = 'Delete';
      styleSmallDanger(del);

      actions.appendChild(edit);
      actions.appendChild(del);

      row.appendChild(left);
      row.appendChild(actions);

      row.addEventListener('click', () => {
        if (typeof onSelect === 'function') onSelect(n.id);
      });
      row.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (typeof onSelect === 'function') onSelect(n.id);
        }
      });

      edit.addEventListener('click', (e) => {
        e.stopPropagation();
        if (typeof onEdit === 'function') onEdit(n.id);
      });

      del.addEventListener('click', (e) => {
        e.stopPropagation();
        if (typeof onDelete === 'function') onDelete(n.id);
      });

      list.appendChild(row);
    });
  }

  card.render = render;
  return card;
}

function styleSmallAmber(btn) {
  btn.style.background = 'transparent';
  btn.style.color = '#F59E0B';
  btn.style.border = '1px solid #F59E0B';
  btn.style.padding = '6px 10px';
  btn.style.borderRadius = '8px';
  btn.style.cursor = 'pointer';
  btn.style.fontWeight = '600';
  btn.style.fontSize = '12px';
  btn.style.transition = 'all 200ms ease';
  btn.addEventListener('mouseover', () => (btn.style.background = 'rgba(245,158,11,0.08)'));
  btn.addEventListener('mouseout', () => (btn.style.background = 'transparent'));
}

function styleSmallDanger(btn) {
  btn.style.background = 'transparent';
  btn.style.color = '#EF4444';
  btn.style.border = '1px solid #EF4444';
  btn.style.padding = '6px 10px';
  btn.style.borderRadius = '8px';
  btn.style.cursor = 'pointer';
  btn.style.fontWeight = '600';
  btn.style.fontSize = '12px';
  btn.style.transition = 'all 200ms ease';
  btn.addEventListener('mouseover', () => (btn.style.background = 'rgba(239,68,68,0.08)'));
  btn.addEventListener('mouseout', () => (btn.style.background = 'transparent'));
}

import { Theme } from '../theme';
import { createCard } from './Card';

/**
 * PUBLIC_INTERFACE
 * NoteForm
 * Add/Edit note form with inline validation. Emits events: submit(create/update), cancelEdit.
 */
export function NoteForm({ onSubmit, onCancelEdit }) {
  const card = createCard('section');
  card.style.padding = '16px';
  card.style.display = 'flex';
  card.style.flexDirection = 'column';
  card.style.gap = '10px';

  const title = document.createElement('h2');
  title.textContent = 'Add / Edit Note';
  title.style.fontSize = '16px';
  title.style.margin = '0 0 2px 0';
  title.style.color = Theme.colors.text;

  // Title input
  const titleLabel = document.createElement('label');
  titleLabel.textContent = 'Title';
  titleLabel.style.fontSize = '12px';
  titleLabel.style.color = Theme.colors.muted;

  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.placeholder = 'Enter a note title';
  applyInputStyles(titleInput);
  titleInput.setAttribute('aria-label', 'Note title');

  // Body input
  const bodyLabel = document.createElement('label');
  bodyLabel.textContent = 'Body';
  bodyLabel.style.fontSize = '12px';
  bodyLabel.style.color = Theme.colors.muted;

  const bodyInput = document.createElement('textarea');
  bodyInput.placeholder = 'Write your note...';
  bodyInput.rows = 6;
  applyInputStyles(bodyInput);
  bodyInput.setAttribute('aria-label', 'Note body');

  // Error text
  const error = document.createElement('div');
  error.style.color = Theme.colors.error;
  error.style.fontSize = '12px';
  error.style.minHeight = '16px';

  // Actions
  const actions = document.createElement('div');
  actions.style.display = 'flex';
  actions.style.gap = '8px';
  actions.style.marginTop = '6px';

  const submitBtn = document.createElement('button');
  submitBtn.textContent = 'Save';
  applyPrimaryButton(submitBtn);

  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancel';
  applyGhostButton(cancelBtn);

  actions.appendChild(submitBtn);
  actions.appendChild(cancelBtn);

  // Event handlers
  submitBtn.addEventListener('click', () => {
    const titleVal = (titleInput.value || '').trim();
    const bodyVal = (bodyInput.value || '').trim();
    if (!titleVal) {
      error.textContent = 'Title is required';
      titleInput.focus();
      return;
    }
    error.textContent = '';
    if (typeof onSubmit === 'function') {
      onSubmit({ title: titleVal, body: bodyVal });
    }
  });

  cancelBtn.addEventListener('click', () => {
    clear();
    error.textContent = '';
    if (typeof onCancelEdit === 'function') onCancelEdit();
  });

  function clear() {
    titleInput.value = '';
    bodyInput.value = '';
  }

  function setValues({ title, body }) {
    titleInput.value = title ?? '';
    bodyInput.value = body ?? '';
    error.textContent = '';
  }

  // Public API on element
  card.setValues = setValues;
  card.clear = clear;

  // Build
  card.appendChild(title);
  card.appendChild(titleLabel);
  card.appendChild(titleInput);
  card.appendChild(bodyLabel);
  card.appendChild(bodyInput);
  card.appendChild(error);
  card.appendChild(actions);

  return card;
}

function applyInputStyles(el) {
  el.style.width = '100%';
  el.style.padding = '10px 12px';
  el.style.border = `1px solid ${Theme.colors.border}`;
  el.style.borderRadius = Theme.radii.md;
  el.style.background = '#fff';
  el.style.color = Theme.colors.text;
  el.style.outline = 'none';
  el.style.transition = Theme.transition;
  el.addEventListener('focus', () => {
    el.style.boxShadow = `0 0 0 3px rgba(37,99,235,0.25)`;
    el.style.borderColor = Theme.colors.primary;
  });
  el.addEventListener('blur', () => {
    el.style.boxShadow = 'none';
    el.style.borderColor = Theme.colors.border;
  });
}

function applyPrimaryButton(btn) {
  btn.style.background = Theme.colors.primary;
  btn.style.color = '#fff';
  btn.style.border = 'none';
  btn.style.padding = '10px 14px';
  btn.style.borderRadius = Theme.radii.md;
  btn.style.cursor = 'pointer';
  btn.style.fontWeight = '600';
  btn.style.boxShadow = Theme.shadow;
  btn.style.transition = Theme.transition;
  btn.addEventListener('mouseover', () => (btn.style.opacity = '0.95'));
  btn.addEventListener('mouseout', () => (btn.style.opacity = '1'));
  btn.addEventListener('focus', () => (btn.style.boxShadow = `0 0 0 3px rgba(37,99,235,0.35)`));
  btn.addEventListener('blur', () => (btn.style.boxShadow = Theme.shadow));
}

function applyGhostButton(btn) {
  btn.style.background = 'transparent';
  btn.style.color = Theme.colors.primary;
  btn.style.border = `1px solid ${Theme.colors.primary}`;
  btn.style.padding = '10px 14px';
  btn.style.borderRadius = Theme.radii.md;
  btn.style.cursor = 'pointer';
  btn.style.fontWeight = '600';
  btn.style.transition = Theme.transition;
  btn.addEventListener('mouseover', () => (btn.style.background = 'rgba(37,99,235,0.08)'));
  btn.addEventListener('mouseout', () => (btn.style.background = 'transparent'));
  btn.addEventListener('focus', () => (btn.style.boxShadow = `0 0 0 3px rgba(37,99,235,0.25)`));
  btn.addEventListener('blur', () => (btn.style.boxShadow = 'none'));
}

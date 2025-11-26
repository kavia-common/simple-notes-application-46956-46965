import { Theme } from '../theme';
import { Header } from '../components/Header';
import { NotesList } from '../components/NotesList';
import { NoteForm } from '../components/NoteForm';
import { EmptyState } from '../components/EmptyState';
import { createNote, deleteNote, getNotes, getNoteById, updateNote } from '../store/NotesStore';

/**
 * PUBLIC_INTERFACE
 * Home
 * Root page composing the layout and wiring interactions for notes CRUD.
 */
export function Home() {
  const root = document.createElement('div');
  root.style.minHeight = '100vh';
  root.style.background = Theme.colors.background;
  root.style.fontFamily = 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji';
  root.style.color = Theme.colors.text;
  root.style.padding = '18px';
  root.style.boxSizing = 'border-box';

  const container = document.createElement('div');
  container.style.maxWidth = '960px';
  container.style.margin = '0 auto';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.gap = '14px';

  const header = Header();

  const main = document.createElement('main');
  main.style.display = 'grid';
  main.style.gridTemplateColumns = '1fr 1fr';
  main.style.gap = '14px';
  main.style.alignItems = 'start';

  // Left: List
  const list = NotesList({
    onSelect: (id) => {
      activeId = id;
      render();
    },
    onEdit: (id) => {
      activeId = id;
      const n = getNoteById(id);
      if (n) {
        formTitle.textContent = 'Edit Note';
        form.setValues({ title: n.title, body: n.body });
      }
      render();
    },
    onDelete: (id) => {
      deleteNote(id);
      if (activeId === id) activeId = null;
      render();
    },
  });

  // Right: Form and preview
  const formWrap = document.createElement('div');
  formWrap.style.display = 'flex';
  formWrap.style.flexDirection = 'column';
  formWrap.style.gap = '14px';

  const form = NoteForm({
    onSubmit: ({ title, body }) => {
      if (activeId) {
        updateNote(activeId, { title, body });
      } else {
        const created = createNote({ title, body });
        activeId = created?.id ?? null;
      }
      form.clear();
      formTitle.textContent = 'Add Note';
      render();
    },
    onCancelEdit: () => {
      activeId = null;
      formTitle.textContent = 'Add Note';
      render();
    },
  });

  const formTitle = form.querySelector('h2');

  const preview = document.createElement('section');
  preview.style.background = Theme.colors.surface;
  preview.style.border = `1px solid ${Theme.colors.border}`;
  preview.style.borderRadius = '14px';
  preview.style.boxShadow = Theme.shadow;
  preview.style.padding = '16px';
  preview.style.minHeight = '120px';
  preview.style.transition = 'all 200ms ease';

  const pvTitle = document.createElement('div');
  pvTitle.style.fontWeight = '700';
  pvTitle.style.marginBottom = '6px';

  const pvBody = document.createElement('div');
  pvBody.style.whiteSpace = 'pre-wrap';
  pvBody.style.color = Theme.colors.muted;

  preview.appendChild(pvTitle);
  preview.appendChild(pvBody);

  const emptyState = EmptyState();

  formWrap.appendChild(form);
  formWrap.appendChild(preview);

  main.appendChild(list);
  main.appendChild(formWrap);

  container.appendChild(header);
  container.appendChild(main);
  root.appendChild(container);

  let activeId = null;

  function render() {
    const notes = getNotes();
    list.render(notes, activeId);

    const active = notes.find((n) => n.id === activeId);
    if (active) {
      pvTitle.textContent = active.title || '(Untitled)';
      pvBody.textContent = active.body || '';
      preview.style.opacity = '1';
      if (emptyState.parentElement) emptyState.parentElement.removeChild(emptyState);
      if (!formWrap.contains(preview)) formWrap.appendChild(preview);
    } else {
      // Show empty state for preview
      pvTitle.textContent = '';
      pvBody.textContent = '';
      preview.style.opacity = '0.6';
      if (formWrap.contains(preview)) formWrap.removeChild(preview);
      if (!formWrap.contains(emptyState)) formWrap.appendChild(emptyState);
    }
  }

  // Initial render
  render();

  // Responsive column collapse
  const resizeObserver = new ResizeObserver(() => {
    const width = root.clientWidth;
    if (width < 900) {
      main.style.gridTemplateColumns = '1fr';
    } else {
      main.style.gridTemplateColumns = '1fr 1fr';
    }
  });
  resizeObserver.observe(root);

  return root;
}

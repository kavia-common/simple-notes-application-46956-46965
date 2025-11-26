const STORAGE_KEY = 'notes_app_v1';

/**
 * PUBLIC_INTERFACE
 * getNotes
 * Return all notes from storage.
 */
export function getNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    if (!Array.isArray(list)) return [];
    return list;
  } catch (e) {
    console.warn('Failed to load notes from localStorage', e);
    return [];
  }
}

/**
 * PUBLIC_INTERFACE
 * saveNotes
 * Persist notes array to storage.
 */
export function saveNotes(notes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (e) {
    console.warn('Failed to save notes to localStorage', e);
  }
}

/**
 * PUBLIC_INTERFACE
 * createNote
 * Create a note with title and body, returns created note.
 */
export function createNote({ title, body }) {
  const notes = getNotes();
  const now = new Date().toISOString();
  const id = cryptoRandomId();
  const note = { id, title: title.trim(), body: (body || '').trim(), createdAt: now, updatedAt: now };
  notes.unshift(note);
  saveNotes(notes);
  return note;
}

/**
 * PUBLIC_INTERFACE
 * updateNote
 * Update existing note by id, returns updated note or null.
 */
export function updateNote(id, { title, body }) {
  const notes = getNotes();
  const idx = notes.findIndex((n) => n.id === id);
  if (idx === -1) return null;
  const now = new Date().toISOString();
  const updated = {
    ...notes[idx],
    title: title.trim(),
    body: (body || '').trim(),
    updatedAt: now,
  };
  notes[idx] = updated;
  saveNotes(notes);
  return updated;
}

/**
 * PUBLIC_INTERFACE
 * deleteNote
 * Delete note by id, returns boolean success.
 */
export function deleteNote(id) {
  const notes = getNotes();
  const next = notes.filter((n) => n.id !== id);
  const changed = next.length !== notes.length;
  if (changed) saveNotes(next);
  return changed;
}

/**
 * PUBLIC_INTERFACE
 * getNoteById
 * Returns a note by id or undefined.
 */
export function getNoteById(id) {
  return getNotes().find((n) => n.id === id);
}

function cryptoRandomId() {
  // Prefer crypto if available
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const buf = new Uint32Array(2);
    crypto.getRandomValues(buf);
    return `${buf[0].toString(36)}${buf[1].toString(36)}`;
  }
  // Fallback
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

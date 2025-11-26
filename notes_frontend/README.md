# Ocean Notes (LightningJS)

A simple notes app (create, view, edit, delete) with localStorage persistence and an Ocean Professional theme.

## Run

- npm install
- npm run dev
- The app serves on port 3000 (via Vite) in this environment

## Features

- Notes list with Edit and Delete actions
- Add/Edit form with validation (title required)
- Live preview of selected note
- localStorage persistence under key `notes_app_v1`
- Modern styling: rounded corners, subtle shadows, smooth transitions, blue and amber accents

## Environment

The app reads Vite envs via `import.meta.env`. No backend is required. If variables like `VITE_API_BASE` or `VITE_BACKEND_URL` are present, they are ignored for now.

## Tech

- LightningJS (vanilla DOM usage)
- Vite dev server and build tooling

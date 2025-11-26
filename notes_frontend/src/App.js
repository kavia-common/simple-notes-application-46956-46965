import { Home } from './pages/Home';

/**
 * PUBLIC_INTERFACE
 * App
 * Application root. Currently no backend needed; environment variables can be inspected if required.
 */
export function App() {
  const el = document.createElement('div');
  const home = Home();
  el.appendChild(home);

  // Optional: log known env vars (Vite exposes import.meta.env)
  try {
    // Do not create a hard dependency on backend; just noop usage
    const { VITE_NODE_ENV, VITE_PORT } = import.meta.env || {};
    // eslint-disable-next-line no-console
    console.debug('Notes frontend env:', { VITE_NODE_ENV, VITE_PORT });
  } catch {
    // ignore
  }

  return el;
}

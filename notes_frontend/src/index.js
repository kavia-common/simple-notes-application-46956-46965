import { App } from './App';

function mount() {
  const root = document.getElementById('app');
  if (!root) {
    const msg = document.createElement('div');
    msg.textContent = 'Root #app container not found';
    document.body.appendChild(msg);
    return;
  }
  root.innerHTML = '';
  const app = App();
  root.appendChild(app);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}

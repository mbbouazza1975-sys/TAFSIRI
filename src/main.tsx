import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { runDataMigrations } from './services/storage';

// Renumérotation Warsh des données enregistrées (une seule fois), avant le premier rendu
runDataMigrations().finally(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});

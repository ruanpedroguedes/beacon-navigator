import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Importa o registro do Service Worker do plugin PWA
import { registerSW } from 'virtual:pwa-register';

// Registra o Service Worker e define o comportamento para atualização
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('Nova versão disponível! Deseja atualizar?')) {
      updateSW(true); // Atualiza o app
    }
  },
  onOfflineReady() {
    console.log('O app está pronto para funcionar offline!');
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const nombreCentro = "HilosDePlata";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App nomCentro={nombreCentro}/>
);

serviceWorkerRegistration.register();

reportWebVitals();

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('service-worker.js');
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import Modal from 'react-modal';
import App from '../src/components/App/App'
import './index.css'

const rootElement = document.getElementById('root');
Modal.setAppElement(rootElement);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);



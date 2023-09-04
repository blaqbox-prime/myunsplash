import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PhotosProvider from './Context/PhotosProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PhotosProvider >
      <App />
    </PhotosProvider>
  </React.StrictMode>
);

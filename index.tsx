import React from 'react';
import ReactDOM from 'react-dom/client';
import ResizableTable from './components/application';

import './index.css';
import Table from './components/application';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
      <ResizableTable />
  </React.StrictMode>,
);



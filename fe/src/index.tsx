import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/Auth/AuthProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
	<AuthProvider>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</AuthProvider>
);
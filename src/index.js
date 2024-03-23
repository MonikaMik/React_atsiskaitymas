import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from './contexts/UsersContext';
import { QuestionsContextProvider } from './contexts/QuestionsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<UserContextProvider>
			<QuestionsContextProvider>
				<App />
			</QuestionsContextProvider>
		</UserContextProvider>
	</BrowserRouter>
);

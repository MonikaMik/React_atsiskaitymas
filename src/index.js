import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UsersContextProvider } from './contexts/UsersContext';
import { QuestionsContextProvider } from './contexts/QuestionsContext';
import { AnswersContextProvider } from './contexts/AnswersContext';
import { DialogProvider } from './contexts/DialogContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<UsersContextProvider>
			<QuestionsContextProvider>
				<AnswersContextProvider>
					<DialogProvider>
						<App />
					</DialogProvider>
				</AnswersContextProvider>
			</QuestionsContextProvider>
		</UsersContextProvider>
	</BrowserRouter>
);

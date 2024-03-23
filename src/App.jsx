import './App.css';
import { Route, Routes } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import QuestionsPage from './components/pages/QuestionsPage';

const App = () => {
	return (
		<>
			<GlobalStyles />
			<Routes>
				<Route path='/' element={<QuestionsPage />} />
			</Routes>
		</>
	);
};

export default App;

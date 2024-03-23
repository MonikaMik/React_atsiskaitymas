import './App.css';
import { Route, Routes } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import QuestionsPage from './components/pages/QuestionsPage';
import Header from './components/organisms/Header';
import Login from './components/pages/Login';

const App = () => {
	return (
		<>
			<GlobalStyles />
			<Header />
			<main>
				<Routes>
					<Route path='/' element={<QuestionsPage />} />
					<Route path='/login' element={<Login />} />
				</Routes>
			</main>
		</>
	);
};

export default App;

import './App.css';
import { Route, Routes } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import QuestionsPage from './components/pages/QuestionsPage';
import Header from './components/organisms/Header';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Footer from './components/organisms/Footer';

const App = () => {
	return (
		<>
			<GlobalStyles />
			<Header />
			<main>
				<Routes>
					<Route path='/' element={<QuestionsPage />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
				</Routes>
			</main>
			<Footer />
		</>
	);
};

export default App;

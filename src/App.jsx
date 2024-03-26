import './App.css';
import { Route, Routes } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import QuestionsPage from './components/pages/QuestionsPage';
import Header from './components/organisms/Header';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Footer from './components/organisms/Footer';
import OneQuestionPage from './components/pages/OneQuestionPage';
import AddAQuestionPage from './components/pages/AddAQuestionPage';
import UsersContext from './contexts/UsersContext';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Aside from './components/organisms/Aside';

const App = () => {
	const {
		state: { user }
	} = useContext(UsersContext);

	const location = useLocation();
	const showAside = !['/login', '/register'].includes(location.pathname);

	return (
		<>
			<GlobalStyles />
			<Header />
			<main>
				{showAside && <Aside />}
				<Routes>
					<Route path='/' element={<QuestionsPage />} />
					<Route path='/questions/:id' element={<OneQuestionPage />} />
					<Route
						path='/add'
						element={user ? <AddAQuestionPage /> : <Login />}
					/>
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='*' element={<h1>Not Found</h1>} />
				</Routes>
			</main>
			<Footer />
		</>
	);
};

export default App;

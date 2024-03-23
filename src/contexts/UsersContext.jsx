import { useReducer, createContext, useEffect } from 'react';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';

const initialState = {
	users: [],
	user: null,
	error: null,
	loading: false
};

const usersActionTypes = {
	GET_USERS: 'GET_USERS',
	LOGIN: 'LOGIN',
	REGISTER: 'REGISTER',
	FAILURE: 'FAILURE',
	LOGOUT: 'LOGOUT',
	REQUEST: 'REQUEST'
};

const UsersContext = createContext();

const reducer = (state, action) => {
	switch (action.type) {
		case usersActionTypes.REQUEST:
			return {
				...state,
				loading: true
			};
		case usersActionTypes.GET_USERS:
			return {
				...state,
				users: action.payload,
				loading: false,
				error: null
			};
		case usersActionTypes.LOGIN:
			return {
				...state,
				user: action.payload,
				loading: false,
				error: null
			};
		case usersActionTypes.REGISTER:
			return {
				users: [...state.users, action.payload],
				user: action.payload,
				loading: false,
				error: null
			};
		case usersActionTypes.FAILURE:
			return {
				...state,
				error: action.payload,
				loading: false
			};
		case usersActionTypes.LOGOUT:
			return {
				...state,
				user: null,
				loading: false,
				error: null
			};
		default:
			return state;
	}
};

const UsersContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const navigate = useNavigate();

	useEffect(() => {
		dispatch({ type: usersActionTypes.REQUEST });
		fetch(`http://localhost:8080/users`)
			.then(res => res.json())
			.then(data =>
				dispatch({ type: usersActionTypes.GET_USERS, payload: data })
			)
			.catch(error =>
				dispatch({ type: usersActionTypes.FAILURE, payload: error })
			);
	}, []);

	const login = (username, password) => {
		dispatch({ type: usersActionTypes.REQUEST });
		const user = state.users.find(
			el => el.username === username && el.password === password

			//bcrypt.compareSync(credentials.password, user.password)
		);

		if (user) {
			dispatch({ type: usersActionTypes.LOGIN, payload: user });
			navigate('/');
		} else {
			dispatch({
				type: usersActionTypes.FAILURE,
				payload: 'Wrong credentials'
			});
		}
	};

	const register = newUser => {
		dispatch({ type: usersActionTypes.REQUEST });
		const sameError = state.users.find(
			user => user.username === newUser.username
		);
		if (sameError) {
			dispatch({
				type: usersActionTypes.FAILURE,
				payload: 'Username already exists'
			});
			return;
		}
		// const newUser = {
		//     id: uuidv4(),
		//     username: credentials.username,
		//     password: bcrypt.hashSync(credentials.password, 10),
		//     email: credentials.email,
		//     photoUrl: credentials.photoUrl
		// };
		dispatch({ type: usersActionTypes.REGISTER, payload: newUser });
		fetch(`http://localhost:8080/users`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newUser)
		});
	};

	return (
		<UsersContext.Provider value={{ state, login, register }}>
			{children}
		</UsersContext.Provider>
	);
};

export default UsersContext;

export { UsersContextProvider, usersActionTypes };

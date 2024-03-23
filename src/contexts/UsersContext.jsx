import { useReducer, createContext, useEffect } from 'react';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';

const initialState = {
	users: [],
	user: null,
	error: null
};

const userActionTypes = {
	GET_USERS: 'GET_USERS',
	LOGIN: 'LOGIN',
	REGISTER: 'REGISTER',
	FAILURE: 'FAILURE',
	LOGOUT: 'LOGOUT'
};

const UserContext = createContext();

const reducer = (state, action) => {
	switch (action.type) {
		case userActionTypes.GET_USERS:
			return {
				...state,
				users: action.payload,
				error: null
			};
		case userActionTypes.LOGIN:
			return {
				...state,
				user: action.payload,
				error: null
			};
		case userActionTypes.REGISTER:
			return {
				users: [...state.users, action.payload],
				user: action.payload,
				error: null
			};
		case userActionTypes.FAILURE:
			return {
				...state,
				error: action.payload
			};
		case userActionTypes.LOGOUT:
			return {
				...state,
				user: null,
				error: null
			};
		default:
			return state;
	}
};

const UserContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`http://localhost:8080/users`)
			.then(res => res.json())
			.then(data =>
				dispatch({ type: userActionTypes.GET_USERS, payload: data })
			)
			.catch(error =>
				dispatch({ type: userActionTypes.FAILURE, payload: error })
			);
	}, []);

	const login = credentials => {
		const user = state.users.find(
			el =>
				el.username === credentials.username &&
				el.password === credentials.password

			//bcrypt.compareSync(credentials.password, user.password)
		);

		if (user) {
			dispatch({ type: userActionTypes.LOGIN, payload: user });
			navigate('/');
		} else {
			dispatch({
				type: userActionTypes.FAILURE,
				payload: 'Wrong credentials'
			});
		}
	};

	const register = newUser => {
		const sameError = state.users.find(
			user => user.username === newUser.username
		);
		if (sameError) {
			dispatch({
				type: userActionTypes.FAILURE,
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
		dispatch({ type: userActionTypes.REGISTER, payload: newUser });
		fetch(`http://localhost:8080/users`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newUser)
		});
	};

	return (
		<UserContext.Provider value={{ state, login, register }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;

export { UserContextProvider };

import { useReducer, createContext, useEffect } from 'react';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';

const initialState = {
	users: [],
	user: null,
	error: null,
	loading: true
};

const usersActionTypes = {
	GET_USERS: 'GET_USERS',
	LOGIN: 'LOGIN',
	REGISTER: 'REGISTER',
	FAILURE: 'FAILURE',
	LOGOUT: 'LOGOUT',
	REQUEST: 'REQUEST',
	ADD_LIKED_QUESTION: 'ADD_LIKED_QUESTION',
	REMOVE_LIKED_QUESTION: 'REMOVE_LIKED_QUESTION',
	ADD_DISLIKED_QUESTION: 'ADD_DISLIKED_QUESTION',
	REMOVE_DISLIKED_QUESTION: 'REMOVE_DISLIKED_QUESTION',
	ADD_LIKED_ANSWER: 'ADD_LIKED_ANSWER',
	REMOVE_LIKED_ANSWER: 'REMOVE_LIKED_ANSWER',
	ADD_DISLIKED_ANSWER: 'ADD_DISLIKED_ANSWER',
	REMOVE_DISLIKED_ANSWER: 'REMOVE_DISLIKED_ANSWER'
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
		case usersActionTypes.ADD_LIKED_QUESTION:
			return {
				...state,
				user: {
					...state.user,
					likedQuestions: [...state.user.likedQuestions, action.payload]
				},
				error: null
			};
		case usersActionTypes.REMOVE_LIKED_QUESTION:
			return {
				...state,
				user: {
					...state.user,
					likedQuestions: state.user.likedQuestions.filter(
						id => id !== action.payload
					)
				},
				error: null
			};
		case usersActionTypes.ADD_DISLIKED_QUESTION:
			return {
				...state,
				user: {
					...state.user,
					dislikedQuestions: [...state.user.dislikedQuestions, action.payload]
				},
				error: null
			};
		case usersActionTypes.REMOVE_DISLIKED_QUESTION:
			return {
				...state,
				user: {
					...state.user,
					dislikedQuestions: state.user.dislikedQuestions.filter(
						id => id !== action.payload
					)
				},
				error: null
			};

		case usersActionTypes.ADD_LIKED_ANSWER:
			return {
				...state,
				user: {
					...state.user,
					likedAnswers: [...state.user.likedAnswers, action.payload]
				},
				error: null
			};
		case usersActionTypes.REMOVE_LIKED_ANSWER:
			return {
				...state,
				user: {
					...state.user,
					likedAnswers: state.user.likedAnswers.filter(
						id => id !== action.payload
					)
				},
				error: null
			};
		case usersActionTypes.ADD_DISLIKED_ANSWER:
			return {
				...state,
				user: {
					...state.user,
					dislikedAnswers: [...state.user.dislikedAnswers, action.payload]
				},
				error: null
			};
		case usersActionTypes.REMOVE_DISLIKED_ANSWER:
			return {
				...state,
				user: {
					...state.user,
					dislikedAnswers: state.user.dislikedAnswers.filter(
						id => id !== action.payload
					)
				},
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
			el =>
				el.username === username && bcrypt.compareSync(password, el.password)
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
		dispatch({ type: usersActionTypes.REQUEST });
		fetch(`http://localhost:8080/users`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newUser)
		})
			.then(response => {
				if (!response.ok) {
					dispatch({
						type: usersActionTypes.FAILURE,
						payload: 'Failed to register user'
					});
				}
				return response.json();
			})
			.then(data => {
				dispatch({ type: usersActionTypes.REGISTER, payload: data });
				navigate('/');
			})
			.catch(error => {
				dispatch({
					type: usersActionTypes.FAILURE,
					payload: error.message
				});
			});
	};

	const logout = () => {
		dispatch({ type: usersActionTypes.LOGOUT });
		navigate('/');
	};

	const updateQuestion = (type, questionId, likedOrDisliked) => {
		dispatch({
			type: type,
			payload: questionId
		});
		fetch(`http://localhost:8080/users/${state.user.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ [likedOrDisliked]: state.user[likedOrDisliked] })
		});
	};

	const addLikedQuestion = questionId =>
		updateQuestion(
			usersActionTypes.ADD_LIKED_QUESTION,
			questionId,
			'likedQuestions'
		);
	const addDislikedQuestion = questionId =>
		updateQuestion(
			usersActionTypes.ADD_DISLIKED_QUESTION,
			questionId,
			'dislikedQuestions'
		);
	const removeLikedQuestion = questionId =>
		updateQuestion(
			usersActionTypes.REMOVE_LIKED_QUESTION,
			questionId,
			'likedQuestions'
		);
	const removeDislikedQuestion = questionId =>
		updateQuestion(
			usersActionTypes.REMOVE_DISLIKED_QUESTION,
			questionId,
			'dislikedQuestions'
		);

	const updateAnswer = (type, answerId, likedOrDisliked) => {
		dispatch({
			type: type,
			payload: answerId
		});
		fetch(`http://localhost:8080/users/${state.user.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ [likedOrDisliked]: state.user[likedOrDisliked] })
		});
	};

	const addLikedAnswer = answerId =>
		updateQuestion(usersActionTypes.ADD_LIKED_ANSWER, answerId, 'likedAnswers');
	const addDislikedAnswer = answerId =>
		updateQuestion(
			usersActionTypes.ADD_DISLIKED_ANSWER,
			answerId,
			'dislikedAnswers'
		);
	const removeLikedAnswer = answerId =>
		updateQuestion(
			usersActionTypes.REMOVE_LIKED_ANSWER,
			answerId,
			'likedAnswers'
		);
	const removeDislikedAnswer = answerId =>
		updateQuestion(
			usersActionTypes.REMOVE_DISLIKED_ANSWER,
			answerId,
			'dislikedAnswers'
		);
	return (
		<UsersContext.Provider
			value={{
				state,
				login,
				register,
				logout,
				addLikedQuestion,
				removeLikedQuestion,
				addDislikedQuestion,
				removeDislikedQuestion,
				addLikedAnswer,
				removeLikedAnswer,
				addDislikedAnswer,
				removeDislikedAnswer
			}}
		>
			{children}
		</UsersContext.Provider>
	);
};

export default UsersContext;

export { UsersContextProvider, usersActionTypes };

import { createContext, useReducer, useEffect, useContext } from 'react';
import ToastContext from './ToastContext';

const InitialState = {
	loading: true,
	answers: [],
	error: null
};

const AnswersContext = createContext();

const answersActionTypes = {
	FETCH_ANSWERS: 'FETCH_ANSWERS',
	ADD_ANSWER: 'ADD_ANSWER',
	REMOVE_ANSWER: 'REMOVE_ANSWER',
	EDIT_ANSWER: 'EDIT_ANSWER',
	REQUEST: 'REQUEST',
	FAILURE: 'FAILURE',
	CHANGE_LIKES: 'CHANGE_LIKES'
};

const reducer = (state, action) => {
	switch (action.type) {
		case answersActionTypes.REQUEST:
			return {
				...state,
				loading: true
			};
		case answersActionTypes.FAILURE:
			return {
				...state,
				loading: false,
				error: action.error
			};
		case answersActionTypes.FETCH_ANSWERS:
			return {
				...state,
				loading: false,
				answers: action.payload,
				error: null
			};
		case answersActionTypes.ADD_ANSWER:
			return {
				...state,
				answers: [...state.answers, action.payload],
				loading: false,
				error: null
			};
		case answersActionTypes.REMOVE_ANSWER:
			return {
				...state,
				loading: false,
				answers: state.answers.filter(answer => answer.id !== action.payload),
				error: null
			};
		case answersActionTypes.EDIT_ANSWER:
			return {
				...state,
				loading: false,
				answers: state.answers.map(answer =>
					answer.id === action.payload.id
						? {
								...answer,
								text: action.payload.answer.text,
								edited: action.payload.answer.edited
						  }
						: answer
				),
				error: null
			};
		case answersActionTypes.CHANGE_LIKES: {
			return {
				...state,
				loading: false,
				answers: state.answers.map(answer =>
					answer.id === action.payload.id
						? { ...answer, likes: answer.likes + action.payload.like }
						: answer
				),
				error: null
			};
		}
		default:
			return state;
	}
};

const AnswersContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, InitialState);
	const showToast = useContext(ToastContext);

	useEffect(() => {
		dispatch({ type: answersActionTypes.REQUEST });
		fetch('http://localhost:8080/answers')
			.then(res => res.json())
			.then(data => {
				dispatch({ type: answersActionTypes.FETCH_ANSWERS, payload: data });
			})
			.catch(error => {
				dispatch({
					type: answersActionTypes.FAILURE,
					error: 'Could not fetch answers. Please try again later.'
				});
			});
	}, []);

	const addAnswer = newAnswer => {
		fetch('http://localhost:8080/answers', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newAnswer)
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('HTTP status ' + response.status);
				}
				return response.json();
			})
			.then(data => {
				dispatch({
					type: answersActionTypes.ADD_ANSWER,
					payload: newAnswer
				});
				showToast('Answer added successfully!', 'success');
			})
			.catch(error => {
				dispatch({
					type: answersActionTypes.FAILURE,
					error: error.toString()
				});
				showToast('Could not add answer. Please try again later.', 'error');
			});
	};

	const removeAnswer = answerId => {
		fetch(`http://localhost:8080/answers/${answerId}`, {
			method: 'DELETE'
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('HTTP status ' + response.status);
				}
				return response;
			})
			.then(() => {
				dispatch({
					type: answersActionTypes.REMOVE_ANSWER,
					payload: answerId
				});
				showToast('Answer removed successfully!', 'success');
			})
			.catch(error => {
				dispatch({
					type: answersActionTypes.FAILURE,
					error: error.toString()
				});
				showToast('Could not remove answer. Please try again later.', 'error');
			});
	};

	const editAnswer = (values, id) => {
		const editedAnswer = {
			text: values.text,
			edited: new Date().toISOString()
		};
		fetch(`http://localhost:8080/answers/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(editedAnswer)
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('HTTP status ' + response.status);
				}
				return response.json();
			})
			.then(data => {
				dispatch({
					type: answersActionTypes.EDIT_ANSWER,
					payload: { id: id, answer: editedAnswer }
				});
				showToast('Answer edited successfully!', 'success');
			})
			.catch(error => {
				dispatch({
					type: answersActionTypes.FAILURE,
					error: error.toString()
				});
				showToast('Could not edit answer. Please try again later.', 'error');
			});
	};

	const changeLikes = (answer, like) => {
		fetch(`http://localhost:8080/answers/${answer.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				likes: answer.likes + like
			})
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('HTTP status ' + response.status);
				}
				return response.json();
			})
			.then(data => {
				dispatch({
					type: answersActionTypes.CHANGE_LIKES,
					payload: { id: answer.id, like: like }
				});
			})
			.catch(error => {
				dispatch({
					type: answersActionTypes.FAILURE,
					error: error.toString()
				});
			});
	};

	return (
		<AnswersContext.Provider
			value={{ state, addAnswer, removeAnswer, editAnswer, changeLikes }}
		>
			{children}
		</AnswersContext.Provider>
	);
};

export default AnswersContext;
export { AnswersContextProvider };

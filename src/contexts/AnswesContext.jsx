import { createContext, useReducer, useEffect } from 'react';

const InitialState = {
	loading: false,
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
	FAILURE: 'FAILURE'
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
				loading: false,
				answers: [...state.answers, action.payload.answer],
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
					answer.id === action.payload.id ? action.payload : answer
				),
				error: null
			};
		default:
			return state;
	}
};

const AnswersContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, InitialState);

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
		dispatch({ type: answersActionTypes.REQUEST });
		fetch('http://localhost:8080/answers', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newAnswer)
		})
			.then(res => res.json())
			.then(data => {
				dispatch({
					type: answersActionTypes.ADD_ANSWER,
					payload: newAnswer
				});
			})
			.catch(error => {
				dispatch({
					type: answersActionTypes.FAILURE,
					error: error.toString()
				});
			});
	};

	const removeAnswer = answerId => {
		dispatch({ type: answersActionTypes.REQUEST });
		fetch(`http://localhost:8080/answers/${answerId}`, {
			method: 'DELETE'
		})
			.then(() => {
				dispatch({
					type: answersActionTypes.REMOVE_ANSWER,
					payload: answerId
				});
			})
			.catch(error => {
				dispatch({
					type: answersActionTypes.FAILURE,
					error: error.toString()
				});
			});
	};

	const editAnswer = answer => {
		dispatch({ type: answersActionTypes.REQUEST });
		fetch(`http://localhost:8080/answers/${answer.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(answer)
		})
			.then(res => res.json())
			.then(data => {
				dispatch({
					type: answersActionTypes.EDIT_ANSWER,
					payload: answer
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
			value={{ state, addAnswer, removeAnswer, editAnswer }}
		>
			{children}
		</AnswersContext.Provider>
	);
};

export default AnswersContext;
export { AnswersContextProvider };

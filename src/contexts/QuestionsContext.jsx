import { createContext, useReducer, useEffect } from 'react';

const InitialState = {
	loading: false,
	questions: [],
	error: null
};

const QuestionsContext = createContext();

const questionsActionTypes = {
	FETCH_QUESTIONS: 'FETCH_QUESTIONS',
	ADD_QUESTION: 'ADD_QUESTION',
	REMOVE_QUESTION: 'REMOVE_QUESTION',
	EDIT_QUESTION: 'EDIT_QUESTION',
	REQUEST: 'REQUEST',
	FAILURE: 'FAILURE'
};

const reducer = (state, action) => {
	switch (action.type) {
		case questionsActionTypes.REQUEST:
			return {
				...state,
				loading: true
			};
		case questionsActionTypes.FAILURE:
			return {
				...state,
				loading: false,
				error: action.error
			};
		case questionsActionTypes.FETCH_QUESTIONS:
			return {
				...state,
				loading: false,
				questions: action.payload,
				error: null
			};
		case questionsActionTypes.ADD_QUESTION:
			return {
				...state,
				loading: false,
				questions: [...state.questions, action.payload.question],
				error: null
			};
		case questionsActionTypes.REMOVE_QUESTION:
			return {
				...state,
				loading: false,
				questions: state.questions.filter(
					question => question.id !== action.payload
				),
				error: null
			};
		case questionsActionTypes.EDIT_QUESTION:
			return {
				...state,
				loading: false,
				questions: state.questions.map(question =>
					question.id === action.payload.id ? action.payload : question
				),
				error: null
			};
		default:
			return state;
	}
};

const QuestionsContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, InitialState);

	useEffect(() => {
		dispatch({ type: questionsActionTypes.REQUEST });
		fetch('http://localhost:8080/questions')
			.then(res => res.json())
			.then(data => {
				dispatch({ type: questionsActionTypes.FETCH_QUESTIONS, payload: data });
			})
			.catch(error => {
				dispatch({
					type: questionsActionTypes.FAILURE,
					error: 'Could not fetch questions. Please try again later.'
				});
			});
	}, []);

	const addQuestion = newQuestion => {
		dispatch({ type: questionsActionTypes.REQUEST });
		fetch('http://localhost:8080/questions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newQuestion)
		})
			.then(res => res.json())
			.then(data => {
				dispatch({
					type: questionsActionTypes.ADD_QUESTION,
					payload: newQuestion
				});
			})
			.catch(error => {
				dispatch({
					type: questionsActionTypes.FAILURE,
					error: error.toString()
				});
			});
	};

	const removeQuestion = questionId => {
		dispatch({ type: questionsActionTypes.REQUEST });
		fetch(`http://localhost:8080/questions/${questionId}`, {
			method: 'DELETE'
		})
			.then(() => {
				dispatch({
					type: questionsActionTypes.REMOVE_QUESTION,
					payload: questionId
				});
			})
			.catch(error => {
				dispatch({
					type: questionsActionTypes.FAILURE,
					error: error.toString()
				});
			});
	};

	const editQuestion = question => {
		dispatch({ type: questionsActionTypes.REQUEST });
		fetch(`http://localhost:8080/questions/${question.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(question)
		})
			.then(res => res.json())
			.then(data => {
				dispatch({
					type: questionsActionTypes.EDIT_QUESTION,
					payload: question
				});
			})
			.catch(error => {
				dispatch({
					type: questionsActionTypes.FAILURE,
					error: error.toString()
				});
			});
	};

	return (
		<QuestionsContext.Provider
			value={{ state, addQuestion, removeQuestion, editQuestion }}
		>
			{children}
		</QuestionsContext.Provider>
	);
};

export default QuestionsContext;
export { QuestionsContextProvider };

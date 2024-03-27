import { createContext, useReducer, useEffect } from 'react';
import UsersContext from '../contexts/UsersContext';
import { v4 as uuidv4 } from 'uuid';
import { useContext } from 'react';
import ToastContext from './ToastContext';

const InitialState = {
	loading: true,
	questions: [],
	originalQuestions: [],
	error: null,
	isSortedByDate: false,
	isSortedByAnswers: false,
	isFiltered: false,
	editingQuestion: null
};

const QuestionsContext = createContext();

const questionsActionTypes = {
	FETCH_QUESTIONS: 'FETCH_QUESTIONS',
	SET_ORIGINAL_QUESTIONS: 'SET_ORIGINAL_QUESTIONS',
	ADD_QUESTION: 'ADD_QUESTION',
	REMOVE_QUESTION: 'REMOVE_QUESTION',
	EDIT_QUESTION: 'EDIT_QUESTION',
	CHANGE_LIKES: 'CHANGE_LIKES',
	REQUEST: 'REQUEST',
	FAILURE: 'FAILURE',
	SORT: 'SORT',
	FILTER: 'FILTER',
	SEARCH: 'SEARCH',
	RESET_SEARCH: 'RESET_SEARCH',
	SET_EDITING_QUESTION: 'SET_EDITING_QUESTION'
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
				questions: [action.payload, ...state.questions],
				originalQuestions: [action.payload, ...state.originalQuestions],
				error: null
			};
		case questionsActionTypes.REMOVE_QUESTION:
			return {
				...state,
				loading: false,
				questions: state.questions.filter(
					question => question.id !== action.payload
				),
				originalQuestions: state.originalQuestions.filter(
					question => question.id !== action.payload
				),
				error: null
			};
		case questionsActionTypes.EDIT_QUESTION:
			return {
				...state,
				loading: false,
				editingQuestion: null,
				questions: state.questions.map(question =>
					question.id === action.payload.id
						? {
								...question,
								title: action.payload.question.title,
								text: action.payload.question.text,
								photo: action.payload.question.photo,
								edited: action.payload.question.edited
						  }
						: question
				),
				originalQuestions: state.originalQuestions.map(question =>
					question.id === action.payload.id
						? {
								...question,
								title: action.payload.question.title,
								text: action.payload.question.text,
								photo: action.payload.question.photo,
								edited: action.payload.question.edited
						  }
						: question
				),
				error: null
			};
		case questionsActionTypes.CHANGE_LIKES:
			return {
				...state,
				loading: false,
				questions: state.questions.map(question =>
					question.id === action.payload.id
						? { ...question, likes: question.likes + action.payload.like }
						: question
				),
				originalQuestions: state.originalQuestions.map(question =>
					question.id === action.payload.id
						? { ...question, likes: question.likes + action.payload.like }
						: question
				),
				error: null
			};
		case questionsActionTypes.SET_ORIGINAL_QUESTIONS:
			return {
				...state,
				originalQuestions: action.payload
			};
		case questionsActionTypes.SORT:
			const questionsWithAnswerCount = state.originalQuestions.map(question => {
				const answerCount = action.payload.answers.filter(
					answer => answer.questionId === question.id
				).length;
				return { ...question, answerCount };
			});
			if (action.payload.sortType === 'answerCount') {
				if (state.isSortedByAnswers) {
					return {
						...state,
						questions: state.originalQuestions,
						isSortedByAnswers: false
					};
				}
				let sortedQuestions = [...questionsWithAnswerCount].sort(
					(a, b) => b.answerCount - a.answerCount
				);
				return {
					...state,
					questions: sortedQuestions,
					isSortedByAnswers: true,
					isSortedByDate: false,
					isFiltered: false
				};
			} else if (action.payload.sortType === 'created') {
				if (state.isSortedByDate) {
					return {
						...state,
						questions: state.originalQuestions,
						isSortedByDate: false
					};
				}
				let sortedQuestions = [...questionsWithAnswerCount].sort(
					(a, b) => new Date(b.created) - new Date(a.created)
				);
				return {
					...state,
					questions: sortedQuestions,
					isSortedByDate: true,
					isSortedByAnswers: false,
					isFiltered: false
				};
			}
		case questionsActionTypes.FILTER:
			if (state.isFiltered) {
				return {
					...state,
					questions: state.originalQuestions,
					isFiltered: false
				};
			} else {
				const filteredQuestions = state.questions.filter(question => {
					const answerCount = action.payload.answers.filter(
						answer => answer.questionId === question.id
					).length;
					return answerCount === 0;
				});
				return {
					...state,
					questions: filteredQuestions,
					isFiltered: true,
					isSortedByDate: false,
					isSortedByAnswers: false
				};
			}
		case questionsActionTypes.SEARCH:
			const searchQuery = action.payload;
			return {
				...state,
				questions: state.originalQuestions.filter(
					question =>
						question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
						question.text.toLowerCase().includes(searchQuery.toLowerCase())
				)
			};
		case questionsActionTypes.RESET_SEARCH:
			return {
				...state,
				questions: state.originalQuestions,
				isFiltered: false,
				isSortedByDate: false,
				isSortedByAnswers: false
			};
		case questionsActionTypes.SET_EDITING_QUESTION:
			return {
				...state,
				editingQuestion: action.payload
			};
		default:
			return state;
	}
};

const QuestionsContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, InitialState);
	const {
		state: { user }
	} = useContext(UsersContext);
	const showToast = useContext(ToastContext);

	useEffect(() => {
		dispatch({ type: questionsActionTypes.REQUEST });
		fetch('http://localhost:8080/questions')
			.then(res => res.json())
			.then(data => {
				const sortedData = data.sort((a, b) => b.likes - a.likes);
				dispatch({
					type: questionsActionTypes.FETCH_QUESTIONS,
					payload: sortedData
				});
				dispatch({
					type: questionsActionTypes.SET_ORIGINAL_QUESTIONS,
					payload: sortedData
				});
			})
			.catch(error => {
				dispatch({
					type: questionsActionTypes.FAILURE,
					error: 'Could not fetch questions. Please try again later.'
				});
			});
	}, []);

	const addQuestion = values => {
		const newQuestion = {
			id: uuidv4(),
			creatorId: user.id,
			text: values.text,
			title: values.title,
			likes: 0,
			edited: false,
			created: new Date().toISOString(),
			photo: values.photo
		};
		fetch('http://localhost:8080/questions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newQuestion)
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('HTTP status ' + response.status);
				}
				return response.json();
			})
			.then(data => {
				dispatch({
					type: questionsActionTypes.ADD_QUESTION,
					payload: newQuestion
				});
				showToast('Question added successfully!', 'success');
			})
			.catch(error => {
				dispatch({
					type: questionsActionTypes.FAILURE,
					error: error.toString()
				});
				showToast('Could not add question. Please try again later.', 'error');
			});
	};

	const removeQuestion = questionId => {
		fetch(`http://localhost:8080/questions/${questionId}`, {
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
					type: questionsActionTypes.REMOVE_QUESTION,
					payload: questionId
				});
				showToast('Question removed successfully!', 'success');
			})
			.catch(error => {
				dispatch({
					type: questionsActionTypes.FAILURE,
					error: error.toString()
				});
				showToast(
					'Could not remove question. Please try again later.',
					'error'
				);
			});
	};

	const editQuestion = (values, id) => {
		const editedQuestion = {
			title: values.title,
			text: values.text,
			photo: values.photo,
			edited: new Date().toISOString()
		};

		fetch(`http://localhost:8080/questions/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(editedQuestion)
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('HTTP status ' + response.status);
				}
				return response.json();
			})
			.then(data => {
				dispatch({
					type: questionsActionTypes.EDIT_QUESTION,
					payload: { id: id, question: editedQuestion }
				});
				showToast('Question edited successfully!', 'success');
			})
			.catch(error => {
				dispatch({
					type: questionsActionTypes.FAILURE,
					error: error.toString()
				});
				showToast('Could not edit question. Please try again later.', 'error');
			});
	};

	const changeLikes = (question, like) => {
		fetch(`http://localhost:8080/questions/${question.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				likes: question.likes + like
			})
		})
			.then(res => res.json())
			.then(data => {
				dispatch({
					type: questionsActionTypes.CHANGE_LIKES,
					payload: { id: question.id, like: like }
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
			value={{
				state,
				addQuestion,
				removeQuestion,
				editQuestion,
				changeLikes,
				dispatch
			}}
		>
			{children}
		</QuestionsContext.Provider>
	);
};

export default QuestionsContext;
export { QuestionsContextProvider, questionsActionTypes };

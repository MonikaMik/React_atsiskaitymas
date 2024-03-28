import { createContext, useRef, useContext } from 'react';
import QuestionsContext from './QuestionsContext';
import AnswersContext from './AnswersContext';

const DialogContext = createContext();

const DialogProvider = ({ children }) => {
	const editDialogRef = useRef(null);
	const answerEditDialogRef = useRef(null);
	const replyDialogRef = useRef(null);
	const { dispatch } = useContext(QuestionsContext);
	const { dispatch: answersDispatch } = useContext(AnswersContext);

	const showForm = () => {
		editDialogRef.current.showModal();
	};

	const hideForm = () => {
		dispatch({
			type: 'SET_EDITING_QUESTION',
			payload: null
		});
		editDialogRef.current.close();
	};

	const showAnswerForm = () => {
		answerEditDialogRef.current.showModal();
	};

	const hideAnswerForm = () => {
		answersDispatch({
			type: 'SET_EDITING_ANSWER',
			payload: null
		});
		answerEditDialogRef.current.close();
	};

	return (
		<DialogContext.Provider
			value={{
				editDialogRef,
				answerEditDialogRef,
				showForm,
				hideForm,
				showAnswerForm,
				hideAnswerForm,
				replyDialogRef
			}}
		>
			{children}
		</DialogContext.Provider>
	);
};

export { DialogProvider };
export default DialogContext;

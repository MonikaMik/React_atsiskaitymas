import { useContext } from 'react';
import UsersContext from '../contexts/UsersContext';
import QuestionsContext from '../contexts/QuestionsContext';
import { useNavigate } from 'react-router-dom';

export const useQuestionHandlers = question => {
	const {
		state: { user },
		addLikedQuestion,
		removeLikedQuestion,
		addDislikedQuestion,
		removeDislikedQuestion
	} = useContext(UsersContext);
	const { changeLikes } = useContext(QuestionsContext);
	const navigate = useNavigate();

	const handleLike = () => {
		if (user) {
			if (user.likedQuestions.includes(question.id)) {
				removeDislikedQuestion(question.id);
				removeLikedQuestion(question.id);
				changeLikes(question, -1);
			} else {
				if (user.dislikedQuestions.includes(question.id)) {
					changeLikes(question, 2);
				} else {
					changeLikes(question, 1);
				}
				removeDislikedQuestion(question.id);
				addLikedQuestion(question.id);
			}
		} else {
			navigate('/login');
		}
	};

	const handleDislike = () => {
		if (user) {
			if (user.dislikedQuestions.includes(question.id)) {
				removeLikedQuestion(question.id);
				removeDislikedQuestion(question.id);
				changeLikes(question, 1);
			} else {
				if (user.likedQuestions.includes(question.id)) {
					changeLikes(question, -2);
				} else {
					changeLikes(question, -1);
				}
				removeLikedQuestion(question.id);
				addDislikedQuestion(question.id);
			}
		} else {
			navigate('/login');
		}
	};

	return { handleLike, handleDislike };
};

import { useContext } from 'react';
import UsersContext from '../contexts/UsersContext';
import AnswersContext from '../contexts/AnswersContext';
import { useNavigate } from 'react-router-dom';

export const useAnswerHandlers = answer => {
	const {
		state: { user },
		addLikedAnswer,
		removeLikedAnswer,
		addDislikedAnswer,
		removeDislikedAnswer
	} = useContext(UsersContext);
	const { changeLikes } = useContext(AnswersContext);
	const navigate = useNavigate();

	const handleLike = () => {
		if (user) {
			if (user.likedAnswers.includes(answer.id)) {
				removeDislikedAnswer(answer.id);
				removeLikedAnswer(answer.id);
				changeLikes(answer, -1);
			} else {
				if (user.dislikedAnswers.includes(answer.id)) {
					changeLikes(answer, 2);
				} else {
					changeLikes(answer, 1);
				}
				removeDislikedAnswer(answer.id);
				addLikedAnswer(answer.id);
			}
		} else {
			navigate('/login');
		}
	};

	const handleDislike = () => {
		if (user) {
			if (user.dislikedAnswers.includes(answer.id)) {
				removeLikedAnswer(answer.id);
				removeDislikedAnswer(answer.id);
				changeLikes(answer, 1);
			} else {
				if (user.likedAnswers.includes(answer.id)) {
					changeLikes(answer, -2);
				} else {
					changeLikes(answer, -1);
				}
				removeLikedAnswer(answer.id);
				addDislikedAnswer(answer.id);
			}
		} else {
			navigate('/login');
		}
	};

	return { handleLike, handleDislike };
};

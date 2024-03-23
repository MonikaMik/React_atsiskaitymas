import { useContext } from 'react';
import QuestionsContext from '../../contexts/QuestionsContext';

const QuestionsPage = () => {
	const { state } = useContext(QuestionsContext);
	return (
		<div>
			<h1>Questions</h1>
			{state.questions.map(question => (
				<div key={question.id}>
					<h2>{question.title}</h2>
					<p>{question.text}</p>
				</div>
			))}
		</div>
	);
};
export default QuestionsPage;

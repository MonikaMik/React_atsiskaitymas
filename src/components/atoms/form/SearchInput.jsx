import { useFormik } from 'formik';
import { useContext } from 'react';
import QuestionsContext, {
	questionsActionTypes
} from '../../../contexts/QuestionsContext';
import styled from 'styled-components';

const StyledSearchInputContainer = styled.div`
	position: relative;
	padding-inline: 3rem;
`;

const StyledSearchIcon = styled.i`
	position: absolute;
	left: 58px;
	top: 50%;
	transform: translateY(-50%);
	color: black;
`;

const StyledInput = styled.input`
	width: 88%;
	border-radius: 5px;
	border: 1px solid var(--border-grey);
	padding: 0.5rem 0.5rem 0.5rem 30px;
	max-height: 1.1rem;
`;

const SearchInput = () => {
	const { dispatch } = useContext(QuestionsContext);

	const formik = useFormik({
		initialValues: {
			search: ''
		}
	});

	return (
		<>
			<form>
				<StyledSearchInputContainer>
					<StyledSearchIcon className='bi bi-search' />
					<StyledInput
						id='search'
						name='search'
						type='text'
						placeholder='Search...'
						onChange={e => {
							formik.handleChange(e);
							dispatch({
								type: questionsActionTypes.SEARCH,
								payload: e.target.value
							});
						}}
						value={formik.values.search}
					/>
				</StyledSearchInputContainer>
			</form>
		</>
	);
};

export default SearchInput;

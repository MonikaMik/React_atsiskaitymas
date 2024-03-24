import styled from 'styled-components';

const StyledSubmitButton = styled.input`
	width: 100%;
	background-color: var(--accent-orange);
	border: none;
	border-radius: 5px;
	color: white;
	padding-block: 9px;
	margin-top: 1rem;
	&:hover {
		background-color: orange;
		cursor: pointer;
	}
`;

const SubmitButton = ({ text }) => {
	return <StyledSubmitButton type='submit' value={text} />;
};
export default SubmitButton;

import styled from 'styled-components';
import Icon from './Icon';

const StyledFilterButton = styled.button`
	background-color: ${props =>
		props.$isSorted ? 'var(--accent-blue)' : 'var(--accent-grey)'};
	color: ${props => (props.$isSorted ? 'white' : 'var(--text-grey)')};
	border: none;
	border-radius: 100px;
	padding: 0.3rem 0.6rem;
	> i {
		margin-right: 0.2rem;
	}
	&:hover {
		background-color: var(--accent-blue);
		color: white;
		cursor: pointer;
		> i {
			color: white;
		}
	}
`;

const FilterButton = ({ onClickF, icon, text, isSorted }) => {
	return (
		<StyledFilterButton onClick={onClickF} $isSorted={isSorted}>
			<Icon
				iconClass={icon}
				size='0.8em'
				color={isSorted ? 'white' : 'var(--text-grey)'}
			/>
			{text}
		</StyledFilterButton>
	);
};
export default FilterButton;

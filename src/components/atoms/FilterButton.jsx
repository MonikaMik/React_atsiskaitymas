import styled from 'styled-components';
import Icon from './Icon';

const StyledFilterButton = styled.button`
	background-color: var(--accent-grey);
	color: var(--text-grey);
	border: none;
	border-radius: 100px;
	padding: 0.2rem 0.6rem;
	> i {
		margin-right: 0.2rem;
	}
`;

const FilterButton = () => {
	return (
		<StyledFilterButton>
			<Icon iconClass='bi-funnel' size='0.8em' color='var(--text-grey)' />
			new
		</StyledFilterButton>
	);
};
export default FilterButton;

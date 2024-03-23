import styled from 'styled-components';
import Icon from '../../atoms/Icon';

const StyledCardMetadata = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	margin-inline: 1rem;
	align-self: center;
	> p {
		font-size: 1.1rem;
		margin-block: 0.8rem;
	}
`;

const CardMetadata = ({ likes }) => {
	return (
		<StyledCardMetadata>
			<Icon iconClass='bi-hand-thumbs-up' size='1.5em' color='gray' />
			<p>{likes}</p>
			<Icon iconClass='bi-hand-thumbs-down' size='1.5em' color='gray' />
		</StyledCardMetadata>
	);
};
export default CardMetadata;

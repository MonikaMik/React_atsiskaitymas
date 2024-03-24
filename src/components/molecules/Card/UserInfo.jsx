import styled from 'styled-components';
import Avatar from '../../atoms/Avatar';
import { FaintText } from '../../atoms/Typography';
import { formatDistanceToNow } from 'date-fns';

const StyledUserInfo = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	> div p {
		margin-block: 8px;
	}
`;

const UserInfo = ({ creator, created }) => {
	const timeAgo = created
		? formatDistanceToNow(new Date(created), { addSuffix: true })
		: null;
	return (
		<StyledUserInfo>
			<Avatar src={creator.photoUrl} title='User Avatar' />
			<div>
				<p>{creator.username}</p>
				{created && <FaintText>{timeAgo}</FaintText>}
			</div>
		</StyledUserInfo>
	);
};
export default UserInfo;

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
	> i {
		align-self: flex-start;
	}
`;

const UserInfo = ({ creator, created, edited }) => {
	const timeAgo = created
		? formatDistanceToNow(new Date(created), { addSuffix: true })
		: null;

	return (
		<StyledUserInfo>
			<Avatar
				src={creator.photoUrl}
				title='User Avatar'
				size={created ? 'large' : 'small'}
			/>
			<div>
				<p>{creator.username}</p>
				{created && <FaintText>{timeAgo}</FaintText>}
			</div>

			{edited && (
				<i>
					<FaintText>
						- edited {new Date(edited).toLocaleDateString()},{' '}
						{new Date(edited).toLocaleTimeString([], {
							hour: '2-digit',
							minute: '2-digit'
						})}
					</FaintText>
				</i>
			)}
		</StyledUserInfo>
	);
};
export default UserInfo;

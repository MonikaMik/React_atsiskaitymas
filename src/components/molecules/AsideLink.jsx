import styled from 'styled-components';
import Icon from '../atoms/Icon';
import { NavLink, Link } from 'react-router-dom';

const StyledAsideLink = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	padding-block: 0.8rem;
	> i {
		margin-left: 3rem;
	}
	&:hover {
		> i {
			color: var(--accent-blue);
		}
	}
	&:has(a.active) {
		background-color: var(--accent-peach);
		border-left: 6px solid var(--accent-orange);
		> i {
			color: var(--accent-orange);
		}
	}
	> a {
		color: var(--text-grey);
		text-decoration: none;
		&:hover {
			color: var(--accent-blue);
			~ i {
				color: var(--accent-blue);
			}
		}
		&.active {
			color: var(--accent-orange);
		}
	}
`;

const AsideLink = ({ link, icon, text }) => {
	return (
		<StyledAsideLink>
			<Icon iconClass={icon} color='var(--text-grey)' size='large' />
			{text === 'Your likes' ? (
				<Link to={link}>{text}</Link>
			) : (
				<NavLink to={link}>{text}</NavLink>
			)}
		</StyledAsideLink>
	);
};
export default AsideLink;

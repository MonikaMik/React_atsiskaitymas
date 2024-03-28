import styled from 'styled-components';

const StyledSkeleton = styled.div`
	flex-basis: 70%;
	padding: 2rem 15% 2rem 5%;
	display: flex;
	flex-direction: column;
	gap: 2rem;
`;

const SkeletonBlock = styled.div`
	background-color: #ddd;
	border-radius: 5px;
	height: 12rem;
	width: 100%;
`;

const QuestionsPageSkeleton = () => {
	return (
		<StyledSkeleton>
			<SkeletonBlock />
			<SkeletonBlock />
			<SkeletonBlock />
			<SkeletonBlock />
			<SkeletonBlock />
		</StyledSkeleton>
	);
};

export default QuestionsPageSkeleton;

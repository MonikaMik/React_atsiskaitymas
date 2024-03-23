import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
	border: 1px solid var(--primary-color);
	border-radius: 5px;
	padding: 0.5rem;
	flex: 1;
	max-height: 1.1rem;
`;
const StyledTextarea = styled.textarea`
	border: 1px solid var(--primary-color);
	border-radius: 5px;
	padding: 0.5rem;
	flex: 1;
`;

const Input = ({ id, type = 'text', onChangeF, onBlurF, value }) => (
	<>
		{type === 'textarea' ? (
			<StyledTextarea
				id={id}
				name={id}
				onChange={onChangeF}
				onBlur={onBlurF}
				value={value}
			/>
		) : (
			<StyledInput
				id={id}
				type={type}
				name={id}
				onChange={onChangeF}
				onBlur={onBlurF}
				value={value}
			/>
		)}
	</>
);

export default Input;

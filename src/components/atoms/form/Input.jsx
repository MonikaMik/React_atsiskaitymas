import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
	border: 1px solid var(--border-grey);
	border-radius: 5px;
	padding: 0.5rem;
	flex: 1;
	max-height: 1.1rem;
`;
const StyledTextarea = styled.textarea`
	border: 1px solid var(--border-grey);
	border-radius: 5px;
	padding: 0.5rem;
	flex: 1;
	resize: vertical;
`;

const Input = ({
	id,
	type = 'text',
	onChangeF,
	onBlurF,
	placeholder,
	value
}) => (
	<>
		{type === 'textarea' ? (
			<StyledTextarea
				id={id}
				name={id}
				placeholder={placeholder}
				onChange={onChangeF}
				onBlur={onBlurF}
				value={value}
			/>
		) : (
			<StyledInput
				id={id}
				type={type}
				name={id}
				placeholder={placeholder}
				onChange={onChangeF}
				onBlur={onBlurF}
				value={value}
			/>
		)}
	</>
);

export default Input;

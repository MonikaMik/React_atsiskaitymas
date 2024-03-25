import Label from '../atoms/form/Label';
import Input from '../atoms/form/Input';
import ErrorMessage from '../atoms/form/ErrorMessage';
import styled from 'styled-components';

const StyledFormField = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	margin-bottom: 1rem;
`;

const InputField = ({
	id,
	type,
	onChangeF,
	onBlurF,
	value,
	placeholder,
	label = true,
	error
}) => (
	<StyledFormField>
		{label && <Label htmlFor={id}>{label}</Label>}
		<Input
			id={id}
			type={type}
			name={id}
			placeholder={placeholder}
			onChangeF={onChangeF}
			onBlurF={onBlurF}
			value={value}
		/>
		<ErrorMessage error={error} />
	</StyledFormField>
);

export default InputField;

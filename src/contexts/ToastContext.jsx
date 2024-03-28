import { useState, createContext } from 'react';
import Toast from '../components/molecules/Toast';

const ToastContext = createContext();

const ToastProvider = ({ children }) => {
	const [toast, setToast] = useState(null);
	const [toastColor, setToastColor] = useState(null);

	const showToast = (message, color) => {
		setToast(message);
		setToastColor(color);
		setTimeout(() => {
			setToast(null);
			setToastColor(null);
		}, 3000);
	};

	return (
		<ToastContext.Provider value={showToast}>
			{children}
			{toast && <Toast bgColor={toastColor}>{toast}</Toast>}
		</ToastContext.Provider>
	);
};

export { ToastProvider };
export default ToastContext;

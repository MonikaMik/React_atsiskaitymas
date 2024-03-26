import React, { createContext, useRef } from 'react';

const DialogContext = createContext();

const DialogProvider = ({ children }) => {
	const editDialogRef = useRef(null);

	const showForm = () => {
		editDialogRef.current.showModal();
	};

	const hideForm = () => {
		editDialogRef.current.close();
	};

	return (
		<DialogContext.Provider value={{ editDialogRef, showForm, hideForm }}>
			{children}
		</DialogContext.Provider>
	);
};

export { DialogProvider };
export default DialogContext;

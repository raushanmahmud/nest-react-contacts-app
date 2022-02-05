import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from '../features/contactList/contactsSlice';
import modals from '../features/modals/modalsSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    modals
  },
});

import {createSlice} from "@reduxjs/toolkit";

export const modalsSlice = createSlice({
    name: 'modals',
    initialState: null,
    reducers: {
        showModal: (state, action) => {
            let {type, props} = action.payload;
            if (!props)
                props = {};
            return {type, props};
        },
        hideModal: () => {
            return null;
        },
    }
})

export default modalsSlice.reducer;

export const {showModal, hideModal} = modalsSlice.actions;

export const getModal = state => state.modals;
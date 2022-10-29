import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DialogProps {
    showLoginDialog: boolean,
    showLogouDialog: boolean,
}

const initialState: DialogProps = {
    showLoginDialog: false,
    showLogouDialog: false
}

const dialogSlice = createSlice({
    name: "dialogSlice",
    initialState,
    reducers: {
        showModal: (store, action: PayloadAction<DialogProps>) => {
            store = action.payload;
        }
    }
})

export const { showModal } = dialogSlice.actions;
export default dialogSlice.reducer;
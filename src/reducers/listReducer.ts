import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ListType = "None" | "Users" | "Products";

type Keyword = {
    type: ListType,
    name: string
}

interface ListProps {
    items: string[],
    keyword: Keyword,
}

const initialState: ListProps = {
    items: [],
    keyword: {
        type: "None",
        name: ""
    },
}

const listSlice = createSlice({
    name: "listSlice",
    initialState,
    reducers: {
        addToList: (store, action: PayloadAction<string>) => {
            store.items.push(action.payload);
        },
        removeFromList: (store, action: PayloadAction<number>) => {
            store.items.splice(action.payload, 1);
        },
        clearList: (store) => {
            store.items = []
        },
        setKeyword: (store, action: PayloadAction<Keyword>) => {
            store.keyword = action.payload;
        },
    }
})

export const { addToList, removeFromList, setKeyword, clearList } = listSlice.actions;
export default listSlice.reducer;
import {createSlice} from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        isFocus: false,
        isLoading: false,
        inputData: '',
        apiImages: [],
    },
    reducers: {
        setIsFocus(state) {
            state.isFocus = !state.isFocus
        },

        setIsLoading(state, action) {
            state.isLoading = action.payload
        },

        setInputData(state, action) {
            state.inputData = action.payload
        },

        setApiImages(state, action) {
            state.apiImages = action.payload
        },
    },
})

export const {
    setIsFocus,
    setIsLoading,
    setInputData,
    setApiImages,
} = searchSlice.actions;

export default searchSlice.reducer;
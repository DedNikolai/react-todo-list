import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../utils/api';
import { toast } from 'react-toastify';

export const create = createAsyncThunk('todo/create', async (data, {rejectWithValue}) => {
    try {
        const response = await api.post('/todos', data);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }


    } catch(error) {
        console.log(error);
        return rejectWithValue(error);
    }
});

export const getAll = createAsyncThunk('todo/getAll', async (_, {rejectWithValue}) => {
    try {
        const response = await api.get('/todos');

        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }


    } catch(error) {
        console.log(error);
        return rejectWithValue(error);
    }
});


const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: [],
        todosLoading: false
    },

    reducers: {
        
    },

    extraReducers: (builder) => {
        builder
            .addCase(create.pending, (state) => {
                state.todoLoading = true
            })
            .addCase(create.fulfilled, (state, action) => {
                state.todoLoading = false;
                state.todos = [action.payload, ...state.todos];
                toast.success("Todo was created");
            })
            .addCase(create.rejected, (state, action) => {
                state.todoLoading = false;
                toast.error(action.payload.response.data.message)
            })
            .addCase(getAll.pending, (state) => {
                state.todoLoading = true
            })
            .addCase(getAll.fulfilled, (state, action) => {
                state.todoLoading = false;
                state.todos = action.payload;
            })
            .addCase(getAll.rejected, (state, action) => {
                state.todoLoading = false;
                toast.error(action.payload.response.data.message)
            })
    }

});

export default todoSlice.reducer;
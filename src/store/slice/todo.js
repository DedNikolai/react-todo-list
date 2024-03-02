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

export const update = createAsyncThunk('todo/update', async (data, {rejectWithValue}) => {
    try {
        const response = await api.patch(`/todos/${data._id}`, data);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }


    } catch(error) {
        console.log(error);
        return rejectWithValue(error);
    }
});

export const updateAll = createAsyncThunk('todo/updateAll', async (data, {rejectWithValue}) => {
    try {
        const response = await api.patch(`/todos`, data);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }


    } catch(error) {
        console.log(error);
        return rejectWithValue(error);
    }
});

export const removeAll = createAsyncThunk('todo/removeAll', async (__, {rejectWithValue}) => {
    try {
        const response = await api.delete(`/todos`);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }


    } catch(error) {
        console.log(error);
        return rejectWithValue(error);
    }
});

export const remove = createAsyncThunk('todo/remove', async (id, {rejectWithValue}) => {
    try {
        const response = await api.delete(`/todos/${id}`);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }


    } catch(error) {
        console.log(error);
        return rejectWithValue(error);
    }
});

export const getAll = createAsyncThunk('todo/getAll', async (options, {rejectWithValue}) => {
    const {isDone, todoDate} = options
    
    try {
        const response = await api.get(`/todos?isDone=${isDone}&todoDate=${todoDate}`);

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
            .addCase(update.pending, (state) => {
                state.todoLoading = true
            })
            .addCase(update.fulfilled, (state, action) => {
                state.todoLoading = false;
                const updated = state.todos.map(item => {
                    if (item._id === action.meta.arg._id) {
                        const {text, isDone, ...rest} = item;
                        return {
                                text: action.meta.arg.text,
                                isDone: action.meta.arg.isDone,
                                ...rest
                            }
                    }

                    return item;
                })
                state.todos = updated;
                toast.success('Todo was updated')
            })
            .addCase(update.rejected, (state, action) => {
                state.todoLoading = false;
                toast.error(action.payload.response.data.message)
            })
            .addCase(remove.pending, (state) => {
                state.todoLoading = true
            })
            .addCase(remove.fulfilled, (state, action) => {
                state.todoLoading = false;
                state.todos = state.todos.filter(item => {
                    return item._id !== action.meta.arg
                })
                toast.success("Todo was deleted");
            })
            .addCase(remove.rejected, (state, action) => {
                state.todoLoading = false;
                toast.error(action.payload.response.data.message)
            })
            .addCase(updateAll.pending, (state) => {
                state.todoLoading = true
            })
            .addCase(updateAll.fulfilled, (state, action) => {
                state.todoLoading = false;
                state.todos = state.todos.map(item => {
                    item.isDone = true;
                    return item;
                });
                toast.success(action.payload.message)
            })
            .addCase(updateAll.rejected, (state, action) => {
                state.todoLoading = false;
                toast.error(action.payload.response.data.message)
            })
            .addCase(removeAll.pending, (state) => {
                state.todoLoading = true
            })
            .addCase(removeAll.fulfilled, (state, action) => {
                state.todoLoading = false;
                state.todos = state.todos.filter(item => {
                    return action.meta.arg.indexOf(item._id) === -1;
                })
                toast.success(action.payload.message)
            })
            .addCase(removeAll.rejected, (state, action) => {
                state.todoLoading = false;
                toast.error(action.payload.response.data.message)
            })
    }

});

export default todoSlice.reducer;
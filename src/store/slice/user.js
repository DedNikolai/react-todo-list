import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../utils/api';
import { toast } from 'react-toastify';

export const login = createAsyncThunk('user/login', async (data, {rejectWithValue}) => {
    try {
        const response = await api.post('/auth/login', data);
        if (response.status !== 200) {
            throw new Error(response.errors);
        }

        return response.data;

    } catch (error) {
        console.log(error);
        return rejectWithValue(error);
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        userLoading: false
    },

    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.userLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                
                state.userLoading = false;
               
                const {token, ...user} = action.payload;
                state.user = user;
                window.localStorage.setItem("auth-token", token);
                toast.success('Auth seccess')
            })
            .addCase(login.rejected, (state, action) => {
            toast.error(action.payload.response.data.message)    
            state.userLoading = false;
            })
    }
});

export default userSlice.reducer;


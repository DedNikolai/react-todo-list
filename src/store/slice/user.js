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
});

export const authMe = createAsyncThunk('user/authMe', async (__, {rejectWithValue}) => {
    try {
        const response = await api.get('/auth/me');
        if (response.status !== 200) {
            throw new Error(response.errors);
        }
        return response.data;

    } catch (error) {
        console.log(error);
        return rejectWithValue(error);
    }
});

export const create = createAsyncThunk('user/create', async (payload, {rejectWithValue}) => {
    try {
        const response = await api.post('/auth/register', payload);
        if (response.status !== 200) {
            throw new Error(response.errors);
        }
        
        const {status, data} = response;
        return {status, data};

    } catch (error) {
        console.log(error);
        return rejectWithValue(error);
    }
});

export const update = createAsyncThunk('user/update', async (data, {rejectWithValue}) => {
    const {id, avatarUrl, ...user} = data;
    if (avatarUrl) {
        user.avatarUrl = avatarUrl;
    }
    try {
        const response = await api.patch(`/auth/update/${id}`, user);
        if (response.status !== 200) {
            throw new Error(response.errors);
        }
        
        return response.data;

    } catch (error) {
        console.log(error);
        return rejectWithValue(error);
    }
});

export const verify = createAsyncThunk('user/verify', async (data, {rejectWithValue}) => {
    const {token, id} = data;
    try {
        const response = await api.get(`/auth/verify/${id}?token=${token}`);
        if (response.status !== 200) {
            throw new Error(response.errors);
        }
        
        return response.data;

    } catch (error) {
        console.log(error);
        return rejectWithValue(error);
    }
});

export const forgotPass = createAsyncThunk('user/forgotPass', async (data, {rejectWithValue}) => {
    try {
        const response = await api.post(`/auth/forgot-pass`, data);
        if (response.status !== 200) {
            throw new Error(response.errors);
        }
        
        return response.data;

    } catch (error) {
        console.log(error);
        return rejectWithValue(error);
    }
});

export const resetPass = createAsyncThunk('user/resetPass', async (data, {rejectWithValue}) => {
    try {
        const response = await api.post(`/auth/reset-pass`, data);
        if (response.status !== 200) {
            throw new Error(response.errors);
        }
        
        return response.data;

    } catch (error) {
        console.log(error);
        return rejectWithValue(error);
    }
});

export const resetEmail = createAsyncThunk('user/resetEmail', async (payload, {rejectWithValue}) => {
    const {id, ...email} = payload;

    try {
        const response = await api.post(`/auth/reset-email/${id}`, email);
        if (response.status !== 200) {
            throw new Error(response.errors);
        }
        const {status, data} = response;
        return {status, data};

    } catch (error) {
        console.log(error);
        return rejectWithValue(error);
    }
});

export const updateEmail = createAsyncThunk('user/updateEmail', async (payload, {rejectWithValue}) => {
    const {id, ...email} = payload;

    try {
        const response = await api.patch(`/auth/update-email/${id}`, email);
        if (response.status !== 200) {
            throw new Error(response.errors);
        }
        
        return response.data;

    } catch (error) {
        console.log(error);
        return rejectWithValue(error);
    }
});


const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        userLoading: true,
        verifyStatus: 'pending',
    },

    reducers: {
        logout(state) {
            state.user = null;
            window.localStorage.removeItem("auth-token");
        },

        toggleLoading(state, action) {
            state.userLoading = action.payload;
        } 
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
            .addCase(authMe.pending, (state) => {
                state.userLoading = true;
            })
            .addCase(authMe.fulfilled, (state, action) => {      
                state.userLoading = false;
                state.user = action.payload;
            })
            .addCase(authMe.rejected, (state) => {
                state.userLoading = false;
            })
            .addCase(create.pending, (state) => {
            })
            .addCase(create.fulfilled, (state, action) => {
                
                toast.success(action.payload.data.message)
            })
            .addCase(create.rejected, (state, action) => {
                toast.error(action.payload.response.data.message)    
            })
            .addCase(update.pending, (state) => {
                state.userLoading = true;
            })
            .addCase(update.fulfilled, (state, action) => {
                state.userLoading = false;
                state.user = action.payload;
                toast.success('Update seccess')
            })
            .addCase(update.rejected, (state, action) => {
                toast.error(action.payload.response.data.message)    
                state.userLoading = false;
            })
            .addCase(verify.pending, (state) => {
                state.verifyStatus = 'pending';
            })
            .addCase(verify.fulfilled, (state, action) => {            
                state.verifyStatus = 'success';
                toast.success('Your email successfully confirmed')
            })
            .addCase(verify.rejected, (state, action) => {
                toast.error(action.payload.response.data.message)    
                state.verifyStatus = 'error';
            })
            .addCase(forgotPass.fulfilled, (state, action) => {            
                toast.success('We send letter to you email to reset password')
            })
            .addCase(forgotPass.rejected, (state, action) => {
                toast.error(action.payload.response.data.message)    
            })
            .addCase(resetPass.fulfilled, (state, action) => {            
                toast.success('Passwor was successfully changed')
            })
            .addCase(resetPass.rejected, (state, action) => {
                toast.error(action.payload.response.data.message)    
            })
            .addCase(resetEmail.pending, (state) => {
            })
            .addCase(resetEmail.fulfilled, (state, action) => {
                toast.success(action.payload.data.message)
            })
            .addCase(resetEmail.rejected, (state, action) => {
                toast.error(action.payload.response.data.message)    
            })
            .addCase(updateEmail.pending, (state) => {
                state.userLoading = true;
            })
            .addCase(updateEmail.fulfilled, (state, action) => {
                state.userLoading = false;
                state.user = action.payload;
                toast.success('Email updated')
            })
            .addCase(updateEmail.rejected, (state, action) => {
                toast.error(action.payload.response.data.message)    
                state.userLoading = false;   
            })
    }
});

export const {logout, toggleLoading} = userSlice.actions;
export default userSlice.reducer;


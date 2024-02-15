import {configureStore} from '@reduxjs/toolkit';
import user from './slice/user';
import todo from './slice//todo'

export default configureStore({
    reducer: {
        user,
        todo
    }
});
import {configureStore} from '@reduxjs/toolkit';
import user from './slice/user';

export default configureStore({
    reducer: {
        user
    }
});
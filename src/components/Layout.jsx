import React, {Fragment, useEffect} from "react";
import Header from "./Header";
import {Outlet} from 'react-router-dom';
import Loader from './Loader';
import { useSelector, useDispatch} from "react-redux";
import { authMe } from '../store/slice/user';

function Layout() {
    const {userLoading} = useSelector(state => state.user);
    const dispatch = useDispatch();
    
    useEffect(() => {
      dispatch(authMe())
    }, []);

    return (
        <Fragment>
            <Header />
            {userLoading ? <Loader /> : <Outlet />}
        </Fragment>
    )

};

export default Layout;
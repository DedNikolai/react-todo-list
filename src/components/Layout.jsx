import React, {Fragment} from "react";
import Header from "./Header";
import {Outlet} from 'react-router-dom';
import Loader from './Loader';
import { UseSelector, useSelector } from "react-redux";

function Layout() {
    const {userLoading} = useSelector(state => state.user);
    return (
        <Fragment>
            <Header />
            {userLoading ? <Loader /> : <Outlet />}
        </Fragment>
    )

};

export default Layout;
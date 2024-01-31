import React, {Fragment} from "react";
import Header from "./Header";
import {Outlet} from 'react-router-dom';

function Layout() {
    return (
        <Fragment>
            <Header />
            <Outlet />
        </Fragment>
    )

};

export default Layout;
import React, { useEffect } from "react";
import {Link} from 'react-router-dom';
import { useSearchParams, useParams } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {verify} from '../store/slice/user';
import Loader from '../components/Loader'

function Verification() {
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get('token')
    const {id} = useParams();
    const {verifyStatus} = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(verify({token, id}))
    }, []);

    if (verifyStatus == 'pending') return <Loader />

    return (
        <div className="container">
            <div className="todo-app">
                {
                    verifyStatus === 'success' ?
                    <p className="verify">
                        Your email successfully confirmed please  
                        <Link to="/login" className="custom-link"> Sign In</Link>
                    </p>
                    :
                    <p className="verify">
                        Your email was not confirmed  
                    </p>
                }          
            </div>
        </div>
        
    )
}

export default Verification;
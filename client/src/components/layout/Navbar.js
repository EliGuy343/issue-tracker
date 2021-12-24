import React,{Fragment, useContext} from 'react';
import {AiFillBug} from 'react-icons/ai'; 
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authContext/authContext';
import { useNavigate } from 'react-router-dom'


const Navbar = () => {
    const authContext = useContext(AuthContext); 
    const {isAuthenticated, logout, user } = authContext; 
    
    const navigate = useNavigate();
    const onLogout = () => {
        logout();
        navigate('/');
    }
    
    const authlinks = (
        <Fragment>
            <li>Hello { user && user.name}</li>
            <li>
                <a href='#!'>
                <span onClick={onLogout} className='hide-sm'>Logout</span>
                </a>
            </li>
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='/about'>About</Link>
            </li>
            <li>
                <Link to='/myissues'>My Issues</Link>
            </li>
            <li>
                <Link to='/allissues'>All Issues</Link>
            </li>
        </Fragment>
    )

    const guestlinks = (
        <Fragment>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
                <li>
                    <Link to='/register'>Register</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
        </Fragment>
    )

    return (
        <div className='navbar bg-primary'>
            <h1> <AiFillBug size={25 }/> Issue Tracker</h1>
            <ul>
               {isAuthenticated ? authlinks : guestlinks}
            </ul>
        </div>

    )
}



export default Navbar

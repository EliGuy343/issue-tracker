import React from 'react';
import {AiFillBug} from 'react-icons/ai'; 
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='navbar bg-primary'>
            <h1> <AiFillBug size={25 }/> Issue Tracker</h1>
            <ul>
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
                <li>
                    <Link to='/register'>Register</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
            </ul>
        </div>

    )
}



export default Navbar

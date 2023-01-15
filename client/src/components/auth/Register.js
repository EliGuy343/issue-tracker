import React, {useContext, useEffect, useState} from 'react'
import AlertContext from '../../context/alertContext/alertContext';
import AuthContext from '../../context/authContext/authContext';
import { useNavigate } from 'react-router-dom';

    

const Register = props => {
    const alertContext = useContext(AlertContext); 
    const authContext = useContext(AuthContext);
    const naviagte = useNavigate(); 
    const {setAlert} = alertContext; 
    const {register, error, clearErrors, isAuthenticated} = authContext;

    useEffect(() => {
        if(isAuthenticated) {
            
            naviagte('/'); 
        }
        if(error === 'user already exists') {
            setAlert(error, 'danger');
            clearErrors(); 
        }
    // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    })


    const {name, email, password, password2} = user; 

    const onChange = e => setUser({...user, [e.target.name]: e.target.value}); 

    const onSubmit = e => {
        e.preventDefault(); 
        if( name === '' || email === '' || password ==='') {
            setAlert('Please enter all fields', 'danger');
        } else if (password !== password2) {
            setAlert(`password doesn't match confirmation`, 'danger');
        }
        else {
            
           register({
                name,
                email,
                password
           })
        }
    }
    return (
        <div className=' form-container'>
            <h1>
                Account <span className='text-primary'>Register</span> 
            </h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' name='name' value={name} onChange={onChange}/> 
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email Address</label>
                    <input type='email' name='email' value={email} onChange={onChange}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' value={password} onChange={onChange}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password2'>Confirm Password</label>
                    <input type='password' name='password2' value={password2} onChange={onChange}/>
                </div>
                <input className='btn btn-primary' type="submit" value="register" clasname="btn btn-primary btn-block"/>
            </form>

            
        </div>
    )
}

export default Register;

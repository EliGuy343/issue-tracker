import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../../context/authContext/authContext';
import AlertContext from '../../context/alertContext/alertContext'; 
import { useNavigate } from 'react-router-dom';

const Login = props => {
    const alertContext = useContext(AlertContext); 
    const authContext = useContext(AuthContext);
    const naviagte = useNavigate(); 
    const {setAlert} = alertContext; 
    const {login, error, clearErrors, isAuthenticated} = authContext;

    useEffect(() => {
        if(isAuthenticated) {
            
            naviagte('/'); 
        }
        if(error === `User doesn't exist`) {
            setAlert(error, 'danger');
            clearErrors(); 
        }
        if(error === `Incorrect password`) {
            setAlert(error, 'danger');
            clearErrors();
        }
    // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);


    const [user, setUser] = useState({
        email:'',
        password:'',
    })


    const {email, password} = user; 


    const onChange = e => setUser({...user, [e.target.name]: e.target.value}); 

    const onSubmit = e => {
        e.preventDefault(); 
        if(email === '' || password === '') {
            setAlert('please fill in all fields', 'danger'); 

        } else {
            login({
                email,
                password
            })
        }
    }
    return (
        <div className=' form-container'>
            <h1>
                Account <span className='text-primary'>Login</span> 
            </h1>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='email'>Email Address</label>
                    <input type='text' name='email' value={email} onChange={onChange}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' value={password} onChange={onChange}/>
                </div>
                <input type="submit" value="login" clasname="btn btn-primary btn-block"/>
            </form>

            
        </div>
    )
}

export default Login;

import React, {useContext, useEffect} from 'react'
import AuthContext from '../../context/authContext/authContext';
const Authenticator = () => {

    const authcontext = useContext(AuthContext); 
    useEffect(() => {
      if(localStorage.token) {
      authcontext.loadUser();
       
      }
      //eslint-disable-next-line 
    }, [])
    return (
        <div>            
        </div>
    )
}

export default Authenticator

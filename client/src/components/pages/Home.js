import React, {useContext, useEffect} from 'react'
import AuthContext from '../../context/authContext/authContext'


const Home = () => {
    const authcontext = useContext(AuthContext); 
    useEffect(() => {
      if(localStorage.token) {
      authcontext.loadUser();
      }
      //eslint-disable-next-line 
    }, [])
    return (
        <div>
          <h1>Home</h1>  
        </div>
    )
}

export default Home

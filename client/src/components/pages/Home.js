import React, { useContext } from 'react'
import AuthContext from '../../context/authContext/authContext'
import UserStatistics from '../statistics/UserStatistics';



const Home = () => {
    const authContext = useContext(AuthContext)
    const {user} = authContext;
      return (
        <div>
          <h1 style={{"marginLeft":"20px"}} >Hello {user && user.name} </h1>
          {user && 
            (<div>
              <h1 className="text-center">Your Contributions:</h1>
              <UserStatistics/>
            </div>)
          }  
        </div>
    )
}




export default Home

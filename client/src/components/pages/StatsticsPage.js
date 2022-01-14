import React, {useContext, useEffect} from 'react'
import AuthContext from '../../context/authContext/authContext'
import { useNavigate } from 'react-router-dom'
import StatsByCategory from '../statistics/StatsByCategory'

const StatsticsPage = () => {
    const authContext = useContext(AuthContext); 
    const {isAuthenticated} = authContext
    const navigate = useNavigate(); 





     return (
        <div>
             <label  style={{"marginLeft":"35px","fontSize":"20px"}}>Statistics by Cateogry:</label>
            <StatsByCategory />
        </div>
        )
    
}

export default StatsticsPage

import React, {useContext, useEffect} from 'react'
import AuthContext from '../../context/authContext/authContext'
import { useNavigate } from 'react-router-dom'

import React from 'react'

const StatsticsPage = () => {
    const authContext = useContext(AuthContext); 
    const {isAuthenticated} = authContext
    const navigate = useNavigate(); 


    useEffect(() => {
        if(isAuthenticated === null) {
            navigate('/'); 
        } 
 // eslint-disable-next-line
    },[isAuthenticated])


    return (
        <div>
            
        </div>
    )
}

export default StatsticsPage

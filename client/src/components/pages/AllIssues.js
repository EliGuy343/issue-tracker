import React, { useContext, useEffect } from 'react';
import IssueFilter from '../issues/IssueFilter';
import Issues from '../issues/Issues';
import AuthContext from '../../context/authContext/authContext';
import { useNavigate } from 'react-router-dom';

const AllIssues = () => {
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
              <IssueFilter/>
              <Issues isAllIssues={true}/>
        </div>
    )
}

export default AllIssues

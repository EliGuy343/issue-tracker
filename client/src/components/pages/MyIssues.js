import React, {useContext, useEffect} from 'react'
import IssueForm from '../issues/IssueForm'
import Issues from '../issues/Issues'
import IssueFilter from '../issues/IssueFilter'
import AuthContext from '../../context/authContext/authContext'
import { useNavigate } from 'react-router-dom'

const MyIssues = () => {
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
        <div className="grid-2">
            <div>
                <IssueForm/>
            </div>
            <div>
                {/* <IssueFilter/> */}
                <Issues isAllIssues={false}/>
            </div>

        </div>
    )
}

export default MyIssues

import React, {Fragment, useContext, useEffect} from 'react';
import IssueItem from './IssueItem';
import IssueContext from '../../context/issueContext/issueContext';
import FixContext from '../../context/fixContext/fixContext';
const Issues = ({isAllIssues}) => {
    const issueContext = useContext(IssueContext);
    const {issues, filtered, getAllIssues, getUserIssues, loading} = issueContext;
    const fixContext = useContext(FixContext); 
    const {getFixes} = fixContext; 

    useEffect(() => {
        getFixes();
        if(isAllIssues === true) {
            getAllIssues();
        } else {
            getUserIssues(); 
        }
        
    //eslint-disable-next-line
    }, []);
    
    if(issues.length === 0){
        return <h4>No Issues found, lucky you...</h4>
    }
 
    return (
        <Fragment>

            {filtered !== null ? filtered.map(issue => (<IssueItem key={issue.id} issue={issue}  isAllIssues={isAllIssues} />)) : 
            issues.map(issue => <IssueItem key={issue.id} issue={issue} isAllIssues={isAllIssues}/>)}
        </Fragment>
    )
}

export default Issues;

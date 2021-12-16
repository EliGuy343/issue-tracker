import React, {Fragment, useContext} from 'react';
import IssueItem from './IssueItem';
import IssueContext from '../../context/issueContext/issueContext';


const Issues = ({isAllIssues}) => {
    const issueContext = useContext(IssueContext);
    const {issues, filtered} = issueContext;
    
    if(issues.length === 0){
        return <h4>No Issues found, lucky you...</h4>
    }
 
    return (
        <Fragment>

            {filtered !== null ? filtered.map(issue => (<IssueItem key={issue.id} issue={issue}/>)) : 
            issues.map(issue => <IssueItem key={issue.id} issue={issue} isAllIssues={isAllIssues}/>)}
        </Fragment>
    )
}

export default Issues;

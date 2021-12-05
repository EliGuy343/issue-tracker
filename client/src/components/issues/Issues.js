import React, {Fragment, useContext} from 'react';
import IssueItem from './IssueItem';
import IssueContext from '../../context/issueContext/issueContext';


const Issues = ({isAllIssues}) => {
    const issueContext = useContext(IssueContext);
    const {issues} = issueContext;
    

    return (
        <Fragment>
            {issues.map(issue => <IssueItem key={issue.id} issue={issue} isAllIssues={isAllIssues}/>)}
        </Fragment>
    )
}

export default Issues;

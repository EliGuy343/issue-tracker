import React, {useContext, useEffect, useState} from 'react';
import IssueItem from './IssueItem';
import IssueContext from '../../context/issueContext/issueContext';
import FixContext from '../../context/fixContext/fixContext';
import Spinner from '../layout/Spinner';

const Issues = ({isAllIssues}) => {
    const issueContext = useContext(IssueContext);
    const {issues, filtered, getAllIssues, getUserIssues} = issueContext;
    const fixContext = useContext(FixContext);
    const {getFixes, fixes} = fixContext;


    useEffect(() => {
        getFixes();
        if(isAllIssues === true) {
            getAllIssues();
        } else {
            getUserIssues();
        }
    //eslint-disable-next-line
    }, []);

    if(issues.length === 0 && !issueContext.loading){
        return <h4>No Issues found, lucky you...</h4>
    }
    return (
        <div>
            <div style={isAllIssues === true ? allIssuesStyle: null}>
                {issues !== null && (!issueContext.loading && !fixContext.loading) ? (filtered !== null ? filtered.map(issue => (<IssueItem key={issue._id} issue={issue}  isAllIssues={isAllIssues} />)) : 
                issues.map(issue => <IssueItem key={issue._id} issue={issue} isAllIssues={isAllIssues}/>)) : <Spinner/>}
            </div>
        </div>
    )
}



const allIssuesStyle = {
    display: 'grid',
    gridTemplateColumns:'repeat(3,1fr)',
    gridGap:'1rem'
};


export default Issues;


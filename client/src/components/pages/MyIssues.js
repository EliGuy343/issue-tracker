import React from 'react'
import IssueForm from '../issues/IssueForm'
import Issues from '../issues/Issues'
import IssueFilter from '../issues/IssueFilter'
const MyIssues = () => {
    return (
        <div className="grid-2">
            <div>
                <IssueForm/>
            </div>
            <div>
                <IssueFilter/>
                <Issues isAllIssues={false}/>
            </div>

        </div>
    )
}

export default MyIssues

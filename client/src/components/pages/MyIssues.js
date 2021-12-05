import React from 'react'
import IssueForm from '../issues/IssueForm'
import Issues from '../issues/Issues'
const MyIssues = () => {
    return (
        <div className="grid-2">
            <div>
                <IssueForm/>
            </div>
            <div>
                <Issues isAllIssues={false}/>
            </div>

        </div>
    )
}

export default MyIssues

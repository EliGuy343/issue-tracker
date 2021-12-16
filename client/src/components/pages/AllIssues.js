import React from 'react'
import IssueFilter from '../issues/IssueFilter'
import Issues from '../issues/Issues'
const AllIssues = () => {
    return (
        <div>
              <IssueFilter/>
              <Issues isAllIssues={true}/>
        </div>
    )
}

export default AllIssues

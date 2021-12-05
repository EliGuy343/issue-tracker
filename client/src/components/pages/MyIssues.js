import React from 'react'
import Issues from '../issues/Issues'
const MyIssues = () => {
    return (
        <div className="grid-2">
            <div>{/*some stuff here*/}</div>
            <div>
                <Issues isAllIssues={false}/>
            </div>
        </div>
    )
}

export default MyIssues

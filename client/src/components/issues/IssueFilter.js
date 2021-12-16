import React, { useContext, useEffect, useRef } from 'react'
import IssueContext from '../../context/issueContext/issueContext';
const IssueFilter = () => {
    
    const issueContext = useContext(IssueContext); 
    const {filterIssues, clearFilter, filtered} = issueContext; 
    
    const text = useRef('');

    useEffect(() => {
        if(filtered === null) {
        text.current.value = '';
        }
    })

    const onChange = e => {
        if(text.current.value !== '') {
           filterIssues(e.target.value); 
        }
        else {
           clearFilter(); 
        }
    }
    
    return (
        <form>
            <input ref={text} type='text' placeholder='Filter Issues...' onChange={onChange} />
        </form>
    )
}

export default IssueFilter

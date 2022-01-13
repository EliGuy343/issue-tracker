import React, { useContext } from 'react'
import FixContext from '../../context/fixContext/fixContext'
import IssueContext from '../../context/issueContext/issueContext'


const Statistics = () => {
    const fixContext = useContext(FixContext);
    const issueContext = useContext(IssueContext); 
    const {fixes, getFixes} = fixContext;
    const {issues, getAllIssues } = issueContext; 
    useEffect(() => {
        getFixes(); 
        getAllIssues(); 
        const categoryLookup = {}
        for(let i= 0; i < issues.length; i++) {

            if(!(issues[i].category in categoryLookup)) {
                categoryLookup[issues[i].category] = new Array(3); 
            }
            categoryLookup[issues[i].category][0] +=1; 
            if(issues[i]._id in fixes ){
                categoryLookup[issues[i].category][1] +=1;
            } else  {
                categoryLookup[issues[i].category][2] +=1;
            }
            
            
            
    }
        
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default Statistics

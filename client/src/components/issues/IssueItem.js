import React, { useContext, useState} from 'react';
import issueLogo from '../../icons/issue.png';
import engineerLogo from '../../icons/engineer.png';
import categoryLogo from '../../icons/category.png';
import dateLogo from '../../icons/date.png';
import SolutionWindow from '../Solution/SolutionWindow';
import IssueEditWindow from '../issues/IssueEditWindow'; 
import IssueContext from '../../context/issueContext/issueContext';
const IssueItem = ({issue, isAllIssues}) => {

    const issueContext = useContext(IssueContext);
    const { deleteIssue } = issueContext; 
    const {_id,userName, name, category, date}  = issue;
    const [isSolutionOpen, setIsSolutionOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false); 
    const onDelete = () => {
        deleteIssue(_id); 
    }

   // какого хуй блять???
   // да не, все работает... 

   // we will need bring in fixContext and get check if solution is there... and also use it to add or remove. 

    return (
        <div className ="card bg-light">
            <h4 className="text-left">
            <img src={issueLogo} alt="Logo" style={{"width":"30px", "height":"30px", "marginTop":"6px"}} /> {"Issue: " + name}{' '}
            </h4>
            {isAllIssues ? <h4 className="text-left">
            <img src={engineerLogo} alt="Logo" style={{"width":"30px", "height":"30px", "marginTop":"6px"}} /> {"Submitted By: " + userName}{' '}
            </h4> : null}
            <h4 className="text-left">
            <img src={categoryLogo} alt="Logo" style={{"width":"30px", "height":"30px", "marginTop":"6px"}} />  {"Category: " + category}{' '}
            </h4>
            <h4 className="text-left">
            <img src={dateLogo} alt="Logo" style={{"width":"30px", "height":"30px", "marginTop":"6px"}} />  {"Submission Date: " + date}{' '}
            </h4>
            <div style={{"marginTop":"12px"}}>
                <button className="btn btn-dark btn-sm" style={{"marginRight":"16px"}} onClick={() => setIsEditOpen(true)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => setIsSolutionOpen(true)} style={{"marginTop":"6px"}}>Add/View Solution</button>

            <SolutionWindow open={isSolutionOpen} close={() => setIsSolutionOpen(false)} issueId={_id}/>
            <IssueEditWindow open={isEditOpen} issue={issue} close={() => setIsEditOpen(false)}/>
        </div>
    )
}

export default IssueItem;

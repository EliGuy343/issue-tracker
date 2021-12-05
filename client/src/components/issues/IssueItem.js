import React, {Fragment, useContext, useState} from 'react';
import issueLogo from '../../icons/issue.png';
import engineerLogo from '../../icons/engineer.png'
import categoryLogo from '../../icons/category.png'
import dateLogo from '../../icons/date.png'
import SolutionWindow from '../Solution/SolutionWindow';
const IssueItem = ({issue, isAllIssues}) => {

    const {userName, name, category, date}  = issue;
    const issueDate = Date(date).toString();
    const [isOpen, setIsOpen] = useState(false);

   // какого хуй блять???
   // да не, все работает... 

   // we will need bring in fixContext and get check if solution is there... and also use it to add or remove. 

    return (
        <div className ="card bg-light">
            <h4 className="text-left">
            <img src={issueLogo} alt="Logo" style={{"width":"30px", "height":"30px", "margin-top":"6px"}} /> {"Issue: " + name}{' '}
            </h4>
            {isAllIssues ? <h4 className="text-left">
            <img src={engineerLogo} alt="Logo" style={{"width":"30px", "height":"30px", "margin-top":"6px"}} /> {"Submitted By: " + userName}{' '}
            </h4> : null}
            <h4 className="text-left">
            <img src={categoryLogo} alt="Logo" style={{"width":"30px", "height":"30px", "margin-top":"6px"}} />  {"Category: " + category}{' '}
            </h4>
            <h4 className="text-left">
            <img src={dateLogo} alt="Logo" style={{"width":"30px", "height":"30px", "margin-top":"6px"}} />  {"Submission Date: " + issueDate}{' '}
            </h4>
            <div style={{"margin-top":"12px"}}>
                <button className="btn btn-dark btn-sm" style={{"margin-right":"16px"}}>Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => setIsOpen(true)} style={{"margin-top":"6px"}}>Add/View Solution</button>

            <SolutionWindow open={isOpen} close={() => setIsOpen(false)} test={"test"}/>
        </div>
    )
}

export default IssueItem

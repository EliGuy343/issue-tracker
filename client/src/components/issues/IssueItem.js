import React, {Fragment, useContext} from 'react';
import issueLogo from '../../icons/issue.png';
import engineerLogo from '../../icons/engineer.png'
import categoryLogo from '../../icons/category.png'
import dateLogo from '../../icons/date.png'
const IssueItem = ({issue}) => {

    const {userName, name, category, date}  = issue;
    const issueDate = Date(date).toString();
    

   // какого хуй блять???
   // да не, все работает... 
   
   // we will need bring in Fixcontext and get check if solution is there... and also use it to add or remove. 

    return (
        <div className ="card bg-light">
            <h4 className="text-left">
            <img src={issueLogo} alt="Logo" style={{"width":"30px", "height":"30px", "margin-top":"6px"}} /> {"Issue: " + name}{' '}
            </h4>
            <h4 className="text-left">
            <img src={engineerLogo} alt="Logo" style={{"width":"30px", "height":"30px", "margin-top":"6px"}} /> {"Submitted By: " + userName}{' '}
            </h4>
            <h4 className="text-left">
            <img src={categoryLogo} alt="Logo" style={{"width":"30px", "height":"30px", "margin-top":"6px"}} />  {"Category: " + category}{' '}
            </h4>
            <h4 className="text-left">
            <img src={dateLogo} alt="Logo" style={{"width":"30px", "height":"30px", "margin-top":"6px"}} />  {"Submission Date: " + issueDate}{' '}
            </h4>
           
        </div>
    )
}

export default IssueItem

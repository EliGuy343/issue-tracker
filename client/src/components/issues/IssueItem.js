import React, {useState} from 'react';
import issueLogo from '../../icons/issue.png';
import engineerLogo from '../../icons/engineer.png';
import categoryLogo from '../../icons/category.png';
import dateLogo from '../../icons/date.png';
import clockLogo from '../../icons/clock.png'
import SolutionWindow from '../Solution/SolutionWindow';
import IssueEditWindow from '../issues/IssueEditWindow';

const IssueItem = ({issue, isAllIssues}) => {

    const {_id,userName, name, category, date}  = issue;
    const newDate = date.split("T")[0];
    const time = date.split("T")[1].split(".")[0];
    const [isSolutionOpen, setIsSolutionOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

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
            <img src={dateLogo} alt="Logo" style={{"width":"30px", "height":"30px", "marginTop":"6px"}} />  {"Submission Date: " + newDate}{' '}
            </h4>
            <h4 className="text-left">
            <img src={clockLogo} alt="Logo" style={{"width":"30px", "height":"30px", "marginTop":"6px"}} />  {"Time: " + time}{' '}
            </h4>
            <div style={{"marginTop":"12px"}}>
                <button className="btn btn-dark btn-block" style={{"marginRight":"16px"}} onClick={() => setIsEditOpen(true)}>Edit</button>
            </div>
            <button className="btn btn-primary btn-block" onClick={() => setIsSolutionOpen(true)} style={{"marginTop":"6px"}}>Add/View Solution</button>

            <SolutionWindow open={isSolutionOpen} close={() => setIsSolutionOpen(false)} issueId={_id}/>
            <IssueEditWindow open={isEditOpen} issue={issue} close={() => setIsEditOpen(false)}/>
        </div>
    )
}

export default IssueItem;

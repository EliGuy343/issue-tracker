import IssueContext from "../../context/issueContext/issueContext";
import AuthContext from "../../context/authContext/authContext";
import ReactDom from 'react-dom';
import AlertContext from "../../context/alertContext/alertContext";
import React, {Fragment, useContext, useState} from 'react';
import WindowAlerts from "../layout/WindowAlerts";

const IssueEditWindow = ({open, issue, close}) => {

    const alertContext = useContext(AlertContext);
    const {setWindowAlert} = alertContext;

    const MODAL_STYLES = {
        position:'fixed',
        top:'50%',
        left:'50%',
        transform:'translate(-50%, -50%)',
        background:"#ccc",
        padding:'5px',
        zIndex:1000,
        width:"80%"
    }

    const  OVERLAY_STYLES = {
        position:'fixed',
        top:0,
        left:0,
        right:0,
        bottom:0,
        background:'rgba(0, 0, 0, .7)',
        zIndex: 1000 
    }

    const issueContext = useContext(IssueContext); 
    const authContext = useContext(AuthContext);
    

    const [editIssue, setEditIssue] = useState({
        id:issue._id, 
        name:issue.name,
        userName:issue.userName,
        category:issue.category,
        date:issue.date
    }

    ); 

    const onChange = e => setEditIssue({...editIssue, [e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault(); 
        debugger;
        if(authContext.user._id === issue.user || authContext.user.admin) {
            issueContext.updateIssue(editIssue);
            close();  

        }
        else {
            setWindowAlert("You're not authorized to make changes to this issue", "danger");
        }
        
    }

    if(open === false) {

        return null;
    }
    
    return ReactDom.createPortal(
        <Fragment>
            <div style={OVERLAY_STYLES}/>
            <div style={MODAL_STYLES}>
                <div className ="card bg-light">
                    <WindowAlerts/>
                    <form onSubmit={onSubmit}>  
                        <h2 className="text-primary">Edit Issue:</h2>
                        <input type="text" placeholder="name" name="name" value={editIssue.name} onChange={onChange} />
                        <input type="text" placeholder="category" name="category" value={editIssue.category} onChange={onChange} />
                        <input type="submit" value="Update issue" className="btn btn-primary btn-block"/>
                    </form>
                <button className="btn btn-dark btn-sm" onClick={close} style={{"marginTop":"12px", "fontSize":"16px"}}>close</button>
                </div>
            </div>
           
        </Fragment>,
         document.getElementById('portal')
    )
}

export default IssueEditWindow;

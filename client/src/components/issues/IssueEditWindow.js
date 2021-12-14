import IssueContext from "../../context/issueContext/issueContext";
import ReactDom from 'react-dom';
import React, {Fragment, useContext, useState} from 'react';

const IssueEditWindow = ({open, issue, close}) => {

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


    const [editIssue, setEditIssue] = useState({
        id:issue.id, 
        name:issue.name,
        userName:issue.userName,
        category:issue.category,
        date:issue.date
    }

    ); 

    const onChange = e => setEditIssue({...editIssue, [e.target.name]: e.target.value});
    const onSubmit = e => {
        e.preventDefault(); 
        issueContext.updateIssue(editIssue);
        close();  
    }

    if(open === false) {

        return null;
    }
    
    return ReactDom.createPortal(
        <Fragment>
            <div style={OVERLAY_STYLES}/>
            <div style={MODAL_STYLES}>
            
                <div className ="card bg-light">
                    <form onSubmit={onSubmit}>  
                        <h2 className="text-primary">Edit Issue:</h2>
                        <input type="text" placeholder="name" name="name" value={editIssue.name} onChange={onChange} />
                        <input type="text" placeholder="category" name="category" value={editIssue.category} onChange={onChange} />
                        <input type="submit" value="Update issue" className="btn btn-primary btn-block"/>
                    </form>
                <button className="btn btn-dark btn-sm" onClick={close} style={{"margin-top":"12px", "font-size":"16px"}}>close</button>
                </div>
            </div>
           
        </Fragment>,
         document.getElementById('portal')
    )
}

export default IssueEditWindow;

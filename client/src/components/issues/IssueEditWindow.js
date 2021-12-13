import IssueContext from "../../context/issueContext/issueContext";
import React, {Fragment, useContext} from 'react';

const IssueEditWindow = (open, issue) => {

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
    if(open === false) {

        return null;
    }
    
    return ReactDOM.createPortal(
        <Fragment>
            <div style={OVERLAY_STYLES}/>
            <div style={MODAL_STYLES}>
                <h3>Proverka</h3>
            </div>
        </Fragment>,
         document.getElementById('portal')
    )
}

export default IssueEditWindow;

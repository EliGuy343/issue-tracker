import React, {Fragment, useContext, useState} from 'react';
import ReactDom from 'react-dom';
import FixContext from '../../context/fixContext/fixContext';
import handLogo from '../../icons/hand.png';
import engineerLogo from '../../icons/engineer.png';
import dateLogo from '../../icons/date.png';
import AuthContext from '../../context/authContext/authContext';
import AlertContext from '../../context/alertContext/alertContext';

const SolutionWindow = ({open, close, issueId}) => {

    const fixContext = useContext(FixContext); 
    const {fixes, deleteFix, updateFix} = fixContext; 
    const authcontext = useContext(AuthContext);
    const {user} = authcontext; 
    const alertContext = useContext(AlertContext); 
    const {setAlert} = alertContext;
    const [fix, setFix] = useState({solution:""})
   
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
    


    const onChangeForm = e => setFix({...fix, [e.target.name]: e.target.value});

    const onSubmitForm = e => {

        e.preventDefault();
        if(fix.solution === '') {
            setAlert("Solution can't be empty",'danger'); 
        } else {
            fixContext.addFix({user:user._id, userName:user.name, solution:fix.solution}, issueId);
            setFix({solution:""});
            close();
        }
    }

    const onSubmitUpdateForm = e => {
        e.preventDefault();
        if(fix.solution === '') {
            setAlert("Solution can't be empty",'danger'); 
        } else {
            if(user._id === authcontext.user._id || authcontext.user.admin) {
                
                updateFix({user:user._id, userName:user.name, solution:fix.solution,id:fixes[issueId]._id}, issueId);
                setFix({ solution:""});
                close();
            } 
        } 
    }
    const onDelete = () => {
        deleteFix(issueId); 
    }
    if(issueId in fixes) {
        // id is needed later for when we make edits and update the database
        const {userName, solution, date} = fixes[issueId]; 
        
       

        return ReactDom.createPortal(
            <Fragment>
                <div style={OVERLAY_STYLES}/>
                <div style={MODAL_STYLES}>
                    <div className ="card bg-light">  
                        <h4 className="text-left">
                            <img src={handLogo} alt="Logo" style={{"width":"30px", "height":"30px", "marginTop":"6px"}} /> {"Solution: " + solution}{' '}
                        </h4>
                        <h4 className="text-left">
                            <img src={engineerLogo} alt="Logo" style={{"width":"30px", "height":"30px", "marginTop":"6px"}} /> {"Submitted By: " + userName}{' '}
                        </h4>
                        <h4 className="text-left">
                            <img src={dateLogo} alt="Logo" style={{"width":"30px", "height":"30px", "marginTop":"6px"}} />  {"Submission Date: " + date}{' '}
                        </h4>
                        <h3 style={{"marginTop":"15px"}} >Edit Solution:</h3>
                        <form onSubmit={onSubmitUpdateForm}>
                            <input type="text" placeholder={"Enter new Solution"} name="solution" onChange={onChangeForm} style={{"width":"100%"}}></input>
                            <input type ='submit' value={"Submit new Solution"} className="btn btn-primary btn-block" ></input>
                    </form>
                        <div>
                            <button className="btn btn-danger btn-sm" onClick={onDelete} style={{"fontSize":"16px", "width":"100%"}}>Delete</button>
                        </div>
                        <button className="btn btn-dark btn-sm" onClick={close} style={{"marginTop":"12px", "fontSize":"16px"}}>close</button>
                    </div>  
                </div>
            </Fragment>,
            document.getElementById('portal')
        )
    

    }else {

    return ReactDom.createPortal(
        <Fragment>
            <div style={OVERLAY_STYLES}/>
            <div style={MODAL_STYLES}>    
                <div className="card bg-light">
                    <h3>{"Add a solution"}</h3>
                    <form onSubmit={onSubmitForm}>
                    <input type="text" placeholder="Solution" name="solution" style={{"width":"100%"}} onChange={onChangeForm}></input>
                    <input type ='submit' value={"Submit"} className="btn btn-primary btn-block" ></input>
                    </form>
                    <button className="btn btn-dark btn-sm" onClick={close} style={{"marginTop":"6px", "fontSize":"16px"}}>close</button>
                </div>
            </div>
        </Fragment>,
        document.getElementById('portal')
    )
}
}

export default SolutionWindow

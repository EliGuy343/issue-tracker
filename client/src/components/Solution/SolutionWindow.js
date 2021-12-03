import React, {Fragment} from 'react'
import ReactDom from 'react-dom'
const SolutionWindow = ({open,test, close}) => {

    const MODAL_STYLES = {
        position:'fixed',
        top:'50%',
        left:'50%',
        transform:'translate(-50%, -50%)',
        background:"#ccc",
        padding:'50px',
        zIndex:1000
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
    if(open == false) {

        return null;
    }

    return ReactDom.createPortal(
        <Fragment>
            <div style= {OVERLAY_STYLES}/>
            <div style={MODAL_STYLES}>    
                <div className="card bg-light" >
                    <h3>{"Add a solution"}</h3>
                    <form>
                    <input type="text" placeholder="Solution" name="solution"></input>
                    <input type ='submit' value={"Submit"} className="btn btn-primary btn-block" ></input>
                    </form>
                    <button className="btn btn-primary btn-sm" onClick={close} style={{"margin-top":"6px"}}>close</button>
                </div>
            </div>
        </Fragment>,
        document.getElementById('portal')
    )
}

export default SolutionWindow

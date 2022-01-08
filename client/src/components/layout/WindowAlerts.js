import React, { useContext } from 'react'
import AlertContext from '../../context/alertContext/alertContext'
import bellLogo from '../../icons/bell.png';


const WindowAlerts = () => {

    const alertContext = useContext(AlertContext); 
    const {windowAlerts} = alertContext


    return (
        windowAlerts.map(alert => (
            <div key={alert.id} className={`alert alert-${alert.type}`}>
                <img src={bellLogo} alt="Logo" style={{"width":"30px", "height":"30px", "marginTop":"6px"}}/> {alert.msg}  
            </div>
        ))
    )
}

export default WindowAlerts

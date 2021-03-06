import React, { useContext } from 'react'
import AlertContext from '../../context/alertContext/alertContext'
import bellLogo from '../../icons/bell.png';
const Alerts = () => {

    const alertContext = useContext(AlertContext); 
    const {alerts} = alertContext

    return (
        alerts.map(alert => (
            <div key={alert.id} className={`alert alert-${alert.type}`}>
                <img src={bellLogo} alt="Logo" style={{"width":"30px", "height":"30px", "marginTop":"6px"}}/> {alert.msg}  
            </div>
        ))
    )
    
}

export default Alerts

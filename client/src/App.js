import './App.css';
import Navbar from './components/layout/Navbar'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Fragment } from 'react';
import Home from './components/pages/Home';
import About from './components/pages/About';
import AllIssues from './components/pages/AllIssues';
import MyIssues from './components/pages/MyIssues';
import IssueState from './context/issueContext/IssueState';
import FixState from './context/fixContext/FixState';
import AuthState from './context/authContext/AuthState';
import AlertState from './context/alertContext/AlertState'
import Register from './components/auth/Register';
import Login from './components/auth/login';
import Alerts from './components/layout/Alerts';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token); 
}

const App = () => {
  return (
    <AuthState>
      <FixState>
        <IssueState>
          <AlertState>
            <Router>
            <Fragment>
              <Navbar />
                <div>
                  <Alerts/>
                  <Routes>
                    <Route exact path='/' element={<Home/>}/>
                    <Route exact path='/about' element={<About/>}/>
                    <Route exact path='/myissues' element={<MyIssues/>}/>
                    <Route exact path='/AllIssues' element={<AllIssues/>}/>
                    <Route exact path='/register' element={<Register/>}/>
                    <Route exact path='/login' element={<Login/>}/>
                  </Routes>
                </div>
            </Fragment>
            </Router>
          </AlertState>
        </IssueState>
      </FixState>
    </AuthState>
  );
}

export default App;

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
import AuthState from './context/authContext/AuthState'
import Register from './components/auth/Register';
import Login from './components/auth/login';
const App = () => {
  return (
    <AuthState>
      <FixState>
        <IssueState>
          <Router>
          <Fragment>
            <Navbar />
              <div>
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
        </IssueState>
      </FixState>
    </AuthState>
  );
}

export default App;

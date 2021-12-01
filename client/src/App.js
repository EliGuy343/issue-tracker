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

const App = () => {
  return (
    <FixState>
      <IssueState>
        <Router>
        <Fragment className="container">
          <Navbar />
            <div>
              <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route exact path='/about' element={<About/>}/>
                <Route exact path='/myissues' element={<MyIssues/>}/>
                <Route exact path='/AllIssues' element={<AllIssues/>}/>
              </Routes>
            </div>
        </Fragment>
        </Router>
      </IssueState>
    </FixState>
  );
}

export default App;

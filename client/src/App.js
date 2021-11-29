import './App.css';
import Navbar from './components/layout/Navbar'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Fragment } from 'react';
import Home from './components/pages/Home';
import About from './components/pages/About';
const App = () => {
  return (
    <Router>
    <Fragment className="container">
      <Navbar />
        <div>
          <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/about' element={<About/>}/>
          </Routes>
        </div>
    </Fragment>
    </Router>
  );
}

export default App;

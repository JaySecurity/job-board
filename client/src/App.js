import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import JobBoard from './components/JobBoard';
import AddJob from './components/AddJob';
// import ControlPanel from './components/ControlPanel';
import { JobProvider } from './context/JobContext';
import './App.css';

function App() {
  return (
    <div className='App'>
      <JobProvider>
        <Router>
          <Nav />
          <Switch>
            <Route path='/' exact component={JobBoard} />
            <Route path='/add' exact component={AddJob} />
            <Route path='/edit/:_id' component={AddJob} />
          </Switch>
        </Router>
      </JobProvider>
    </div>
  );
}

export default App;

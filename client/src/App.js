import React from 'react';
import Nav from './components/Nav';
import JobBoard from './components/JobBoard';
import ControlPanel from './components/ControlPanel';
import {JobProvider} from './context/JobContext';
import './App.css';

function App() {
  return (
    <div className='App'>
      <Nav />
      <JobProvider>
      <ControlPanel/>
      <JobBoard />
      </JobProvider>
    </div>
  );
}

export default App;

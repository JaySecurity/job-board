import React, {useContext} from 'react';
import {JobContext}from '../context/JobContext';




const ControlPanel = () => {

  const [jobs, setJobs]=useContext(JobContext)
  const sortJobs = (e) => {
    
    switch(e.target.value){
      case ('byDate'):
        jobs.sort((a,b) => new Date(a.timeIn) - new Date(b.timeIn));
        setJobs([...jobs])
        break;
      case ('byScheduledDate'):
        jobs.sort((a,b) => new Date(a.scheduledTime) - new Date(b.scheduledTime));
        setJobs([...jobs])
        break;
      case ('priority'):
        jobs.sort((a,b) => a.status.priority - b.status.priority);
        setJobs([...jobs])
        break;
      default:
        break;
          
    }
  }
  
  const toggleCollapse = (e) =>{

    const items = document.querySelectorAll('.job-item');
    items.forEach(item => {
      let sections =[
          item.querySelector('.job-body'),
          item.querySelector('.unit-info')];
      let button = item.querySelector('#toggle');

      sections.forEach(section => {
        if (e.target.dataset.visable === 'true'){
          button.dataset.visable = 'false';
          button.innerText = 'Expand';
          e.target.innerText = 'Expand All';
          if (!section.classList.contains('hide-section')){
            section.classList.add('hide-section');
          }
          
        }
        else{
          button.dataset.visable = 'true';
          button.innerText = 'Collapse';
          e.target.innerText = 'Collapse All';
          if (section.classList.contains('hide-section')){
            section.classList.remove('hide-section');
          }
        }
      });
    });
    e.target.dataset.visable === 'true' ? e.target.dataset.visable= 'false' : e.target.dataset.visable = 'true';
  }


  return (
    <div className="control-panel">
      <div className="control-group">
        <label>Time In:</label>
        <div className="control">
          <label className='switch'>
            <input type="radio" name="sortBy" value='byDate' onChange={sortJobs} defaultChecked/>
            <span className="slider round"></span>
          </label>
        </div>
      </div>

      <div className="control-group">
        <label>Scheduled Date:</label>
        <div className="control">
          <label className='switch'>
            <input type="radio" name="sortBy" onChange={sortJobs} value='byScheduledDate'/>
            <span className="slider round"></span>
          </label>
        </div>
      </div>
      <div className="control-group">
        <label>Priority:</label>
        <div className="control">
          <label className='switch'>
            <input type="radio" name="sortBy" onChange={sortJobs} value='priority'/>
            <span className="slider round"></span>
          </label>
        </div>
      </div>
      <div className="control-group">
        <button className='btn' data-visable='true' onClick={toggleCollapse}>Collapse All</button>
      </div>
    </div> 
  );

}

export default ControlPanel;
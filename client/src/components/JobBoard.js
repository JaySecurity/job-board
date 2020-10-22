import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import ControlPanel from './ControlPanel';
import Job from './Job';
import { JobContext } from '../context/JobContext';

const JobBoard = () => {
  const [jobs, setJobs] = useContext(JobContext);

  useEffect(() => {
    axios
      .get('/api/jobs')
      .then((res) => {
        setJobs([...res.data]);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <ControlPanel />
      <div className='job-list'>
        {jobs.map((job) => (
          <Job key={job._id} data={job} />
        ))}
      </div>
    </>
  );
};

export default JobBoard;

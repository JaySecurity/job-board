import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Job from './Job';

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get('/api/jobs')
      .then((res) => {
        setJobs([...jobs, ...res.data]);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  return (
    <div className='job-list'>
      {jobs.map((job) => (
        <Job key={job._id} data={job} />
      ))}
    </div>
  );
};

export default JobBoard;

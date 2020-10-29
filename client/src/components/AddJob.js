import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Datetime from 'react-datetime';
import { Redirect } from 'react-router-dom';
import 'react-datetime/css/react-datetime.css';
import {
  RUSH,
  PARKED,
  PENDING,
  COMPLETE,
  CANCELLED,
  INPROGRESS,
} from '../utils/statusTypes';
import { dateToMDY } from '../utils/';

const AddJob = (props) => {
  const [job, setJob] = useState({
    timeIn: '',
    customer: {
      name: '',
      caller: '',
      contactNumber: '',
      location: '',
      purchaseOrder: '',
    },
    unit: {
      number: '',
      make: '',
      model: '',
      position: '',
      size: '',
    },
    description: '',
    scheduledTime: null,
    technician: '',
    dispatchTime: null,
    completedTime: null,
    workOrder: '',
    invoice: '',
    status: {
      priority: '',
      text: '',
    },
  });

  const [scheduledTime, setSchedluedTime] = useState(
    !job.scheduledTime ? null : new Date(job.scheduledTime)
  );
  const [dispatchTime, setDispatchTime] = useState(
    !job.dispatchTime ? null : new Date(job.dispatchTime)
  );
  const [completedTime, setCompletedTime] = useState(
    !job.completedTime ? null : new Date(job.completedTime)
  );
  const [status, setStatus] = useState({});

  useEffect(() => {
    if (props.match.params._id != null) {
      axios
        .get(`/api/jobs/${props.match.params._id}`)
        .then((res) => {
          const job = res.data;
          setJob(job);
          setSchedluedTime(job.scheduledTime);
          setDispatchTime(job.dispatchTime);
          setCompletedTime(job.completedTime);
          setStatus(job.status);
        })
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line
  }, []);

  const refStatus = useRef();

  function nestedObjectGetUpdate(data, field, value) {
    let schema = data; // a moving reference to internal objects within obj
    const pList = field.split('.');
    const len = pList.length;
    for (var i = 0; i < len - 1; i++) {
      var elem = pList[i];
      if (!schema[elem]) schema[elem] = {};
      schema = schema[elem];
    }
    if (!value) {
      return schema[pList[len - 1]];
    }
    schema[pList[len - 1]] = value;
  }

  const changeTarget = (e) => {
    let newJob = job;
    nestedObjectGetUpdate(newJob, e.target.name, e.target.value);
    setJob(newJob);
    return;
  };

  const updateJobStatus = (e) => {
    let newJob = job;
    const value = refStatus.current.value;
    const newStatus = {
      priority: value,
      text: refStatus.current[value - 1].innerText,
    };
    setStatus(newStatus);
    newJob.status = newStatus;
    setJob(newJob);
    return;
  };

  const add = (e) => {
    e.preventDefault();

    if (job._id) {
      axios.put(`/api/jobs/${job._id}`, job).catch((err) => console.log(err));
    } else {
      axios.post(`/api/jobs/`, job).catch((err) => console.log(err));
    }
    props.history.push('/');
  };

  const cancel = () => {
    return;
  };

  return (
    <div className='add-job'>
      <form>
        <div className='job-header form-section'>
          <div className='form-group'>
            <label>Time In:</label>
            <input
              type='text'
              name='timeIn'
              size='11'
              readOnly
              placeholder='Auto populated'
              value={!job.timeIn ? '' : dateToMDY(new Date(job.timeIn))}
            />
          </div>
          <div className='form-group'>
            <label>Location:</label>
            <input
              type='text'
              size='15'
              onChange={changeTarget}
              onKeyPress={(e) => {
                e.key === 'Enter' && e.preventDefault();
              }}
              name='customer.location'
              defaultValue={job.customer.location}
            />
          </div>
          <div className='form-group'>
            <label>Scheduled Time:</label>
            <Datetime
              dateFormat='MM-DD-YY'
              timeFormat='HH:mm'
              inputProps={{ size: 14, name: 'scheduledTime' }}
              value={
                !scheduledTime
                  ? ''
                  : scheduledTime === '1970-01-01T00:00:00.000Z'
                  ? ''
                  : new Date(scheduledTime)
              }
              initialViewDate={
                !job.scheduledTime
                  ? ''
                  : job.scheduledTime === '1970-01-01T00:00:00.000Z'
                  ? ''
                  : dateToMDY(new Date(scheduledTime))
              }
              onChange={(val) => {
                setSchedluedTime(val);
                let newJob = job;
                newJob.scheduledTime = new Date(val);
                setJob(newJob);
              }}
              onKeyPress={(e) => {
                e.key === 'Enter' && e.preventDefault();
              }}
            />
          </div>
          <div className='form-group'>
            <label>Dispatched At:</label>
            <Datetime
              dateFormat='MM-DD-YY'
              timeFormat='HH:mm'
              inputProps={{ size: 14, name: 'dispatchTime' }}
              value={
                !dispatchTime
                  ? ''
                  : dispatchTime === '1970-01-01T00:00:00.000Z'
                  ? ''
                  : new Date(dispatchTime)
              }
              initialViewDate={
                !job.dispatchTime
                  ? ''
                  : job.dispatchTime === '1970-01-01T00:00:00.000Z'
                  ? ''
                  : dateToMDY(new Date(dispatchTime))
              }
              onChange={(val) => {
                setDispatchTime(val);
                let newJob = job;
                newJob.dispatchTime = new Date(val);
                setJob(newJob);
              }}
              onKeyPress={(e) => {
                e.key === 'Enter' && e.preventDefault();
              }}
            />
          </div>
          <div className='form-group'>
            <label>Completed At:</label>
            <Datetime
              dateFormat='MM-DD-YY'
              timeFormat='HH:mm'
              inputProps={{ size: 14, name: 'completedTime' }}
              value={
                !completedTime
                  ? ''
                  : completedTime === '1970-01-01T00:00:00.000Z'
                  ? ''
                  : new Date(completedTime)
              }
              initialViewDate={
                !job.completedTime
                  ? ''
                  : job.completedTime === '1970-01-01T00:00:00.000Z'
                  ? ''
                  : dateToMDY(new Date(completedTime))
              }
              onChange={(val) => {
                setCompletedTime(val);
                let newJob = job;
                newJob.completedTime = new Date(val);
                setJob(newJob);
              }}
              onKeyPress={(e) => {
                e.key === 'Enter' && e.preventDefault();
              }}
            />
          </div>
          <div className='form-group'>
            <label>Technician:</label>
            <input
              type='text'
              name='technician'
              size='7'
              onChange={changeTarget}
              onKeyPress={(e) => {
                e.key === 'Enter' && e.preventDefault();
              }}
              defaultValue={job.technician}
            />
          </div>

          <div className='form-group'>
            <label>Status:</label>
            <select
              name='status'
              ref={refStatus}
              onChange={updateJobStatus}
              onKeyPress={(e) => {
                e.key === 'Enter' && e.preventDefault();
              }}
              value={status.priority}
            >
              <option value={RUSH.priority}>{RUSH.text}</option>
              <option value={PARKED.priority}>{PARKED.text}</option>
              <option value={PENDING.priority}>{PENDING.text}</option>
              <option value={INPROGRESS.priority}>{INPROGRESS.text}</option>
              <option value={COMPLETE.priority}>{COMPLETE.text}</option>
              <option value={CANCELLED.priority}>{CANCELLED.text}</option>
            </select>
          </div>
        </div>
        <div className='customer-info form-section'>
          <div className='form-group'>
            <label>Customer:</label>
            <input
              type='text'
              name='customer.name'
              size='32'
              onChange={changeTarget}
              onKeyPress={(e) => {
                e.key === 'Enter' && e.preventDefault();
              }}
              defaultValue={job.customer.name}
            />
          </div>
          <div className='form-group'>
            <label>Caller:</label>
            <input
              type='text'
              name='customer.caller'
              size='15'
              onChange={changeTarget}
              onKeyPress={(e) => {
                e.key === 'Enter' && e.preventDefault();
              }}
              defaultValue={job.customer.caller}
            />
          </div>
          <div className='form-group'>
            <label>Contact Number:</label>
            <input
              type='text'
              name='customer.contactNumber'
              size='17'
              onChange={changeTarget}
              onKeyPress={(e) => {
                e.key === 'Enter' && e.preventDefault();
              }}
              defaultValue={job.customer.contactNumber}
            />
          </div>
          <div className='form-group'>
            <label>Purchase Order:</label>
            <input
              type='text'
              name='customer.purchaseOrder'
              size='12'
              onChange={changeTarget}
              onKeyPress={(e) => {
                e.key === 'Enter' && e.preventDefault();
              }}
              defaultValue={job.customer.purchaseOrder}
            />
          </div>
          <div className='form-group'>
            <label>Work Order:</label>
            <input
              type='text'
              name='workOrder'
              size='8'
              onChange={changeTarget}
              onKeyPress={(e) => {
                e.key === 'Enter' && e.preventDefault();
              }}
              defaultValue={job.workOrder}
            />
          </div>
          <div className='form-group'>
            <label>Invoice:</label>
            <input
              type='text'
              name='invoice'
              size='8'
              onChange={changeTarget}
              onKeyPress={(e) => {
                e.key === 'Enter' && e.preventDefault();
              }}
              defaultValue={job.invoice}
            />
          </div>
        </div>
        <div className='unit-info form-section'>
          <div className='form-group'>
            <label>Unit Number:</label>
            <input
              type='text'
              name='unit.number'
              size='20'
              onChange={changeTarget}
              onKeyPress={(e) => {
                e.key === 'Enter' && e.preventDefault();
              }}
              defaultValue={job.unit.number}
            />
          </div>
          <div className='form-group'>
            <label>Make:</label>
            <input
              type='text'
              size='20'
              onChange={changeTarget}
              onKeyPress={(e) => {
                e.key === 'Enter' && e.preventDefault();
              }}
              name='unit.make'
              defaultValue={job.unit.make}
            />
          </div>
          <div className='form-group'>
            <label>Model:</label>
            <input
              type='text'
              size='20'
              onChange={changeTarget}
              onKeyPress={(e) => {
                e.key === 'Enter' && e.preventDefault();
              }}
              name='unit.model'
              defaultValue={job.unit.model}
            />
          </div>
          <div className='form-group'>
            <label>Size:</label>
            <input
              type='text'
              size='21'
              onChange={changeTarget}
              onKeyPress={(e) => {
                e.key === 'Enter' && e.preventDefault();
              }}
              name='unit.size'
              defaultValue={job.unit.size}
            />
          </div>
          <div className='form-group'>
            <label>Position:</label>
            <input
              type='text'
              size='20'
              onChange={changeTarget}
              onKeyPress={(e) => {
                e.key === 'Enter' && e.preventDefault();
              }}
              name='unit.position'
              defaultValue={job.unit.position}
            />
          </div>
        </div>
        <div className='form-section job-body'>
          <div className='form-group job-description'>
            <label>Notes:</label>
            <textarea
              name='description'
              rows='5'
              onChange={changeTarget}
              defaultValue={job.description}
            ></textarea>
          </div>
        </div>
        <div className='control-group'>
          <button className='btn' onClick={add}>
            {!props.match.params._id ? 'Add' : 'Update'}
          </button>
          <button className='btn' onClick={cancel}>
            Cancel
          </button>
        </div>
      </form>
      {/* {
        (document.getElementById('jobform').onkeypress = function (e) {
          var key = e.charCode || e.keyCode || 0;
          if (key == 13) {
            e.preventDefault();
          }
        })
      } */}
    </div>
  );
};

export default AddJob;

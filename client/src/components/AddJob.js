import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Datetime from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css'
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
    scheduledTime: '',
    technician: '',
    dispatchTime: '',
    completedTime: '',
    workOrder: '',
    invoice: '',
    status: {
      priority: '',
      text: '',
    },
  });

  const [scheduledTime, setSchedluedTime] = useState(!job.scheduledTime ? null : new Date(job.scheduledTime));
  const [dispatchTime, setDispatchTime] = useState(!job.dispatchTime ? null : new Date(job.dispatchTime));
  const [completedTime, setCompletedTime] = useState(!job.completedTime ? null : new Date(job.completedTime));

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
        })
        .catch((err) => console.log(err));
    } else {
      console.log('add new job');
    }
    // eslint-disable-next-line
  }, []);

  
  const changeTarget = (e) => {
    let newJob = job;
    console.log(e.target);
    console.log(e);
    newJob[e.target.name] = e.target.value;
    setJob(newJob);

    return;
  };

  const add = (e) => {
    e.preventDefault();
    console.log(job);
    return;
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
              name='customer.location'
              defaultValue={job.customer.location}
            />
          </div>
          <div className='form-group'>
            <label>Scheduled Time:</label>
            <Datetime
              dateFormat='MM-DD-YY'
              timeFormat='HH:mm'
              inputProps={{size: 14}}
              value={
                !scheduledTime
                  ? ''
                  : scheduledTime === '1970-01-01T00:00:00.000Z'
                  ? ''
                  : new Date(scheduledTime)
              }
              initialViewDate = {
                !job.scheduledTime
                  ? ''
                  : job.scheduledTime === '1970-01-01T00:00:00.000Z'
                  ? ''
                  : dateToMDY(new Date(scheduledTime))
              }
              onChange = {val => {setSchedluedTime(val);
                                  let newJob = job;
                                  newJob.scheduledTime = new Date(val);
                                  setJob(newJob);
                                }}
            />
          </div>
          <div className='form-group'>
            <label>Dispatched At:</label>
            <Datetime
              dateFormat='MM-DD-YY'
              timeFormat='HH:mm'
              inputProps={{size: 14}}
              value={
                !dispatchTime
                  ? ''
                  : dispatchTime === '1970-01-01T00:00:00.000Z'
                  ? ''
                  : new Date(dispatchTime)
              }
              initialViewDate = {
                !job.dispatchTime
                  ? ''
                  : job.dispatchTime === '1970-01-01T00:00:00.000Z'
                  ? ''
                  : dateToMDY(new Date(dispatchTime))
              }
              onChange = {val => {setDispatchTime(val);
                let newJob = job;
                newJob.dispatchTime = new Date(val);
                setJob(newJob);
              }}
            />
          </div>
          <div className='form-group'>
            <label>Completed At:</label>
            <Datetime
              dateFormat='MM-DD-YY'
              timeFormat='HH:mm'
              inputProps={{size: 14}}
              value={
                !completedTime
                  ? ''
                  : completedTime === '1970-01-01T00:00:00.000Z'
                  ? ''
                  : new Date(completedTime)
              }
              initialViewDate = {
                !job.completedTime
                  ? ''
                  : job.completedTime === '1970-01-01T00:00:00.000Z'
                  ? ''
                  : dateToMDY(new Date(completedTime))
              }
              onChange = {val => {setCompletedTime(val);
                let newJob = job;
                newJob.completedTime = new Date(val);
                setJob(newJob);
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
              defaultValue={job.technician}
            />
          </div>

          <div className='form-group'>
            <label>Status:</label>
            <select
              name='status'
              //onChange={changeTarget}
              defaultValue={job.status.priority}
            >
              <option defaultValue={RUSH.priority}>{RUSH.text}</option>
              <option defaultValue={PARKED.priority}>{PARKED.text}</option>
              <option defaultValue={PENDING.priority}>{PENDING.text}</option>
              <option defaultValue={INPROGRESS.priority}>
                {INPROGRESS.text}
              </option>
              <option defaultValue={COMPLETE.priority}>{COMPLETE.text}</option>
              <option defaultValue={CANCELLED.priority}>
                {CANCELLED.text}
              </option>
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
              defaultValue={job.unit.number}
            />
          </div>
          <div className='form-group'>
            <label>Make:</label>
            <input
              type='text'
              size='20'
              onChange={changeTarget}
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
            Add
          </button>
          <button className='btn' onClick={cancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;

import React from 'react';

import { dateToMDY } from '../utils/';
import {
  RUSH,
  PARKED,
  PENDING,
  COMPLETE,
  CANCELLED,
  INPROGRESS,
} from '../utils/statusTypes';

const Job = (props) => {
  const editJob = (event) => {
    event.preventDefault();
    return null;
  };

  const toggleJobBody = (event) => {
    event.preventDefault();
    const form = event.target.parentNode.parentNode.parentNode;
    const sections = [
      form.querySelector('.job-body'),
      form.querySelector('.unit-info'),
    ];

    if (event.target.dataset.visable === 'true') {
      event.target.innerHTML = 'Expand';
      event.target.dataset.visable = 'false';
      sections.forEach((section) => {
        section.classList.toggle('form-section');
        section.classList.toggle('hide-section');
      });
    } else {
      event.target.innerHTML = 'Collapse';
      event.target.dataset.visable = 'true';
      sections.forEach((section) => {
        section.classList.toggle('form-section');
        section.classList.toggle('hide-section');
      });
    }
  };

  return (
    <div className='job-item'>
      <form>
        <div className='job-header form-section'>
          <div className='form-group'>
            <label>Time In:</label>
            <input
              type='text'
              name='timeIn'
              readOnly
              value={dateToMDY(new Date(props.data.timeIn))}
            />
          </div>
          <div className='form-group'>
            <label>Location:</label>
            <input
              type='text'
              readOnly
              name='customer.location'
              value={props.data.customer.location}
            />
          </div>
          <div className='form-group'>
            <label>Scheduled Time:</label>
            <input
              type='text'
              readOnly
              name='scheduledTime'
              value={
                props.data.scheduledTime === '1970-01-01T00:00:00.000Z'
                  ? ''
                  : dateToMDY(new Date(props.data.scheduledTime))
              }
            />
          </div>
          <div className='form-group'>
            <label>Status:</label>
            <select name='status' readOnly value={props.data.status.priority}>
              <option value={RUSH.priority}>{RUSH.text}</option>
              <option value={PARKED.priority}>{PARKED.text}</option>
              <option value={PENDING.priority}>{PENDING.text}</option>
              <option value={INPROGRESS.priority}>{INPROGRESS.text}</option>
              <option value={COMPLETE.priority}>{COMPLETE.text}</option>
              <option value={CANCELLED.priority}>{CANCELLED.text}</option>
            </select>
          </div>
          <div className='controls'>
            <button onClick={editJob}>Edit</button>
            <button data-visable='true' onClick={toggleJobBody}>
              Collapse
            </button>
          </div>
        </div>
        <div className='customer-info form-section'>
          <div className='form-group'>
            <label>Customer:</label>
            <input
              type='text'
              name='customer.name'
              readOnly
              value={props.data.customer.name}
            />
          </div>
          <div className='form-group'>
            <label>Caller:</label>
            <input
              type='text'
              readOnly
              name='customer.caller'
              value={props.data.customer.caller}
            />
          </div>
          <div className='form-group'>
            <label>Contact Number:</label>
            <input
              type='text'
              readOnly
              name='customer.contactNumber'
              value={props.data.customer.contactNumber}
            />
          </div>
          <div className='form-group'>
            <label>Purchase Order:</label>
            <input
              type='text'
              readOnly
              name='customer.purchaseOrder'
              value={props.data.customer.purchaseOrder}
            />
          </div>
        </div>
        <div className='unit-info form-section'>
          <div className='form-group'>
            <label>Unit Number:</label>
            <input
              type='text'
              name='unit.number'
              readOnly
              value={props.data.unit.number}
            />
          </div>
          <div className='form-group'>
            <label>Make:</label>
            <input
              type='text'
              readOnly
              name='unit.make'
              value={props.data.unit.make}
            />
          </div>
          <div className='form-group'>
            <label>Model:</label>
            <input
              type='text'
              readOnly
              name='unit.model'
              value={props.data.unit.model}
            />
          </div>
          <div className='form-group'>
            <label>Size:</label>
            <input
              type='text'
              readOnly
              name='unit.size'
              value={props.data.unit.size}
            />
          </div>
          <div className='form-group'>
            <label>Position:</label>
            <input
              type='text'
              readOnly
              name='unit.position'
              value={props.data.unit.position}
            />
          </div>
        </div>
        <div className='form-section job-body'>
          <div className='form-group'>
            <label>Notes:</label>
            <textarea name='description' cols='145' rows='10'></textarea>
          </div>
        </div>
        <div className='job-footer form-section'>
          <div className='form-group'>
            <label>Dispatched At::</label>
            <input
              type='text'
              name='dispatchTime'
              readOnly
              value={
                props.data.dispatchTime === '1970-01-01T00:00:00.000Z'
                  ? ''
                  : dateToMDY(new Date(props.data.dispatchTime))
              }
            />
          </div>
          <div className='form-group'>
            <label>Completed At:</label>
            <input
              type='text'
              readOnly
              name='completedTime'
              value={
                props.data.completedTime === '1970-01-01T00:00:00.000Z'
                  ? ''
                  : dateToMDY(new Date(props.data.completedTime))
              }
            />
          </div>
          <div className='form-group'>
            <label>Technician:</label>
            <input
              type='text'
              readOnly
              name='technician'
              value={props.data.tecnician}
            />
          </div>
          <div className='form-group'>
            <label>Work Order:</label>
            <input
              type='text'
              readOnly
              name='workOrder'
              value={props.data.workOrder}
            />
          </div>
          <div className='form-group'>
            <label>Invoice:</label>
            <input
              type='text'
              readOnly
              name='invoice'
              value={props.data.invoice}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Job;

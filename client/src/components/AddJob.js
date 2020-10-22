import React, { useState } from 'react';
import {
  RUSH,
  PARKED,
  PENDING,
  COMPLETE,
  CANCELLED,
  INPROGRESS,
} from '../utils/statusTypes';

const AddJob = (props) => {
  if (props.match.params._id != null) {
    console.log(props.match.params._id);
  } else {
    console.log('add new job');
  }

  const add = () => {
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
              readOnly
              size='11'
              //value={dateToMDY(new Date(props.data.timeIn))}
            />
          </div>
          <div className='form-group'>
            <label>Location:</label>
            <input
              type='text'
              readOnly
              size='15'
              name='customer.location'
              //value={props.data.customer.location}
            />
          </div>
          <div className='form-group'>
            <label>Scheduled Time:</label>
            <input
              type='text'
              readOnly
              name='scheduledTime'
              size='11'
              /*value={
                props.data.scheduledTime === '1970-01-01T00:00:00.000Z'
                  ? ''
                  : dateToMDY(new Date(props.data.scheduledTime))
              }*/
            />
          </div>
          <div className='form-group'>
            <label>Dispatched At:</label>
            <input
              type='text'
              name='dispatchTime'
              readOnly
              size='11'
              // value={
              //   props.data.dispatchTime === '1970-01-01T00:00:00.000Z'
              //     ? ''
              //     : dateToMDY(new Date(props.data.dispatchTime))
              // }
            />
          </div>
          <div className='form-group'>
            <label>Completed At:</label>
            <input
              type='text'
              readOnly
              name='completedTime'
              size='11'
              // value={
              //   props.data.completedTime === '1970-01-01T00:00:00.000Z'
              //     ? ''
              //     : dateToMDY(new Date(props.data.completedTime))
              // }
            />
          </div>
          <div className='form-group'>
            <label>Technician:</label>
            <input
              type='text'
              readOnly
              name='technician'
              size='7'
              // value={props.data.tecnician}
            />
          </div>

          <div className='form-group'>
            <label>Status:</label>
            <select
              name='status'
              /*value={props.data.status.priority}*/ readOnly
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
              readOnly
              size='32'
              // value={props.data.customer.name}
            />
          </div>
          <div className='form-group'>
            <label>Caller:</label>
            <input
              type='text'
              readOnly
              name='customer.caller'
              size='15'
              // value={props.data.customer.caller}
            />
          </div>
          <div className='form-group'>
            <label>Contact Number:</label>
            <input
              type='text'
              readOnly
              name='customer.contactNumber'
              size='17'
              // value={props.data.customer.contactNumber}
            />
          </div>
          <div className='form-group'>
            <label>Purchase Order:</label>
            <input
              type='text'
              readOnly
              name='customer.purchaseOrder'
              size='12'
              // value={props.data.customer.purchaseOrder}
            />
          </div>
          <div className='form-group'>
            <label>Work Order:</label>
            <input
              type='text'
              readOnly
              name='workOrder'
              size='8'
              // value={props.data.workOrder}
            />
          </div>
          <div className='form-group'>
            <label>Invoice:</label>
            <input
              type='text'
              readOnly
              name='invoice'
              size='8'
              // value={props.data.invoice}
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
              size='20'
              // value={props.data.unit.number}
            />
          </div>
          <div className='form-group'>
            <label>Make:</label>
            <input
              type='text'
              readOnly
              size='20'
              name='unit.make'
              // value={props.data.unit.make}
            />
          </div>
          <div className='form-group'>
            <label>Model:</label>
            <input
              type='text'
              readOnly
              size='20'
              name='unit.model'
              // value={props.data.unit.model}
            />
          </div>
          <div className='form-group'>
            <label>Size:</label>
            <input
              type='text'
              readOnly
              size='21'
              name='unit.size'
              // value={props.data.unit.size}
            />
          </div>
          <div className='form-group'>
            <label>Position:</label>
            <input
              type='text'
              readOnly
              size='20'
              name='unit.position'
              // value={props.data.unit.position}
            />
          </div>
        </div>
        <div className='form-section job-body'>
          <div className='form-group job-description'>
            <label>Notes:</label>
            <textarea name='description' rows='5'></textarea>
          </div>
        </div>
        <div className='controls'>
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

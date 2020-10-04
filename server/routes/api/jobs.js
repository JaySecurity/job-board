const express = require('express');
const router = express.Router();

const Job = require('../../models/Job');

// @route GET api/jobs
// @desc Get all jobs
// @access Public --set to private after auth system is complete.
router.get('/', async (req, res) => {
  let jobs = {};
  try {
    if (req.body.priority) {
      jobs = await Job.find().sort({ 'status.priority': 1 });
    } else if (req.body.byDate) {
      jobs = await Job.find().sort({ timeIn: 1 });
    } else if (req.body.byScheduleDate) {
      jobs = await Job.find().sort({ scheduledTime: 1 });
    } else {
      jobs = await Job.find();
    }
    return res.json(jobs);
  } catch (err) {
    console.log(err);
  }
});

// @route GET api/jobs/:id
// @desc Get job by ID
// @access Public --set to private after auth system is complete.

router.get('/:id', async (req, res) => {
  let job = {};
  try {
    job = await Job.findById(req.params.id).exec();
  } catch (err) {
    console.log(err);
  }
  job
    ? res.status(200).json(job)
    : res.status(404).json({ msg: 'Job Not Found' });
});

// @route POST api/jobs
// @desc Create a new Job
// @access Public --set to private after auth system is complete.

router.post('/', async (req, res) => {
  const newJob = new Job({
    customer: {
      name: req.body.customer.name,
      caller: req.body.customer.caller,
      contactNumber: req.body.customer.contactNumber,
      location: req.body.customer.location,
      purchaseOrder: req.body.customer.purchaseOrder,
    },
    unit: {
      number: req.body.unit.number,
      make: req.body.unit.make,
      model: req.body.unit.model,
      position: req.body.unit.position,
      size: req.body.unit.size,
    },
    description: req.body.description,
    scheduledTime: new Date(req.body.scheduledTime) || null,
    technician: req.body.technician,
    dispatchTime: new Date(req.body.dispatchTime) || null,
    completedTime: new Date(req.body.completedTime) || null,
    workOrder: req.body.workOrder,
    invoice: req.body.invoice,
    status: {
      priority: req.body.status.priority,
      text: req.body.status.text,
    },
  });
  try {
    await newJob.save();
    return res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// @route POST api/jobs/:id
// @desc Update a Job
// @access Public --set to private after auth system is complete.

router.put('/:id', async (req, res) => {
  const jobID = req.body._id; //may rename after UI implimented
  let updatedJob = {
    customer: {
      name: req.body.customer.name,
      caller: req.body.customer.caller,
      contactNumber: req.body.customer.contactNumber,
      location: req.body.customer.location,
      purchaseOrder: req.body.customer.purchaseOrder,
    },
    unit: {
      number: req.body.unit.number,
      make: req.body.unit.make,
      model: req.body.unit.model,
      position: req.body.unit.position,
      size: req.body.unit.size,
    },
    description: req.body.description,
    scheduledTime: new Date(req.body.scheduledTime),
    technician: req.body.technician,
    dispatchTime: new Date(req.body.dispatchTime) || null,
    completedTime: new Date(req.body.completedTime) || null,
    workOrder: req.body.workOrder,
    invoice: req.body.invoice,
    status: {
      priority: req.body.status.priority,
      text: req.body.status.text,
    },
  };
  try {
    updatedJob = await Job.findByIdAndUpdate(jobID, updatedJob, { new: true });
  } catch (err) {
    console.log(err);
  }
  return res.status(202).json(updatedJob);
});

module.exports = router;

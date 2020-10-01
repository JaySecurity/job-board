const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  timeIn: {
    type: Date,
    default: Date.now,
  },
  customer: {
    name: String,
    caller: String,
    contactNumber: String,
    location: String,
    purchaseOrder: String,
  },
  unit: {
    number: String,
    make: String,
    model: String,
    position: String,
    size: String,
  },
  description: String,
  scheduledTime: { type: Date, default: null },
  technician: String,
  dispatchTime: { type: Date, default: null },
  completedTime: { type: Date, default: null },
  workOrder: String,
  invoice: String,
  status: {
    priority: Number,
    text: String,
  },
});

module.exports = Job = mongoose.model('job', JobSchema);

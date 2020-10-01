const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const jobs = require('./routes/api/jobs');

dotenv.config({ path: '../config/config.env' });

const db = process.env.MONGO_URI;

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));
app.use('/api/jobs', jobs);
app.get('/', (req, res) => res.send('Hello'));

app.listen(port, () => console.log(`Server running on port ${port}`));

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const queueRoutes = require('./routes/queueRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/queue', queueRoutes);

const PORT = process.env.PORT || 3000;
console.log('trying to connect mongodb')
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`server running on port ${PORT}`));
    })
    .catch(err => console.error(err));
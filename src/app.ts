import express, { Application } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import superheroRoutes from './routes/superheroRoutes';
import autheRoutes from './routes/admin/autheRoutes';

require('dotenv').config();

const app: Application = express();

app.use(bodyParser.json());
app.use('/api/superheroes', superheroRoutes);
app.use('/api/', autheRoutes);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/trabalho-react';

mongoose
  .connect(MONGO_URI, { 
    // useNewUrlParser: true,
    // useUnifiedTopology: true
 })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });

import express from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import { createConnection } from './src/database/connect.js';
import authRoutes from './src/routes/authRoutes.js';
import questionRoutes from './src/routes/questionRoutes.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CONECTAMOS A MONGODB ATLAS
createConnection();

// ROUTES
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/questions', questionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

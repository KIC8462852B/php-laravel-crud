import mongoose from 'mongoose';

export const createConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    console.log('DB connected');
    
    mongoose.connection.on('error', (error) => {
      console.error('ERROR The connection was interrupted', error);
    });

  } catch (error) {
    console.error('ERROR Cannot connect to the DB.', error);
  }
};

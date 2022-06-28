import mongoose from 'mongoose';
import colors from 'colors';
// connect to the database

const connectDB = async () => {
  //build the connection string
  const DB = process.env.DB_STR.replace('<username>', process.env.DB_USER)
    .replace('<dbname>', process.env.DB_NAME)
    .replace('<password>', process.env.DB_PASSWORD);

  console.log(DB);
  //connect to db
  try {
    const conn = await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB connected : ${conn.connection.host}`.blue); //.blue colors package
  } catch (error) {
    console.error(`Error : ${error.message}`.red.bold);
    process.exit(1);
  }
};

export default connectDB;

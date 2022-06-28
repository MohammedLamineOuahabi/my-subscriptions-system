import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import connectDB from './utils/db.js';
import 'dotenv/config';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import subscribeRoutes from './routes/subscribeRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
//const orderRoutes = require("./routes/orderRoutes.js");
//const uploadRoutes = require("./routes/uploadRoutes.js");

// ******* init express app *****************

const app = express();

// ******* load env vars for dev env  *******

// ******* Connect to db  *******************

connectDB();

// ******* static files *********************

///app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
///app.use(express.static(path.join(__dirname, '../frontend/build')));

// ******* MIDDLEWARE ************************

app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  app.get('/', (req, res) => {
    res.send('Api is running ...');
  });
}

// *******   ROUTES   ************************
app.use('/api/v1/subscribes', subscribeRoutes);
app.use('/api/v1/messages', messageRoutes);
app.use('/api/v1/users', userRoutes);
///app.use('/api/v1/upload', uploadRoutes);
/*app.get('/api/v1/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});*/

if (process.env.NODE_ENV === 'production') {
  /*

  using regular expressions to detect non api requests
  /     / : using regular expression
  ^       : begin ogf line
  \/      : / character
  ()      : capture group of tokens
  (?!X)   : negative lookahead not equal X
  *.      : matches any character (except for line terminators)  

  */
  app.use(/^\/(?!api).*/, (req, res) => {
    //res.send('Api is running ...');
    res.sendFile(path.join(__dirname, 'index.html'));
  });
}
// *******  Error Middleware *************

app.use(notFound);
app.use(errorHandler);
// if error return json response to client

// *********  listening  *****************
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Server running on port ' + port);
});

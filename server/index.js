import dotenv from 'dotenv';
dotenv.config();

import app from './app.js'
// const app = require('./app.js')
const PORT = process.env.PORT || 8080;

// listening on port
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

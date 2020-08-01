/* Set up Express server environment */

// Initialize Express
const express = require('express');
const app = express();
app.use(express.static('dist'));

// Initialize body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Initialize cors
const cors = require('cors');
app.use(cors());

// Set up dotenv to securely access API keys
const dotenv = require('dotenv');
dotenv.config();

// Set up host server
const localHost = 8081;
const server = app.listen(localHost, () => {
    console.log(`Server running on localhost:${localHost}`);
});


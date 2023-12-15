const express = require('express');
const axios = require('axios');
const path = require('path');
const favicon = require('serve-favicon');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;
const bowman = process.env.BOWMAN_URL;
const mcdavid = process.env.MCDAVID_URL;

// Middleware to parse JSON and handle URL encoded data and favicon
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (including your index.html) from the root directory and favicon
app.use(express.static(path.join(__dirname)));
app.use(favicon(path.join(__dirname, 'src', 'img', 'favicon', 'favicon.ico')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle POST request to /fetchData
app.post('/fetchData', async (req, res) => {
  try {
    const eventId = req.body.eventId;
    const apiUrl1 = `${bowman}${eventId}`;
    const apiUrl2 = `${mcdavid}${eventId}`;

    // Check if a specific API is requested
    const requestedApi = req.body.api; // This should be a string, either 'bowman' or 'mcdavid'

    let responseData;

    if (requestedApi === 'bowman') {
      const response = await axios.get(apiUrl1);
      responseData =  { dataFromBowman: response.data };
    } else if (requestedApi === 'mcdavid') {
      const response = await axios.get(apiUrl2);
      responseData = { dataFromMcDavid: response.data };
    } else {
      // If no specific API is requested, return both responses
      const response1 = await axios.get(apiUrl1);
      const response2 = await axios.get(apiUrl2);

      responseData = {
        dataFromBowman: response1.data,
        dataFromMcDavid: response2.data,
      };
    }

    res.json(responseData);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

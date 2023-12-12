const express = require('express');
const axios = require('axios');
const path = require('path');
const favicon = require('serve-favicon');

const app = express();
const port = process.env.PORT || 3000;

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
    const apiUrl1 = `https://bowman.plessinc.com/api/events/${eventId}`;
    const apiUrl2 = `https://mcdavid.plessinc.com/criteria/${eventId}`;
    
    const response1 = await axios.get(apiUrl1);
    const response2 = await axios.get(apiUrl2);

    res.json({
      dataFromBowman: response1.data,
      dataFromMcDavid: response2.data,
    });
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

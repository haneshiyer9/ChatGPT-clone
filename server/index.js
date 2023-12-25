require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/', express.static(__dirname + '/frontend')); // Serves resources from the client folder
app.post('/get-prompt-result', async (req, res) => {
    try {
      console.log('Received request:', req.body);
      const { prompt } = req.body;
  
      if (!prompt) {
        console.error('Error: Prompt is missing in the request');
        return res.status(400).send({ error: 'Prompt is missing in the request' });
      }
  
      // Make a request to the Longshot API using axios
      const apiResponse = await axios.post(
        'https://chat-gpt-clone-client.vercel.app/api/generate/instruct',
        { text: prompt },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.LONGSHOTAI_API_KEY}`, // Use the API key from the .env file
          },
        }
      );
  
      console.log('Sending response to the client:', apiResponse.data);
      return res.send(apiResponse.data);
    } catch (error) {
      console.error('Internal Server Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));

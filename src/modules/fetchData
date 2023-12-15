// fetch the data and return the response for the api calls in server.js

export async function fetchData(eventId, api = '') {
    try {
      const response = await fetch('/fetchData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventId, api }),
      });
  
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
  
      const eventData = await response.json();
      return eventData;
  
    } catch (error) {
      console.error('Error:', error.message);
    }
}

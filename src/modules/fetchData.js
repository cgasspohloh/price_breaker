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
      const submitIcon = document.getElementById('button__icon');
      submitIcon.classList.remove('loader');
      submitIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none" class="svg"><line y2="19" y1="5" x2="12" x1="12"></line><line y2="12" y1="12" x2="19" x1="5"></line></svg>`
    }
}

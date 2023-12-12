// Function to fill in the HTML elements
export default function fillEventDetails(newEvent) {
  
    const eventNameElement = document.getElementById('eventName');
    const eventDateElement = document.getElementById('eventDate');
    const locationElement = document.getElementById('location');
    const eventLinkElement = document.getElementById('eventLink');
  
    // Clear the existing event details
    eventNameElement.textContent = '';
    eventDateElement.textContent = '';
    locationElement.textContent = '';
    eventLinkElement.href = '';
    eventLinkElement.textContent = '';
  
    // Check if the newEvent exists and has the necessary properties
    if (newEvent && newEvent.name && newEvent.date && newEvent.location && newEvent.urlLink) {
      eventNameElement.textContent = newEvent.name;
      eventDateElement.textContent = 'Date: ' + newEvent.date;
      locationElement.textContent = 'Location: ' + newEvent.location;
      eventLinkElement.href = newEvent.urlLink;
      eventLinkElement.textContent = '  Ticketmaster Link';
    } else {
      // Handle the case where the data is not available or incomplete
      eventNameElement.textContent = 'Event details not available on Bowman';
    }
}

  
  
  
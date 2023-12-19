// Function to fill in the HTML elements
export default function fillEventDetails(newEvent) {
  const eventNameElement = document.getElementById('eventName');
  const eventDateElement = document.getElementById('eventDate');
  const locationElement = document.getElementById('location');
  const ticketLimitElement = document.getElementById('ticketLimit');
  const eventLinkElement = document.getElementById('eventLink');
  const venueMapElement = document.getElementById('venue-map');

  const salesElement = document.getElementById('sales');

  // Clear the existing event details
  eventNameElement.textContent = '';
  eventDateElement.textContent = '';
  locationElement.textContent = '';
  ticketLimitElement.textContent = '';
  eventLinkElement.href = '';
  eventLinkElement.textContent = '';
  salesElement.textContent = '';
  salesElement.innerHTML = `<h2><strong>Todays Sales</strong></h2>`

  // Check if the newEvent exists and has the necessary properties
  if (newEvent && newEvent.name && newEvent.date && newEvent.location && newEvent.ticketLimit && newEvent.urlLink) {
    eventNameElement.textContent = newEvent.name;
    eventDateElement.innerHTML = `<strong>Date:</strong> ${newEvent.date}`;
    locationElement.innerHTML = `<strong>Location:</strong> ${newEvent.location}`;
    ticketLimitElement.textContent = newEvent.ticketLimit;
    eventLinkElement.href = newEvent.urlLink;
    eventLinkElement.textContent = '  Ticketmaster Link';

    newEvent.sales.forEach((sale) => {
      const saleInfoElement = document.createElement('p');
      saleInfoElement.textContent = `${sale.name} starting at ${sale.start}`
      salesElement.append(saleInfoElement);
    })

    // Check if seatingMap exists
    if (newEvent.seatingMap) {
      // Set the static image URL in the #venue-map div
      venueMapElement.innerHTML = `<img src="${newEvent.seatingMap}" alt="Venue Map">`;
    }
  } else {
    // Handle the case where the data is not available or incomplete
    eventNameElement.textContent = 'Event details not available on Bowman';
  }
}

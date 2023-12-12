import { handleEventDetails, handleListingDetails} from "./modules/dataHandler";
import fillEventDetails from "./modules/eventDetails";
import { eventSaver } from "./modules/eventSaver";
import renderTable from "./modules/renderTable";

let eventData;
let eventDetails;
let listingDetails;
const savedEvents = document.getElementById('event-container');

document.getElementById('eventIdForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const eventId = document.getElementById('eventId').value;

    try {
      const response = await fetch('/fetchData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventId }),
      });

      if (!response.ok) {
        throw new Error('Error fetching data');
      }

      eventData = await response.json();
      
      eventDetails = handleEventDetails(eventData);
      listingDetails = handleListingDetails(eventData);
      eventSaver(eventDetails, listingDetails);
      fillEventDetails(eventDetails);
      renderTable(listingDetails);

    } catch (error) {
      console.error('Error:', error.message);
    }

});

// event listner to load saved events when clicked
savedEvents.addEventListener('click', (event) => {
  const clickedElement = event.target.closest('.savedEvent');

  if (clickedElement) {
      const savedNewEvent = clickedElement._savedNewEvent;
      const savedEventListings = clickedElement._savedEventListings;

      fillEventDetails(savedNewEvent);
      renderTable(savedEventListings);
  }
});





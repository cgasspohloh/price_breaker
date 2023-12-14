import { handleEventDetails, handleListingDetails} from "./modules/dataHandler";
import fillEventDetails from "./modules/eventDetails";
import { eventSaver, toggleClickedEvent } from "./modules/eventSaver";
import renderTable from "./modules/renderTable";
import showCheapest from "./modules/showCheapest";

let eventData;
let eventDetails;
let listingDetails;
const savedEvents = document.getElementById('event-container');

document.getElementById('eventIdForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const eventId = document.getElementById('eventIdInput').value;
  fetchData(eventId);
});

document.addEventListener('DOMContentLoaded', function () {
  const refetchAllButton = document.getElementById('refetchAllButton');

  refetchAllButton.addEventListener('click', function () {
      // Perform actions when the "Re-Fetch All" button is clicked
      // For example, you can re-fetch all events or trigger any relevant functionality.
      // You might want to call the function fetchDataAndRenderTable() or any other suitable function.
  });
});

// module this
async function fetchData(eventId) {
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

      // Optionally, clear the input field in the HTML
      // eventIdInput.value = '';
  } catch (error) {
      console.error('Error:', error.message);
  }
}

// event listner to load saved events when clicked
savedEvents.addEventListener('click', (event) => {
  const clickedElement = event.target.closest('.savedEvent');

  toggleClickedEvent(clickedElement);

  // retrieve saved data from elements pass in functions
  if (clickedElement) {
      const savedNewEvent = clickedElement._savedNewEvent;
      const savedEventListings = clickedElement._savedEventListings;

      fillEventDetails(savedNewEvent);
      renderTable(savedEventListings);
  }
});

// Example of calling the function on a button click
const toggleSwitch = document.getElementById('cheapest-toggle');
// Initial state
let isCheapestShown = true;

toggleSwitch.addEventListener('change', function() {
  isCheapestShown = !isCheapestShown;

  showCheapest(isCheapestShown);
});



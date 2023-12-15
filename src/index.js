import { handleEventDetails, handleListingDetails} from "./modules/dataHandler";
import fillEventDetails from "./modules/eventDetails";
import { eventSaver, toggleClickedEvent } from "./modules/eventSaver";
import { fetchData } from "./modules/fetchData";
import levels from "./modules/levelHandler";
import renderTable from "./modules/renderTable";
import { setTimer } from "./modules/setTimer";
import showCheapestSection from "./modules/showCheapest";
import filterRows from "./modules/filterRows";

let eventData;
let eventDetails;
let listingDetails;
const savedEvents = document.getElementById('event-container');
let isCheapestSectionShown = true;
let uniqueToggled = true;

// submit button event for new event added
document.getElementById('eventIdForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const eventId = document.getElementById('eventIdInput').value;
  eventData = await fetchData(eventId);

  eventDetails = handleEventDetails(eventData);
  listingDetails = handleListingDetails(eventData);
  listingDetails = levels(listingDetails);
  eventSaver(eventDetails, listingDetails);
  fillEventDetails(eventDetails);
  renderTable(listingDetails);
  levels(listingDetails);
  filterRows(isCheapestSectionShown, uniqueToggled);

  // clear input field
  document.getElementById('eventIdInput').value = '';
});


// listener for re-fetching listing data
document.addEventListener('DOMContentLoaded', function () {
  const refetchAllButton = document.getElementById('refetchAllButton');
  const timeDropdown = document.getElementById('timeDropdown');

  refetchAllButton.addEventListener('click', function () {
    const selectedTime = timeDropdown.value;

    if (selectedTime !== 'now') {
      // Calculate the time until the selected time
      const currentTime = new Date();
      const selectedHour = parseInt(selectedTime.split(':')[0], 10);
      const selectedMinute = parseInt(selectedTime.split(':')[1], 10);
      const selectedDateTime = new Date(currentTime);
      selectedDateTime.setHours(selectedHour, selectedMinute, 0, 0);

      const timeDifference = selectedDateTime - currentTime;

      if (timeDifference > 0) {
        setTimer(timeDifference);
        // Set a timer to trigger the re-fetch at the selected time
        setTimeout(function () {
          // Call the existing re-fetch function
          console.log("Timer up: Re-fetching Data")
          reFetchData();
        }, timeDifference);
      } else {
        console.error('Selected time has already passed for today.');
      }
    } else {
      // If "NOW" is selected, re-fetch immediately
      reFetchData();
    }
  });

  // Your existing reFetchData function
  function reFetchData() {
    const allSavedEvents = document.getElementsByClassName('savedEvent');

    for (let i = 0; i < allSavedEvents.length; i++) {
      const savedEvent = allSavedEvents[i];
      const eventId = savedEvent._savedNewEvent.eventId;

      fetchData(eventId, 'mcdavid')
        .then((eventData) => {
          // re-process the data
          listingDetails = handleListingDetails(eventData);
          listingDetails = levels(listingDetails);
          // re-save the listings to the event
          savedEvent._savedEventListings = listingDetails;
          // if it is the clicked event, render
          if (savedEvent.classList.contains('clicked')) {
            renderTable(listingDetails);
            filterRows(isCheapestSectionShown, uniqueToggled);
          }
        })
        .catch((error) => {
          console.error(`Error fetching data for event ID ${eventId}:`, error.message);
        });
    }
  }
});


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


// Toggle cheapest section
const toggleCheapSections = document.getElementById('cheapest-section-toggle');
toggleCheapSections.addEventListener('change', function() {
  isCheapestSectionShown = !isCheapestSectionShown;

  filterRows(isCheapestSectionShown, uniqueToggled);
});

// Toggle cheapest section
const toggleUnique = document.getElementById('unqiue-pricing-toggle');
toggleUnique.addEventListener('change', function() {
  uniqueToggled = !uniqueToggled;

  filterRows(isCheapestSectionShown, uniqueToggled);
});
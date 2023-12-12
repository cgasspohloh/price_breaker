// save the events for quicker access
export function eventSaver(newEvent, eventListings) {
    // Create a new event div
    const eventDiv = document.createElement('div');
    eventDiv.id = newEvent.eventId;
    eventDiv.classList.add('savedEvent');

    // Store data within the closure
    eventDiv._savedNewEvent = newEvent;
    eventDiv._savedEventListings = eventListings;

    // Create and append delete button
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteEventButton');
    deleteButton.textContent = 'X';
    // Add a click event listener to the delete button
    deleteButton.addEventListener('click', function () {
        eventDiv.remove()
    });
    eventDiv.appendChild(deleteButton);

    // Create and append event name element
    const eventNameElement = document.createElement('h3');
    eventNameElement.classList.add('eventName', 'eventInfo');
    eventNameElement.textContent = newEvent.name;
    eventDiv.appendChild(eventNameElement);

    // Create and append event date element
    const eventDateElement = document.createElement('p');
    eventDateElement.classList.add('eventDate', 'eventInfo');
    eventDateElement.textContent = newEvent.date;
    eventDiv.appendChild(eventDateElement);

    // Create and append event location element
    const eventLocationElement = document.createElement('p');
    eventLocationElement.classList.add('eventLocation', 'eventInfo');
    eventLocationElement.textContent = newEvent.location;
    eventDiv.appendChild(eventLocationElement);

    // Use a closure to store data within the eventDiv
    eventDiv.addEventListener('click', function () {
        // Retrieve the data from the closure
        const savedNewEvent = eventDiv._savedNewEvent;
        const savedEventListings = eventDiv._savedEventListings;

    });

    // Append the new event div to the "event-container" div
    const eventContainer = document.getElementById('event-container');
    eventContainer.appendChild(eventDiv);
}

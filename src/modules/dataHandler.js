// turns event details into an object
export function handleEventDetails(eventData) {
    if (!eventData || !eventData.dataFromBowman || !eventData.dataFromBowman.event) {
        return undefined; // Return undefined if eventData or eventData.dataFromBowman or eventData.dataFromBowman.event is undefined
    }

    const event = eventData.dataFromBowman.event;
    
    const newEvent = {
        name: event.event_name,
        date: event.event_date.substring(0,10),
        location: `At the ${event.venue_name} in beautiful ${event.city}`,
        urlLink: 'https://www.ticketmaster.com/event/' + event.url_id,
        eventId: event.url_id,
        city: event.city
    }

    return newEvent;
}

// Turns listing details into an array
export function handleListingDetails(eventData) {
    let listings = [];

    eventData.dataFromMcDavid.detailed.forEach((item) => {
        let listing = { 
            ticketTypeId : item.ticket_type_id,
            ticketTypeName: item.ticket_type_name,
            sectionName: getSectionName(item.section_id, eventData),
            unitCost: Math.round(item.unit_cost * 100) / 100,
            unitFees: Math.round(item.unit_fees * 100) / 100,
            totalCost: Math.round((item.unit_cost + item.unit_fees) * 100) / 100 ,
        } 

        listings.push(listing);
    })

    return listings
}

// filter and match section ID to section name from the sections data
function getSectionName(section_id, eventData) {
    const eventSectionData = eventData.dataFromMcDavid.sections;
    let index = eventSectionData.findIndex(s => s.sectionId == section_id);
    let sectionName =  eventSectionData[index].section;
    return sectionName;
}


 

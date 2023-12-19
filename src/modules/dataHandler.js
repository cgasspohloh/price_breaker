// turns event details into an object
export function handleEventDetails(eventData) {

    // check if data is available, if not send back filler info
    if (!eventData || !eventData.dataFromBowman || !eventData.dataFromBowman.event) {
        const fillerEvent = {
            name: "Data not available from Bowman",
            date: "",
            location: "",
            urlLink: "",
            eventId: document.getElementById('eventIdInput').value,
            city: "",
        }
        return fillerEvent;
    }

    const eventBowman = eventData.dataFromBowman.event;
    const eventDiscovery = eventData.dataFromDiscovery;

    const eventSales = [];
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');  // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    eventData.dataFromDiscovery.sales.presales.forEach((sale) => {
        const convertedSaleDate = new Date(sale.startDateTime);
        convertedSaleDate.toLocaleString("en-US", { timeZone: "America/New_York" });

        if (convertedSaleDate.toISOString().substring(0, 10) === formattedDate) {
            let presale = {
            name: sale.name,
            start: convertedSaleDate.toLocaleString("en-US", { timeZone: "America/New_York" }).substring(11, 24),
            };
            eventSales.push(presale);
        }
    });


    if (eventData.dataFromDiscovery.sales.public.startDateTime.substring(0, 10) === formattedDate)  {
        let onsale = {
            name:  eventData.dataFromDiscovery.sales.public.name,
            start: eventData.dataFromDiscovery.sales.public.startDateTime
        }
        eventSales.push(onsale);
    }
  
    const newEvent = {
        name: eventBowman.event_name || 'n/a',
        date: eventBowman.event_date?.substring(0, 10) || 'n/a',
        location: `At the ${eventBowman.venue_name || 'n/a'} in beautiful ${eventBowman.city || 'n/a'}`,
        urlLink: 'https://www.ticketmaster.com/event/' + (eventBowman.url_id || 'n/a'),
        eventId: eventBowman.url_id || 'n/a',
        city: eventBowman.city || 'n/a',
        seatingMap: eventDiscovery.seatmap?.staticUrl || 'n/a',
        ticketLimit: eventDiscovery.ticketLimit?.info || 'n/a',
        sales: eventSales || [],
    }
    return newEvent;
}

// Turns listing details into an array
export function handleListingDetails(eventData) {
    let listings = [];

    eventData.dataFromMcDavid.detailed.forEach((item) => {
        let listing = { 
            ticketTypeId : item.ticket_type_id || 'n/a',
            ticketTypeName: item.ticket_type_name || 'n/a',
            sectionName: getSectionName(item.section_id, eventData) || 'n/a',
            unitCost: Math.round(item.unit_cost * 100) / 100 || 'n/a',
            unitFees: Math.round(item.unit_fees * 100) / 100 || 'n/a',
            totalCost: Math.round((item.unit_cost + item.unit_fees) * 100) / 100 || 'n/a',
        } 

        listings.push(listing);
    })

    return listings
}

function getSectionName(section_id, eventData) {
    const eventSectionData = eventData.dataFromMcDavid.sections;
    const section = eventSectionData.find(s => s.sectionId == section_id);
    if (section && section.section) {
        return section.section;
    } else {
        return 'Unknown Section'; // Provide a default value or handle the case where section information is not available
    }
}


 

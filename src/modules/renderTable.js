export default function renderTable(eventData) {
    const resultDiv = document.getElementById('result');

    resultDiv.innerHTML = ''; // Clear previous results

    const table = document.createElement('table');
    table.classList.add('data-table');

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th>Ticket Type</th><th>Section</th><th>Unit Cost</th><th>Unit Fees</th><th>Total Cost</th>';
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');

    // Organize data by ticket type
    const ticketTypes = {};

    eventData.forEach((listing) => {

        // Create an object for the current section
        const listingDetails = {
            sectionName: listing.sectionName,
            unitCost: listing.unitCost,
            unitFees: listing.unitFees,
            totalCost: listing.totalCost,
        };
        
        if (!ticketTypes[listing.ticketTypeId]) {
            ticketTypes[listing.ticketTypeId] = { sections: [] };
        }

        ticketTypes[listing.ticketTypeId].ticketTypeName = listing.ticketTypeName; // Store ticketTypeName in the ticket type object
        ticketTypes[listing.ticketTypeId].sections.push(listingDetails);

    });

    // Sort sections within each ticket type by sectionName
    for (const ticketTypeId in ticketTypes) {
        ticketTypes[ticketTypeId].sections.sort((a, b) => {
            const sectionNameA = a.sectionName || '';
            const sectionNameB = b.sectionName || '';

            // Split the section name into numeric and non-numeric parts
            const partsA = sectionNameA.match(/(\D+)|(\d+)/g);
            const partsB = sectionNameB.match(/(\D+)|(\d+)/g);

            // Compare each part
            for (let i = 0; i < Math.min(partsA.length, partsB.length); i++) {
                const partA = partsA[i];
                const partB = partsB[i];

                if (!isNaN(partA) && !isNaN(partB)) {
                    // If both parts are numeric, convert to numbers and compare
                    const numA = parseFloat(partA);
                    const numB = parseFloat(partB);
                    if (numA !== numB) {
                        return numA - numB;
                    }
                } else {
                    // If one part is numeric and the other is not, compare as strings
                    const comparison = partA.localeCompare(partB);
                    if (comparison !== 0) {
                        return comparison;
                    }
                }
            }

            // If all parts are equal, consider the lengths
            return sectionNameA.length - sectionNameB.length;
        });
    }

    // Sort ticket types alphabetically by ticketTypeName
    const sortedTicketTypeIds = Object.keys(ticketTypes).sort((a, b) => {
        const ticketTypeNameA = ticketTypes[a].ticketTypeName || ''; // Use an empty string if ticketTypeName is undefined or null
        const ticketTypeNameB = ticketTypes[b].ticketTypeName || ''; // Use an empty string if ticketTypeName is undefined or null
        return ticketTypeNameA.localeCompare(ticketTypeNameB);
    });

    // Create rows for each ticket type and section
    for (const ticketTypeId of sortedTicketTypeIds) {
        const ticketTypeRow = document.createElement('tr');
        ticketTypeRow.classList.add('collapsible', sanitizeClassName(ticketTypeId));
        ticketTypeRow.innerHTML = `<td>${ticketTypes[ticketTypeId].ticketTypeName}</td><td></td><td></td><td></td><td></td>`;
        tbody.appendChild(ticketTypeRow);

        ticketTypes[ticketTypeId].sections.forEach(({ sectionName, unitCost, unitFees, totalCost }) => {
            const sectionRow = document.createElement('tr');
            sectionRow.classList.add('content', sanitizeClassName(ticketTypeId));
            sectionRow.style.display = 'none';
            sectionRow.innerHTML = `<td></td><td>${sectionName}</td><td>$${unitCost}</td><td>$${unitFees}</td><td>$${totalCost}</td>`;
            tbody.appendChild(sectionRow);
        });

        ticketTypeRow.addEventListener('click', function () {
            const contentRows = document.querySelectorAll(`.content.${sanitizeClassName(ticketTypeId)}`);
            for (let i = 0; i < contentRows.length; i++) {
                contentRows[i].style.display = contentRows[i].style.display === 'table-row' ? 'none' : 'table-row';
            }                
        });
    }

    table.appendChild(tbody);
    resultDiv.appendChild(table);

    function sanitizeClassName(name) {
        // Replace spaces and special characters with underscores
        const sanitizedName = name.replace(/[^\w]/g, '_');
        // Ensure the class name starts with a letter
        return `_${sanitizedName}`;
    }
}
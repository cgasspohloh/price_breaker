export default function renderTable(eventData) {
    const resultDiv = document.getElementById('result');

    resultDiv.innerHTML = ''; // Clear previous results

    const table = document.createElement('table');
    table.classList.add('data-table');

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th>Ticket Type</th><th>Levels</th><th>Section</th><th>Unit Cost</th><th>Unit Fees</th><th>Total Cost</th>';
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');

    // Organize data by ticket type
    const ticketTypes = {};

    eventData.forEach((listing) => {
        // Create an object for the current section 
        const listingDetails = {
            level: listing.level,
            sectionName: listing.sectionName,
            unitCost: listing.unitCost,
            unitFees: listing.unitFees,
            totalCost: listing.totalCost,
        };

        if (!ticketTypes[listing.ticketTypeId]) {
            ticketTypes[listing.ticketTypeId] = { sections: [], uniquePairs: new Set() };
        }

        ticketTypes[listing.ticketTypeId].ticketTypeName = listing.ticketTypeName; // Store ticketTypeName in the ticket type object
        ticketTypes[listing.ticketTypeId].sections.push(listingDetails);

        // Check if the level and unit cost pair is unique for this ticket type
        const pairKey = `${listing.level}_${listing.unitCost}`;
        const isUniquePair = !ticketTypes[listing.ticketTypeId].uniquePairs.has(pairKey);

        // Add the unique pair to the set
        if (isUniquePair) {
            ticketTypes[listing.ticketTypeId].uniquePairs.add(pairKey);
            listingDetails.uniquePricing = true; // Set uniqueLevel to true if the pair is unique
        } else {
            listingDetails.uniquePricing = false;
        }

        console.log(listingDetails)
        
    });

    // Sort sections within each ticket type by sectionName and unitCost
    for (const ticketTypeId in ticketTypes) {
        ticketTypes[ticketTypeId].sections.sort((a, b) => {
            // First, compare section names
            const sectionNameA = a.sectionName || '';
            const sectionNameB = b.sectionName || '';
            const sectionNameComparison = sectionNameA.localeCompare(sectionNameB);

            if (sectionNameComparison !== 0) {
                return sectionNameComparison;
            }

            // If section names are equal, compare unit costs
            return a.unitCost - b.unitCost;
        });
    }

    // Create rows for each ticket type and section
    for (const ticketTypeId of Object.keys(ticketTypes).sort((a, b) => {
        const ticketTypeNameA = ticketTypes[a].ticketTypeName || ''; // Use an empty string if ticketTypeName is undefined or null
        const ticketTypeNameB = ticketTypes[b].ticketTypeName || ''; // Use an empty string if ticketTypeName is undefined or null
        return ticketTypeNameA.localeCompare(ticketTypeNameB);
    })) {
        const ticketTypeRow = document.createElement('tr');
        ticketTypeRow.classList.add('collapsible', sanitizeClassName(ticketTypeId));
        ticketTypeRow.innerHTML = `<td class="first-col">${ticketTypes[ticketTypeId].ticketTypeName}</td><td></td><td></td><td></td><td></td><td></td>`;
        
        // Check if uniquePricing is true and add class "unique-pricing"
        if (ticketTypes[ticketTypeId].uniquePricing) {
            ticketTypeRow.classList.add('unique-pricing');
        }
    
        tbody.appendChild(ticketTypeRow);

        // Initialize the cheapest unit cost for each section and level
        const cheapestUnitCostPerSection = {};
        const cheapestUnitCostPerLevel = {};

        ticketTypes[ticketTypeId].sections.forEach(({ level, sectionName, unitCost, unitFees, totalCost, uniqueLevel, uniquePricing }) => {
            const sectionRow = document.createElement('tr');
            sectionRow.classList.add('content', sanitizeClassName(ticketTypeId));

            // Check if uniquePricing is true and add class "unique-pricing"
            if (uniquePricing) {
                sectionRow.classList.add('unique-pricing');
            }

            sectionRow.style.display = 'none';
            sectionRow.innerHTML = `<td></td><td>${level}</td><td>${sectionName}</td><td>$${unitCost}</td><td>$${unitFees}</td><td>$${totalCost}</td>`;
            tbody.appendChild(sectionRow);

            // Add "cheapest" class to the row with the lowest unit cost in each section
            if (!cheapestUnitCostPerSection[sectionName] || unitCost < cheapestUnitCostPerSection[sectionName].unitCost) {
                if (cheapestUnitCostPerSection[sectionName]) {
                    cheapestUnitCostPerSection[sectionName].row.classList.remove('cheapest-section');
                }

                sectionRow.classList.add('cheapest-section', 'display');
                cheapestUnitCostPerSection[sectionName] = { unitCost, row: sectionRow };
            }

            // Add "cheapest-level" class to the row with the lowest unit cost in each level
            if (!cheapestUnitCostPerLevel[level] || unitCost < cheapestUnitCostPerLevel[level].unitCost) {
                if (cheapestUnitCostPerLevel[level]) {
                    cheapestUnitCostPerLevel[level].row.classList.remove('cheapest-level');
                }

                sectionRow.classList.add('cheapest-level', 'display');
                cheapestUnitCostPerLevel[level] = { unitCost, row: sectionRow };
            }
        });

        const firstColTd = ticketTypeRow.querySelector('.first-col');

        firstColTd.addEventListener('click', function () {
            const contentRows = document.querySelectorAll(`.content.${sanitizeClassName(ticketTypeId)}`);
            const displayableRows = document.querySelectorAll(`.content.${sanitizeClassName(ticketTypeId)}.display`);
            
            // display all rows with the display class
            for (let i = 0; i < displayableRows.length; i++) {
                displayableRows[i].style.display = displayableRows[i].style.display === 'table-row' ? 'none' : 'table-row';
            }

            // add expanded to all rows with that ticket type id
            for (let i = 0; i < contentRows.length; i++) {
                contentRows[i].classList.toggle('expanded');
            }
        });
    }

    table.appendChild(tbody);
    resultDiv.appendChild(table);

}

function sanitizeClassName(name) {
    // Replace spaces and special characters with underscores
    const sanitizedName = name.replace(/[^\w]/g, '_');
    // Ensure the class name starts with a letter
    return `_${sanitizedName}`;
}
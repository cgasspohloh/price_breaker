export default function filterRows(isCheapestSectionShown,uniqueToggled) {

    const allRows = document.querySelectorAll('tr.content');  

    allRows.forEach((row) => {
        row.classList.add('display');
    });

    // if for each scenerio
    if(!uniqueToggled && !isCheapestSectionShown) {
        //nothing changes, all rows showing
    } else if (!uniqueToggled && isCheapestSectionShown) {
        allRows.forEach((row) => {
            if (!row.classList.contains('cheapest-section')) {
                row.classList.remove('display');
            }
        });
    } else if (uniqueToggled && !isCheapestSectionShown) {
        allRows.forEach((row) => {
            if (!row.classList.contains('unique-pricing')) {
                row.classList.remove('display');
            }
        });
    } else if (uniqueToggled && isCheapestSectionShown) {
        allRows.forEach((row) => {
            if (!row.classList.contains('cheapest-level')) {
                row.classList.remove('display');
            }
        });
    }

    // if expanded and display, set display to 'table-row', otherwise set to 'none'
    allRows.forEach((row) => {
        if (row.classList.contains('expanded') && row.classList.contains('display')) {
            row.style.display = 'table-row';
        } else {
            row.style.display = 'none';
        }
    });

}


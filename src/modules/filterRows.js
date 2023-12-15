export default function filterRows(isCheapestSectionShown,uniqueToggled) {

    const cheapestRows = document.querySelectorAll('.cheapest-section');
    const uniqueRows = document.querySelectorAll('.unique-pricing');
    const allRows = document.querySelectorAll('tr.content');  

    // if show cheapest section is not clicked, add display class to all rows
    if(!uniqueToggled && !isCheapestSectionShown) {
        allRows.forEach((row) => {
            row.classList.add('display');
          });
    } else if (!uniqueToggled && isCheapestSectionShown) {
        allRows.forEach((row) => {
            row.classList.add('display');
            if (!row.classList.contains('cheapest-section')) {
                row.classList.remove('display');
            }
        });
    } else if (uniqueToggled && !isCheapestSectionShown) {
        allRows.forEach((row) => {
            row.classList.add('display');
            if (!row.classList.contains('unique-pricing')) {
                row.classList.remove('display');
            }
        });
    } else if (uniqueToggled && isCheapestSectionShown) {
        allRows.forEach((row) => {
            row.classList.add('display');
            if (!row.classList.contains('unique-pricing')) {
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
export default function showCheapest(isCheapestShown) {

    const cheapestRows = document.querySelectorAll('.cheapest');
    const allRows = document.querySelectorAll('tr.content');  

    // if show cheapest is not clicked, add display class to all rows
    if(!isCheapestShown) {
        allRows.forEach((row) => {
            row.classList.add('display');
          });
    } else {
        allRows.forEach((row) => {
            if (!row.classList.contains('cheapest')) {
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

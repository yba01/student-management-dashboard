import { filters, setCurrentPar, showstudents } from './students.js'

export function reset() {
     // Reset all filter values to ""
        Object.keys(filters).forEach(key => filters[key] = "");
    
        // Also clear the input fields in the UI (if they exist)
        const inputIds = ["searchNumero", "searchCode", "searchNomPrenom", "filterClasse", "filterSource"];
        inputIds.forEach(id => {
            const input = document.getElementById(id);
            if (input) input.value = "";
        });
}

function updateFiltersFromInputs() {
    filters.numero = document.getElementById("searchNumero").value;
    filters.code = document.getElementById("searchCode").value;
    filters.nom = document.getElementById("searchNomPrenom").value;
    filters.classe = document.getElementById("filterClasse").value;
    filters.source = document.getElementById("filterSource").value;
}

// Auto-apply: whenever any filter input changes, reset and reload
export function bindAutoFilter() {
    const inputs = ["searchNumero", "searchCode", "searchNomPrenom", "filterClasse", "filterSource"];
    inputs.forEach(id => {
        document.getElementById(id).addEventListener("input", () => {
            updateFiltersFromInputs();
            setCurrentPar();
            showstudents();    // fresh load with new filters
        });
    });
}


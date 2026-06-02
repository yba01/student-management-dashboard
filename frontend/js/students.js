import { getstudents } from './api.js'
import { rendertable } from './table.js'

let currentPage = 1;
const limit = 5
let hasMore = true;
let loading = false;
let observer = null

export let filters = {
    numero:"",
    code:"",
    nom: "",
    classe: "",
    source: ""
};

async function loadstudents(append = false) {
    if (loading || !hasMore) {
        return;
    }

    loading = true;
    const params = new URLSearchParams({
        page: currentPage,
        limit: limit
    });

    if (filters.numero)
        params.append("numero", filters.numero);

    if (filters.code)
        params.append("code", filters.code);

    if (filters.nom)
        params.append("nom", filters.nom);

    if (filters.classe)
        params.append("classe", filters.classe);

    if (filters.source)
        params.append("source", filters.source);
    const data = await getstudents(params.toString());

    rendertable(data.data, append);

    const sentinel = document.getElementById('sentinel');
    const rect = sentinel.getBoundingClientRect();

    if (rect.top < window.innerHeight && hasMore) {
        setTimeout(() => loadstudents(true), 0);
    }
    if (data.data.length < limit) {
        hasMore = false;
        if (observer) observer.disconnect()
    } else {
        currentPage++;
    }

    loading = false;
}


async function showstudents(){
    loadstudents()
    if (observer) observer.disconnect();
    observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting ) {
            loadstudents(true);
        }
    });
    
    observer.observe(document.getElementById("sentinel"));
    
}

// Helper: read all filter values from inputs and update the filters object
function updateFiltersFromInputs() {
    filters.numero = document.getElementById("searchNumero").value;
    filters.code = document.getElementById("searchCode").value;
    filters.nom = document.getElementById("searchNomPrenom").value;
    filters.classe = document.getElementById("filterClasse").value;
    filters.source = document.getElementById("filterSource").value;
}

// Auto-apply: whenever any filter input changes, reset and reload
function bindAutoFilter() {
    const inputs = ["searchNumero", "searchCode", "searchNomPrenom", "filterClasse", "filterSource"];
    inputs.forEach(id => {
        document.getElementById(id).addEventListener("input", () => {
            updateFiltersFromInputs();
            currentPage = 1;
            hasMore = true;
            loading = false;
            showstudents();    // fresh load with new filters
        });
    });
}


showstudents()
document.getElementById("resetFiltersBtn").addEventListener("click", () => {

    // Reset all filter values to ""
    Object.keys(filters).forEach(key => filters[key] = "");

    // Also clear the input fields in the UI (if they exist)
    const inputIds = ["searchNumero", "searchCode", "searchNomPenom", "filterClasse", "filterSource"];
    inputIds.forEach(id => {
        const input = document.getElementById(id);
        if (input) input.value = "";
    });

    // Reset pagination state
    currentPage = 1;
    hasMore = true;
    loading = false;
    showstudents()
}) 
bindAutoFilter()
document.getElementById("activeViewBtn")?.addEventListener("click", () => { location.reload()  });

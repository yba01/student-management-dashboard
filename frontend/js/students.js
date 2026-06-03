import { getstudents } from './api.js'
import { rendertable } from './table.js'
import { reset, bindAutoFilter  } from './filter.js'
import { attachecheckbox, importdb, importjsontodb } from './import.js'

export let currentPage = 1;
export let hasMore = true;
export let loading = false;
export function setCurrentPar() {
    currentPage = 1;
    hasMore = true;
    loading = false;
}
const limit = 5
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


export async function showstudents(){
    loadstudents()
    if (observer) observer.disconnect();
    observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting ) {
            loadstudents(true);
        }
    });
    
    observer.observe(document.getElementById("sentinel"));
    
}


//load students for the first
showstudents()

//filtering data
document.getElementById("resetFiltersBtn").addEventListener("click", () => {
    reset()
    // Reset pagination state
    currentPage = 1;
    hasMore = true;
    loading = false;
    showstudents()
}) 
bindAutoFilter()
document.getElementById("activeViewBtn")?.addEventListener("click", () => { location.reload()  });

//importing data in the db
attachecheckbox()
document.getElementById("importSelectedBtn")?.addEventListener("click", () => {importdb()})
importjsontodb()
//update data

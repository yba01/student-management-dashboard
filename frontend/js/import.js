import { updatestudent, importJson } from './api.js'

let selectedImportIds = new Set();
export function attachecheckbox() {

    // Event delegation (attach listener to a parent that exists at load time)
    document.addEventListener('change', (e) => {
        if (e.target.matches('.import-checkbox')) {
        // Handle change for any .import-checkbox, even future ones
            if (e.target.checked) selectedImportIds.add(e.target.dataset.id);
            else selectedImportIds.delete(e.target.dataset.id);
        }
    });

    const selectAll = document.getElementById("selectAllCheckbox");
    if (selectAll) {
        selectAll.onchange = (e) => {
            document.querySelectorAll('.import-checkbox').forEach(cb => {
                cb.checked = e.target.checked;
                if (e.target.checked) selectedImportIds.add(cb.dataset.id);
                else selectedImportIds.delete(cb.dataset.id);
            });
        };
    } else {
        console.warn("Element with id 'selectAllCheckbox' not found");
    }
}

export async function importdb() {
    let numeros = Array.from(selectedImportIds);
    if (numeros) {
        numeros.forEach(async (numero) => {
            try {
                await updatestudent(numero, {"datasource":"DB"} )
            } catch (err) {
                console.error(`Failed to update row ${numero}:`, err);
            }           
        })
    }
    location.reload()
}

let imported = localStorage.getItem('importDone') === 'true';
export function importjsontodb() {
    const btn = document.getElementById('importBtn');
    if (!btn) return;

    if (imported) {
        btn.disabled = true;
        return;
    }
    btn.style.display = ""

    btn.addEventListener('click', async () => {
        if (imported) return; // extra safety
        btn.style.display = "none"
        btn.disabled = true;
        await importJson();
        imported = true;
        localStorage.setItem('importDone', 'true');
    });
}
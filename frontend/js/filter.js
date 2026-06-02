
import { filters } from './students.js'
function applyFilters() {
    if (filters.searchNumero) result = result.filter(s => s.numero.toLowerCase().includes(filters.searchNumero.toLowerCase()));
    if (filters.searchCode) result = result.filter(s => s.code.toLowerCase().includes(filters.searchCode.toLowerCase()));
    if (filters.searchNomPrenom) result = result.filter(s => `${s.prenom} ${s.nom}`.toLowerCase().includes(filters.searchNomPrenom.toLowerCase()) || `${s.nom} ${s.prenom}`.toLowerCase().includes(filters.searchNomPrenom.toLowerCase()));
    if (filters.classe) result = result.filter(s => s.classe === filters.classe);
    if (filters.source) result = result.filter(s => s.source === filters.source);
    if (filters.valide !== "") result = result.filter(s => s.valide === (filters.valide === "true"));
    filteredStudents = result;
    currentPage = 1;
    renderTable();
    updatePaginationInfo();
}
document.getElementById("filterClasse").addEventListener("change", e => { filters.classe = e.target.value; applyFilters(); });
document.getElementById("filterSource").addEventListener("change", e => { filters.source = e.target.value; applyFilters(); });
   
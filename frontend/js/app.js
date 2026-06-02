// ======================== DONNÉES & STOCKAGE ========================
let allStudents = [];        // étudiants actifs
let archivedStudents = [];    // archives
let filteredStudents = [];
let currentPage = 1;
let rowsPerPage = 5;
let currentView = "active";   // 'active' or 'archives'

// État pour imports sélection
let selectedImportIds = new Set();

// Données initiales par défaut (si localStorage vide)
const DEFAULT_STUDENTS = [
    { id: "s1", numero: "E001", code: "CS101", prenom: "Alice", nom: "Martin", classe: "M1", valide: true, source: "postgresql", archived: false },
    { id: "s2", numero: "E002", code: "CS102", prenom: "Thomas", nom: "Durand", classe: "M2", valide: false, source: "postgresql", archived: false },
    { id: "s3", numero: "E003", code: "MA201", prenom: "Léa", nom: "Petit", classe: "L3", valide: true, source: "json", archived: false },
    { id: "s4", numero: "E004", code: "PH301", prenom: "Maxime", nom: "Robert", classe: "M1", valide: true, source: "json", archived: false },
    { id: "s5", numero: "E005", code: "CS103", prenom: "Julie", nom: "Bernard", classe: "L2", valide: false, source: "postgresql", archived: false },
];

// Helper: sauvegarde localStorage
function persistData() {
    localStorage.setItem("students_active", JSON.stringify(allStudents));
    localStorage.setItem("students_archived", JSON.stringify(archivedStudents));
}

function loadData() {
    const storedActive = localStorage.getItem("students_active");
    const storedArchived = localStorage.getItem("students_archived");
    if (storedActive) allStudents = JSON.parse(storedActive);
    else allStudents = DEFAULT_STUDENTS.map(s => ({...s}));
    archivedStudents = storedArchived ? JSON.parse(storedArchived) : [];
    applyFilters();
}

// ======================== API SIMULATION ========================
const delay = (ms) => new Promise(resolve => setTimeout(resolve, 300));

async function apiFetchStudents() { await delay(); return [...allStudents]; }
async function apiAddStudent(student) { 
    await delay();
    const newId = Date.now().toString();
    const newStudent = { ...student, id: newId, source: "postgresql", archived: false };
    allStudents.push(newStudent);
    persistData();
    applyFilters();
    return newStudent;
}
async function apiUpdateStudent(id, updatedFields) {
    await delay();
    let student = allStudents.find(s => s.id === id);
    if (!student && archivedStudents.find(a => a.id === id)) return null;
    if (student) Object.assign(student, updatedFields);
    persistData();
    applyFilters();
    return student;
}
async function apiImportStudents(ids) {
    await delay();
    let imported = [];
    for (let id of ids) {
        let student = allStudents.find(s => s.id === id);
        if (student && student.source === "json") {
            student.source = "postgresql";
            imported.push(student);
        }
    }
    persistData();
    applyFilters();
    return imported;
}
async function apiArchiveStudent(id) {
    await delay();
    const index = allStudents.findIndex(s => s.id === id);
    if (index !== -1) {
        const archived = { ...allStudents[index], archivedAt: new Date().toISOString() };
        archivedStudents.push(archived);
        allStudents.splice(index, 1);
        persistData();
        applyFilters();
        return archived;
    }
    return null;
}
async function apiRestoreStudent(id) {
    await delay();
    const index = archivedStudents.findIndex(a => a.id === id);
    if (index !== -1) {
        const restored = { ...archivedStudents[index] };
        delete restored.archivedAt;
        allStudents.push(restored);
        archivedStudents.splice(index, 1);
        persistData();
        applyFilters();
        return restored;
    }
    return null;
}

// ======================== FILTRES & RECHERCHE ========================
let filters = { searchNumero: "", searchCode: "", searchNomPrenom: "", classe: "", source: "", valide: "" };

function applyFilters() {
    let result = [...allStudents];
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

// ======================== RENDU TABLEAU ACTIF (avec édition) ========================
let editingRowId = null; // pour mode édition complète
let cellEditMode = null; // {id, field, originalValue}

function renderTable() {
    const start = (currentPage-1)*rowsPerPage;
    const pageData = filteredStudents.slice(start, start+rowsPerPage);
    const tbody = document.getElementById("tableBody");
    if (!tbody) return;
    if (pageData.length === 0) { tbody.innerHTML = '<tr><td colspan="9">Aucun étudiant trouvé</td></tr>'; return; }
    tbody.innerHTML = pageData.map(student => renderStudentRow(student)).join('');
    attachRowEventListeners();
    document.getElementById("selectAllCheckbox").checked = false;
}

function renderStudentRow(s) {
    const isJson = s.source === "json";
    const rowClass = isJson ? 'row-json' : '';
    const editModeActive = (editingRowId === s.id);
    const disabledAttr = isJson ? 'disabled' : '';
    const canEdit = s.source === "postgresql";
    
    // gestion checkbox import (uniquement JSON)
    const importCheckbox = isJson ? `<input type="checkbox" class="import-checkbox" data-id="${s.id}" ${selectedImportIds.has(s.id) ? 'checked' : ''}>` : '';
    
    // mode édition complète vs normal
    const fields = ['numero', 'code', 'prenom', 'nom', 'classe'];
    const cellRenderer = (field, value) => {
        if (editModeActive && canEdit) {
            return `<input type="text" class="edit-input" data-field="${field}" value="${escapeHtml(value)}" style="width:100%">`;
        } else {
            return `<span class="editable-cell" data-id="${s.id}" data-field="${field}">${escapeHtml(value)}</span>`;
        }
    };
    
    const valideHtml = editModeActive && canEdit ? 
        `<input type="checkbox" class="edit-checkbox" data-field="valide" ${s.valide ? 'checked' : ''}>` :
        `<span class="badge ${s.valide ? 'badge-valid' : 'badge-invalid'}">${s.valide ? 'Valide' : 'Invalide'}</span>`;
    
    const sourceHtml = `<span class="badge ${s.source === 'postgresql' ? 'badge-pg' : 'badge-json'}">${s.source === 'postgresql' ? 'PostgreSQL' : 'JSON'}</span>`;
    
    const actionsHtml = `<div class="row-actions">
        ${canEdit ? `<button class="edit-row-btn" data-id="${s.id}"><i class="fas fa-edit"></i> ${editModeActive ? 'Annuler' : 'Éditer ligne'}</button>` : ''}
        <button class="archive-btn" data-id="${s.id}" ${!canEdit ? 'disabled' : ''}><i class="fas fa-archive"></i> Archiver</button>
    </div>`;
    
    return `<tr class="${rowClass}" data-id="${s.id}">
        <td>${importCheckbox || ''}</td>
        <td>${cellRenderer('numero', s.numero)}</td>
        <td>${cellRenderer('code', s.code)}</td>
        <td>${cellRenderer('prenom', s.prenom)}</td>
        <td>${cellRenderer('nom', s.nom)}</td>
        <td>${cellRenderer('classe', s.classe)}</td>
        <td>${valideHtml}</td>
        <td>${sourceHtml}</td>
        <td>${actionsHtml}</td>
    </tr>`;
}

function escapeHtml(str) { return String(str).replace(/[&<>]/g, function(m){if(m==='&') return '&amp;'; if(m==='<') return '&lt;'; if(m==='>') return '&gt;'; return m;}); }

function attachRowEventListeners() {
    // Mode édition ligne
    document.querySelectorAll('.edit-row-btn').forEach(btn => {
        btn.onclick = (e) => {
            const id = btn.dataset.id;
            if (editingRowId === id) editingRowId = null;
            else editingRowId = id;
            renderTable();
        };
    });
    // Sauvegarde mode édition ligne (bouton sauvegarder après rendu? on ajoute un écouteur global sur les inputs et un bouton spécifique)
    document.querySelectorAll('.edit-input, .edit-checkbox').forEach(el => {
        el.addEventListener('change', async (e) => {
            const row = el.closest('tr');
            const studentId = row.dataset.id;
            const field = el.dataset.field;
            let newValue = el.type === 'checkbox' ? el.checked : el.value;
            if (field) await apiUpdateStudent(studentId, { [field]: newValue });
            else if (el.classList.contains('edit-checkbox')) await apiUpdateStudent(studentId, { valide: el.checked });
        });
    });
    // Double clic édition cellule
    document.querySelectorAll('.editable-cell').forEach(cell => {
        cell.ondblclick = (e) => {
            const id = cell.dataset.id;
            const field = cell.dataset.field;
            const student = allStudents.find(s => s.id === id);
            if (!student || student.source !== 'postgresql') return;
            const oldValue = student[field];
            const input = document.createElement('input');
            input.value = oldValue;
            input.style.width = '100%';
            cell.innerHTML = '';
            cell.appendChild(input);
            input.focus();
            const save = () => {
                const newVal = input.value;
                apiUpdateStudent(id, { [field]: newVal }).then(() => renderTable());
            };
            input.addEventListener('blur', save);
            input.addEventListener('keypress', (e) => { if(e.key === 'Enter') save(); });
            input.addEventListener('keydown', (e) => { if(e.key === 'Escape') renderTable(); });
        };
    });
    // Archivage
    document.querySelectorAll('.archive-btn').forEach(btn => {
        btn.onclick = async () => { await apiArchiveStudent(btn.dataset.id); showToast("Étudiant archivé", "success"); };
    });
    // Import checkboxes
    document.querySelectorAll('.import-checkbox').forEach(cb => {
        cb.onchange = (e) => {
            if(cb.checked) selectedImportIds.add(cb.dataset.id);
            else selectedImportIds.delete(cb.dataset.id);
        };
    });
    document.getElementById("selectAllCheckbox").onchange = (e) => {
        const checkboxes = document.querySelectorAll('.import-checkbox');
        checkboxes.forEach(cb => { cb.checked = e.target.checked; if(e.target.checked) selectedImportIds.add(cb.dataset.id); else selectedImportIds.delete(cb.dataset.id); });
    };
}

// ======================== ARCHIVES RENDU ========================
function renderArchives() {
    const tbody = document.getElementById("archivesTableBody");
    if (!tbody) return;
    if (archivedStudents.length === 0) { tbody.innerHTML = '<tr><td colspan="7">Aucune archive</td></tr>'; return; }
    tbody.innerHTML = archivedStudents.map(a => `
        <tr><td>${escapeHtml(a.numero)}</td><td>${escapeHtml(a.code)}</td><td>${escapeHtml(a.prenom)}</td><td>${escapeHtml(a.nom)}</td>
        <td>${escapeHtml(a.classe)}</td><td>${new Date(a.archivedAt).toLocaleDateString()}</td>
        <td><button class="restore-btn" data-id="${a.id}"><i class="fas fa-undo-alt"></i> Restaurer</button></td></tr>
    `).join('');
    document.querySelectorAll('.restore-btn').forEach(btn => { btn.onclick = async () => { await apiRestoreStudent(btn.dataset.id); renderArchives(); showToast("Restauration effectuée", "success"); 
        if(currentView==='archives') applyFilters(); 
    }; });
}

// ======================== PAGINATION & UI ========================
function updatePaginationInfo() {
    const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);
    document.getElementById("pageInfo").innerText = `Page ${currentPage} / ${totalPages || 1}`;
    document.getElementById("prevPageBtn").disabled = currentPage === 1;
    document.getElementById("nextPageBtn").disabled = currentPage === totalPages || totalPages === 0;
}
function nextPage() { if(currentPage < Math.ceil(filteredStudents.length/rowsPerPage)) { currentPage++; renderTable(); updatePaginationInfo(); } }
function prevPage() { if(currentPage > 1) { currentPage--; renderTable(); updatePaginationInfo(); } }

// ======================== NOTIFICATION TOAST ========================
function showToast(msg, type = "info") {
    let toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerText = msg;
    toast.style.position = "fixed"; toast.style.bottom = "20px"; toast.style.right = "20px";
    toast.style.backgroundColor = type === "success" ? "#10b981" : "#ef4444";
    toast.style.color = "white"; toast.style.padding = "12px 20px"; toast.style.borderRadius = "30px";
    toast.style.zIndex = "9999"; toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ======================== IMPORTS, MODAL AJOUT ========================
document.getElementById("importSelectedBtn")?.addEventListener("click", async () => {
    if(selectedImportIds.size === 0) { showToast("Sélectionnez au moins un étudiant JSON", "error"); return; }
    await apiImportStudents([...selectedImportIds]);
    selectedImportIds.clear();
    renderTable();
    showToast("Import réussi, étudiants maintenant modifiables", "success");
});

// Modal d'ajout
const modal = document.getElementById("studentModal");
document.getElementById("openAddModalBtn")?.addEventListener("click", () => { modal.style.display = "flex"; document.getElementById("modalTitle").innerText = "Ajouter un étudiant"; document.getElementById("studentForm").reset(); });
document.querySelector(".close-modal")?.addEventListener("click", () => modal.style.display = "none");
document.getElementById("cancelModalBtn")?.addEventListener("click", () => modal.style.display = "none");
document.getElementById("studentForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newStudent = {
        numero: document.getElementById("studentNumero").value.trim(),
        code: document.getElementById("studentCode").value.trim(),
        prenom: document.getElementById("studentPrenom").value.trim(),
        nom: document.getElementById("studentNom").value.trim(),
        classe: document.getElementById("studentClasse").value,
        valide: document.getElementById("studentValide").checked,
        source: "postgresql"
    };
    if(!newStudent.numero || !newStudent.code || !newStudent.prenom || !newStudent.nom || !newStudent.classe) { showToast("Tous les champs (sauf validité) sont requis", "error"); return; }
    await apiAddStudent(newStudent);
    modal.style.display = "none";
    showToast("Étudiant ajouté avec succès", "success");
});

// Filtres
function bindFilters() {
    document.getElementById("searchNumero").addEventListener("input", e => { filters.searchNumero = e.target.value; applyFilters(); });
    document.getElementById("searchCode").addEventListener("input", e => { filters.searchCode = e.target.value; applyFilters(); });
    document.getElementById("searchNomPrenom").addEventListener("input", e => { filters.searchNomPrenom = e.target.value; applyFilters(); });
    document.getElementById("filterClasse").addEventListener("change", e => { filters.classe = e.target.value; applyFilters(); });
    document.getElementById("filterSource").addEventListener("change", e => { filters.source = e.target.value; applyFilters(); });
    document.getElementById("filterValidite").addEventListener("change", e => { filters.valide = e.target.value; applyFilters(); });
    document.getElementById("resetFiltersBtn").addEventListener("click", () => { document.querySelectorAll(".filter-row input, .filter-row select").forEach(el => el.value = ""); filters = { searchNumero: "", searchCode: "", searchNomPrenom: "", classe: "", source: "", valide: "" }; applyFilters(); });
    document.getElementById("rowsPerPage").addEventListener("change", e => { rowsPerPage = parseInt(e.target.value); currentPage=1; renderTable(); updatePaginationInfo(); });
    document.getElementById("prevPageBtn").addEventListener("click", prevPage);
    document.getElementById("nextPageBtn").addEventListener("click", nextPage);
}

// Navigation vues actives / archives
document.getElementById("activeViewBtn")?.addEventListener("click", () => { currentView="active"; document.getElementById("activeView").style.display="block"; document.getElementById("archivesView").style.display="none"; document.getElementById("activeViewBtn").classList.add("active"); document.getElementById("archivesViewBtn").classList.remove("active"); applyFilters(); });
document.getElementById("archivesViewBtn")?.addEventListener("click", () => { currentView="archives"; document.getElementById("activeView").style.display="none"; document.getElementById("archivesView").style.display="block"; document.getElementById("archivesViewBtn").classList.add("active"); document.getElementById("activeViewBtn").classList.remove("active"); renderArchives(); });
document.getElementById("archivesNavBtn")?.addEventListener("click", () => document.getElementById("archivesViewBtn")?.click());

// Initialisation
loadData();
bindFilters();
renderTable();
updatePaginationInfo();
renderArchives();
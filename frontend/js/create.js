import { showToast } from './utils.js'
import { createstudent } from './api.js'
import { showstudents, setCurrentPar } from './load.js'

export function createStudent() {

    const modal = document.getElementById("studentModal");
    document.getElementById("openAddModalBtn")?.addEventListener("click", () => { modal.style.display = "flex"; document.getElementById("modalTitle").innerText = "Ajouter un étudiant"; document.getElementById("studentForm").reset(); });
    document.querySelector(".close-modal")?.addEventListener("click", () => modal.style.display = "none");
    document.getElementById("cancelModalBtn")?.addEventListener("click", () => modal.style.display = "none");
    document.getElementById("studentForm")?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const newstudent = {
            numero: document.getElementById("studentNumero").value.trim(),
            code: document.getElementById("studentCode").value.trim(),
            prenom: document.getElementById("studentPrenom").value.trim(),
            nom: document.getElementById("studentNom").value.trim(),
            classe: document.getElementById("studentClasse").value,
            dates: document.getElementById("studentDate").value,
            source: "DB"
        };
        if(!newstudent.numero || !newstudent.code || !newstudent.prenom || !newstudent.nom || !newstudent.classe) { showToast("Tous les champs sont requis", "error"); return; }
        let response = await createstudent(newstudent);
        modal.style.display = "none";
        showToast("Étudiant ajouté avec succès", "success");
        setCurrentPar()
        showstudents()
    });
}
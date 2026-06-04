import { getstudent, updatestudent } from './api.js'
import { showstudents, setCurrentPar } from './students.js'
import { rendereditline } from './table.js'
import { escapeHtml, showToast } from './utils.js'
// Fonction pour activer l'édition flottante sur une ligne
export async function setupInlineEdit() {
    
    // Utiliser la délégation d'événements pour capter les clics sur .edit-btn
    document.querySelector('#studentsTable').addEventListener('click', async (e) => {
        const editBtn = e.target.closest('.edit-btn');
        if (!editBtn) return;

        const row = editBtn.closest('tr');
        const numero = row.dataset.numero;   // car data-numero sur <tr>
        
        // Récupérer les données actuelles de l'étudiant (depuis allStudents)
        const student = await getstudent(numero)
        if (!student || student.source !== 'DB') return;

        console.log(student)

        // Supprimer tout panneau existant
        document.querySelectorAll('.inline-edit-panel').forEach(p => p.remove());
        document.querySelectorAll('.editing-row').forEach(r => r.classList.remove('editing-row'));

        // Marquer la ligne comme étant en édition
        row.classList.add('editing-row');

        // Créer le panneau d'édition
        const panel = document.createElement('div');
        panel.className = 'inline-edit-panel';
        panel.innerHTML = rendereditline(student);

        row.appendChild(panel);

        // Gestionnaire Sauvegarde
        const saveBtn = panel.querySelector('#saveEdit');
        const cancelBtn = panel.querySelector('#cancelEdit');

        saveBtn.onclick = async () => {
            const updatedData = {
                numero: document.getElementById('edit_numero').value.trim(),
                code: document.getElementById('edit_code').value.trim(),
                prenom: document.getElementById('edit_prenom').value.trim(),
                nom: document.getElementById('edit_nom').value.trim(),
                classe: document.getElementById('edit_classe').value,
                dates: document.getElementById('edit_date').value
                // valide: document.getElementById('edit_valide').checked
            };

            if (!updatedData.numero || !updatedData.code || !updatedData.prenom || !updatedData.nom || !updatedData.classe) {
                showToast("Tous les champs sont requis", "error");
                return;
            }

            // Appel API update
            await updatestudent(student.numero, updatedData);

            // Nettoyer et rafraîchir
            row.classList.remove('editing-row');
            panel.remove();
            showToast("Étudiant modifié avec succès", "success");
            setCurrentPar()
            showstudents();  // recharge le tableau avec les filtres actuels
        };

        cancelBtn.onclick = () => {
            row.classList.remove('editing-row');
            panel.remove();
        };
    });
}


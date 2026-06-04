import { attacharchivebtn, attacherestorebtn } from './archives.js'
import { escapeHtml } from './utils.js'


function renderStudentRow(student) {
    const isJson = student.source === "JSON";
    const isDb = student.source === "DB";

    const rowclass = isJson ? 'row-json' : ''
    const checkbox = isJson && !student.archived ? `<input type="checkbox" class="import-checkbox" data-id="${student.numero}" />` : '';

    const sourceBadge = isDb ? "badge-pg" : "badge-json";
    const source =  isDb ? 'PostgreSQL' : student.source

    return `
    <tr data-numero="${student.numero}" class="${rowclass}">

        <td>
            ${checkbox}
        </td> 

        <td>${escapeHtml(student.numero)}</td>

        <td>${escapeHtml(student.code)}</td>

        <td>
            ${escapeHtml(
                (student.prenom || "")
                .toUpperCase()
            )}
        </td>

        <td>
            ${escapeHtml(
                (student.nom || "")
                .toUpperCase()
            )}
        </td>

        <td>${escapeHtml(student.classe)}</td>

        <td>
            <span class="badge ${sourceBadge}">
                ${source}
            </span>
        </td>

        <td>
            <div class="action-buttons">

                ${isDb && !student.archived ? `<button class="edit-btn" data-numero="${student.numero}"> Edit </button>` : ''}

                ${!student.archived ? `<button class="archive-btn" data-id="${student.numero}">Archive</button>` : `<button class="restore-btn" data-id="${student.numero}">Restaure</button>`}
            </div>
        </td>

    </tr>
    `;
}

export function rendertable(students, append = false) {

    const tbody =
        document.getElementById(
            "tableBody"
        );

    if(!append)
        tbody.innerHTML = "";

    students.forEach(student => {
        if (!student.archived) {
            tbody.insertAdjacentHTML(
                "beforeend",
                renderStudentRow(student)
            );
        }

    });
    attacharchivebtn();
}

export function renderarchive(students) {

    const tbody =
        document.getElementById(
            "archivesTableBody"
        );

    tbody.innerHTML = "";

    students.forEach(student => {
        if (student.archived) {
            tbody.insertAdjacentHTML(
                "beforeend",
                renderStudentRow(student)
            );
        }

    });
    attacherestorebtn()
}

export function rendereditline(student) {
    return `
            <input type="text" id="edit_numero" value="${escapeHtml(student.numero)}" placeholder="Numéro" style="width:100px">
            <input type="text" id="edit_code" value="${escapeHtml(student.code)}" placeholder="Code" style="width:100px">
            <input type="text" id="edit_prenom" value="${escapeHtml(student.prenom)}" placeholder="Prénom" style="width:120px">
            <input type="text" id="edit_nom" value="${escapeHtml(student.nom)}" placeholder="Nom" style="width:120px">
            <select id="edit_classe" style="width:80px">
                <option ${student.classe === '6e A' ? 'selected' : ''} value="6e A">6e A</option>
                <option ${student.classe === '6e B' ? 'selected' : ''} value="6e B">6e B</option>
                <option ${student.classe === '6e C' ? 'selected' : ''} value="6e C">6e C</option>
                <option ${student.classe === '6e D' ? 'selected' : ''} value="6e D">6e D</option>
                <option ${student.classe === '5e A' ? 'selected' : ''} value="5e A">5e A</option>
                <option ${student.classe === '5e B' ? 'selected' : ''} value="5e B">5e B</option>
                <option ${student.classe === '5e C' ? 'selected' : ''} value="5e C">5e C</option>
                <option ${student.classe === '5e D' ? 'selected' : ''} value="5e D">5e D</option>
                <option ${student.classe === '4e A' ? 'selected' : ''} value="4e A">4e A</option>
                <option ${student.classe === '4e B' ? 'selected' : ''} value="4e B">4e B</option>
                <option ${student.classe === '4e C' ? 'selected' : ''} value="4e C">4e C</option>
                <option ${student.classe === '4e D' ? 'selected' : ''} value="4e D">4e D</option>
                <option ${student.classe === '3e A' ? 'selected' : ''} value="3e A">3e A</option>
                <option ${student.classe === '3e B' ? 'selected' : ''} value="3e B">3e B</option>
                <option ${student.classe === '3e C' ? 'selected' : ''} value="3e C">3e C</option>
                <option ${student.classe === '3e D' ? 'selected' : ''} value="3e D">3e D</option> 
            </select>
            <input type="date" id="edit_date" value="${student.date}" placeholder="Date de naissance">
            <!-- <label>
                <input type="checkbox" id="edit_valide" ${student.valide ? 'checked' : ''}> Valide
            </label> -->
            <button id="saveEdit">Sauvegarder</button>
            <button id="cancelEdit" class="cancel-edit">Annuler</button>
        `;
}
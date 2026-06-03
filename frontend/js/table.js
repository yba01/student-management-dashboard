import { attacharchivebtn, attacherestorebtn } from './archives.js'

function escapeHtml(str) { return String(str).replace(/[&<>]/g, function(m){if(m==='&') return '&amp;'; if(m==='<') return '&lt;'; if(m==='>') return '&gt;'; return m;}); }

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

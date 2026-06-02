// dashboard.js - chargement des données et graphiques Chart.js
let classChart, sourceChart, validityChart;

function loadDashboardData() {
    const students = JSON.parse(localStorage.getItem("students_active") || "[]");
    const archived = JSON.parse(localStorage.getItem("students_archived") || "[]");
    
    const totalActive = students.length;
    const totalArchived = archived.length;
    const totalPG = students.filter(s => s.source === "postgresql").length;
    const totalJSON = students.filter(s => s.source === "json").length;
    const totalValid = students.filter(s => s.valide === true).length;
    const totalInvalid = totalActive - totalValid;
    
    document.getElementById("totalActive").innerText = totalActive;
    document.getElementById("totalArchived").innerText = totalArchived;
    document.getElementById("totalPG").innerText = totalPG;
    document.getElementById("totalJSON").innerText = totalJSON;
    document.getElementById("totalValid").innerText = totalValid;
    document.getElementById("totalInvalid").innerText = totalInvalid;
    
    // Répartition par classe
    const classes = ["M1", "M2", "L3", "L2"];
    const classCounts = classes.map(c => students.filter(s => s.classe === c).length);
    if(classChart) classChart.destroy();
    classChart = new Chart(document.getElementById("classChart"), {
        type: 'bar', data: { labels: classes, datasets: [{ label: 'Étudiants', data: classCounts, backgroundColor: '#3b82f6' }] },
        options: { responsive: true, maintainAspectRatio: true }
    });
    
    // Source
    if(sourceChart) sourceChart.destroy();
    sourceChart = new Chart(document.getElementById("sourceChart"), {
        type: 'doughnut', data: { labels: ['PostgreSQL', 'JSON'], datasets: [{ data: [totalPG, totalJSON], backgroundColor: ['#2563eb', '#f59e0b'] }] }
    });
    
    // Validité
    if(validityChart) validityChart.destroy();
    validityChart = new Chart(document.getElementById("validityChart"), {
        type: 'doughnut', data: { labels: ['Valides', 'Non valides'], datasets: [{ data: [totalValid, totalInvalid], backgroundColor: ['#10b981', '#ef4444'] }] }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadDashboardData();
    document.getElementById("refreshDashboardBtn")?.addEventListener("click", loadDashboardData);
});
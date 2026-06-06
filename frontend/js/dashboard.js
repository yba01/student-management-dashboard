// dashboard.js - chargement des données et graphiques Chart.js
import {statistics, classe_agg, top10} from './api.js'
import { rendertop } from './table.js'
// let classChart, sourceChart, validityChart;

async function loadDashboardData() {
   
    const stats = await statistics()
    const agg = await classe_agg()
    const top = await top10()

    const totalActive = stats.total - stats.archives;
    const totalArchived = stats.archives;
    const totalPG = stats.sources[0].effectif;
    const totalJSON = stats.sources[1].effectif;
       
    document.getElementById("totalActive").innerText = totalActive;
    document.getElementById("totalArchived").innerText = totalArchived;
    document.getElementById("totalPG").innerText = totalPG;
    document.getElementById("totalJSON").innerText = totalJSON;
    
    // Répartition par classe
    const classes = agg.map(obj => obj.classe).reverse();
    const effectifs = agg.map(obj => obj.effectif).reverse();
    const mg = agg.map(obj => obj.moyenne).reverse();

    // if(classChart) classChart.destroy()
    
    const ctx = document.getElementById('classChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: classes,           // ex: ['M1', 'M2', 'L3', 'L2']
            datasets: [
                {
                    label: 'Effectifs',
                    type: 'bar',
                    data: effectifs,
                    backgroundColor: 'rgba(37, 99, 235, 0.7)',   // --primary avec transparence
                    borderColor: '#2563eb',
                    borderWidth: 1,
                    borderRadius: 6,
                    yAxisID: 'y',       // axe gauche
                    barPercentage: 0.6,
                    categoryPercentage: 0.8
                },
                {
                    label: 'Moyenne générale',
                    type: 'line',
                    data: mg,
                    borderColor: '#f59e0b',    // --warning
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    borderWidth: 3,
                    pointRadius: 5,
                    pointBackgroundColor: '#f59e0b',
                    pointBorderColor: '#ffffff',
                    pointHoverRadius: 7,
                    tension: 0.2,              // légère courbe
                    fill: true,
                    yAxisID: 'y1',             // axe droit
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Effectifs', color: '#2563eb', font: { weight: 'bold' } },
                    grid: { color: '#e2e8f0' },
                    ticks: { stepSize: 1, color: '#0f172a' }
                },
                y1: {
                    position: 'right',
                    beginAtZero: true,
                    max: 20,
                    title: { display: true, text: 'Moyenne générale (/20)', color: '#f59e0b', font: { weight: 'bold' } },
                    grid: { drawOnChartArea: false },   // pas de grille en double
                    ticks: { color: '#0f172a' }
                },
                x: {
                    title: { display: true, text: 'Classes', color: '#0f172a' },
                    grid: { display: false },
                    ticks: { color: '#0f172a', font: { weight: '500' } }
                }
            },
            plugins: {
                tooltip: {
                    backgroundColor: '#0f172a',
                    titleColor: '#f8fafc',
                    bodyColor: '#cbd5e1',
                    borderColor: '#2563eb',
                    borderWidth: 1
                },
                legend: {
                    position: 'top',
                    labels: { color: '#0f172a', font: { family: 'Inter', size: 12, weight: '600' }, usePointStyle: true }
                }
            }
        }
    });
    rendertop(top)
}

document.addEventListener("DOMContentLoaded", () => {
     loadDashboardData();
    document.getElementById("refreshDashboardBtn")?.addEventListener("click", loadDashboardData);
});
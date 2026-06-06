import { getstudents, archivestudent, restorestudent } from './api.js'
import { renderarchive } from './table.js'


async function loadarchives(){
    const data = await getstudents();
    renderarchive(data.data)
}



document.getElementById("archivesViewBtn")?.addEventListener("click", () => { 
    document.getElementById("activeView").style.display="none"; 
    document.getElementById("archivesView").style.display="block"; 


    document.getElementById("actifwlc").style.display="none"; 
    document.getElementById("archivewlc").style.display="block"; 
    
    document.getElementById("archivesViewBtn").classList.add("active"); 
    document.getElementById("activeViewBtn").classList.remove("active"); 
    loadarchives(); });


export async function attacharchivebtn() {
    document.querySelectorAll('.archive-btn').forEach(btn => {
        btn.onclick = async () => { 
            await archivestudent(btn.dataset.id); 
            document.querySelector(`tr[data-numero="${btn.dataset.id}"]`).remove();
        };
    });
}

export async function attacherestorebtn() {
    document.querySelectorAll('.restore-btn').forEach(btn => {
        btn.onclick = async () => { 
            await restorestudent(btn.dataset.id); 
            document.querySelector(`tr[data-numero="${btn.dataset.id}"]`).remove();
        };
    });
}

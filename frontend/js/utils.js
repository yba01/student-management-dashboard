export function escapeHtml(str) { return String(str).replace(/[&<>]/g, function(m){if(m==='&') return '&amp;'; if(m==='<') return '&lt;'; if(m==='>') return '&gt;'; return m;}); }
export function showToast(msg, type = "info") {
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

// Défilement vers la barre d'actions (import / ajout)
export function rapidacces() {
    const scrollBtn = document.getElementById('scrollToActionsBtn');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const body = document.querySelector('body');
            if (body) {
                body.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Optionnel : mettre en surbrillance la barre d'actions
                body.style.transition = 'background 0.3s';
                body.style.background = '#e0f2fe';
                setTimeout(() => {
                    body.style.background = '';
                }, 1000);
            } else {
                // Fallback : scroll vers le haut
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
}
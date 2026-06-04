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
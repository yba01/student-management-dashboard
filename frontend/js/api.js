const API_URL = "http://localhost:8000/api/v1";

export async function getstudents(params = "") {
    const url = params.toString() ? `${API_URL}/etudiants?${params}` : `${API_URL}/etudiants`;
    const response = await fetch(url);

    return response.json();
}

export async function getstudent(numero) {
    const response = await fetch(
        `${API_URL}/etudiants/${numero}`
    );

    return response.json();
}

export async function createStudent(student) {
    const response = await fetch(
        `${API_URL}/etudiants`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        }
    );

    return response.json();
}

export async function updatestudent(numero, payload) {
    const response = await fetch(
        `${API_URL}/etudiants/${numero}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }
    );

    return response.json();
}

export async function archivestudent(numero) {
    const response = await fetch(
        `${API_URL}/etudiants/${numero}/archive`,
        {
            method: "PATCH"
        }
    );

    return response.json();
}

export async function restorestudent(numero) {
    const response = await fetch(
        `${API_URL}/etudiants/${numero}/restore`,
        {
            method: "PATCH"
        }
    );

    return response.json();
}

export async function importJson() {
    const response = await fetch(
        `${API_URL}/import/json`,
        {
            method: "POST"
        }
    );

    return response.json();
}
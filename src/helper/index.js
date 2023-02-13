// CARA MAS ABDI 
export const checkEmail = (email) => {
    let domain = /\.(com|id|co.id)/;

    if (email.includes("@") && email.match(domain)) {
        return true;
    } else {
        return false;
    }
}

// penyimpanan link API Utama
export const API_URL = "http://localhost:2000";
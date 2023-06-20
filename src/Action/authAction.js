import axios from "axios";
import { API_URL } from "../helper";

export const LoginAction = (data) => {
    return {
        type: "LOGIN_SUCCESS",
        payload: data,
    };
};

export const LogoutAction = () => {
    localStorage.removeItem("sosmed_login")
    return {
        type: "LOGOUT"      // KARENA TIDAK BUTUH DATA MAKA DIPAKAI TYPE SAJA TANPA PAYLOAD
    };
};

export const mwKeepLogin = () => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("sosmed_login");
            if (token) {
                let response = await axios.get(`${API_URL}/user/keeplogin`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                localStorage.setItem("sosmed_login", response.data.token);  // memperbarui localStorage

                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: response.data
                }); // menyimpan ulang ke reducer      
            }
        } catch (error) {
            console.log(error);
        }
    }
}
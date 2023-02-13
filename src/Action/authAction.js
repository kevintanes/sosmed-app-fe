import axios from "axios";
import { API_URL } from "../helper";

export const LoginAction = (data) => {
    return {
        type: "LOGIN_SUCCESS",
        payload: data,
    };
};

export const LogoutAction = () => {
    localStorage.removeItem("shop_login")
    return {
        type: "LOGOUT"      // KARENA TIDAK BUTUH DATA MAKA DIPAKAI TYPE SAJA TANPA PAYLOAD
    };
};

export const mwKeepLogin = () => {
    return async (dispatch) => {
        try {
            let token = localStorage.getItem("shop_login");
            if (token) {
                let response = await axios.get(`${API_URL}/users?id=${token}`);
                localStorage.setItem("shop_login", response.data[0].id);  // memperbarui localStorage
                
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: response.data[0]
                }); // menyimpan ulang ke reducer      
            }
        } catch (error) {
            console.log(error);
        }
    }
}
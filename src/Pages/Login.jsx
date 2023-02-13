import axios from 'axios';
import React from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginAction } from "../Action/authAction";
import { API_URL } from "../helper";

function Login(props) {
    const Dispatch = useDispatch();
    const navigate = useNavigate();

    const [visible, setVisible] = React.useState("password");

    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();

    const handleVisible = () => {
        if (visible == 'password') {
            setVisible("text");
        } else {
            setVisible("password")
        }
    }

    /*
    const btnLogin = () => {
        axios.get(`http://localhost:2000/users/?email=${email}&password=${password}`)
            .then((response) => {
                if (response.data.length === 0) {
                    alert("Email atau Password salah")
                } else {
                    alert("Login berhasil")
                }
            })
            .catch((error) => {
                alert(error);
            })
    }
    */

    // ----------- SEDERHANAIN KODE LOGIN DIATAS 

    const btnLogin = async () => {
        try {
            if (email === "" || password === "") {
                alert(`email atau password salah`)
            } else {
                let resp = await axios.get(`${API_URL}/users?email=${email}&password=${password}`)
                if (resp.data.length === 0) {
                    alert(`login gagal`);
                } else {
                    // Menyimpan data ke local storage browser untuk keep Login
                    localStorage.setItem("shop_login", resp.data[0].id);
                    // simpan resp.data ke reducer
                    alert(`login berhasil`)
                    Dispatch(LoginAction(resp.data[0]));
                    navigate("/home", { replace: true })
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (props.loading) {
        return <></>
    } else {
        return (
            <div className='container mx-auto my-20 w-1/2 '>
                <form className="py-10 border rounded shadow-lg" action="#">
                    <h1 className='ml-5 text-5xl pb-2 font-semibold'>
                        Sign In
                    </h1>
                    <div className='mt-5 mx-5'>
                        <label for="email" className="block mb-2 text-lg  font-medium text-gray-900">Your email</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            placeholder="name@company.com" required />
                    </div>
                    <div className='mt-5 mx-5 '>
                        <label for="password" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Your password</label>
                        <div className='flex'>
                            <input onChange={(e) => setPassword(e.target.value)} type={visible} name="password" id="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="••••••••" required />
                            <button onClick={handleVisible} type="button" className='text-2xl ml-3'>
                                {
                                    visible == "password" ? <AiFillEye /> : <AiFillEyeInvisible />
                                }
                            </button>
                        </div>
                    </div>
                    <div className='mt-5 mx-5'>
                    </div>
                    <div className="flex justify-between mt-2 mx-5">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 " />
                            </div>
                            <label for="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                        </div>
                        <a href="#" className="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
                    </div>
                    <div className='mt-5 mx-5'>
                        <button type="button" onClick={btnLogin}
                            className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Login to your account</button>
                        <div className="text-sm font-medium text-gray-500 mt-2">
                            Not registered? <button type="button" onClick={() => navigate("/regis")} className="text-blue-700 hover:underline">Create account</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    };
}

export default Login;
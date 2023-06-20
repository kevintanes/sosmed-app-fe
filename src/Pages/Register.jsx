import React from 'react';
import { useNavigate } from "react-router-dom"
import axios from "axios";
import FormInputLabel from '../Components/form';
import { API_URL } from '../helper';

function Register(props) {

    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmationPassword, setConfirmationPassword] = React.useState("");

    const navigate = useNavigate();

    const btnRegister = async () => {
        try {
            let respon = await axios.post(`${API_URL}/user/register`, {
                username: username,
                email: email,
                password: password,
                confirmationPassword: confirmationPassword
            });
            console.log(respon);
            if(respon.data.success){
                alert("registrasi success, cek your email for validation")
                navigate("/")
            }
        }
        catch (error) {
            console.log(error);
            alert(error.response.data.message)
        }
    };

    if (props.loading) {
        return <></>
    } else {
        return (
            <div className='container mx-auto mt-10 w-11/12 md:my-20 md:w-2/4'>
                <form className='py-10 border rounded shadow-lg'>
                    <h1 className='ml-5 text-5xl pb-2 font-semibold'>
                        Sign Up
                    </h1>
                    <span className='ml-5 md: text-xl'>Already have an account? <button onClick={() => navigate("/")} className='text-blue-700 hover:underline'>Login</button> </span>
                    <FormInputLabel type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Type Username">
                        User Name
                    </FormInputLabel>
                    <FormInputLabel type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Type Your Email">
                        Email Address
                    </FormInputLabel>
                    <div className="mt-5 mx-5">
                        <label for="password" className="block mb-2  text-lg font-medium text-gray-900">Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="••••••••" />
                    </div>
                    <div className="mt-5 mx-5">
                        <label for="password" className="block mb-2  text-lg font-medium text-gray-900">Confirmation Password</label>
                        <input onChange={(e) => setConfirmationPassword(e.target.value)} type="password" id="password" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5" placeholder="••••••••" />
                    </div>

                    <div className='mt-10  mx-5 text-center '>
                        <button onClick={btnRegister} type="button" className="w-full text-white bg-blue-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-1 md:mr-3 ">Sign Up</button>
                    </div>
                </form>
            </div>

        );
    };
}

export default Register;
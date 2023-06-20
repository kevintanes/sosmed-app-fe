import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../helper';

function ForgetPassword() {
    const [email, setEmail] = React.useState("");
    const navigate = useNavigate();

    const btnForgetPass = async () => {
        try {
            let res = await axios.post(`${API_URL}/user/forgetpassword`, {
                email: email
            })

            console.log(`ini data dari axios post forgetpassword :`, res.data);

            if(res.data.success){
                alert(`check your email`)
                navigate("/");
            }
            
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="block max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow text-center mx-auto">
            <p className="font-normal text-gray-700">please enter your email address. You will receive a link to create a new password via email</p>
            <p className="font-semibold text-gray-700 py-2">Email Address *</p>
            <input onChange={(e) => setEmail(e.target.value)} type="text" className='w-full' />
            <button type="button" onClick={btnForgetPass}
                className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-full text-sm px-6 py-2 mt-3">Get new Password</button>
        </div>
    );
}

export default ForgetPassword;
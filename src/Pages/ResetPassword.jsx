import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../helper';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

function ResetPassword() {
    const params = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [visible, setVisible] = React.useState("password");

    const handleVisible = () => {
        if (visible == "password") {
            setVisible("text");
        } else {
            setVisible("password");
        }
    }

    const onBtnReset = async () => {
        try {
            if (password == confirmPassword) {

                let res = await axios.patch(`${API_URL}/user/resetpassword`, { password }, {
                    headers: {
                        "Authorization": `Bearer ${params.token}`
                    }
                });
                console.log(res);
                if (res.data.success) {
                    alert(res.data.message);
                    navigate("/")
                }
            } else {
                alert("password not match")
            }
        } catch (error) {
            console.log(error);

        }
    }



    return (
        <div className="block max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow text-center mx-auto">
            <p className="font-semibold text-gray-700 py-2">New Password</p>
            <div className='flex'>
                <input type={visible} onChange={(e) => setPassword(e.target.value)} className='w-full' />
                <button onClick={handleVisible} type="button" className='text-2xl ml-3'>
                    {
                        visible == "password" ? <AiFillEye /> : <AiFillEyeInvisible />
                    }
                </button>
            </div>

            <p className="font-semibold text-gray-700 py-2">New Password Confirmation</p>
            <div className='flex'>
                <input onChange={(e) => setConfirmPassword(e.target.value)} type={visible} className='w-full' />
                <button onClick={handleVisible} type="button" className='text-2xl ml-3'>
                    {
                        visible == "password" ? <AiFillEye /> : <AiFillEyeInvisible />
                    }
                </button>
            </div>
            <button type={visible} onClick={onBtnReset}
                className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-full text-sm px-6 py-2 mt-3">Get new Password</button>
        </div>
    );
}

export default ResetPassword;
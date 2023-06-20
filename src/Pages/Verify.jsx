import axios from 'axios';
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../helper';

function Verify() {
    const params = useParams(); // useParams cuman menampilkan params nya saha
    const navigate = useNavigate();
    console.log("req params :",params);
    // const location = useLocation(); // useLocation menampilkan semua path url nya
    // console.log("req location :",location);

    const onBtnVerify = async () => {
        try {
            let res = await axios.patch(`${API_URL}/user/verify`,{ 
                 //paramater ke2 tidak di isi karena pembaharuannya akan di lakukan di backend nya
            }, {
                headers : {
                    "Authorization": `Bearer ${params.token}`
                }
            });
            console.log(res.data);
            if(res.data.success){
                alert(res.data.message);
                navigate("/")
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow text-center mx-auto">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Welcome</h5>
            <p className="font-normal text-gray-700">Thanks for signing up! we need you to verify your email address to complete setting up your account</p>

            <button type="button" onClick={onBtnVerify}
            className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-full text-sm px-6 py-2 mt-3">Verify your email</button>
        </div>
    );
}

export default Verify;
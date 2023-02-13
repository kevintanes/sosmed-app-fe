import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import 'flowbite';
import { Dropdown, Spinner } from "flowbite-react";
import { LogoutAction } from "../Action/authAction";
import logo from "../Images/logo.png"

function Navbar(props) {
    // useNavigate harus dimasukan ke dalam variable dulu
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const username = useSelector((state) => state.auth.username); // mengambil data dari reducer

    return (
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded ">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                <a href="#" className="flex items-center">
                    <img onClick={() => navigate("/")} type="button" className=" text-2xl font-semibold w-60 h-16 ml-40" src={logo} alt="logo"  />
                </a>
                {
                    props.loading ?
                        <Spinner /> :

                        username ? (

                            <div className='mr-20 flex items-center py-1 px-3 text-xl focus:outline-none rounded-full border border-gray-200  hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 '>
                                <Dropdown inline={true} label={username}>
                                    <Dropdown.Item onClick={() => {
                                        dispatch(LogoutAction())
                                        navigate("/", { replace: true })
                                    }}>
                                        Sign out
                                    </Dropdown.Item>
                                </Dropdown>
                            </div >
                        ) : (

                            <div className="flex md:order-2">

                                {/* cara menggunakan useNavigate */}
                                <button onClick={() => navigate("/")} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-1 md:mr-3 ">Login</button>

                                {/* cara menggunakan Link */}
                                <Link to="/regis">
                                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-1 md:mr-3 ">Register</button>
                                </Link>
                            </div>

                        )
                }

            </div >
        </nav >

    );
}

export default Navbar;
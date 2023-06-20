import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import 'flowbite';
import { Dropdown, Spinner } from "flowbite-react";
import { LogoutAction } from "../Action/authAction";
import logo from "../Images/logo.png"
import Sidebar from './Sidebar';
import { MdOutlineVerified } from "react-icons/md"

function Navbar(props) {
    // useNavigate harus dimasukan ke dalam variable dulu
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const username = useSelector((state) => state.auth.username); // mengambil data dari reducer
    const dataStatus = useSelector((state) => state.auth.status);

    return (
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded ">
            <div className="container lg:w-8/12 flex lg:flex-wrap items-center justify-between mx-auto">
                <a href="#" className="flex items-center">
                    <img onClick={() => navigate("/home")} type="button" className=" text-2xl font-semibold w-40 h-10 lg:w-60 lg:h-16 " src={logo} alt="logo" />
                </a>
                {/* <div className='md:hidden flex'>
                <Sidebar />

                </div> */}
                {
                    props.loading ?
                        <Spinner /> :

                        username ? (
                            <div className='flex items-center gap-1 lg:gap-3'>
                                <div className='flex items-center gap-1 lg:text-xl'>
                                    <p className="text-blue-500"> {dataStatus == "verified" ? <MdOutlineVerified className='text-2xl lg:text-4xl'/> : <></>} </p>
                                    <p className='hidden lg:block'> {dataStatus} </p>
                                </div>
                                <div className='flex items-center py-1 px-3 text-sm lg:text-xl focus:outline-none rounded-full border border-gray-200  hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 '>
                                    <Dropdown inline={true} label={username}>
                                        <Dropdown.Item className='lg:hidden' onClick={() => { navigate("/home") }}>
                                            Home
                                        </Dropdown.Item>
                                        <Dropdown.Item className='lg:hidden' onClick={() => { navigate("/profile") }}>
                                            Profile
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => {
                                            dispatch(LogoutAction())
                                            navigate("/", { replace: true })
                                        }}>
                                            Sign out
                                        </Dropdown.Item>
                                    </Dropdown>
                                </div >
                            </div>
                        ) : (

                            <div className="flex lg:order-2">

                                {/* cara menggunakan useNavigate */}
                                <button onClick={() => navigate("/")} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1 lg:px-5 lg:py-2.5 text-center mr-1 lg:mr-3 ">Login</button>

                                {/* cara menggunakan Link */}
                                <Link to="/register">
                                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 lg:px-5 lg:py-2.5 text-center mr-1 lg:mr-3 ">Register</button>
                                </Link>
                            </div>

                        )
                }

            </div >
        </nav >

    );
}

export default Navbar;
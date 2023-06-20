import React from 'react';
import { RiHome7Fill, RiMessageLine, RiNotificationLine, RiUserLine } from "react-icons/ri"
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    const navigate = useNavigate()

    return (
        <div className='lg:block'>
            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button"
                className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="default-sidebar" className=" w-64 h-auto transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-fit px-3 py-4 overflow-y-auto bg-white ">
                    <ul className="space-y-2">
                        <li>
                            <a href="#" onClick={() => navigate("/home")} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 ">
                                <svg aria-hidden="true"
                                    className="flex-shrink-0 w-8 h-8 text-lg text-black transition duration-75 group-hover:text-gray-900 " fill="currentColor" viewBox="0 0 20 20">
                                    <RiHome7Fill />
                                </svg>
                                <span className=" ml-10 text-xl font-semibold">Home</span>
                            </a>
                        </li>
                        <li>
                            <a data-te-toggle="tooltip" title="coming soon" href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 ">
                                <svg aria-hidden="true"
                                    className="flex-shrink-0 w-8 h-8 text-lg text-black transition duration-75 group-hover:text-gray-900 " fill="currentColor" viewBox="0 0 20 20">
                                    <RiNotificationLine />
                                </svg>
                                <span className=" ml-10 text-xl font-semibold">Notifications</span>
                            </a>
                        </li>
                        <li>
                            <a data-te-toggle="tooltip" title="coming soon" href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 ">
                                <svg aria-hidden="true"
                                    className="flex-shrink-0 w-8 h-8 text-xl text-black transition duration-75 group-hover:text-gray-900 " fill="currentColor" viewBox="0 0 20 20">
                                    <RiMessageLine />
                                </svg>
                                <span className=" ml-10 text-xl font-semibold">Messages</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={() => navigate("/profile")} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 ">
                                <svg aria-hidden="true"
                                    className="flex-shrink-0 w-8 h-8 text-xl text-black transition duration-75 group-hover:text-gray-900 " fill="currentColor" viewBox="0 0 20 20">
                                    <RiUserLine />
                                </svg>
                                <span className=" ml-10 text-xl font-semibold">Profile</span>
                            </a>
                        </li>
                        <li>
                            <button type="button"
                                className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-full text-xl px-16 py-2.5 mr-2 mb-2 shadow-lg">
                                Trending
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>

    );
}

export default Sidebar;
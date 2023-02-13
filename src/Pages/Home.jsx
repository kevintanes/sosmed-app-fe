import React from 'react';
import { API_URL } from "../helper"
import axios from 'axios';
import { Card, Button, Sidebar, } from "flowbite-react"
import { Link } from "react-router-dom"
import { RiHome7Fill, RiNotificationLine, RiMessageLine, RiUserLine, RiUserAddLine, RiImageAddFill, RiEmotionHappyLine, RiMicLine } from "react-icons/ri"
import CardFeed from "../Components/CardFeed"
import { useSelector } from 'react-redux';

function Home() {
    const [userList, setUserList] = React.useState([]);
    const [textArea, setTextArea] = React.useState("");
    const [tweetList, setTweetList] = React.useState([]);
    const [expand, setExpand] = React.useState("_limit=4");

    const dataId = useSelector((state) => state.auth.id);
    const dataUsername = useSelector((state) => state.auth.username);

    const getAllUser = async () => {
        try {
            let response = await axios.get(`${API_URL}/users?${expand}`);
            console.log(response.data);
            setUserList(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    const getAllTweet = async () => {
        try {
            let response = await axios.get(API_URL + "/feeds?_sort=id&_order=desc");
            console.log(response.data);
            setTweetList(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    React.useEffect(() => {
        getAllUser();
        getAllTweet();
    }, [])

    const printUser = () => {
        let newArr = userList.map((val, idx) => {
            return <Card href="#" className='w-96 h-14 my-0.5' key={val.id}>
                <Link to={`/other/${val.id}`}>
                    <div className='flex'>
                        <div className="w-8 h-8 overflow-hidden bg-yellow-300 rounded-full mr-1">
                            <span className="font-medium text-gray-900 "></span>
                        </div>
                        <span className=" text-lg tracking-tight text-gray-900 ">
                            {val.username}
                        </span>
                        <div className=''>
                            <RiUserAddLine />
                        </div>
                    </div>

                </Link>
            </Card>
        });
        return newArr
    }

    const printTweet = () => {
        let newArr = tweetList.map((val, idx) => {
            return <CardFeed username={val.username} posting={val.posting} like={val.like} />
        });
        return newArr
    }

    const btnTweet = async () => {
        try {
            if (textArea == "") {
                alert("postingan belum di isi")
            } else {
                await axios.post(`${API_URL}/feeds`, {
                    idUser: dataId,
                    username: dataUsername,
                    like: 0,
                    posting: textArea
                })
                getAllTweet()
            }
        } catch (error) {
            console.log(error);
        }
    }

    const expandUser = () => {
        if(expand == "_limit=4"){
            setExpand("_limit=8")
            getAllUser()
        } else {
            setExpand("_limit=4")
            getAllUser()
        }
    }

    return (

        <div className='w-3/5 mx-auto my-3'>
            <div className='flex'>
                {/* SIDE BAR */}
                <div className='text-center w-1/4 '>
                    <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                        <span className="sr-only">Open sidebar</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                        </svg>
                    </button>

                    <aside id="default-sidebar" className=" w-64 h-auto transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                        <div className="h-fit px-3 py-4 overflow-y-auto bg-white">
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 ">
                                        <svg aria-hidden="true" className="flex-shrink-0 w-8 h-8 text-lg text-black transition duration-75 group-hover:text-gray-900 " fill="currentColor" viewBox="0 0 20 20">
                                            <RiHome7Fill />
                                        </svg>
                                        <span className=" ml-10 text-xl font-semibold">Home</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 ">
                                        <svg aria-hidden="true" className="flex-shrink-0 w-8 h-8 text-lg text-black transition duration-75 group-hover:text-gray-900 " fill="currentColor" viewBox="0 0 20 20">
                                            <RiNotificationLine />
                                        </svg>
                                        <span className=" ml-10 text-xl font-semibold">Notifications</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 ">
                                        <svg aria-hidden="true" className="flex-shrink-0 w-8 h-8 text-xl text-black transition duration-75 group-hover:text-gray-900 " fill="currentColor" viewBox="0 0 20 20">
                                            <RiMessageLine />
                                        </svg>
                                        <span className=" ml-10 text-xl font-semibold">Messages</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 ">
                                        <svg aria-hidden="true" className="flex-shrink-0 w-8 h-8 text-xl text-black transition duration-75 group-hover:text-gray-900 " fill="currentColor" viewBox="0 0 20 20">
                                            <RiUserLine />
                                        </svg>
                                        <span className=" ml-10 text-xl font-semibold">Profile</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </aside>
                    <button type="button" className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-full text-xl px-16 py-2.5 mr-2 mb-2 shadow-lg">Trending</button>


                </div>
                {/* FEED */}
                <div className='w-1/2 text-3xl font-semibold shadow-xl mx-2'>
                    {/* div postingan */}
                    <div>
                        <div className='flex mx-5'>
                            {/* div avatar dan label  */}
                            <div className="w-12 h-12 overflow-hidden bg-yellow-300 rounded-full mr-5">
                                <span className="font-medium text-gray-900 "></span>
                            </div>
                            <div className="w-11/12">
                                <textarea id="editor" onChange={(e) => setTextArea(e.target.value)}
                                    className=" w-full text-lg text-gray-800 bg-white border-0 resize-none" placeholder="What's happening?" ></textarea>
                            </div>
                        </div>
                        <div className='flex justify-between my-3'>
                            <div className='flex'>
                                <button className='mx-5 hover:bg-blue-300'>
                                    <RiImageAddFill />
                                </button>
                                <button className='mr-5 hover:bg-blue-300'>
                                    <RiEmotionHappyLine />
                                </button>
                                <button className='hover:bg-blue-300'>
                                    <RiMicLine />
                                </button>
                            </div>
                            <div className='flex mr-5'>
                                <button type="button" onClick={btnTweet}
                                    className="text-white bg-blue-300 hover:bg-blue-600 font-medium rounded-full text-sm px-6 py-2">Tweet</button>
                            </div>

                        </div>
                    </div>
                    <hr />
                    <div className='my-3'>
                        {printTweet()}
                    </div>

                </div>
                {/* WHO TO FOLLOW */}
                <div className='w-1/4 '>
                    <div className='w-64 text-center text-xl font-semibold shadow-xl bg-yellow-100 px-2 py-4 rounded-2xl'>
                        Who To Follow
                        <div id='list-user' className='flex flex-wrap justify-center mt-3'>
                            {printUser()}
                        </div>
                        <button onClick={expandUser} type="button" className='text-blue-400 hover:underline hover:text-blue-500'>
                            See more
                        </button>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default Home;
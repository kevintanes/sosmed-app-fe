import React from 'react';
import Sidebar from '../Components/Sidebar';
import { API_URL } from '../helper';
import cover from '../Images/cover.jpg';
import { RiEmotionHappyLine, RiImageAddFill, RiMicLine } from 'react-icons/ri';
import axios from 'axios';
import { useSelector } from 'react-redux';
import CardFeed from '../Components/CardFeed';
import { MdOutlineVerified, MdCameraAlt } from "react-icons/md"
import ModalPP from '../Components/ModalPP';
import { useState } from 'react';

function MyProfile() {

    //------------------ get user & get feed user

    const dataUsername = useSelector((state) => state.auth.username);
    const [feed, setFeed] = React.useState([])
    const [user, setUser] = React.useState(null)

    const getUser = async () => {
        try {
            let res = await axios.post(`${API_URL}/user/getdetailuser`, {
                username: dataUsername
            })
            console.log(`ini res getUser myprofile :`, res.data);
            setUser(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getFeedUser = async () => {
        try {
            let resp = await axios.post(`${API_URL}/feed/getmytweet`, {
                username: dataUsername
            })
            console.log(`ini data resp myprofile :`, resp.data[0].feeds);
            setFeed(resp.data[0].feeds)

        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        getFeedUser();
        getUser();
    }, [dataUsername]);

    const PrintFeedUser = () => {
        let print = feed.map((val, idx) => {
            return <CardFeed feed={val.feed} date={val.createdAt} username={user?.username} />
        })
        return print
    }

    // ----------- posting feed/tweet

    const [textArea, setTextArea] = React.useState("");
    const [countTextArea, setCountTextArea] = React.useState(0);

    let token = localStorage.getItem("sosmed_login");
    const dataStatus = useSelector((state) => state.auth.status);

    const btnTweet = async () => {
        try {
            if (textArea == "") {
                alert("isi dlu feed nya bos!");
            } else {
                if (dataStatus == "unverified") {
                    alert("account unverifed")
                } else {

                    await axios.post(`${API_URL}/feed/tweet`, { feed: textArea }, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    getFeedUser();
                    setTextArea("");

                }
            }


        } catch (error) {
            console.log("ini error dari btnTweet :", error);
        }
    }

    // ---------------------- IMG PROFILE




    return (
        <div className='overflow-x-hidden flex md:w-8/12 mx-auto my-3'>

            <div className='hidden lg:block'>
                <Sidebar />
            </div>

            <div>
                <div className=''>
                    <img className="w-screen object-bottom" src={cover} alt="image description" />
                </div>
                <div className="bottom-12 w-full shadow-xl bg-white border border-gray-200 rounded-b-lg  ">
                    <div className="relative bottom-12 left-10 flex">
                        <img className="w-24 h-24 z-auto items-center rounded-full object-cover" src={`${API_URL}/imageProfile/defaultimage.jpg`} alt="Profile picture" />
                        <button  type='button' className='relative top-8 right-6 text-2xl'> <MdCameraAlt /> </button>
                    </div>
                    <div className='pl-10 pb-10 -mt-10'>
                        <div className='flex gap-2'>
                            <h5 className="mb-1 text-3xl font-semibold text-gray-900">{user?.username}</h5>
                            <div className='flex items-center text-xl'>
                                <p className="text-blue-500"> {dataStatus == "verified" ? <MdOutlineVerified className='text-4xl' /> : <></>} </p>
                            </div>
                        </div>

                        <span className="text-lg text-gray-500 ">{user?.email}</span>
                        <div className="mt-4 space-x-3 md:mt-6">
                            <span className='font-semibold'>100</span>
                            <span className='text-gray-500'>FOLLOWING</span>
                            <span className='font-semibold'>100</span>
                            <span className='text-gray-500'> FOLLOWER</span>
                        </div>
                    </div>
                    <hr />
                    <textarea id="editor" maxLength={150} value={textArea} onChange={(e) => {
                        setTextArea(e.target.value);
                        setCountTextArea(e.target.value.length);
                    }} className="w-full lg:w-11/12 lg:ml-10 rounded-lg lg:mt-3 px-10 h-28 text-base text-gray-800 bg-white border-gray-400 resize-none" placeholder="What's happening?" ></textarea>
                    <p className='text-base text-right text-gray-400 mr-3 md:mr-14'>{countTextArea}/150</p>

                    <div className='flex justify-between my-3'>
                        <div className='flex text-3xl'>
                            <button className='mx-10 hover:bg-blue-300'>
                                <RiImageAddFill />
                            </button>
                            <button className='mr-10 hover:bg-blue-300'>
                                <RiEmotionHappyLine />
                            </button>
                            <button className='hover:bg-blue-300'>
                                <RiMicLine />
                            </button>
                        </div>
                        <div className='flex mr-2 md:mr-10'>
                            <button type="button"
                                onClick={btnTweet}
                                className="text-white bg-blue-300 hover:bg-blue-600 font-medium rounded-full text-sm px-6 py-2">Tweet</button>
                        </div>

                    </div>

                </div>

                <div className='my-3'>
                    {PrintFeedUser()}
                </div>
            </div>


        </div>
    );
}

export default MyProfile;
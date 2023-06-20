import axios from 'axios';
import React from 'react';
import { useParams } from "react-router-dom";
import CardFeed from '../Components/CardFeed';
import CardOtherFeed from '../Components/CardOtherFeed';
import Sidebar from '../Components/Sidebar';
import { API_URL } from '../helper';
import cover from '../Images/cover.jpg';

const OtherProfile = (props) => {
    const params = useParams();
    const [feedUser, setfeedUser] = React.useState([]);
    const [data, setData] = React.useState(null);

    console.log("dari params", params);
    const getFeedUser = async () => {
        try {
            let response = await axios.get(`${API_URL}/feed/getothertweet/${params.username}`);
            console.log("ini data dari response otherprofile : ", response.data[0].feeds);
            setfeedUser(response.data[0].feeds)
        } catch (error) {
            console.log("ini error dari otherprofile ", error);
        }
    }

    const getDetailUser = async () => {
        try {
            let detailUser = await axios.get(`${API_URL}/user/getAllDetailUser/${params.username}`);
            console.log("ini detailUser otherprofile", detailUser.data);
            setData(detailUser.data)

        } catch (error) {
            console.log("ini error getdetailuser other profile", error);
        }

    }

    React.useEffect(() => {
        getFeedUser();
        getDetailUser();
    }, []);

    const printTweet = () => {
        // console.log(`ini dari data otherprofile:`, feedUser);
        let print = feedUser.map((val, idx) => {
            return <CardOtherFeed feed={val.feed} username={params.username} date={val.createdAt} />
        })
        // console.log(`ini dari print tweet otherprofile:`, print);
        return print
    }

    return (
        <div className='relative flex md:w-8/12 mx-auto my-3'>

            <div className=''>
                <Sidebar />
            </div>

            <div>
                <div className=''>
                    <img className="w-screen object-bottom" src={cover} alt="image description" />
                </div>
                <div className="bottom-12 w-full shadow-xl bg-white border border-gray-200 rounded-b-lg  ">
                    <div className="relative bottom-12 left-10">
                        <img className="w-24 h-24 z-auto items-center rounded-full object-cover" src={`${API_URL}/imageProfile/defaultimage.jpg`} alt="Profile picture" />
                    </div>
                    <div className='pl-10 pb-10'>
                        <h5 className="mb-1 text-3xl font-semibold text-gray-900">{params.username}</h5>
                        <span className="text-lg text-gray-500 ">{data?.email}</span>
                        <div className="mt-4 space-x-3 md:mt-6">
                            <span className='font-semibold'>100</span>
                            <span className='text-gray-500'>FOLLOWING</span>
                            <span className='font-semibold'>100</span>
                            <span className='text-gray-500'> FOLLOWER</span>
                        </div>
                    </div>
                </div>

                <div className='my-3'>
                    {printTweet()}
                </div>
            </div>

        </div>
    );
}

export default OtherProfile;
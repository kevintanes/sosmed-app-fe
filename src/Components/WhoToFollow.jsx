import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from '../helper';
import { RiUserAddLine } from "react-icons/ri"
import { Card } from "flowbite-react"
import { Link } from "react-router-dom"

function WhoToFollow() {
    const [userList, setUserList] = React.useState([]);
    // const [expand, setExpand] = React.useState("_limit=4");
    const dataUsername = useSelector((state) => state.auth.username);

    const getAllUser = async () => {
        try {
            let res = await axios.get(`${API_URL}/user/whotofollow`);
            setUserList(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        getAllUser();
    }, [])

    const printUser = () => {
        let filter = userList.filter((val) => {
            return val.username !== dataUsername
        });

        let newArr = filter.map((val, idx) => {
            return <Card href="#" className='w-96 h-14 my-0.5' key={val.id}>
                <Link to={`/${val.username}`}>
                    <div className='flex'>
                        <img className="w-8 h-8 rounded-full" src={`${API_URL}${val.imgprofile}`} alt="Rounded avatar">
                        </img>
                        <span className="mx-1 text-lg tracking-tight text-gray-900 ">
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

    // const expandUser = () => {
    //     if(expand == "_limit=4"){
    //         setExpand("_limit=8")
    //         getAllUser()
    //     } else {
    //         setExpand("_limit=4")
    //         getAllUser()
    //     }
    // }

    return (
        <div className='hidden md:block'>
            <div className='w-64 text-center text-xl font-semibold shadow-xl bg-yellow-100 px-2 py-4 rounded-2xl'>
                Who To Follow
                <div id='list-user' className='flex flex-wrap justify-center mt-3'>
                    {printUser()}
                </div>
                <button
                    // onClick={expandUser}
                    type="button" className='text-blue-400 hover:underline hover:text-blue-500'>
                    See more
                </button>
            </div>
        </div>
    );
}

export default WhoToFollow;
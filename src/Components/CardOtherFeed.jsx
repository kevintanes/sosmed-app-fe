import React from 'react';
import { BiComment, BiLike, BiShare } from "react-icons/bi"
import { API_URL } from '../helper';


function CardOtherFeed(props) {
     //---------------------------- DATE POSTING ----------------------------------------------------
    // const [date, setDate] = React.useState(new Date().toISOString().split("T")[0]);
    let today = new Date().toISOString().split("T")[0];
    console.log(`ini dari today`, today);


    const tanggal = () => {
        if (today == props.date.split("T")[0]) {
            return <span className='text-gray-500 ml-2 text-base'>
                today
            </span>
        } else {
            let tgl = new Date(today) - new Date(props.date.split("T")[0])
            let day = Math.floor(tgl / 86400000)
            console.log(tgl);

            if(day == 1){
                return <span className='text-gray-500 ml-2 text-base'>
                    yesterday
                </span>
            } else {
                return <span className='text-gray-500 ml-2 text-base'>
                    {day} days ago
                </span>
            }
        }
    }

    return (
        <div className=''>
            <div class="w-full mx-auto p-2 px-10 bg-white border border-gray-200 rounded-lg shadow mb-1">
                <div className='flex'>
                    <img className="w-8 h-8 rounded-full" src={`${API_URL}/imageProfile/defaultimage.jpg`} alt="Rounded avatar" />
                    <p className='text-xl mx-3 font-semibold'>
                        {props.username}
                        {tanggal()}
                    </p>
                </div>
                <p className="mb-3 text-base font-normal text-gray-700 dark:text-gray-400">{props.feed}</p>
                <div className='flex justify-evenly text-xl'>
                    <div className='flex'>
                        <button> <BiLike /></button>
                        <p> {props.like} </p>
                    </div>
                    <button >
                        <BiComment data-te-toggle="tooltip" title="coming soon"/>
                    </button>
                    <button >
                        <BiShare data-te-toggle="tooltip" title="coming soon"/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CardOtherFeed;
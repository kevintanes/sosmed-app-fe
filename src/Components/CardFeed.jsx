import React from 'react';
import { BiComment, BiLike, BiShare } from "react-icons/bi"

function CardFeed(props) {
    return (
        <div>
            <div class="w-11/12 mx-auto p-2 bg-white border border-gray-200 rounded-lg shadow mb-1">
                <div className='flex'>
                    <div className="w-10 h-10 overflow-hidden bg-yellow-300 rounded-full mr-5">
                        <span className="font-medium text-gray-900 "></span>
                    </div>
                    <p className='text-2xl'>
                        {props.username}
                    </p>
                </div>
                <p className="mb-3 text-base font-normal text-gray-700 dark:text-gray-400">{props.posting}</p>
                <div className='flex justify-evenly text-xl'>
                    <div className='flex'>
                        <button> <BiLike /></button>
                        <p> {props.like} </p>
                    </div>
                    <button >
                        <BiComment />
                    </button>
                    <button >
                        <BiShare />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CardFeed;
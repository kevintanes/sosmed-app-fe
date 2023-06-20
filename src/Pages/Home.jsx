import React from 'react';
import Sidebar from '../Components/Sidebar';
import FeedLanding from '../Components/FeedLanding';
import WhoToFollow from '../Components/WhoToFollow';

function Home() {

    return (
        <div className='flex lg:w-8/12 mx-auto my-3 relative'>
            <div className='hidden lg:block w-auto'>
                <Sidebar />

            </div>
            <div className='w-full '>
                <FeedLanding />

            </div>
            <div className='hidden lg:block w-auto'>
                <WhoToFollow />

            </div>
        </div>

    );
}

export default Home;
import axios from 'axios';
import React from 'react';
import { RiEmotionHappyLine, RiImageAddFill, RiMicLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { API_URL } from '../helper';
import CardFeed from './CardFeed';

function FeedLanding(props) {

    //---------------------------- TWEET AREA -----------------------------------------------
    const [countTextArea, setCountTextArea] = React.useState(0);
    const [tweetList, setTweetList] = React.useState([]);
    const [textArea, setTextArea] = React.useState("");
    const dataStatus = useSelector((state) => state.auth.status);
    console.log(`ini datastatus`, dataStatus);

    let token = localStorage.getItem("sosmed_login");

    const btnTweet = async () => {
        try {
            if (textArea == "") {
                alert("isi dlu feed nya bos!");
            } else {
                if (dataStatus == "unverified") {
                    alert("account unverified")
                } else {
                    let resp = await axios.post(`${API_URL}/feed/tweet`, { feed: textArea }, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    getAllTweet();
                    setTextArea("");
                }
            }

        } catch (error) {
            console.log("ini error dari btnTweet :", error);
        }
    }

    const getAllTweet = async () => {
        try {
            let resp = await axios.get(`${API_URL}/feed/getalltweet`);
            console.log(`ini data resp getAllTweet`, resp.data);
            setTweetList(resp.data)
        } catch (error) {
            console.log(`error dari getAllTweet: `, error);
        }
    }

    React.useEffect(() => {
        getAllTweet();
    }, [])

    const printTweet = () => {
        let print = tweetList.map((val, idx) => {
            return <CardFeed feed={val.feed} username={val.user.username} date={val.createdAt} /> //props = val.data
        });
        return print
    }

    return (
        <div className='text-3xl font-semibold shadow-xl mx-2'>
            {/* div postingan */}
            <div className='lg:mx-5'>
                <div className='flex mx-2 md:mx-5'>
                    {/* div avatar dan label  */}
                    <img className="w-8 h-8 rounded-full" src={`${API_URL}/imageProfile/defaultimage.jpg`} alt="Rounded avatar" />
                    <div className="w-10/12">
                        <textarea id="editor" maxLength={150} value={textArea} onChange={(e) => {
                            setTextArea(e.target.value);
                            setCountTextArea(e.target.value.length);
                        }} className="mx-5 rounded-lg w-full h-28 text-base text-gray-800 bg-white border-gray-400 resize-none" placeholder="What's happening?" ></textarea>
                    </div>
                </div>
                <p className='text-base text-right text-gray-400 mr-3 md:mr-10'>{countTextArea}/150</p>
                <div className='flex justify-between my-3'>
                    <div className='flex'>
                        <button data-te-toggle="tooltip" title="coming soon" className='mx-5'>
                            <RiImageAddFill />
                        </button>
                        <button data-te-toggle="tooltip" title="coming soon" className='mr-5 '>
                            <RiEmotionHappyLine />
                        </button>
                        <button data-te-toggle="tooltip" title="coming soon">
                            <RiMicLine />
                        </button>
                    </div>
                    <div className='flex mr-2 md:mr-5'>
                        <button type="button"
                            onClick={btnTweet}
                            className="text-white bg-blue-300 hover:bg-blue-600 font-medium rounded-full text-sm px-6 py-2">Tweet</button>
                    </div>

                </div>
            </div>
            <hr />
            <div className='my-3 '>
                {printTweet()}
            </div>

        </div>
    );
}

export default FeedLanding;
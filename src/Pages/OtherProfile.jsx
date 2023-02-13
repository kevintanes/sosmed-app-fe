import axios from 'axios';
import React from 'react';
import { useParams } from "react-router-dom"
import { API_URL } from '../helper';

const OtherProfile = (props) => {
    const params = useParams();
    const [data, setData] = React.useState(null);

    console.log("dari params", params);
    const getDataUser = async () => {
        try {
            let response = await axios.get(`${API_URL}/users?id=${params.id}`);
            setData(response.data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        getDataUser();
    }, []);

    return (
        <p className='text-2xl'>Other Profile {data?.username}</p>
    );
}

export default OtherProfile;

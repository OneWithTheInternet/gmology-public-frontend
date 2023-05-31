import React, { useEffect, useState } from 'react'
import makeRequest from '../../api'
import InconClap from '../atoms/IconClap';
//components
import Loader from '../atoms/Loader'
import ErrorMessage from '../atoms/ErrorMessage';
import ConfirmationMessage from '../atoms/ConfirmationMessage'

function UserTopGamesClaps(props) {
    //Inbound Data
    const [data, setData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [confirmationMessage, setConfirmationMessage] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    //Outbound data
    const userInput = {
        user: {
            userid: props.userData[0].id,
            listid: props.userData[0].lists[1].id
        }
    };
    //Others
    const [claps, setClaps] = useState(0);

    /**
     * fetches current users's Top games claps
     */
    useEffect(() => {
        async function getTopGamesClaps() {
            setisLoading(true);
            try {
                //Making request
                const responseData = await makeRequest.topGamesClaps.displayClaps(userInput);
                //handling response
                if (!responseData[0].error) {
                setData(responseData);
                setClaps(responseData[0].topGamesClaps);
                setErrorMessage(null);
                setisLoading(false);
            } else {
                setData(null);
                setErrorMessage(responseData[0].error);
                setisLoading(false);
            }
        } catch (error) {
            setisLoading(false);
            return setErrorMessage(error.message);
            }
        }
        getTopGamesClaps();
    }, []);

    /**
     * Triggers making request to add clap
     */
    async function addClap() {
        try {
            setisLoading(true);
            const responseData = await makeRequest.topGamesClaps.addClap(userInput);
            if (!responseData[0].error) {
                setConfirmationMessage(responseData[0].message);
                setErrorMessage(null);
                if (responseData[0].message !== '3 claps will do!') {
                    setClaps(claps + 1);
                }
                setisLoading(false);
            } else {
                setConfirmationMessage(null);
                setErrorMessage(responseData[0].error);
                setisLoading(false);
            }
        } catch (error) {
            setisLoading(false);
            return setErrorMessage(error.message);
        }
    }

    const clapCounter = <div className='topGamesClaps__counter'>claps: {claps}</div>;

    /**
     * Creates component to be rendered
     * @returns JSX component
     */
    const Component = () => {
        return (
            <div className='topGamesClaps'>
                {clapCounter}
                <InconClap addClap={addClap}/>
                {isLoading ? <Loader/> : null}
                {confirmationMessage ? <ConfirmationMessage message={confirmationMessage} /> : null }
                {errorMessage && errorMessage !== "Resource not found!" ? <ErrorMessage error={errorMessage}/> : null }
            </div>
        )
            
    };
    
    return (
        <Component />
    )
}

export default UserTopGamesClaps
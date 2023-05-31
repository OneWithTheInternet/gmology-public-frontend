import React, { useEffect, useState } from 'react'
import makeRequest from '../../api'
//components
import Loader from '../atoms/Loader'
import ErrorMessage from '../atoms/ErrorMessage';

function ButtonUserWatch(props) {
    //Inbound Data
    const [errorMessage, setErrorMessage] = useState(null);
    const [confirmationMessage, setConfirmationMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    //Outbound data
    const [userid, setUserid] = useState(props.data[0].id);
    const userInput = {
        user: {
            userid: userid
        }
    }
    //Others
    const [isFollower, setIsFollower] = useState(false);

    /**
     * fetches data that determines if source user is following target user already
     */
    useEffect(() => {
        async function getIsFollowerState() {
            setIsLoading(true);
            try {
                //Making request
                const responseData = await makeRequest.follows.isFollower(userInput);
                //handling response
                if (!responseData[0].error) {
                setIsFollower(responseData[0].isFollower);
                setErrorMessage(null);
                setIsLoading(false);
            } else {
                if (responseData[0].error !== 'Only Logged in users can do this'){
                    setErrorMessage(responseData[0].error);
                }
                setIsLoading(false);
            }
        } catch (error) {
            return setErrorMessage(error.message);
            }
        }
        getIsFollowerState();
    }, []);

    /**
     * Triggers making request to add like
     */
    async function addfollow() {
        try {
            setIsLoading(true);
            const responseData = await makeRequest.follows.addFollow(userInput);
            if (!responseData[0].error) {
                setConfirmationMessage(responseData[0].message);
                setErrorMessage(null);
                setIsFollower(true);
                setIsLoading(false);
            } else {
                setConfirmationMessage(null);
                setErrorMessage(responseData[0].error);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            return setErrorMessage(error.message);
        }
    }

    /**
     * Triggers making request to remove like
     */
    async function removeFollow() {
        try {
            setIsLoading(true);
            const responseData = await makeRequest.follows.removeFollow(userInput);
            if (!responseData[0].error) {
                setConfirmationMessage(responseData[0].message);
                setErrorMessage(null);
                setIsFollower(false);
                setIsLoading(false);
            } else {
                setConfirmationMessage(null);
                setErrorMessage(responseData[0].error);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            return setErrorMessage(error.message);
        }
    }
    
    //Button to be rendered
    const WatchButton = () => {
        // button if user already follows this list
        if (isFollower) {
            return (<form className='buttonUserWatch--watching'>
                <input type={'button'} value={'Watching'} onClick={() => removeFollow()}/>
            </form>)
        } else {
            // button if user does not likes this list yet
            return (<form className='buttonUserWatch--watch'>
                <input type={'button'} value={'Watch'} onClick={() => addfollow()}/>
            </form>)
        }
    }

    /**
     * Creates component to be rendered
     * @returns JSX component
     */
    const Component = () => {
        return (
            <div className='buttonUserWatch'>
                {WatchButton()}
                {/* {confirmationMessage ? <ConfirmationMessage message={confirmationMessage} /> : null } */}
                {errorMessage ? <ErrorMessage error={errorMessage}/> : null }
                {isLoading ? <Loader/> : null}
            </div>
        )
            
    };

  return (
    <><Component /></>
  )
}

export default ButtonUserWatch
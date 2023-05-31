import React, { useEffect, useState } from 'react'
import makeRequest from '../../api'
import imageHeart from '../../assets/custom_icons/heart.png'
import imageHeartGray from '../../assets/custom_icons/heartGray.png'
//components
import Loader from '../atoms/Loader'
import ErrorMessage from '../atoms/ErrorMessage';
import ConfirmationMessage from '../atoms/ConfirmationMessage'

function UserPlayedGamesLIkes(props) {
    //Inbound Data
    const [data, setData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [confirmationMessage, setConfirmationMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    //Outbound data
    const userInput = {
        user: {
            userId_target: props.userData[0].id,
            listid: props.userData[0].lists[0].id
        }
    }
    //Others
    const [isLiked, setIsLiked] = useState(false);
        
    /**
     * fetches current users's played games likes
     */
    useEffect(() => {
        async function getPlayedGamesLikes() {
            setIsLoading(true);
            try {
                //Making request
                const responseData = await makeRequest.playedGamesLikes.getPlayedGamesLikes(userInput);
                //handling response
                if (!responseData[0].error) {
                setData(responseData);
                const found = responseData[0].likersid.find((element) => {return (element == localStorage.userid)} );
                if (found) {
                    setIsLiked(true);
                }
                setErrorMessage(null);
                setIsLoading(false);
            } else {
                setData(null);
                setErrorMessage(responseData[0].error);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            return setErrorMessage(error.message);
            }
        }
        getPlayedGamesLikes();
    }, []);

    /**
     * Triggers making request to add like
     */
    async function addLike() {
        try {
            setIsLoading(true);
            const responseData = await makeRequest.playedGamesLikes.addLike(userInput);
            if (!responseData[0].error) {
                setConfirmationMessage(responseData[0].message);
                setErrorMessage(null);
                setIsLiked(true);
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
    async function removeLike() {
        try {
            setIsLoading(true);
            const responseData = await makeRequest.playedGamesLikes.removeLike(userInput);
            if (!responseData[0].error) {
                setConfirmationMessage(responseData[0].message);
                setErrorMessage(null);
                setIsLiked(false);
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

    const likeCounter = <div className='playedGamesLikes__counter'>{data ? data[0].likersid.length : 0} Likes</div>;

    //Button to be rendered
    const likeButton = () => {
        // button if user already likes this list
        if (isLiked) {
            return (
                <>
                    <div className='playedGamesLikes__icon--color'>
                        <img src={imageHeart} alt={'You like this gmology button'} onClick={() => removeLike()}/>
                    </div>
                    <div className='playedGamesLikes__message'>
                        <p>You like this gmology</p>
                    </div>
                </>
            )
        } else {
            // button if user does not likes this list yet
            return (
                <>
                    <div className='playedGamesLikes__icon--gray'>
                        <img src={imageHeartGray} alt={'You like this gmology button'} onClick={() => addLike()}/>
                    </div>
                </>
            )
        }
    }


    /**
     * Creates component to be rendered
     * @returns JSX component
     */
    const Component = () => {
        return (
            <section className='playedGamesLikes'>
                {likeButton()}
                {likeCounter}
                {isLoading ? <Loader/> : null}
                {confirmationMessage ? <ConfirmationMessage message={confirmationMessage} /> : null }
                {errorMessage && errorMessage !== "Resource not found!" ? <ErrorMessage error={errorMessage}/> : null }
            </section>
        )        
    };
    
    return (
        <Component />
    )
}

export default UserPlayedGamesLIkes
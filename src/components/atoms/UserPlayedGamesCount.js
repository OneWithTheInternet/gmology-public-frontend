import React, { useEffect,useState } from 'react'
import ErrorMessage from '../atoms/ErrorMessage';
import makeRequest from '../../api'

function UserPlayedGamesCount(props) {
    const [playedGamesCount, setPlayedGamesCount] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const userInput = {
        user: {
            userid: props.data[0].id
        }
    }

    /**
     * Requesting to get played games count
     */
    useEffect(() => {
        async function getPlayedGamesCount() {
          try {
            //Making request
            const responseData = await makeRequest.playedGames.getPlayedGamesCount(userInput);
            if (!responseData[0].error) {
              setPlayedGamesCount(responseData);
              setErrorMessage(null);
            } else {
              setPlayedGamesCount(null);
              setErrorMessage(responseData[0].error);
            }
          } catch (error) {
            return setErrorMessage(error.message);
          }
        }
        getPlayedGamesCount();
    }, [])

    const Component = () => {
        if (errorMessage) {
            return (<ErrorMessage error={errorMessage}/>)
        } else {
            return (
                <div>
                    <p><strong>{playedGamesCount ? playedGamesCount[0].playedGamesCount : null} </strong> games played,</p>
                </div>
            )
        }
    }
    
  return (
    <Component />
  )
}

export default UserPlayedGamesCount
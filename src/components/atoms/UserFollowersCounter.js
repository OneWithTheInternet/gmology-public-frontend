import React, { useEffect,useState } from 'react'
import ErrorMessage from '../atoms/ErrorMessage';
import makeRequest from '../../api'

function UserFollowersCounter(props) {
    const [followersCount, setFollowersCount] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const userInput = {
        user: {
            userid: props.data[0].id
        }
    }

    /**
     * Requesting to get followers count
     */
    useEffect(() => {
        async function getFollowersCount() {
          try {
            //Making request
            const responseData = await makeRequest.follows.getFollowsCount(userInput);
            if (!responseData[0].error) {
              setFollowersCount(responseData);
              setErrorMessage(null);
            } else {
              setFollowersCount(null);
              setErrorMessage(responseData[0].error);
            }
          } catch (error) {
            return setErrorMessage(error.message);
          }
        }
        getFollowersCount();
    }, [])

    const Component = () => {
        if (errorMessage) {
            return (<ErrorMessage error={errorMessage}/>)
        } else {
            return (
                <div>
                    <p><strong>{followersCount ? followersCount[0].followersCount : null}</strong> watchers</p>
                </div>
            )
        }
    }
    
  return (
    <Component />
  )
}

export default UserFollowersCounter
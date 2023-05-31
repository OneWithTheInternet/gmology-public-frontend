import {useState, useEffect} from 'react'
import BackButton from '../atoms/BackButton'
import makeRequest from '../../api' 
//Components
import ErrorMessage from '../atoms/ErrorMessage'
import UsersList from '../organisms/UsersList'
import Loader from '../atoms/Loader'
import ResultCounter from '../atoms/ResultCounter'
import LoadMoreButton from '../molecules/LoadMoreButton'

function Watchers() {
  //Inbound Data
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  //Outbound data
  const [pageQuery, setPageQuery] = useState(1);
  const outboundData = {
    user: {
      userid: localStorage.userid
    }
  }
  //Others
  const [isLoading, setIsLoading] = useState(false);
  const [searchNow, setSearchNow] = useState(false);

  /**
   * Triggers search function when page loads
   */
  useEffect(() => {
    getFollowers()
    return () => {
      setErrorMessage(null);
      setData(null);
    }
  }, [])

  /**
   * Triggers search function when user clicks on "Load more"
   */
  useEffect(() => {
    getFollowers()
    return () => {
      setErrorMessage(null);
      setData(null);
      setSearchNow(false);
    }
  }, [searchNow])

  /**
   * Gets Followers for the requested user
   * @returns Array of objects
   */
  async function getFollowers() {
    setIsLoading(true);
    try {
      const responseData = await makeRequest.follows.getFollows(outboundData, pageQuery);
      if(!responseData[0].error) {
        setData(responseData);
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

  /**
   * Renders followers for the specified user.
   * Returns null if there is no data to work with
   * @returns JSX list of followers or null
   */
  const followers = () => {
    if (data) {
      
      if (data[0].message) {
        return (
          <p>{data[0].message}</p>
        )
      }

      return (
        <UsersList users={data} />
      )
      
    } else {
      return null
    }
  }

  /**
   * Triggers new search that loads more items
   */
  function handleSubmit(event) {
    event.preventDefault();
    setPageQuery(pageQuery + 1)
    setSearchNow(!searchNow);
  }


  return (
    <section className='followers'>
      <BackButton/>
      <h2>Watchers</h2>
      
      {isLoading? <Loader/> : null}
      
      {errorMessage? <ErrorMessage error={errorMessage} /> : null}

      {data && !data[0].message ? <ResultCounter data={data} /> : null}

      <div className='followers__list'>
        {followers()}
      </div>
      
      {data ? <LoadMoreButton handleSubmit={handleSubmit} /> : null}

    </section>
  )
}

export default Watchers
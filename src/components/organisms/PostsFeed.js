import {React, useEffect, useState} from 'react';
import PostCard from "./PostCard";
import makeRequest from "../../api";
import ErrorMessage from '../atoms/ErrorMessage';
import LoadMoreButton from '../atoms/LoadMoreButton';

function NewPostsSection() {
  //State variables to handle errors
  const [isRequestBad, setIsRequestBad] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  //State variable to store server's response data
  const [data, setData] = useState([]);
  //Defining current page state
  const [pageNumber, setPageNumber] = useState(1);

  /**
   * Fetches data for 10 latest posts
   */
  async function displayAll() {
    try {
      //making api request
      const responseData = await makeRequest.posts.displayAll(pageNumber);

      //If there are no errors in the reaquest set the pass the retreived data
      if (!responseData[0].error) {
        //Setting data to an array with the actual data inside. Useful for pagination and mapping later.
        setData(responseData);
        setIsRequestBad(false);

        //Handling invalid token
      } else if ( responseData[0].error === 'invalid token') {
        setErrorMessage(responseData[0].error);
        setIsRequestBad(true);
        localStorage.clear()

        //handling other errors
      } else {
        setErrorMessage(responseData[0].error);
        setIsRequestBad(true)
      }
    } catch (error) {
      setErrorMessage(error.error);
      setIsRequestBad(true)
    }
  }

  /**
   * Fetches data for 10 latest posts
   */
  async function loadMorePosts() {
    try {
      //making api request
      const responseData = await makeRequest.posts.loadMorePosts(pageNumber);

      //If there are no errors in the reaquest set the pass the retreived data
      if (!responseData[0].error) {
        //setting state to previus data convined with new data
        setData(responseData);
        setPageNumber(pageNumber + 1);
        setIsRequestBad(false);

        //Handling request errors and returning error message
      } else {
        setErrorMessage(responseData[0].error);
        setIsRequestBad(true);
      }
    } catch (error) {
      setIsRequestBad(true);
      setErrorMessage(error.error)
    }
  }

  /**
   * Calls for data fetching function on page load
   */
  useEffect(() => {

    //Calling function
    displayAll()

    //Clearing states
    return function cleanup() {
      setIsRequestBad(false);
      setErrorMessage('')
    }
  }, []);
  

  //returning JSX components
  return <section className="postsFeed" >

    <PostCard data = { data } />

    {isRequestBad ? <ErrorMessage error= {errorMessage}/> : null }

    <LoadMoreButton loadMorePosts = { loadMorePosts } />

  </section>
}

export default NewPostsSection
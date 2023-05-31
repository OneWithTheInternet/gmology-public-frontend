import { React, useEffect, useState } from 'react';
import PostText from '../atoms/PostText';
import UserTag from '../molecules/UserTag';
import makeRequest from '../../api';
import ErrorMessage from '../atoms/ErrorMessage';
import CreationDate from '../atoms/CreationDate';
import CommentsSection from '../organisms/CommentsSection';
import Redirect from "../atoms/Redirect";
/**
 * Creates a react coponent instance
 * @returns React component instance
 */
function Post() {
  
  //State for request respnse data
  const [data, setData] = useState([]);
  //States for confirmation message
  const [isRequestDone, setIsRequestDone] = useState(false);
  //States for error handling
  const [errorMessage, setErrorMessage] = useState("");
  const [isRequestBad, setIsRequestBad] = useState(false);  
  //Delted item state
  const [removedItems, setRemovedItems] = useState([]);
  /**
   * Requests data to back-end using "makeRequest" function.
   * Updates states to data recieved from the request so they can
   * be displayed on page
   */
  async function displayPost() {
    try {
      //searching current URL for the post's ID
      const URLPathName = window.location.pathname;
      const post_id =  URLPathName.split('/')[2];
      //Making request to the back-end
      const responseData = await makeRequest.posts.displayPost(post_id);
      //handling response
      if (!responseData[0].error) {
        setData(responseData[0]);
        setIsRequestDone(true);
      } else {
        setErrorMessage(responseData[0].error);
        setIsRequestBad(true);
      }
    } catch (error) {
      setIsRequestBad(true);
      return setErrorMessage(error.error)
    }
  }
  /**
   * Asks for and recieves all data needed to display post by making a request
   */
  useEffect(() => {
    displayPost();
    //Cleaning up states
    return () => {
      setData(null);
      setIsRequestDone(false);
      setErrorMessage("");
      setIsRequestBad(false);
      setUpdateNow(false)
    }
  }, []);

  //Activates re-render on action(add comment)
  const [updateNow, setUpdateNow] = useState(false);
  useEffect(() => {
    displayPost()  
    return () => {
      setUpdateNow(false)
    }
  }, [updateNow])
  
  //Main JSX componenent to be rendered after request has been received
  let SectionsContainer = () => <div className='sectionsContainer'>

    {isRequestBad ? <ErrorMessage error={ errorMessage } /> : null }

    <section className='postContent' >

      <UserTag post_id={data.post_id} user_id={data.user_id} userName={data.user.userName} forResource={"post"} setRemovedItems={setRemovedItems} />

      <CreationDate createdAt={ data.createdAt } />

      <PostText bodyText={data.bodyText} />
      <img alt={data.image_altText} src={data.image_url} />

    </section>

    <CommentsSection data={data} setUpdateNow={setUpdateNow} />

  </div> 

  return (<>
    {isRequestDone ? <SectionsContainer /> : null}
    {isRequestBad ? <ErrorMessage error={errorMessage} /> : null}
    {removedItems.length > 0 ? <Redirect path={"/feed"} time={0} /> : null }
  </>)
}

export default Post
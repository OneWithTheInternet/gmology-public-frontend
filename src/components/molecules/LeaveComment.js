import {React, useState} from 'react';
import SubmitButton from '../atoms/SubmitButton';
import TextArea from '../atoms/TextArea';
import UserTag from './UserTag';
import makeRequest from '../../api';
import ErrorMessage from '../atoms/ErrorMessage';
import ConfirmationMessage from '../atoms/ConfirmationMessage';
import Loading from '../atoms/Loading';

function LeaveComment(props) {
  //error state
  const [errorMessage, setErrorMessage] = useState('');
  //request state
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestDone, setIsRequestDone] = useState(false);
  const [isRequestBad, setIsRequestBad] = useState(false);
  //Creating state variables to store response from API request 
  const [data, setData] = useState('');
  //Using useState to store user's input in as variables
  const [bodyText, setBodyText] = useState('');
  const userInput = {
      post: {
        bodyText: bodyText
      }
  }
  /**
   * Adds new comment to database
   */
   async function createComment(event) {
    //Prevent page from reloading when clicking submit
    event.preventDefault()
    setIsLoading(true);
    try {
      //making api request
      const responseData = await makeRequest.comments.createComment(userInput, props.post_id);
      //Handling response
      if ( !responseData[0].error ) {
        setData(responseData[0].message);
        setErrorMessage('');
        setIsRequestDone(true);
        setIsRequestBad(false);
        props.setUpdateNow(true);
        //Handling errors
      } else {
        if(responseData[0].error) {
          setErrorMessage(responseData[0].error);
          setData('');
          setIsRequestDone(false);
          setIsRequestBad(true)
        }
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.error);
      setIsRequestBad(true);
    }
    setIsLoading(false);
  }
  
  return (

    <div className='leaveComment'>
    
      <UserTag userName={ localStorage.getItem('userName') }/>
    
      <form className='leaveComment__form' onSubmit={(event) => {createComment(event)}}>

        <TextArea 
          placeholder={'leave a comment'}
          maxLength={500}
          //Accessing the value after user's input. Setting the value to variable "inputValue""
          onChange={(event) => {setBodyText(event.target.value) }}
        />

        { isRequestBad ? <ErrorMessage error={errorMessage} /> : null }
        { isRequestDone ? <ConfirmationMessage message={data}/> : null }
        { isLoading ? <Loading /> : null }
    
        <SubmitButton />
    
      </form>
    
    </div>
  )

}

export default LeaveComment
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import makeRequest from '../../api'
//Componets
import Loader from '../atoms/Loader'
import ErrorMessage from '../atoms/ErrorMessage';
import FormEditUserProfile from './FormEditUserProfile';
import ButtonEditUserProfile from '../atoms/ButtonEditUserProfile';
import ButtonUserWatch from '../atoms/ButtonUserWatch';
import UserFollowersCounter from '../atoms/UserFollowersCounter';
import UserPlayedGamesCount from '../atoms/UserPlayedGamesCount';

function UserMainInfo (props) {
  //Inbound Data
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  //Outbound data
  const {username} = useParams();
  //Others
  const [enableEdit, setEnableEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * fetches the current users's info and stores it in the "data" variable
   */
  useEffect(() => {
    async function getCurrentUser() {
      setIsLoading(true);
      try {
        //Making request
        const responseData = await makeRequest.users.displayOneUser(username);
        if (!responseData[0].error) {
          setData(responseData);
          props.setUserData(responseData);
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
    getCurrentUser();
  }, []);

  /**
   * Creates component to be rendered
   * @returns JSX component
   */
  const Component = () => {
    
    //Layout if editing is errors
    if (errorMessage) {
      return (<ErrorMessage error={errorMessage}/>)
      
      //Layout if editing is disabled
    } else if (data && !enableEdit) {
      return (
        <div className='mainInfo__user'>
          <div className='mainInfo__user__head'>
            <div className="mainInfo__user__head__avatar">                 
              <img src={data[0].avatarUrl} alt="user avatar"/>
            </div>

            <div className='mainInfo__user__head__overview'>
              <div className='mainInfo__user__head__overview__name'>
                <h1><strong>{data[0].displayName ? data[0].displayName : data[0].userName}</strong></h1>
              </div>
              
              <div className='mainInfo__user__head__overview__stats'>
                <UserPlayedGamesCount data={data}/>
                <UserFollowersCounter data={data}/>
              </div>
            </div>
          </div>

          <ButtonUserWatch data={data}/>

          <div className='mainInfo__user__bio'>
            <p>{data[0].bio}</p>
          </div>
        </div>
      )
      
      //Layout if editing is enabled
    } else if (data && enableEdit) {
      return (
        <FormEditUserProfile 
          data={data} 
          enableEdit={enableEdit} 
          setEnableEdit={setEnableEdit} 
        />
      )

    }else {
      return (<Loader/>)
    }
  };

  return (
    <section className='mainInfo'>
      <div className='mainInfo__options'>
        {/* <BackButton /> */}
        { data ?     
          <ButtonEditUserProfile 
            data={data} 
            enableEdit={enableEdit} 
            setEnableEdit={setEnableEdit}
          />
        : null }
      </div>
      <Component />
    </section>
  )
}

export default UserMainInfo
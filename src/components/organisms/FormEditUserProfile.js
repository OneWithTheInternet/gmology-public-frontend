import React, { useEffect, useState } from 'react'
import makeRequest from '../../api';
//components
import TextArea from '../atoms/TextArea';
import SubmitButton from '../atoms/SubmitButton';
import ButtonEditUserProfile from '../atoms/ButtonEditUserProfile';
import ErrorMessage from '../atoms/ErrorMessage';
import ConfirmationMessage from '../atoms/ConfirmationMessage';
import Loader from '../atoms/Loader'

function FormEditUserProfile(props) {
    //Inbound data
    const [errorMessage, setErrorMessage] = useState(null);
    const [confirmationMessage, setConfirmationMessage] = useState(null);
    //Inbound and Outbound data
    const [bio, setBio] = useState('');
    //outbound data
    const bioObject = {
        user: {
            bio: bio
        }
    }
    const [image, setImage] = useState("");
    const formData = new FormData();
    formData.append("image", image);
    //Others
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      setBio(props.data[0].bio);
    }, [])
    
    /**
     * Request to add a new avatar
     * @param {*} event 
     * @returns Array with object with success or error message
     */
    async function editAvatar(event)    {
        event.preventDefault();
        setIsLoading(true);
        try {
            //Making request
            const responseData = await makeRequest.users.editAvatar(formData);
            if (!responseData[0].error) {
                setConfirmationMessage(responseData[0].message);
                setErrorMessage(null);
                setImage("");
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
     * Requests to remove custom avatar.
     * @param {*} event 
     * @returns Array with object with success or error message
     */
    async function removeAvatar(event) {
        event.preventDefault();
        setIsLoading(true);
        try {
            //Making request
            const responseData = await makeRequest.users.removeAvatar();
            if (!responseData[0].error) {
                setConfirmationMessage(responseData[0].message);
                setErrorMessage(null);
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
     * Changes the user's bio text
     * @param {*} event 
     * @returns array with object with success of error message
     */
    async function editBio(event) {
        event.preventDefault(); 
        setIsLoading(true);
        try {
            //Making request
            const responseData = await makeRequest.users.editBio(bioObject);
            if (!responseData[0].error) {
                setConfirmationMessage(responseData[0].message);
                setErrorMessage(null);
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

  return (
        <section className='userMainInfo'>
            {errorMessage ? <ErrorMessage error={errorMessage}/> : null}

            {isLoading ? <Loader /> : null}
            
            {confirmationMessage ? <ConfirmationMessage message={confirmationMessage}/> : null}
                        
            <form className='userEditAvatar' onSubmit={ (event) => { editAvatar(event) }}>
                <label>
                    New avatar
                    <input 
                    file={image}
                    type="file" 
                    accept=".png, .jpg, .jpeg"
                    onChange={(event) => { setImage(event.target.files[0]) }} 
                    />                   
                </label>
                <SubmitButton/>
            </form>

            <form className='userRemoveAvatar' onSubmit={ (event) => { removeAvatar(event) }}>
                <SubmitButton value={'Remove current avatar'}/>                 
            </form>

            <hr/>

            <form className='userEditBio' onSubmit={ (event) => { editBio(event) }}>
            <label>
                Bio
                <TextArea 
                placeholder={'Say something about yourself'}
                maxLength={'150'} 
                value={bio}
                onChange={(event) => {setBio(event.target.value)}}
                />
            </label>
            <SubmitButton/>
            </form>
        </section>
    )
}

export default FormEditUserProfile
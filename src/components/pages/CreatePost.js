import makeRequest from "../../api";
import TextArea from "../atoms/TextArea";
import {useState} from 'react';
import ErrorMessage from '../atoms/ErrorMessage';
import ConfirmationMessage from "../atoms/ConfirmationMessage";
import Redirect from "../atoms/Redirect";
import SubmitButton from "../atoms/SubmitButton";

function CreatePost() {
    //error state
    const [errorMessage, setErrorMessage] = useState('');
    //request states
    const [isRequestDone, setIsRequestDone] = useState(false);
    const [isRequestBad, setIsRequestBad] = useState(false);
    //State to store response from API request 
    const [data, setData] = useState('');
    //Using useState to store user's input in variables
    const [image, setImage] = useState("");
    const [image_altText, setImage_altText] = useState("");
    const [bodyText, setBodyText] = useState("");
    //Creating data object to be sent with request
    const formData = new FormData();
    formData.append("image", image);
    formData.append("post", JSON.stringify({image_altText: image_altText, bodyText: bodyText}))

    /**
     * creates a post in database by making request to back-end
     */
    async function createPost() {
        try {
            //making request
            const responseData = await makeRequest.posts.createPost(formData);
            //handling response
            if(!responseData[0].error) {
                setData(responseData[0].message);
                setErrorMessage('');
                setIsRequestDone(true);
                setIsRequestBad(false);
             //handling errors
            } else {
                setErrorMessage(responseData[0].error);
                setData('');
                setIsRequestDone(false);
                setIsRequestBad(true)
            }
        } catch (error) {
            setIsRequestBad(true);
            setIsRequestDone(false);
            return setErrorMessage(error.error);
        }
    }
    /**
     * Handles what happens when user clicks on submit button
     */
    function handleSubmit(event) {
        event.preventDefault();  
        createPost()
    }
    return (
    <div className='sectionsContainer'>
        <section className='createPost'>
            <div className='createPost__title'><h1>Create a Post</h1></div>
            <form className='createPost__form' onSubmit={ (event) => { handleSubmit(event) }}>

                <label>
                    Upload an Image
                    <input 
                        fi={image}
                        type="file" 
                        accept="image/*"
                        onChange={(event) => { setImage(event.target.files[0]) }} 
                    />                   
                </label>

                <label>
                    Alt text (describe your image)
                    <input 
                        value={image_altText}
                        type="text" 
                        placeholder='Write here...'
                        onChange={(event) => { setImage_altText(event.target.value) }}
                    />
                </label>

                <label>
                    Share your thoughts
                    <TextArea 
                        value={bodyText}
                        name={bodyText}
                        placeholder='Write here...'
                        onChange={(event) => { setBodyText(event.target.value) }}
                    />
                </label>

                { isRequestBad ? <ErrorMessage error= {errorMessage}/> : null } 

                { isRequestDone ? <ConfirmationMessage message= {data}/> : null }

                { isRequestDone ? <Redirect path={"/feed"} time={1500} /> : null}
                
                <SubmitButton />
            </form>
        </section>
    </div>
  )
}

export default CreatePost
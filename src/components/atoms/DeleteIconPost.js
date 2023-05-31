import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import makeRequest from "../../api";
import ConfirmationMessage from "./ConfirmationMessage";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";

function DeleteIconPost(props) {
    //Error states
    const [isLoading, setIsLoading] = useState(false);
    const [isRequestBad, setIsRequestBad] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    //Request response's data state
    const [data, setData] = useState(null);
    const [isRequestDone, setIsRequestDone] = useState(false);
    //Delete post icon access state
    const [postBelongsToUser, setPostBelongsToUser] = useState(false);
    /**
     * Deletes post from database by calling a request
     */
    async function deletePost() {
        setIsLoading(true);
        try {
            const responseData = await makeRequest.posts.deletePost(props.post_id);
            if (!responseData[0].error) {
                setData(responseData[0].message);
                setErrorMessage("");
                setIsRequestDone(true);
                setIsRequestBad(false);
                //Adding removed post's ID to the parent element state
                props.setRemovedItems(removedItems => [...removedItems, props.post_id])
            } else {
                setData(responseData[0].error);
                setErrorMessage(responseData[0].error);
                setIsRequestDone(false);
                setIsRequestBad(true)
            }
        } catch (error) {
            setErrorMessage(error.error);
            setIsRequestBad(true)
        }
        setIsLoading(false);
    }
    /**
     * Checks if post belongs to the user trying to delete it and updates stetes accordingly
     */
    useEffect(() => {    
        //Cheking if User is the creator of the post
        if (props.user_id && props.user_id === parseInt(localStorage.user_id)) {
            setPostBelongsToUser(true)
        }

        return function clearup() {
            setPostBelongsToUser(false)
        }

    }, [props.user_id])
    
    // Icon component
    const DeletePostIcon = () => <div className="userTag_deleteIconContainer" onClick={ () => { deletePost() } }>
        <FontAwesomeIcon className="icon2" icon={faTrashCan} />
    </div>

    return <> 
        { postBelongsToUser ? <DeletePostIcon /> : null } 
        { isLoading ? <Loading /> : null }
        { isRequestDone ? <ConfirmationMessage message = { data } /> : null }
        { isRequestBad ? <ErrorMessage error = { errorMessage } /> : null}
    </>
}

export default DeleteIconPost
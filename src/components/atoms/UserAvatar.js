import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Redirect from "./Redirect";

function UserAvatar(props) {
    const [redirectNow, setRedirectNow] = useState(false);

    /**
     * Triggers redirection to current user's profile by 
     * triggering rendering of redirect component
     */
    useEffect(() => {    
      return () => {
        setRedirectNow(false)
      }
    }, [redirectNow])
    

    return  <div className="userImageContainer" onClick={() => {setRedirectNow(true)}}>                 
        <img src={props.avatarUrl} alt="user avatar"/>
        {redirectNow? <Redirect path={"/users/" + localStorage.userName} /> : null}
    </div>
}

export default UserAvatar


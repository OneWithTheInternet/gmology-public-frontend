import React from 'react'
import { Link } from 'react-router-dom'
import ImageNotAvailable from '../atoms/ImageNotAvailable'


function UsersList(props) {
    /**
     * Triggers redirection of user to desired page by updating parent states
     * @param {*} redirectPath 
     */
    function handleClick() {
        if (props.setSearchQuery) {
            props.setSearchQuery("");
        }
    }

    let users = props.users

    let userListCards = users.map((user) => {

        if (user.user) {
            user = user.user
        }

        //Defing the path for redirection when user clicks on the game
        let redirectPath = `/users/${user.userName}`;

        return ( 
            <Link to={redirectPath} key={ user.id }>
                <article className="userListCard" onClick={() => {handleClick()}}>
                    <div className='userListCard__imageContainer'>
                        {user.avatarUrl ? <img src={user.avatarUrl} alt="User's Avatar"/>: <ImageNotAvailable /> }
                    </div>
                    <div className='userListCard__titleContainer'>
                        <p><strong>{user.displayName} </strong> / @{user.userName}</p>
                    </div>                
                </article>
            </Link>
        )  
    });

  return (
    <>{userListCards}</>
  )
}

export default UsersList
import UserName from "../atoms/UserName";
import UserImage from '../atoms/UserAvatar';
import DeleteIconPost from "../atoms/DeleteIconPost";
import DeleteIconComment from "../atoms/DeleteIconComment";


function UserTag(props) {
    //Assigning variables to props

    return <div className="userTag">
        <div className="userTag__userContainer">
            <UserImage />
            <UserName userName = { props.userName }/>
        </div>

        {props.forResource === "post" ? 
            <DeleteIconPost user_id = { props.user_id } post_id = { props.post_id } setRemovedItems={props.setRemovedItems}/>
            : null
        }

        {props.forResource === "comment" ? 
            <DeleteIconComment user_id = { props.user_id } comment_id = { props.comment_id } setRemovedItems={props.setRemovedItems} />
            : null
        }
        
    </div>
}

export default UserTag
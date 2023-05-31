import PostImage from "../atoms/PostImage";
import PostText from "../atoms/PostText";
import CommentsCounter from "../molecules/CommentsCounter";
import UserTag from "../molecules/UserTag";
import {Link} from 'react-router-dom';
import CreationDate from "../atoms/CreationDate";
import { useState } from "react";
import { dataWitouthRemovedItems } from "../../functions";
import ConfirmationMessage from "../atoms/ConfirmationMessage";

function PostCard(props) {
    //Items removed from db by deletion
    const [removedItems, setRemovedItems] = useState([]);
    //Data to loop over
    let newData = dataWitouthRemovedItems(props.data, removedItems, "post");
    //Creating each post from data
    let cards = newData.map((post) => {
        //addding an article DOM element with envent handler
        //issue: posts index updates everytime you delete it so it can't find the deleted  post sometimes
        if (post.deleted) {
            return (<ConfirmationMessage key={ post.post_id } message={"Post deleted successfully"} />)
         } else {
            return (
                <article className="postCard" key={ post.post_id }>
    
                    <UserTag userName = { post.user.userName } user_id = {post.user_id} post_id = {post.post_id} setRemovedItems={setRemovedItems} forResource={"post"} />
    
                    <Link to={'/posts/' + post.post_id}>
                        
                        <CreationDate createdAt = { post.createdAt } />
                        
                        {post.bodyText ? <PostText bodyText={ post.bodyText } /> : null}
                        
                        {post.image_url ? <PostImage image_url={ post.image_url } image_altText={ post.image_altText }/> : null}
                        
                        <CommentsCounter comments={post.comments} /> 
                                    
                    </Link>
    
                </article>
            )  
        }    
    });

    return (
        cards
    )
}

export default PostCard
import React, { useState } from 'react';
import CreationDate from '../atoms/CreationDate';
import UserTag from '../molecules/UserTag';
import { dataWitouthRemovedItems } from '../../functions';
import ConfirmationMessage from '../atoms/ConfirmationMessage';


function Comments(props) {
  //Items removed from db by deletion
  const [removedItems, setRemovedItems] = useState([]);
  //Data to loop over
  let newData = dataWitouthRemovedItems(props.comments, removedItems, "comment");
  /**
   * Creates comments JSX components
   */
  let comments = newData.map((comment) =>  {
    if (comment.deleted) {
      return (<ConfirmationMessage  key={comment.comment_id} message={"Comment deleted successfully"} />)
    } else {
      return (<div className='comment' key={comment.comment_id}>
  
        <UserTag 
          comment_id={comment.comment_id} 
          post_id={comment.post_id} 
          user_id={comment.user_id} 
          userName={comment.user.userName} 
          forResource={"comment"} 
          setRemovedItems={setRemovedItems} 
        />
  
        <CreationDate createdAt={ comment.createdAt } />
  
        <div className='comment__text'>
  
          <b>{comment.bodyText}</b>
  
        </div>
  
      </div>)
    }
  });

  return (
    <>
      {comments}
    </>
  )
}

export default Comments
import React from 'react';
import CommentsCounter from '../molecules/CommentsCounter';
import LeaveComment from '../molecules/LeaveComment';
import Comments from './Comments';

function CommentsSection(props) {


  return (
    <section className='comments'>

        <CommentsCounter comments={props.data.comments} />

        <hr></hr>

        <Comments comments={props.data.comments} />

        <hr></hr>

        <LeaveComment post_id={props.data.post_id} setUpdateNow={props.setUpdateNow} />

    </section>
    )
}

export default CommentsSection
import CommentIcon from "../atoms/CommentIcon";

function CommentsCounter(props) {
    //Main JSX componenent to be rendered after request has been received
    let CommentCounterNumber = () => <div className="commentsCounter__number">
        <b> { props.comments.length } comments </b>
    </div>

    return <div className="commentsCounter" >
        <CommentIcon />
        <CommentCounterNumber />
    </div>
    
}

export default CommentsCounter
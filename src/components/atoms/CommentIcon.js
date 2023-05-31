import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComment } from '@fortawesome/free-solid-svg-icons'

function CommentIcon() {
    return <div className="commentIcon" >
        <FontAwesomeIcon  className="icon2" icon={faComment} />
    </div>
}

export default CommentIcon
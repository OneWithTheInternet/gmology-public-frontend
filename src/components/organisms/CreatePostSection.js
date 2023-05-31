import TextInput from "../atoms/TextInput"
import ImageIcon from "../atoms/ImageIcon"
import UserImage from "../atoms/UserAvatar"
import {Link} from 'react-router-dom'


function CreatePostSection() {

    return <section >
        <h1>Create a Post</h1>
        <div className="createPostSection">
            <Link to="/createpost">
                <UserImage />
                <TextInput value="Write your text here..." />
                <ImageIcon />
            </Link>
        </div>
    </section>
}

export default CreatePostSection
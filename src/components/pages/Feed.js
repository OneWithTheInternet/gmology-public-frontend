import CreatePostSection from "../organisms/CreatePostSection.js";
import PostFeed from '../organisms/PostsFeed';

function Home(props) {

  return (
    <div className='sectionsContainer'>
        <CreatePostSection />
        <PostFeed />
    </div>
  )
}

export default Home
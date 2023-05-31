function LoadMoreButton(props) {

  return (
    <div className='loadMoreButton'>

        <input 
          className='loadMoreButton__input' 
          type="button" value={'Load more'} 
          onClick={ () => { props.loadMorePosts() } }
        />
    </div>
  )
}

export default LoadMoreButton  
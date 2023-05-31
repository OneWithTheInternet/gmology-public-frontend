import React from 'react'

function LoadMoreButton(props) {
  return (
    <div>
        <form>
            <input type={"submit"} value={"Load more"} onClick={(event) => {props.handleSubmit(event)}}/>
        </form>
    </div>
  )
}

export default LoadMoreButton
import React from 'react'

function ResultCounter(props) {
  return (
    <div className='resultsCounter'>
        <p>Showing {props.data.length} items</p>
    </div>
  )
}

export default ResultCounter
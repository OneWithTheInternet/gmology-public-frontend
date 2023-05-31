import React from 'react'

function CreationDate(props) {
  return (
    <div className="creationDate">
      <b>
        { props.createdAt.split("T")[0] } 
        {" "}
        at
        {" "}
        { props.createdAt.split("T")[1].split(":")[0] } 
        {":"}
        { props.createdAt.split("T")[1].split(":")[1] } 
      </b>
    </div>
  )
}

export default CreationDate
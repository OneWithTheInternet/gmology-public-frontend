import React from 'react'

function ButtonEditUserProfile(props) {
  const userEditButton = () => {
    if (localStorage.userName == props.data[0].userName) {  
      return (
        <div className='userEditProfileButton'>
          <input 
            type={"button"} 
            value={props.enableEdit ? "Finish editing" : "edit"} 
            onClick={() => {props.setEnableEdit(!props.enableEdit)}}
          />
        </div>
      )
    } else {
      return null
    }
  };
  return (
    <>{userEditButton()}</>
  )
}

export default ButtonEditUserProfile
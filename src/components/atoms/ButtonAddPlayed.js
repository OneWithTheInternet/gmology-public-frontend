import React, { useEffect, useState } from "react";

function ButtonAddPlayed(props) {
  /**
   * Triggers add or remove request and re-render of the parent component
   * @param {object} event click event information such as, input's current value
   */
  async function handleClick(event) {
    if (!localStorage.token) {
      return props.setErrorMessage("Sign up or log in");
    }
    if (event.target.value == "You've played this game!") {
      const remove = await props.removePlayed();
    } else {
      const add = await props.addPlayed();
    }
  }

  //Element to be rendered
  const button = () => {
    //If user has played this games render and "add" button, otherwise a remove button
    if (!props.wasPlayed) {
      return (
        <div className="buttonAddPlayed">
          <form>
            <input
              type={"button"}
              value="Add Played"
              onClick={(event) => {
                handleClick(event);
              }}
            />
          </form>
        </div>
      );
    } else {
      return (
        <div className="buttonRemovePlayed">
          <form>
            <input
              type={"button"}
              value="You've played this game!"
              onClick={(event) => {
                handleClick(event);
              }}
            />
          </form>
        </div>
      );
    }
  };

  return button();
}

export default ButtonAddPlayed;

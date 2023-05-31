import React, { useEffect } from "react";

function ButtonTopSelector(props) {
  /**
   * Finds the current game in the user's top games
   * Sets parent state accordingly
   */
  useEffect(() => {
    if (props.wasPlayed && props.userTopGames) {
      if (props.userTopGames[0].games.top1 == props.id) {
        props.setIsTop("top1");
      } else if (props.userTopGames[0].games.top2 == props.id) {
        props.setIsTop("top2");
      } else if (props.userTopGames[0].games.top3 == props.id) {
        props.setIsTop("top3");
      } else if (props.userTopGames[0].games.top4 == props.id) {
        props.setIsTop("top4");
      } else if (props.userTopGames[0].games.top5 == props.id) {
        props.setIsTop("top5");
      } else if (props.userTopGames[0].games.top6 == props.id) {
        props.setIsTop("top6");
      } else if (props.userTopGames[0].games.top7 == props.id) {
        props.setIsTop("top7");
      } else if (props.userTopGames[0].games.top8 == props.id) {
        props.setIsTop("top8");
      } else if (props.userTopGames[0].games.top9 == props.id) {
        props.setIsTop("top9");
      } else if (props.userTopGames[0].games.top10 == props.id) {
        props.setIsTop("top10");
      }
    }
  }, []);

  /**
   * Triggers removing game as a top game for current user
   * Changes parent's states
   * Triggers parent request that updates database
   */
  async function handleAdd(event) {
    if (!localStorage.token) {
      return props.setErrorMessage("Sign up or log in");
    }
    await props.addTop(event.target.value);
  }

  /**
   * Triggers adding game as a top game for current user
   * Changes parent's states
   * Triggers parent request that updates database
   */
  async function handleRemove() {
    if (!localStorage.token) {
      return props.setErrorMessage("Sign up or log in");
    }
    await props.removeTop(props.isTop);
  }

  /**
   * Component to be rendered. Either a selection input field to add game
   * as a top game or a button to remove game from user's top list
   * depending on if the game is already a top game for this user
   */
  const selector = () => {
    //This will be rendered when the game is not a top game for current user but there is a list of top games available
    if (!props.isTop && props.userTopGames) {
      return (
        <div className="topSelector">
          <select
            name="top games"
            onChange={(event) => {
              handleAdd(event);
            }}
          >
            <option value="placeholder">Add top</option>
            <option value="top1">
              {props.userTopGames[0].games.top1 ? "Top 1" : "Top 1 --empty"}
            </option>
            <option value="top2">
              {props.userTopGames[0].games.top2 ? "Top 2" : "Top 2 --empty"}
            </option>
            <option value="top3">
              {props.userTopGames[0].games.top3 ? "Top 3" : "Top 3 --empty"}
            </option>
            <option value="top4">
              {props.userTopGames[0].games.top4 ? "Top 4" : "Top 4 --empty"}
            </option>
            <option value="top5">
              {props.userTopGames[0].games.top5 ? "Top 5" : "Top 5 --empty"}
            </option>
            <option value="top6">
              {props.userTopGames[0].games.top6 ? "Top 6" : "Top 6 --empty"}
            </option>
            <option value="top7">
              {props.userTopGames[0].games.top7 ? "Top 7" : "Top 7 --empty"}
            </option>
            <option value="top8">
              {props.userTopGames[0].games.top8 ? "Top 8" : "Top 8 --empty"}
            </option>
            <option value="top9">
              {props.userTopGames[0].games.top9 ? "Top 9" : "Top 9 --empty"}
            </option>
            <option value="top10">
              {props.userTopGames[0].games.top10 ? "Top 10" : "Top 10 --empty"}
            </option>
          </select>
        </div>
      );
      //This will be rendered when there IS NOT a list of top games available
    } else if (!props.userTopGames) {
      return (
        <div className="topSelector">
          <select
            name="top games"
            onChange={(event) => {
              handleAdd(event);
            }}
          >
            <option value="placeholder">Add top</option>
            <option value="top1">Top 1</option>
            <option value="top2">Top 2</option>
            <option value="top3">Top 3</option>
            <option value="top4">Top 4</option>
            <option value="top5">Top 5</option>
            <option value="top6">Top 6</option>
            <option value="top7">top 7 </option>
            <option value="top8">Top 8</option>
            <option value="top9">Top 9</option>
            <option value="top10">Top 10</option>
          </select>
        </div>
      );
    } else {
      //This will be rendered when the game is a top game for current user
      return (
        <div
          className="isTopButton"
          onClick={() => {
            handleRemove();
          }}
        >
          <form>
            <input type={"button"} value={`This is your ${props.isTop}!`} />
          </form>
        </div>
      );
    }
  };

  return selector();
}

export default ButtonTopSelector;

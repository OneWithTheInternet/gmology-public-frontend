import React, { useState } from "react";
import ImageNotAvailable from "../atoms/ImageNotAvailable";
import { convertUnixToYear } from "../../functions";
import { Link } from "react-router-dom";
// Components
import UsersList from "./UsersList";

function SearchPreviewCard(props) {
  //Data to loop over
  let games = props.data.games;
  let users = props.data.users;
  //Determining which of the two data sets to pick
  let showUsersResults = props.showUsersResults;

  /**
   * Triggers redirection of user to desired page by updating parent states
   * @param {*} redirectPath
   */
  function handleClick() {
    props.setSearchQuery("");
  }

  //Creating each element from games data
  let gameListCards = games.slice(0, 5).map((game) => {
    //Defing the path for redirection when user clicks on the game
    let redirectPath = `/games/${game.id}`;

    //Getting the year
    const year = convertUnixToYear(game);

    return (
      <Link to={redirectPath} key={game.id}>
        <article
          className="gameListCard"
          onClick={() => {
            handleClick();
          }}
        >
          <div className="gameListCard__imageContainer">
            {game.cover ? (
              <img src={game.cover.url} alt="Game cover art" />
            ) : (
              <ImageNotAvailable />
            )}
          </div>
          <div className="gameListCard__text">
            <div className="gameListCard__text__titleContainer">
              <p>{game.name}</p>
            </div>
            <div className="gameListCard__text__year">
              <p>{year ? year : null}</p>
            </div>
          </div>
        </article>
      </Link>
    );
  });

  return (
    <>
      {showUsersResults ? (
        <UsersList users={users} setSearchQuery={props.setSearchQuery} />
      ) : (
        gameListCards
      )}
    </>
  );
}

export default SearchPreviewCard;

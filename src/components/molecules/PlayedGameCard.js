import React from "react";
import { Link } from "react-router-dom";
import ImageNotAvailable from "../atoms/ImageNotAvailable";
import { convertUnixToYear } from "../../functions";

function PlayedGameCard(props) {
  const cover = props.game.cover ? props.game.cover : null;
  //converting unix date timestamp to a year number
  const year = convertUnixToYear(props.game);
  //Creating a redirection path for when user clicks on game
  const redirectPath = `/games/${props.game.id}`;
  let url;
  if (cover) {
    url = props.game.cover.url.split("t_thumb").join("t_cover_big");
  }

  return (
    <Link to={redirectPath}>
      <article className="playedGameCard">
        <div className="playedGameCard__imageContainer">
          {cover ? (
            <img src={url} alt="Game cover art" />
          ) : (
            <ImageNotAvailable />
          )}
        </div>

        <div className="playedGameCard__infoContainer">
          <div className="playedGameCard__yearContainer">
            <p>{year}</p>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default PlayedGameCard;

import React from "react";
import ImageNotAvailable from "../atoms/ImageNotAvailable";
import TopOneIcon from "../atoms/TopOneIcon";
import PlayedCountIcon from "../atoms/PlayedCountIcon";
import Loader from "../atoms/Loader";
import ErrorMessage from "../atoms/ErrorMessage";
import ConfirmationMessage from "../atoms/ConfirmationMessage";
import ButtonAddPlayed from "../atoms/ButtonAddPlayed";
import ButtonTopSelector from "../atoms/ButtonTopSelector";

function GameData(props) {
  const gameid = props.id;
  const playCount = props.data[0].playCount[gameid];
  const top1Count = props.data[0].top1Count[gameid];
  //gettring release date form IGDB privided UNIX time stap
  const releaseDate = props.data[0].games[0].first_release_date;
  const date = new Date(releaseDate * 1000);
  const year = date.toLocaleDateString("en-US").toString().split("/")[2];
  //modifiying cover image url to match the desired size (as per IGDB guidance)
  let url;
  let newUrl;
  if (props.data[0].games[0].cover) {
    url = props.data[0].games[0].cover.url;
    newUrl = url.split("t_thumb").join("t_cover_big_2x");
  }
  //Getting summary
  const summary = props.data[0].games[0].summary
    ? props.data[0].games[0].summary
    : "No summary available.";
  //Getting platforms
  const platforms = [];
  if (props.data[0].games[0].platforms) {
    if (props.data[0].games[0].platforms.length > 0) {
      const getPlatforms = props.data[0].games[0].platforms.map((platform) => {
        platforms.push(platform.name + " . ");
      });
    }
  } else {
    platforms.push("Not available.");
  }
  //Getting Companies
  const companies = [];
  if (props.data[0].games[0].involved_companies) {
    if (props.data[0].games[0].involved_companies.length > 0) {
      const getCompanies = props.data[0].games[0].involved_companies.map(
        (company) => {
          companies.push(company.company.name + " . ");
        }
      );
    }
  } else {
    companies.push("Not available.");
  }
  //Getting genres
  const genres = [];
  if (props.data[0].games[0].genres) {
    if (props.data[0].games[0].genres.length > 0) {
      const getGenres = props.data[0].games[0].genres.map((genre) => {
        genres.push(genre.name + " . ");
      });
    }
  } else {
    genres.push("Not available.");
  }

  return (
    <>
      <div className="mainInfo">
        <div className="mainInfo__imageContainer">
          {url ? <img src={newUrl} alt="Cover Art" /> : <ImageNotAvailable />}
        </div>

        <div className="mainInfo__summary">
          <div className="mainInfo__summary__releaseDate">
            <p>{year}</p>
          </div>

          <div className="mainInfo__summary__title">
            <h2>{props.data[0].games[0].name}</h2>
          </div>

          <div className="mainInfo__summary__stats">
            <div className="mainInfo__summary__stats_top1Count">
              <TopOneIcon />
              <div>{top1Count},</div>
            </div>

            <div className="mainInfo__summary__stats_playCount">
              <PlayedCountIcon />
              <div>{playCount}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="game_buttons">
        <ButtonAddPlayed
          addPlayed={props.addPlayed}
          removePlayed={props.removePlayed}
          id={props.id}
          setErrorMessage={props.setErrorMessage}
          wasPlayed={props.wasPlayed}
          setWasPlayed={props.setWasPlayed}
        />

        <ButtonTopSelector
          addTop={props.addTop}
          removeTop={props.removeTop}
          isTop={props.isTop}
          setIsTop={props.setIsTop}
          setErrorMessage={props.setErrorMessage}
          userTopGames={props.userTopGames}
          id={props.id}
          wasPlayed={props.wasPlayed}
          setWasPlayed={props.setWasPlayed}
        />
      </div>

      {props.isLoading ? <Loader /> : null}

      {props.errorMessage ? <ErrorMessage error={props.errorMessage} /> : null}

      {props.confirmationMessage ? (
        <ConfirmationMessage message={props.confirmationMessage} />
      ) : null}

      <div className="game_otherInfo">
        <div className="game_otherInfo__summary">
          <p>
            <strong>Summary: </strong>
            {summary}
          </p>
        </div>

        <div className="game_otherInfo__companies">
          <p>
            <strong>Platforms: </strong> {platforms}{" "}
          </p>
        </div>

        <div className="game_otherInfo__companies">
          <p>
            <strong>Companies: </strong>
            {companies}{" "}
          </p>
        </div>

        <div className="game_otherInfo__genres">
          <p>
            <strong>Genres: </strong>
            {genres}
          </p>
        </div>
      </div>
    </>
  );
}

export default GameData;

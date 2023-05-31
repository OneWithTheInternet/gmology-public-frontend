import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorMessage from "../atoms/ErrorMessage";
import makeRequest from "../../api";
import Loader from "../atoms/Loader";
import BackButton from "../atoms/BackButton";
import GameData from "../organisms/GameData";

function Game() {
  //Inbound Data
  const [data, setData] = useState(null);
  const [userTopGames, setUserTopGames] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  //Outbound data
  const [id, setId] = useState(useParams().id);
  const SearchParameter = {
    games: [id],
  };
  const currentGame = {
    user: {
      gameid: id,
    },
  };
  const user = {
    user: {
      userid: localStorage.userid,
    },
  };
  //Others
  const [isLoading, setIsLoading] = useState(false);
  const [isTop, setIsTop] = useState(null);
  const [wasPlayed, setWasPlayed] = useState(false);

  /**
   * Triggers functions to get data when page loads
   */
  useEffect(() => {
    getGame();
    wasItPlayed();
    getUserTopGames();
  }, []);

  /**
   * Searches for the requested resources in database
   * @returns Array of objects (1 game, played count, top count)
   */
  async function getGame() {
    setIsLoading(true);
    try {
      const responseData = await makeRequest.games.displayGames(
        SearchParameter
      );
      if (!responseData[0].error) {
        setData(responseData);
        setErrorMessage(null);
        setConfirmationMessage(null);
        setIsLoading(false);
      } else {
        setData(null);
        setErrorMessage(responseData[0].error);
        setConfirmationMessage(null);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.message);
    }
  }

  /**
   * Determines if user has played game currently displayed
   * @returns Array of objects (games, played count, top count)
   */
  async function wasItPlayed() {
    setIsLoading(true);
    setErrorMessage(null);
    setConfirmationMessage(null);
    try {
      const responseData = await makeRequest.playedGames.wasPlayed(currentGame);
      if (!responseData[0].error) {
        setWasPlayed(responseData[0].wasPlayed);
        setErrorMessage(null);
        setConfirmationMessage(null);
        setIsLoading(false);
      } else {
        setErrorMessage(responseData[0].error);
        setConfirmationMessage(null);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.message);
    }
  }

  /**
   * Gets all of current user's top games
   * @returns Array with object
   */
  async function getUserTopGames() {
    setIsLoading(true);
    setErrorMessage(null);
    setConfirmationMessage(null);
    try {
      const responseData = await makeRequest.games.getUserTopGames(user);
      if (!responseData[0].error) {
        setUserTopGames(responseData);
        setErrorMessage(null);
        setConfirmationMessage(null);
        setIsLoading(false);
      } else {
        setUserTopGames(null);
        setErrorMessage(responseData[0].error);
        setConfirmationMessage(null);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.message);
    }
  }

  /**
   * Adds the resource to users's list
   * @returns Array with object with message or error
   */
  async function addPlayed() {
    setIsLoading(true);
    setErrorMessage(null);
    setConfirmationMessage(null);
    try {
      const responseData = await makeRequest.playedGames.addPlayed(currentGame);
      if (!responseData[0].error) {
        setConfirmationMessage(responseData[0].message);
        setErrorMessage(null);
        setWasPlayed(true);
        setIsLoading(false);
      } else {
        setConfirmationMessage(null);
        setErrorMessage(responseData[0].error);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.message);
    }
  }

  /**
   * Removes the resource from users's list
   * @returns Array with object with message or error
   */
  async function removePlayed() {
    setIsLoading(true);
    setErrorMessage(null);
    setConfirmationMessage(null);
    try {
      const responseData = await makeRequest.playedGames.removePlayed(
        currentGame
      );
      if (!responseData[0].error) {
        setConfirmationMessage(responseData[0].message);
        setErrorMessage(null);
        setWasPlayed(false);
        setIsTop(null);
        setIsLoading(false);
      } else {
        setConfirmationMessage(null);
        setErrorMessage(responseData[0].error);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.message);
    }
  }

  /**
   * Adds the resource to users's list
   * @returns Array of objects
   */
  async function addTop(endPointName) {
    setIsLoading(true);
    setErrorMessage(null);
    setConfirmationMessage(null);
    try {
      const responseData = await makeRequest.topGames.addTop(
        currentGame,
        endPointName
      );
      if (!responseData[0].error) {
        setConfirmationMessage(responseData[0].message);
        setErrorMessage(null);
        setIsTop(endPointName);
        setWasPlayed(true);
        setIsLoading(false);
      } else {
        setConfirmationMessage(null);
        setErrorMessage(responseData[0].error);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.message);
    }
  }

  /**
   * Remove the resource from users's list
   * @returns Array of objects
   */
  async function removeTop(endPointName) {
    setIsLoading(true);
    setErrorMessage(null);
    setConfirmationMessage(null);
    try {
      const responseData = await makeRequest.topGames.removeTop(
        currentGame,
        endPointName
      );
      if (!responseData[0].error) {
        setConfirmationMessage(responseData[0].message);
        setErrorMessage(null);
        setIsTop(null);
        setIsLoading(false);
      } else {
        setConfirmationMessage(null);
        setErrorMessage(responseData[0].error);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.message);
    }
  }

  return (
    <section className="game">
      <BackButton />

      {isLoading ? <Loader /> : null}

      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}

      {data ? (
        <GameData
          addPlayed={addPlayed}
          removePlayed={removePlayed}
          addTop={addTop}
          removeTop={removeTop}
          data={data}
          userTopGames={userTopGames}
          id={id}
          isTop={isTop}
          setIsTop={setIsTop}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          confirmationMessage={confirmationMessage}
          wasPlayed={wasPlayed}
          setWasPlayed={setWasPlayed}
        />
      ) : null}
    </section>
  );
}

export default Game;

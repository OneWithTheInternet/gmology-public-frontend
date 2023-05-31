import React, { useEffect, useState } from "react";
import makeRequest from "../../api";
import { createChronology } from "../../functions";
//components
import Loader from "../atoms/Loader";
import ErrorMessage from "../atoms/ErrorMessage";
import Decade from "./Decade";

function UserPlayedGames(props) {
  //Inbound Data
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  //Outbound data
  const [page, setPage] = useState(1);
  const userInput = {
    user: {
      userid: props.userData[0].id,
    },
  };
  //Others
  const [isLoading, setIsLoading] = useState(false);
  const [newData, setNewData] = useState(null);

  /**
   * fetches the current users's Top games
   */
  useEffect(() => {
    async function getUserGames() {
      setIsLoading(true);
      try {
        //Making request
        const responseData = await makeRequest.games.get_user_games(
          userInput,
          page
        );
        if (!responseData[0].error) {
          setData(responseData);
          props.setPlayedGamesData(responseData);
          props.setEmptyLayout(false);
          setErrorMessage(null);
          setIsLoading(false);
          setNewData(createChronology(responseData));
        } else if (
          responseData[0].error &&
          responseData[0].error == "Resource not found"
        ) {
          setData(null);
          setErrorMessage(null);
          setIsLoading(false);
        } else {
          setData(null);
          setErrorMessage(responseData[0].error);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        return setErrorMessage(error.message);
      }
    }
    getUserGames();
  }, []);

  /**
   * fetches the current users's played games
   */
  useEffect(() => {
    async function getUserGames() {
      setIsLoading(true);
      try {
        //Making request
        const responseData = await makeRequest.games.get_user_games(
          userInput,
          page
        );
        if (!responseData[0].error) {
          setData(responseData);
          props.setPlayedGamesData(responseData);
          setErrorMessage(null);
          setIsLoading(false);
        } else if (
          responseData[0].error &&
          responseData[0].error == "Resource not found"
        ) {
          setData(null);
          setErrorMessage(null);
          setIsLoading(false);
        } else {
          // setData(null);
          setErrorMessage(responseData[0].error);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        return setErrorMessage(error.message);
      }
    }
    getUserGames();
  }, [page]);

  /**
   * Creates component to be rendered
   * @returns JSX component
   */
  const Chronology = () => {
    //Creating each element from games data
    let decades = newData.map((decade) => {
      try {
        if (decade.games.length !== 0) {
          return <Decade key={decade.decadeName} decade={decade} />;
        }
      } catch (error) {
        return <ErrorMessage key={decade.decadeName} error={error.message} />;
      }
    });

    return decades;
  };

  return (
    <section className="playedGames">
      {isLoading ? <Loader /> : null}

      {data ? (
        <div className="playedGames__title">
          <p>
            {props.userData[0].displayName
              ? props.userData[0].displayName
              : props.userData[0].userName}
            's gmology
          </p>
        </div>
      ) : null}

      {data && newData ? <Chronology /> : null}

      {errorMessage ? <ErrorMessage error={errorMessage} /> : null}

      {data ? (
        <form>
          <input
            className="LoadMoreButton"
            type={"button"}
            value="Load more"
            onClick={() => {
              setPage(page + 1);
            }}
          />
        </form>
      ) : null}
    </section>
  );
}

export default UserPlayedGames;

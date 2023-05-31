import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import makeRequest from "../../api";
//Components
import ErrorMessage from "../atoms/ErrorMessage";
import Loader from "../atoms/Loader";
import SmallRoundAvatar from "../molecules/SmallRoundAvatar";

function ReferenceCollections() {
  //inbound data
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  //Outbound data
  const users = {
    users: [
      "a76a9e44-a525-4b6c-9fa5-a6fa62dff31f",
      "0d1e1181-3cb1-4522-be20-03cc05e3ca4c",
      "9fc1ae48-c24d-42f7-a554-c7d01c299546",
      "879d13ff-6fac-4eae-b887-7dd29cdeb936",
      "cf1f5e2b-dba3-4989-bb11-03f6664bfde3",
      "813af332-b80c-4c9c-b2c7-e74fd9d7c19b",
    ],
  };
  //Others
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Triggers data fetching when page has loaded
   */
  useEffect(() => {
    getReferenceUsers();
  }, []);

  /**
   * fetches the desired user's info
   */
  async function getReferenceUsers() {
    setIsLoading(true);
    try {
      const responseData = await makeRequest.users.displayManyUser(users);
      if (!responseData[0].error) {
        setData(responseData);
        setErrorMessage(null);
      } else {
        setErrorMessage(responseData[0].error);
      }
    } catch (error) {
      return setErrorMessage(error);
    }
    setIsLoading(false);
  }

  /**
   * Dinamically maps all fectched users as JSX blocks ready to be rendered.
   * If there is no data to render, returns placeholder JSX block.
   */
  const Component = () => {
    if (data) {
      let referenceUsers = data.map((user) => {
        try {
          //Returning default reference users
          return (
            <div key={user.id} className="refUser">
              <Link to={`/users/${user.userName}`}>
                <SmallRoundAvatar avatarUrl={user.avatarUrl} />

                <div className="refUser__text">
                  <div className="refUser__text__main">
                    <h4>
                      {user.displayName ? user.displayName : user.userName}
                    </h4>
                  </div>

                  <div className="refUser__text__sub">
                    <p>{user.bio}</p>
                  </div>
                </div>
              </Link>
            </div>
          );
        } catch (error) {
          return <ErrorMessage key={user.id} error={error.message} />;
        }
      });

      return referenceUsers;
    } else {
      return (
        <div className="referenceUser">
          <div className="referenceUser__text">
            <p>No reference users available</p>
          </div>
        </div>
      );
    }
  };

  return (
    <section className="referenceUsers">
      <div className="referenceUsers__title">
        <div className="referenceUsers__title__main">
          <h2>Collections to get you started</h2>
        </div>
        <div className="referenceUsers__title__sub">
          <p>Find some of your favorite games in these profiles</p>
        </div>
      </div>

      <div className="referenceUsers__list">
        {errorMessage ? <ErrorMessage error={errorMessage} /> : null}
        {isLoading ? <Loader /> : Component()}
      </div>
    </section>
  );
}

export default ReferenceCollections;

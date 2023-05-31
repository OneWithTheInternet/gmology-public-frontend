import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import makeRequest from "../../api";
//Components
import ErrorMessage from "../atoms/ErrorMessage";
import Loader from "../atoms/Loader";
import SmallRoundAvatar from "../molecules/SmallRoundAvatar";

function ReferenceCollectionsMore() {
  //inbound data
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  //Outbound data
  const users = {
    users: [
      "6b7cc637-ce67-40be-b0a2-56ddc1839a8e",
      "989d77d1-e7c2-4497-8938-18b346b03bf7",
      "fe1cd989-ec11-4870-9802-c778e9e51b8f",
      "0f5eb970-426f-4372-b8ac-8e044ed61c7e",
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
          <h2>More Reference</h2>
        </div>
        <div className="referenceUsers__title__sub">
          <p>Check out these users</p>
        </div>
      </div>

      <div className="referenceUsers__list">
        {errorMessage ? <ErrorMessage error={errorMessage} /> : null}
        {isLoading ? <Loader /> : Component()}
      </div>
    </section>
  );
}

export default ReferenceCollectionsMore;

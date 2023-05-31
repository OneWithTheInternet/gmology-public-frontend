import React from "react";
import imagetopGames from "../../assets/gmology_benefits_top10_2.png";
import ReferenceCollections from "./ReferenceCollections";
import ReferenceCollectionsMore from "./ReferenceCollectionsMore";

function UserNoGamesLayout(props) {
  return (
    <>
      {props.userData[0].id == localStorage.userid ? (
        <>
          <ReferenceCollections />
          <ReferenceCollectionsMore />
        </>
      ) : null}

      <section className="noGamesLayout">
        <div>
          <h2>Nothing here yet</h2>
        </div>
        <div>
          {props.userData[0].id == localStorage.userid ? (
            <p>
              Use the search bar at the top of the page to search for and add
              games.
            </p>
          ) : null}
        </div>
        <div>
          <img src={imagetopGames} />
        </div>
      </section>
    </>
  );
}

export default UserNoGamesLayout;

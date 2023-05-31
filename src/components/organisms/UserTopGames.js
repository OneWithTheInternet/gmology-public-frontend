import React, { useEffect, useState } from "react";
import makeRequest from "../../api";
//components
import Loader from "../atoms/Loader";
import ErrorMessage from "../atoms/ErrorMessage";
import topOneIcon from "../../assets/custom_icons/1top.png";
import topTwoIcon from "../../assets/custom_icons/2top_48x48.png";
import topThreeIcon from "../../assets/custom_icons/3top_48x48.png";
import TopGamesHighlights from "../molecules/TopGamesHighlights";
import UserTopGamesClaps from "./UserTopGamesClaps";
import PlayedGameCard from "../molecules/PlayedGameCard";

function UserTopGames(props) {
  //Inbound Data
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  //Outbound data
  const userInput = {
    user: {
      userid: props.userData[0].id,
    },
  };

  /**
   * fetches the current users's Top games
   */
  useEffect(() => {
    async function getTopGames() {
      try {
        //Making request
        const responseData = await makeRequest.games.getUserTopGames(userInput);
        if (!responseData[0].error) {
          setData(responseData);
          setErrorMessage(null);
        } else {
          setData(null);
          setErrorMessage(responseData[0].error);
        }
      } catch (error) {
        return setErrorMessage(error.message);
      }
    }
    getTopGames();
  }, []);

  /**
   * Creates component to be rendered
   * @returns JSX component
   */
  const Component = () => {
    if (errorMessage) {
      return <ErrorMessage error={errorMessage} />;
    } else if (data) {
      //Getting top games data
      let topGamesInfo = {
        top1: null,
        top2: null,
        top3: null,
        top4: null,
        top5: null,
        top6: null,
        top7: null,
        top8: null,
        top9: null,
        top10: null,
      };
      for (let index = 0; index < props.playedGamesData.length; index++) {
        const game = props.playedGamesData[index];
        if (game.id == data[0].games.top1) {
          //Defining images URLs as per IGDB directives
          if (game.cover) {
            let newUrl = game.cover.url.split("t_thumb").join("t_cover_big");
            game.newUrl = newUrl;
          }
          topGamesInfo.top1 = game;
        }
        if (game.id == data[0].games.top2) {
          //Defining images URLs as per IGDB directives
          if (game.cover) {
            let newUrl = game.cover.url.split("t_thumb").join("t_cover_big");
            game.newUrl = newUrl;
          }
          game.topNumber = "top2";
          topGamesInfo.top2 = game;
        }
        if (game.id == data[0].games.top3) {
          //Defining images URLs as per IGDB directives
          if (game.cover) {
            let newUrl = game.cover.url.split("t_thumb").join("t_cover_big");
            game.newUrl = newUrl;
          }
          game.topNumber = "top3";
          topGamesInfo.top3 = game;
        }
        if (game.id == data[0].games.top4) {
          //Defining images URLs as per IGDB directives
          if (game.cover) {
            let newUrl = game.cover.url.split("t_thumb").join("t_cover_big");
            game.newUrl = newUrl;
          }
          game.topNumber = "top4";
          topGamesInfo.top4 = game;
        }
        if (game.id == data[0].games.top5) {
          //Defining images URLs as per IGDB directives
          if (game.cover) {
            let newUrl = game.cover.url.split("t_thumb").join("t_cover_big");
            game.newUrl = newUrl;
          }
          game.topNumber = "top5";
          topGamesInfo.top5 = game;
        }
        if (game.id == data[0].games.top6) {
          //Defining images URLs as per IGDB directives
          if (game.cover) {
            let newUrl = game.cover.url.split("t_thumb").join("t_cover_big");
            game.newUrl = newUrl;
          }
          game.topNumber = "top6";
          topGamesInfo.top6 = game;
        }
        if (game.id == data[0].games.top7) {
          //Defining images URLs as per IGDB directives
          if (game.cover) {
            let newUrl = game.cover.url.split("t_thumb").join("t_cover_big");
            game.newUrl = newUrl;
          }
          game.topNumber = "top7";
          topGamesInfo.top7 = game;
        }
        if (game.id == data[0].games.top8) {
          //Defining images URLs as per IGDB directives
          if (game.cover) {
            let newUrl = game.cover.url.split("t_thumb").join("t_cover_big");
            game.newUrl = newUrl;
          }
          game.topNumber = "top8";
          topGamesInfo.top8 = game;
        }
        if (game.id == data[0].games.top9) {
          //Defining images URLs as per IGDB directives
          if (game.cover) {
            let newUrl = game.cover.url.split("t_thumb").join("t_cover_big");
            game.newUrl = newUrl;
          }
          game.topNumber = "top9";
          topGamesInfo.top9 = game;
        }
        if (game.id == data[0].games.top10) {
          //Defining images URLs as per IGDB directives
          if (game.cover) {
            let newUrl = game.cover.url.split("t_thumb").join("t_cover_big");
            game.newUrl = newUrl;
          }
          game.topNumber = "top10";
          topGamesInfo.top10 = game;
        }
      }

      return (
        <>
          <div className="topGames">
            <div className="topGames__title">
              <p>
                {props.userData[0].displayName
                  ? props.userData[0].displayName
                  : props.userData[0].userName}
                's <strong>Top 10</strong> Games of All-time
              </p>
            </div>

            <div className="topGames__top1-3">
              <div className="topGames__top1-3__2">
                <TopGamesHighlights top2Data={topGamesInfo.top2} />

                <div className="topGames__top1-3__2__icon">
                  <img src={topTwoIcon} alt={"top 2 ico"} />
                </div>
              </div>

              <div className="topGames__top1-3__1">
                <TopGamesHighlights top1Data={topGamesInfo.top1} />

                <div className="topGames__top1-3__1__icon">
                  <img src={topOneIcon} alt={"top 1 ico"} />
                </div>
              </div>

              <div className="topGames__top1-3__3">
                <TopGamesHighlights top3Data={topGamesInfo.top3} />

                <div className="topGames__top1-3__3__icon">
                  <img src={topThreeIcon} alt={"top 3 ico"} />
                </div>
              </div>
            </div>

            <div className="topGames__top4-10">
              <div className="topGames__top4-10__4">
                <TopGamesHighlights top4Data={topGamesInfo.top4} />

                <div className="topGames__top4-10__4__rank">4</div>
              </div>

              <div className="topGames__top4-10__5">
                <TopGamesHighlights top5Data={topGamesInfo.top5} />

                <div className="topGames__top4-10__5__rank">5</div>
              </div>

              <div className="topGames__top4-10__6">
                <TopGamesHighlights top6Data={topGamesInfo.top6} />

                <div className="topGames__top4-10__6__rank">6</div>
              </div>

              <div className="topGames__top4-10__7">
                <TopGamesHighlights top7Data={topGamesInfo.top7} />

                <div className="topGames__top4-10__7__rank">7</div>
              </div>

              <div className="topGames__top4-10__8">
                <TopGamesHighlights top8Data={topGamesInfo.top8} />

                <div className="topGames__top4-10__8__rank">8</div>
              </div>

              <div className="topGames__top4-10__9">
                <TopGamesHighlights top9Data={topGamesInfo.top9} />

                <div className="topGames__top4-10__9__rank">9</div>
              </div>

              <div className="topGames__top4-10__10">
                <TopGamesHighlights top10Data={topGamesInfo.top10} />

                <div className="topGames__top4-10__10__rank">10</div>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return <Loader />;
    }
  };

  return (
    <section className="topGames">
      <Component />

      <div className="topGames__separator">
        <hr />
      </div>

      <UserTopGamesClaps userData={props.userData} />
    </section>
  );
}

export default UserTopGames;

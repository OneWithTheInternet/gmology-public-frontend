import React, { useState } from "react";
import Redirect from "../atoms/Redirect";
import imageEamptyTop from "../../assets/eamptyTop.png";
import ImageNotAvailable from "../atoms/ImageNotAvailable";
import { Link } from "react-router-dom";

function TopGamesHighlights(props) {
  //Component to render
  const Component = () => {
    if (props.top1Data) {
      return (
        <Link to={`/games/${props.top1Data.id}`}>
          <div className="highlights__top1Game">
            {props.top1Data.newUrl ? (
              <img src={props.top1Data.newUrl} alt={"Game cover art"} />
            ) : (
              <ImageNotAvailable />
            )}
          </div>
        </Link>
      );
    } else if (props.top2Data) {
      return (
        <Link to={`/games/${props.top2Data.id}`}>
          <div className="highlights__top2Game">
            {props.top2Data.newUrl ? (
              <img src={props.top2Data.newUrl} alt={"Game cover art"} />
            ) : (
              <ImageNotAvailable />
            )}
          </div>
        </Link>
      );
    } else if (props.top3Data) {
      return (
        <Link to={`/games/${props.top3Data.id}`}>
          <div className="highlights__top3Game">
            {props.top3Data.newUrl ? (
              <img src={props.top3Data.newUrl} alt={"Game cover art"} />
            ) : (
              <ImageNotAvailable />
            )}
          </div>
        </Link>
      );
    } else if (props.top4Data) {
      return (
        <Link to={`/games/${props.top4Data.id}`}>
          <div className="highlights__top4Game">
            {props.top4Data.newUrl ? (
              <img src={props.top4Data.newUrl} alt={"Game cover art"} />
            ) : (
              <ImageNotAvailable />
            )}
          </div>
        </Link>
      );
    } else if (props.top5Data) {
      return (
        <Link to={`/games/${props.top5Data.id}`}>
          <div className="highlights__top5Game">
            {props.top5Data.newUrl ? (
              <img src={props.top5Data.newUrl} alt={"Game cover art"} />
            ) : (
              <ImageNotAvailable />
            )}
          </div>
        </Link>
      );
    } else if (props.top6Data) {
      return (
        <Link to={`/games/${props.top6Data.id}`}>
          <div className="highlights__top6Game">
            {props.top6Data.newUrl ? (
              <img src={props.top6Data.newUrl} alt={"Game cover art"} />
            ) : (
              <ImageNotAvailable />
            )}
          </div>
        </Link>
      );
    } else if (props.top7Data) {
      return (
        <Link to={`/games/${props.top7Data.id}`}>
          <div className="highlights__top7Game">
            {props.top7Data.newUrl ? (
              <img src={props.top7Data.newUrl} alt={"Game cover art"} />
            ) : (
              <ImageNotAvailable />
            )}
          </div>
        </Link>
      );
    } else if (props.top8Data) {
      return (
        <Link to={`/games/${props.top8Data.id}`}>
          <div className="highlights__top8Game">
            {props.top8Data.newUrl ? (
              <img src={props.top8Data.newUrl} alt={"Game cover art"} />
            ) : (
              <ImageNotAvailable />
            )}
          </div>
        </Link>
      );
    } else if (props.top9Data) {
      return (
        <Link to={`/games/${props.top9Data.id}`}>
          <div className="highlights__top9Game">
            {props.top9Data.newUrl ? (
              <img src={props.top9Data.newUrl} alt={"Game cover art"} />
            ) : (
              <ImageNotAvailable />
            )}
          </div>
        </Link>
      );
    } else if (props.top10Data) {
      return (
        <Link to={`/games/${props.top10Data.id}`}>
          <div className="highlights__top10Game">
            {props.top10Data.newUrl ? (
              <img src={props.top10Data.newUrl} alt={"Game cover art"} />
            ) : (
              <ImageNotAvailable />
            )}
          </div>
        </Link>
      );
    } else {
      return (
        <div className="highlights__eampty">
          <img src={imageEamptyTop} alt={"No cover art Availeble"} />
        </div>
      );
    }
  };

  return <Component />;
}

export default TopGamesHighlights;

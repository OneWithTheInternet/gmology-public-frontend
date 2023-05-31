import React from "react";
import { Link } from "react-router-dom";

function Giveaway() {
  return (
    <section className="giveaway">
      <h1>Current Giveaway</h1>
      <h4>04/26/23 - Resident Evil 2 Remake on Steam</h4>
      <p>
        Done playing RE4? Now play the other best game in the franchise on us.
        To participate in this giveaway do the following:
      </p>

      <ul>
        <li>
          If you haven't yet, visit
          <a
            href="https://twitter.com/gmologyofficial"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gmology's twitter
          </a>
          and give the giveaway tweet a like. You need a twitter account in
          order to do this.
        </li>

        <li>1 winner will be chosen randomly on (04/26/23).</li>

        <li>
          The winner will receive a steam code/key to add the digital version of
          RE2 to their Steam account.
        </li>

        <li>
          This is a Steam game. The code can only be redeemed on the Steam
          platform.
        </li>

        <li>This is a worldwide key.</li>

        <li>
          Your tweet “like” must stay in place until the date of the giveaway.
        </li>
      </ul>

      <p>
        Recall Your Greatest Adventures!{" "}
        <Link to={"/"}>
          Start documenting and sharing your experience as a gamer
        </Link>{" "}
        on Gmology today.
      </p>
    </section>
  );
}

export default Giveaway;

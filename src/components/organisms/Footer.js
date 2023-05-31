import React from "react";
import footerLogoColor from "../../assets/logo_color_bg.webp";
import IconTwitter from "../atoms/IconTwitter";
import IconPaypal from "../atoms/IconPaypal";
import IconPatreon from "../atoms/IconPatreon";
import IconEnvelope from "../atoms/IconEnvelope";
import IGDBLogo from "../../assets/IGDB_logo.png";
import IconTwitch from "../atoms/IconTwitch";
import IconGithub from "../atoms/IconGithub";
import IconWordpress from "../atoms/IconWordpress";

function Footer() {
  return (
    <div className="footerContainer">
      <footer className="footer">
        <div className="footer__imageContainer">
          <img src={footerLogoColor} alt="gmology logo" />
        </div>

        <div className="footer__support">
          <div className="footer__support__title">
            <h4>Support me!</h4>
          </div>
          <div className="footer__support__text">
            <p>
              Gmology is a one person effort. I work a day job in an Amazon
              warehouse. If you would like to support the site and help me move
              forward, please consider joining my Patreon or donating through
              the link below. Thank you!
            </p>
          </div>

          <div className="footer__support__links">
            <div className="footer__support__links__patreon">
              <IconPatreon />
              <div className="footer__support__links__patreon__text">
                <p>
                  <a
                    href="https://www.patreon.com/gmology"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <input type={"button"} value={"Patreon"} />
                  </a>
                </p>
              </div>
            </div>

            <div className="footer__support__links__paypal">
              <IconPaypal />
              <form
                className="donateButton"
                action="https://www.paypal.com/donate"
                method="post"
                target="_top"
              >
                <input type="hidden" name="business" value="54NPU9Y3YJQRN" />
                <input type="hidden" name="amount" value="3" />
                <input type="hidden" name="no_recurring" value="0" />
                <input
                  type="hidden"
                  name="item_name"
                  value="Fund Gmology.com! Help the site stay up and grow."
                />
                <input type="hidden" name="currency_code" value="USD" />
                <input
                  type="image"
                  src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif"
                  border="0"
                  name="submit"
                  title="PayPal - The safer, easier way to pay online!"
                  alt="Donate with PayPal button"
                />
                <img
                  alt=""
                  border="0"
                  src="https://www.paypal.com/en_US/i/scr/pixel.gif"
                  width="1"
                  height="1"
                />
              </form>
            </div>
          </div>
        </div>

        <div className="footer__contact">
          <div className="footer__contact__title">
            <h4>Contact</h4>
          </div>

          <div className="footer__contact__email">
            <div className="footer__contact__email__emailIcon">
              <IconEnvelope />
            </div>

            <div className="footer__contact__email__text">
              <p>OneWithTheInternet@gmail.com</p>
            </div>
          </div>

          <div className="footer__contact__twitter">
            <IconTwitter />

            <div className="footer__contact__twitter__text">
              <a
                href="https://twitter.com/gmologyofficial"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>@gmologyOfficial</p>
              </a>
            </div>
          </div>

          <div className="footer__contact__github">
            <IconGithub />

            <div className="footer__contact__github__text">
              <a
                href="https://github.com/OneWithTheInternet"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>@OneWithTheInternet</p>
              </a>
            </div>
          </div>
        </div>

        <div className="footer__blog">
          <div className="footer__blog__title">
            <h4>Blog</h4>
          </div>

          <div className="footer__blog__wordpress">
            <div className="footer__blog__wordpress__wordpressIcon">
              <IconWordpress />
            </div>

            <div className="footer__blog__wordpress__text">
              <a
                href="https://gmology.wordpress.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>Visit the blog</p>
              </a>
            </div>
          </div>
        </div>

        <div className="footer__credits">
          <div className="footer__credits__text">
            <p>
              Gmology.com copyright 2023. All rights reserved. Illustrations by
              12thEvil. Refecence to games such as cover arts and more belong to
              their respective owners. In association with Twitch's IGDB.
            </p>
          </div>

          <div className="footer__credits__twitch">
            <IconTwitch />
            <div className="footer__credits__twitch__IGDBIcon">
              <a
                href="https://www.igdb.com/"
                target={"_blank"}
                rel="noopener noreferrer"
              >
                <img src={IGDBLogo} alt={"IGDB logo"} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;

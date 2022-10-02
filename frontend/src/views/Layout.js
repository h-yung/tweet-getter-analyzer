import { Outlet, NavLink } from "react-router-dom";

import { isEmpty } from "../utils/validateInput";
import Notice from "../components/Notice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Layout({ username, setUsername, getRecent, clearAll }) {
  return (
    <>
      {isEmpty(username) && <Notice />}
      <header>
        <div className="title">
          <FontAwesomeIcon className="icon" icon={faTwitter} />
          <h1>Tweet Getter</h1>
        </div>
        <div className="toolbox">
          <form className="toolbox__form" onSubmit={(e) => getRecent(e)}>
            <label>
              User name:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button disabled={isEmpty(username)}>Get tweets</button>
            </label>
          </form>
          <button type="button" onClick={clearAll}>
            Clear
          </button>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>
          *Only English-language Tweets are included. Notice some of the strange
          sentiment assessments. Retweets ('RT') are currently included.
        </p>
        <p>
          LCM |{" "}
          <a href="https://github.com/h-yung/tweet-getter-analyzer">
            On GitHub
          </a>
        </p>
      </footer>
    </>
  );
}

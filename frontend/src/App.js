import { useState } from "react";
import { isEmpty } from "./utils/validateInput";
import { getTweets } from "./api/twitter";
import { sampleTweet } from "./api/sample";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import Notice from "./components/Notice";

function App() {
  const [username, setUsername] = useState(""); //currently id
  const [tweets, setTweets] = useState(sampleTweet);

  const getRecent = async (e) => {
    e.preventDefault();
    setTweets(getTweets(username));
  };

  return (
    <div className="App">
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
              <button disabled={isEmpty(username)}>Get tweets*</button>
            </label>
          </form>
          <button type="button" onClick={() => setUsername("")}>
            Clear
          </button>

          {/* <h3>
            Placeholder: specify where JSON is written in local file system? Clear
            + Save buttons?
          </h3> */}
        </div>
      </header>
      {tweets && (
        <main>
          <h2>
            Tweets from last seven days to current time{" "}
            {new Date().toLocaleTimeString()}
          </h2>
          <ul>
            {tweets.data
              .filter((tweet) => tweet.lang === "en")
              .map(({ id, text, created_at, public_metrics }) => (
                <li key={id}>
                  <span>{text}</span>
                  <ul className="Tweet_metadata">
                    <li>{created_at}</li>
                    <li>{public_metrics.quote_count}</li>
                    <li>{public_metrics.retweet_count}</li>
                  </ul>
                </li>
              ))}
          </ul>
        </main>
      )}
      <footer>
        <p>Made by LCM.</p>
      </footer>
    </div>
  );
}

export default App;

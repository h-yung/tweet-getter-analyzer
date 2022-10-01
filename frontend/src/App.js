import { useState } from "react";
import { isEmpty } from "./utils/validateInput";
import { getTweets } from "./api/twitter";
import { getAnalysis } from "./api/sentiment";
import { ratedEach } from "./utils/report";
import { sampleTweet } from "./api/sample";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import Notice from "./components/Notice";
import Analysis from "./components/Analysis";

function App() {
  const [username, setUsername] = useState(""); //currently id
  const [tweets, setTweets] = useState(sampleTweet);

  //rewrite
  const [scoredData, setScoredData] = useState("");

  const getRecent = async (e) => {
    e.preventDefault();
    const newTweets = await getTweets(username);
    setTweets(newTweets);
  };

  //turn into a useEffect
  const getAssessed = async () => {
    //has scores
    const newScoredData = await getAnalysis(tweets);
    //has sentiment
    const interpreted = ratedEach(newScoredData);
    setScoredData(interpreted);
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
        </div>
      </header>
      {tweets.data ? (
        <main>
          <h2>Sentiment analysis</h2>
          <button onClick={getAssessed}>SA Temp</button>
          {scoredData && <Analysis scoredData={scoredData} />}

          <h2>
            <span className="Tweet__count">{tweets.data.length}</span> Tweets
            over the last seven days to current local time{" "}
            {new Date().toGMTString()}
          </h2>
          <ol>
            {tweets.data.map(({ id, text, created_at, public_metrics }) => (
              <li key={id} className="Tweet_single">
                <span>{text}</span>
                <ul className="Tweet_metadata">
                  <li>Date created: {new Date(created_at).toGMTString()}</li>
                  <li>Quoted {public_metrics.quote_count}x</li>
                  <li>Retweeted {public_metrics.retweet_count}x</li>
                </ul>
              </li>
            ))}
          </ol>
        </main>
      ) : (
        <main>
          <span>No tweets found in the given timeframe.</span>
        </main>
      )}
      <footer>
        <p>Tweets displayed and counted are English only.</p>
        <p>Made by LCM.</p>
      </footer>
    </div>
  );
}

export default App;

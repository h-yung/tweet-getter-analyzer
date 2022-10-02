import { useEffect, useState } from "react";
import { isEmpty } from "./utils/validateInput";
import { getTweets } from "./api/twitter";
import { getEngOnly } from "./utils/report";
import { getAnalysis } from "./api/sentiment";
import { ratedEach } from "./utils/report";

import { username1, tweetSet_1 } from "./api/sample_extended";

// import { filteredBySentiment } from "./utils/sortAndFilterLogic";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import Notice from "./components/Notice";
import Analysis from "./components/Analysis";
import SortAndFilter from "./components/SortAndFilter";

function App() {
  const [username, setUsername] = useState(""); //currently id
  const [tweets, setTweets] = useState(""); //cannot provide as empty array

  const [scoredData, setScoredData] = useState("");
  const [sortCat, setSortCat] = useState("created_at");

  // const [sentiment, setSentiment] = useState('');

  const getRecent = async (e) => {
    e.preventDefault();
    const newTweets = await getTweets(username);
    if (newTweets.error) {
      window.alert(newTweets.error);
      clearAll();
      return;
    }
    setTweets(newTweets);
  };

  const clearAll = () => {
    setUsername("");
    setScoredData("");
  };

  useEffect(() => {
    const getAssessed = async () => {
      //has scores
      const tweetsEngOnly = getEngOnly(tweets);
      const newScoredData = await getAnalysis(tweetsEngOnly);
      //has sentiment
      const interpreted = ratedEach(newScoredData);
      setScoredData(interpreted);
    };
    getAssessed();
  }, [tweets]);

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
              <button disabled={isEmpty(username)}>Get tweets</button>
            </label>
          </form>
          <button type="button" onClick={clearAll}>
            Clear
          </button>
        </div>
      </header>
      {!scoredData ? (
        <main>{username ? <span>No tweets found.</span> : ""}</main>
      ) : (
        <main>
          <h2>Overall Sentiment</h2>
          <Analysis scoredData={scoredData} />
          <SortAndFilter
            sortCat={sortCat}
            setSortCat={setSortCat}
            scoredData={scoredData}
            setScoredData={setScoredData}
          />
          <h2 className="summary">
            <span className="Tweet__count">{scoredData.length}</span> Tweets*
            over the last 30 days to current local time{" "}
            {new Date().toGMTString()}
          </h2>
          <ol>
            {scoredData.map(
              ({ id, text, created_at, public_metrics, sentiment }) => (
                <li
                  key={id}
                  className={`Tweet_single ${
                    sentiment === "positive"
                      ? "mark__pos"
                      : sentiment === "negative"
                      ? "mark__neg"
                      : "mark__neut"
                  }`}
                >
                  <span>{text}</span>
                  <ul className="Tweet_metadata">
                    <li>Date created: {new Date(created_at).toGMTString()}</li>
                    <li>Quoted {public_metrics.quote_count}x</li>
                    <li>Retweeted {public_metrics.retweet_count}x</li>
                  </ul>
                </li>
              )
            )}
          </ol>
        </main>
      )}
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
    </div>
  );
}

export default App;

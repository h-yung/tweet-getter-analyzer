import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { isEmpty } from "./utils/validateInput";
import { getTweets } from "./api/twitter";
import { getEngOnly } from "./utils/report";
import { getAnalysis } from "./api/sentiment";
import { ratedEach } from "./utils/report";

import { username1, tweetSet_1 } from "./api/sample_extended";

// import { filteredBySentiment } from "./utils/sortAndFilterLogic";

import Layout from "./views/Layout";
import Home from "./views/Home";
import Visual from "./views/Visual";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import Tweet from "./components/Tweet";
import Notice from "./components/Notice";
import Analysis from "./components/Analysis";
import SortAndFilter from "./components/SortAndFilter";

function App() {
  const [username, setUsername] = useState(username1); //replace
  const [tweets, setTweets] = useState(""); //cannot provide as empty array

  const [scoredData, setScoredData] = useState(tweetSet_1); //replace
  const [sortCat, setSortCat] = useState("created_at");

  const [selected, setSelected] = useState(""); //array to store usernames and tweetsets for visual

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

  //need to add validation
  const addToSet = () => {
    const toInclude = { username: username, tweets: scoredData };
    const updatedSelected = [...selected, toInclude];
    setSelected(updatedSelected);
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
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            username={username}
            setUsername={setUsername}
            getRecent={getRecent}
            clearAll={clearAll}
          />
        }
      >
        <Route
          index
          element={
            <Home
              username={username}
              scoredData={scoredData}
              setScoredData={setScoredData}
              sortCat={sortCat}
              setSortCat={setSortCat}
              addToSet={addToSet}
            />
          }
        />
        <Route path="/visual" element={<Visual selected={selected} />} />
      </Route>
    </Routes>
  );

  // <div className="App">
  //   {isEmpty(username) && <Notice />}
  //   <header>
  //     <div className="title">
  //       <FontAwesomeIcon className="icon" icon={faTwitter} />
  //       <h1>Tweet Getter</h1>
  //     </div>
  //     <div className="toolbox">
  //       <form className="toolbox__form" onSubmit={(e) => getRecent(e)}>
  //         <label>
  //           User name:
  //           <input
  //             type="text"
  //             value={username}
  //             onChange={(e) => setUsername(e.target.value)}
  //           />
  //           <button disabled={isEmpty(username)}>Get tweets</button>
  //         </label>
  //       </form>
  //       <button type="button" onClick={clearAll}>
  //         Clear
  //       </button>
  //     </div>
  //   </header>
  //   {!scoredData ? (
  //     <main>{username ? <span>No tweets found.</span> : ""}</main>
  //   ) : (
  //     <main>
  //       <h2>Overall Sentiment</h2>
  //       <Analysis scoredData={scoredData} />
  //       <SortAndFilter
  //         sortCat={sortCat}
  //         setSortCat={setSortCat}
  //         scoredData={scoredData}
  //         setScoredData={setScoredData}
  //       />
  //       <h2 className="summary">
  //         <span className="Tweet__count">{scoredData.length}</span> Tweets*
  //         over the last 30 days to current local time{" "}
  //         {new Date().toGMTString()}
  //       </h2>
  //       <ol>
  //         {scoredData.map((tweet) => (
  //           <Tweet {...tweet} />
  //         ))}
  //       </ol>
  //     </main>
  //   )}
  //   <footer>
  //     <p>
  //       *Only English-language Tweets are included. Notice some of the strange
  //       sentiment assessments. Retweets ('RT') are currently included.
  //     </p>
  //     <p>
  //       LCM |{" "}
  //       <a href="https://github.com/h-yung/tweet-getter-analyzer">
  //         On GitHub
  //       </a>
  //     </p>
  //   </footer>
  // </div>
  // );
}

export default App;

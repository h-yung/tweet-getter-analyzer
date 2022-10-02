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

function App() {
  const [username, setUsername] = useState(username1); //replace
  const [tweets, setTweets] = useState(""); //cannot provide as empty array

  const [scoredData, setScoredData] = useState(tweetSet_1); //replace
  const [sortCat, setSortCat] = useState("created_at");

  //for visual
  const [earliestDate, setEarliestDate] = useState("");
  const [selected, setSelected] = useState(""); //array to store usernames and tweetsets

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
    //if selected is empty at current point, we will take what "current time" (used to backtrack 30 days prior) is at time of first acct pull.
    if (!selected) {
      let currentDate = new Date();
      setEarliestDate(currentDate);
    }
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
        <Route
          path="/visual"
          element={
            <Visual
              selected={selected}
              setSelected={setSelected}
              earliestDate={earliestDate}
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;

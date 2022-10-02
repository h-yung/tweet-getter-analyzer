import { NavLink } from "react-router-dom";

import Analysis from "../components/Analysis";
import SortAndFilter from "../components/SortAndFilter";
import Tweet from "../components/Tweet";
import Nothing from "../components/Nothing";

export default function Home({
  // username,
  scoredData,
  setScoredData,
  sortCat,
  setSortCat,
  addToSet,
}) {
  return (
    <>
      {!scoredData ? (
        <Nothing />
      ) : (
        <>
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
          <div className="actionbox__vis">
            <button type="button" onClick={addToSet}>
              Add current user and tweets to set
            </button>
            <NavLink to="/visual" className="NavLink">
              See visualization
            </NavLink>
          </div>
          <ol>
            {scoredData.map((tweet) => (
              <Tweet {...tweet} />
            ))}
          </ol>
        </>
      )}
    </>
  );
}

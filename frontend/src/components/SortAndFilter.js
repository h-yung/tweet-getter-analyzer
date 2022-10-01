import { sorted } from "../utils/sortAndFilterLogic";

function SortAndFilter({ sortCat, setSortCat, scoredData, setScoredData }) {
  const sortItem = async (e) => {
    //fix stale /async. currently a workaround
    const category = e.currentTarget.value;
    setSortCat(category);
    // console.log(scoredData)
    const orderedData = sorted(category, scoredData);
    console.log("running");
    setScoredData(orderedData);
  };

  return (
    <div className="sort__toolbox">
      {/* <label>
            Filter by sentiment
        </label>
        <select
            value={sentiment}
            onChange={(e)=> 
                setSentiment(e.currentTarget.value)}
        >
            <option value="">Show all</option>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
        </select> */}

      <label>Sort by</label>
      <select
        value={sortCat}
        onChange={(e) => sortItem(e)} //change sortCat AND sort
      >
        <option value="created_at">Recency (default)</option>
        <option value="retweet_count">Retweets</option>
        <option value="quote_count">Quoted</option>
      </select>
    </div>
  );
}

export default SortAndFilter;

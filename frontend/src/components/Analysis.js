import { getAvgScore, percentages } from "../utils/report";

const Analysis = ({ scoredData }) => {
  const avg = getAvgScore(scoredData);
  const { percNeg, percNeutral, percPos, overallSentiment } =
    percentages(scoredData);

  return (
    <div className="Analysis">
      {scoredData && (
        <>
          <span
            className={`outcome ${
              overallSentiment === "negative"
                ? "outcome__negative"
                : overallSentiment === "positive"
                ? "outcome__pos"
                : "outcome__neut" //all combo-overalls also colored neutral
            }`}
          >
            {overallSentiment}
          </span>
        </>
      )}
      <ul className="outcome__percents">
        <li>{percPos}% positive</li>
        <li>{percNeutral}% neutral</li>
        <li>{percNeg}% negative</li>
      </ul>
      <span>averaged score: {avg}</span>
    </div>
  );
};

export default Analysis;

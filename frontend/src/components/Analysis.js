import { getAvgScore, percentages } from "../utils/report";

const Analysis = ({ scoredData }) => {
  const avg = getAvgScore(scoredData);
  const { percNeg, percNeutral, percPos } = percentages(scoredData);

  return (
    <div className="Analysis">
      {scoredData && (
        <>
          <span
            className={`outcome ${
              avg.sentiment === "negative"
                ? "outcome__negative"
                : avg.sentiment === "positive"
                ? "outcome__pos"
                : ""
            }`}
          >
            {avg.sentiment}
          </span>
        </>
      )}
      <ul className="outcome__percents">
        <li>{percPos}% positive</li>
        <li>{percNeutral}% neutral</li>
        <li>{percNeg}% negative</li>
      </ul>
      <span>average score: {avg.avg}</span>
    </div>
  );
};

export default Analysis;

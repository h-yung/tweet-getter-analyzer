import { getAvgScore, percentages } from "../utils/report";

const Analysis = ({ scoredData }) => {
  const avg = getAvgScore(scoredData);
  const { percNeg, percNeutral, percPos } = percentages(scoredData);

  return (
    <div className="Analysis">
      {scoredData && (
        <>
          <p className="subtitle">Generally</p>
          <span className="outcome">{avg.sentiment}</span>
          <span>Score: {avg.avg}</span>
        </>
      )}
      <ul>
        <li>{percPos}% positive</li>
        <li>{percNeutral}% neutral</li>
        <li>{percNeg}% negative</li>
      </ul>
    </div>
  );
};

export default Analysis;

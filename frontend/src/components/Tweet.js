export default function Tweet(tweet) {
  const { id, sentiment, text, created_at, public_metrics } = tweet;
  return (
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
  );
}

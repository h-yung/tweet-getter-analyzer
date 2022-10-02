export default function Nothing({ username }) {
  return <>{username ? <span>No tweets found.</span> : ""}</>;
}

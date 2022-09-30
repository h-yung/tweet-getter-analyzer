//fetch latest tweets, taking in username input
export const getTweets = async (username) => {
  const response = await fetch(`http://localhost:3001/${username}`);
  const data = await response.json();
  return data;
};

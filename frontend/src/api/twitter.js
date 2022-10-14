//fetch latest tweets, taking in username input
const API_URL = "https://tweet-sentiment-analyzer.up.railway.app";

export const getTweets = async (username) => {
  const response = await fetch(`${API_URL}/user/${username}`);
  const data = await response.json();
  return data;
};

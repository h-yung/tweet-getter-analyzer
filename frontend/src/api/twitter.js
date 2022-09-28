//fetch latest tweets, taking in username input
export const getTweets = (username) => {
  const response = fetch(`/${username}`);
  const data = response.json();
  return data;
};

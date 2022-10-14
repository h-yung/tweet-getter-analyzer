import { API_URL } from "./twitter";

//get sentiment analysis
export const getAnalysis = async (textObj) => {
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tweetSet: textObj,
    }),
  };
  // console.log(options)
  try {
    const response = await fetch(`${API_URL}/analyze`, options);
    const data = await response.json();
    return data;
    //this returns:
    /**
    {
      score: 0.900292992929292,
      elapsed: 86.83709999918938
    };
     */
  } catch (err) {
    console.log(err);
  }
};

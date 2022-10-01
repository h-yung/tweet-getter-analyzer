//get sentiment analysis
export const getAnalysis = async (textArray) => {
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tweetSet: [{ text: "example text" }],
      // tweetSet: textArray.data
    }),
  };
  // console.log(options)
  try {
    const response = await fetch(`http://localhost:3001/analyze`, options);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

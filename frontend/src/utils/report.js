//remove non-Eng data
export const getEngOnly = (obj) => {
  return {
    ...obj,
    data: [...obj.data].filter(
      (tweet) =>
        tweet.lang === "en" &&
        tweet.text.split("").slice(0, 2).join("") !== "RT"
    ), //retweeted exclusion not currently working - need to check API
  };
};

//provide thresholds positive, neutral, negative. Starting thresholds borrowed from Benson Ruan
const giveVerdict = (score) => {
  if (score <= 0.33) {
    return "negative";
  } else if (score <= 0.66) {
    return "neutral";
  } else {
    return "positive";
  }
};

//calc avg sentiment threshold; assumes array items each have key of "score": number
export const getAvgScore = (array) => {
  const avg = array.reduce((a, v) => a + v.score, 0) / array.length; //this number makes zero sense
  // let sentiment = giveVerdict(avg);
  return avg;
};

export const ratedEach = (array) => {
  return array.map((item) => ({ ...item, sentiment: giveVerdict(item.score) }));
};

export const percentages = (array) => {
  let countNegative = 0;
  let countNeutral = 0;
  let countPositive = 0;

  array.forEach((item) => {
    if (item.sentiment === "negative") {
      countNegative++;
    } else if (item.sentiment === "neutral") {
      countNeutral++;
    } else {
      countPositive++;
    }
  });
  //overall sentiment is by freq
  let inOrder = [countNegative, countNeutral, countPositive].sort(
    (a, b) => a - b
  ); //ascending. not Math.max because there could be equal count numbers

  let overallSentiment = "";
  if (countPositive === inOrder[inOrder.length - 1]) {
    overallSentiment += "positive";
  }
  if (countNeutral === inOrder[inOrder.length - 1]) {
    if (overallSentiment) {
      overallSentiment += "/neutral";
    } else {
      overallSentiment += "neutral";
    }
  }
  if (countNegative === inOrder[inOrder.length - 1]) {
    if (overallSentiment) {
      overallSentiment += "/negative";
    } else {
      overallSentiment += "negative";
    }
  }

  return {
    percNeg: parseInt((countNegative / array.length) * 100, 10),
    percNeutral: parseInt((countNeutral / array.length) * 100, 10),
    percPos: parseInt((countPositive / array.length) * 100, 10),
    overallSentiment,
  };
};

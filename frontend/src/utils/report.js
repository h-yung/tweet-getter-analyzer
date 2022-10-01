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
  const avg = array.reduce((a, v) => a + v.score, 0) / array.length;
  let sentiment = giveVerdict(avg);
  return { avg, sentiment };
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

  return {
    percNeg: parseInt((countNegative / array.length) * 100, 10),
    percNeutral: parseInt((countNeutral / array.length) * 100, 10),
    percPos: parseInt((countPositive / array.length) * 100, 10),
  };
};

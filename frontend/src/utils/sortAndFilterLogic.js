//filter by sentiment
export const filteredBySentiment = (strVal, arr) => {
  return arr.filter((item) => item.sentiment === strVal);
};

//sort by insert category here
export const sorted = (category, arr) => {
  //recency
  if (category === "created_at") {
    return arr.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  } else {
    return arr.sort(
      (a, b) => b.public_metrics[category] - a.public_metrics[category]
    );
  }
};

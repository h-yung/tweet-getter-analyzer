//sentiment analysis model

//call API of tf.loadLayersModel(url)
const urls = {
  model:
    "https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json",
  metadata:
    "https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json",
};

async function loadModel(url) {
  try {
    const model = await tf.loadLayersModel(url);
    return model;
  } catch (err) {
    console.log(err);
  }
}
async function loadMetadata(url) {
  try {
    const metadataJson = await fetch(url);
    const metadata = await metadataJson.json();
    return metadata;
  } catch (err) {
    console.log(err);
  }
}
//pass in tweet text to perform analysis on each tweet text, returning a store between 0 and 1
export function getSentimentScore(text) {
  //cleanup
  const inputText = text
    .trim()
    .toLowerCase()
    .replace(/(\.|\,|\!)/g, "")
    .split(" ");

  // Convert the words to a sequence of word indices.
  const sequence = inputText.map((word) => {
    let wordIndex = metadata.word_index[word] + metadata.index_from;
    if (wordIndex > metadata.vocabulary_size) {
      wordIndex = OOV_INDEX;
    }
    return wordIndex;
  });
  // Perform truncation and padding.
  const paddedSequence = padSequences([sequence], metadata.max_len);
  const input = tf.tensor2d(paddedSequence, [1, metadata.max_len]);

  const predictOut = model.predict(input);
  const score = predictOut.dataSync()[0];
  predictOut.dispose();

  console.log(`Score of ${text}: ${score}`);
  return score;
}

//display output
//rewrite the following notations
export function processTwitterData(tweets) {
  setupSentimentModel().then((result) => {
    const twitterData = [];
    $.each(tweets, function (index, tweet) {
      const tweet_text = tweet.full_text.replace(
        /(?:https?|ftp):\/\/[\n\S]+/g,
        ""
      );
      const sentiment_score = getSentimentScore(tweet_text);
      let tweet_sentiment = "";
      if (sentiment_score > SentimentThreshold.Positive) {
        tweet_sentiment = "positive";
      } else if (sentiment_score > SentimentThreshold.Neutral) {
        tweet_sentiment = "neutral";
      } else if (sentiment_score >= SentimentThreshold.Negative) {
        tweet_sentiment = "negative";
      }
      twitterData.push({
        sentiment: tweet_sentiment,
        score: sentiment_score.toFixed(4),
        tweet: tweet_text,
      });
    });
    console.log(twitterData);
    $(".spinner-border").addClass("d-none");
    displayTweets(
      twitterData.filter((t) => t.sentiment == "positive"),
      "positive"
    );
    displayTweets(
      twitterData.filter((t) => t.sentiment == "neutral"),
      "neutral"
    );
    displayTweets(
      twitterData.filter((t) => t.sentiment == "negative"),
      "negative"
    );
    $("#tweet-list").removeClass("d-none");
    displayPieChart(twitterData);
  });
}

import fetch from "node-fetch";
import dotenv from "dotenv"; //needed here for invoking env vars
dotenv.config({ path: "./config/.env" });
import { predictor } from "../sentiment/tensorflow.js";

const bearerToken = process.env.BEARER_TOKEN;
const options = {
  method: "get",
  headers: {
    Authorization: `Bearer ${bearerToken}`,
  },
};

export const mainController = {
  getIndex: async (request, response) => {
    //getting tweet timeline by user ID
    try {
      //first look up userID
      const username = request.params.username;
      const userLookup_URL = `https://api.twitter.com/2/users/by/username/${username}`;
      const first = await fetch(userLookup_URL, options);
      const user = await first.json();
      const userID = user.data.id;

      //pull Tweets from the past 30 days. If you don't specify maxcount, it returns only the 10 first.
      const count = 100;
      const thirtyDaysAgo = new Date(Date.now() - 90 * 86400000).toISOString();
      const endTime = new Date().toISOString();
      const getTweets_URL = `https://api.twitter.com/2/users/${userID}/tweets?start_time=${thirtyDaysAgo}&end_time=${endTime}&max_results=${count}&tweet.fields=text,id,created_at,geo,public_metrics,lang`;

      const second = await fetch(getTweets_URL, options);
      const tweets = await second.json();
      response.send(tweets);
    } catch (err) {
      console.log(err);
    }
  },
  postAnalyze: (req, res) => {
    const { tweetSet } = req.body;
    const tweetTexts = tweetSet.data;
    console.log(tweetTexts);

    try {
      const scoredTweets = tweetTexts.map((tweet) => ({
        ...tweet,
        score: predictor.predict(tweet.text).score,
      }));

      res.send(scoredTweets);
    } catch (err) {
      console.log(err);
    }
  },
};

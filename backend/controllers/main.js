import fetch from "node-fetch";
import dotenv from "dotenv"; //needed here for invoking env vars
dotenv.config({ path: "./config/.env" });
// import { checkToxicity } from "../sentiment/tensorflow-toxicity.js";
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
      console.log(username);
      const userLookup_URL = `https://api.twitter.com/2/users/by/username/${username}`;
      const first = await fetch(userLookup_URL, options);
      const user = await first.json();
      // console.log(user);
      const userID = user.data.id;
      console.log(userID);

      //pull Tweets from the past 7 days, max 50?
      const count = 50;
      const sevenDaysAgo = new Date(Date.now() - 604800000).toISOString();
      const endTime = new Date().toISOString();
      const getTweets_URL = `https://api.twitter.com/2/users/${userID}/tweets?max_results=${count}&start_time=${sevenDaysAgo}&end_time=${endTime}&tweet.fields=text,id,created_at,geo,public_metrics,lang`;

      const second = await fetch(getTweets_URL, options);
      const tweets = await second.json();
      const tweetsEngOnly = {
        ...tweets,
        data: [...tweets.data].filter((tweet) => tweet.lang === "en"),
      };
      response.send(tweetsEngOnly);
      //   response.send(userID);
      // response.end();
    } catch (err) {
      console.log(err);
    }
  },
  postAnalyze: (req, res) => {
    //sample tweet (tweets.data[2]) - replace with tweets in array from req.body
    //const { tweetSet } = req.body;
    const example = {
      text: "Today 🇺🇸 @DeptofDefense announced a new $1.1 billion security support package for 🇺🇦. We'll get 18 more HIMARS, other critical equipment that'll bring 🇺🇦 victory closer. A very timely decision showing that Russian blackmail does not work. Gratitude to @POTUS &amp; all our 🇺🇸 friends!",
      lang: "en",
      edit_history_tweet_ids: ["1575208539760775168"],
      id: "1575208539760775168",
      public_metrics: {
        retweet_count: 7218,
        reply_count: 2343,
        like_count: 54773,
        quote_count: 405,
      },
      created_at: "2022-09-28T19:39:16.000Z",
    };

    try {
      //rewrite to map to actuals, not single tweet
      const sentTweets = predictor.predict(example.text);

      console.log(sentTweets.score);
      console.log(sentTweets.elapsed);

      //either want to avg scores % (overall week), or tag indiv tweets for sentiment, or sort based on threshold for output.
      res.send(sentTweets); //remember currently this is one obj with 2 keys, detached from original tweet
    } catch (err) {
      console.log(err);
    }
  },
};

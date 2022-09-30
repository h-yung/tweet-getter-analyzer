import fetch from "node-fetch";
import dotenv from "dotenv"; //needed here for invoking env vars
dotenv.config({ path: "./config/.env" });

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
      response.send(tweets);
      //   response.send(userID);
      // response.end();
    } catch (err) {
      console.log(err);
    }
  },
};

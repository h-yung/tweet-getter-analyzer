import fetch from "node-fetch";
import dotenv from "dotenv"; //needed here for invoking env vars
dotenv.config({ path: "./config/.env" });
// import { getRequest } from "../config/twitterAPI.js"; //autogen neglects to add ext .js

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
      // console.log(user);
      const userID = user.data.id;
      // console.log(userID)

      //pull Tweets from the past 7 days, max 50?
      const count = 50;
      const sevenDaysAgo = new Date(Date.now() - 604800000).toISOString();
      const endTime = new Date().toISOString();
      const getTweets_URL = `https://api.twitter.com/2/users/${userID}/tweets?max_results=${count}&start_time=${sevenDaysAgo}&end_time=${endTime}`;
      const second = await fetch(getTweets_URL, options);
      const tweets = await second.json();

      //gives you a score to let you know exactly how your week has been

      //   response.send(userID);
      response.end();
    } catch (err) {
      console.log(err);
    }
  },
};

//get user tweet timeline by id
// const usertweets_URL = `https://api.twitter.com/2/users/${userID}/tweets`;

//set length limit later?
// let userTweets = [];

//     let params = {
//       max_results: 50,
//       "tweet.fields": "created_at",
//       expansions: "author_id",
//     };

//     let hasNextPage = true;
//     let nextToken = null;
//     let userName;
//     console.log("Retrieving Tweets...");

//     try {
//       while (hasNextPage) {
//         let resp = await getPage(url, params, options, nextToken);
//         if (
//           resp &&
//           resp.meta &&
//           resp.meta.result_count &&
//           resp.meta.result_count > 0
//         ) {
//           userName = resp.includes.users[0].username;
//           if (resp.data) {
//             userTweets.push.apply(userTweets, resp.data);
//           }
//           if (resp.meta.next_token) {
//             nextToken = resp.meta.next_token;
//           } else {
//             hasNextPage = false;
//           }
//         } else {
//           hasNextPage = false;
//         }
//       }
//       //this prints obj to unlimited depth
//       console.dir(userTweets, {
//         depth: null,
//       });
//       console.log(
//         `Got ${userTweets.length} Tweets from ${userName} (user ID ${userId})!`
//       );
//     } catch (err) {
//       console.log(err);
//     }
//   },
//

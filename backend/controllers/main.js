const bearerToken = process.env.BEARER_TOKEN;
import fetch from "node-fetch";

// const getPage = require("../config/twitterAPI");

// authentication by bearer token is not yet handled
export const mainController = {
  getIndex: async (request, response) => {
    //getting tweet timeline by user ID
    const username = request.params.username; //to replace "2244994945"
    try {
      //first look up userID
      const userLookup_URL = `https://api.twitter.com/2/users/by/username/${username}`;
      const options = {
        method: "get",
        headers: {
          //   "User-Agent": "v2UserTweetsJS", //replace
          authorization: `Bearer ${bearerToken}`, // it’s either (1 value) Bearer token, or a consumer key & secret and access token & secret
        },
      };
      const first = await fetch(userLookup_URL, options);
      const userID = await first.json().id; //string of numbers
      console.log(userID);
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

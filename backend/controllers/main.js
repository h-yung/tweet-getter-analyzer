const bearerToken = process.env.BEARER_TOKEN;
const getPage = require("../config/twitterAPI");

// getPage = async (url, params, options, nextToken)

module.exports = {
  getIndex: async (request, response) => {
    //getting tweet timeline by user ID
    const userId = request.params.tID; //to replace "2244994945"
    const url = `https://api.twitter.com/2/users/${userId}/tweets`;
    let userTweets = [];
    // we request the author_id expansion so that we can print out the user name later
    let params = {
      max_results: 50,
      "tweet.fields": "created_at",
      expansions: "author_id",
    };
    const options = {
      headers: {
        "User-Agent": "v2UserTweetsJS", //replace
        authorization: `Bearer ${bearerToken}`, // it’s either (1 value) Bearer token, or a consumer key & secret and access token & secret
      },
    };
    let hasNextPage = true;
    let nextToken = null;
    let userName;
    console.log("Retrieving Tweets...");

    try {
      while (hasNextPage) {
        let resp = await getPage(url, params, options, nextToken);
        if (
          resp &&
          resp.meta &&
          resp.meta.result_count &&
          resp.meta.result_count > 0
        ) {
          userName = resp.includes.users[0].username;
          if (resp.data) {
            userTweets.push.apply(userTweets, resp.data);
          }
          if (resp.meta.next_token) {
            nextToken = resp.meta.next_token;
          } else {
            hasNextPage = false;
          }
        } else {
          hasNextPage = false;
        }
      }
      //this prints obj to unlimited depth
      console.dir(userTweets, {
        depth: null,
      });
      console.log(
        `Got ${userTweets.length} Tweets from ${userName} (user ID ${userId})!`
      );
    } catch (err) {
      console.log(err);
    }
  },
};

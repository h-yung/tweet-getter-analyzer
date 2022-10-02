//user ID response
export const userID = {
  data: {
    id: "2244994945",
    name: "Twitter Dev",
    username: "TwitterDev",
  },
};

//failed user lookup
/**The app will not recognize a mispelt username if the username exists. However, it can return the following errors */
const error_1 = {
  errors: [
    {
      parameter: "username",
      resource_id: "adfldf",
      value: "adfldf",
      detail: "User has been suspended: [adfldf].",
      title: "Forbidden",
      resource_type: "user",
      type: "https://api.twitter.com/2/problems/resource-not-found",
    },
  ],
};
const error_2 = {
  errors: [
    {
      value: "adfldfddddd",
      detail: "Could not find user with username: [adfldfddddd].",
      title: "Not Found Error",
      resource_type: "user",
      parameter: "username",
      resource_id: "adfldfddddd",
      type: "https://api.twitter.com/2/problems/resource-not-found",
    },
  ],
};

//shape of tweets returned
export const sampleTweet = {
  data: [
    {
      text: "I appreciate the clear position of UN Secretary-General @antonioguterres on the criminal intention of RF to illegally annex more 🇺🇦 lands: such actions won't have any legal force, grossly violate the Purposes and Principles of the UN Charter and won't be recognized by the world.",
      lang: "en",
      edit_history_tweet_ids: ["1575537866058657792"],
      id: "1575537866058657792",
      public_metrics: {
        retweet_count: 4155,
        reply_count: 1217,
        like_count: 27885,
        quote_count: 146,
      },
      created_at: "2022-09-29T17:27:54.000Z",
    },
    {
      text: "Ціную чітку позицію Генсекретаря ООН @antonioguterres щодо злочинного наміру Росії незаконно анексувати нові 🇺🇦 землі: такі дії не матимуть жодної юридичної сили, вони грубо порушують Цілі та Принципи Статуту ООН та не будуть визнані світом.",
      lang: "uk",
      edit_history_tweet_ids: ["1575537843577167872"],
      id: "1575537843577167872",
      public_metrics: {
        retweet_count: 935,
        reply_count: 275,
        like_count: 7957,
        quote_count: 21,
      },
      created_at: "2022-09-29T17:27:48.000Z",
    },
    {
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
    }, //etc
  ],
  meta: {
    result_count: 19,
    newest_id: "1575537866058657792",
    oldest_id: "1574340884338024448",
  },
};

//output of checkToxicity (predictions, an array):
/*         
'predictions' is an array of objects, one for each prediction head, that contains the raw probabilities for each input along with the final prediction in `match` (either `true` or `false`). If neither prediction exceeds the threshold, `match` is `null`.
*/
const toxicityRating = [
  {
    label: "identity_attack",
    results: [
      {
        probabilities: [0.9659664034843445, 0.03403361141681671],
        match: false,
      },
    ],
  },
  {
    label: "insult",
    results: [
      {
        probabilities: [0.08124706149101257, 0.9187529683113098],
        match: true,
      },
    ],
  },
  //etc
];

//returned obj from sentiment analysis, where (0 - negative; 1 - positive)
const singleRating = {
  score: 0.900292992929292,
  elapsed: 86.83709999918938, //time elapsed to return score; performance measure
};

//scoredData is subtly different from tweet obj structure:
const scoredData = [
  {
    text: "I appreciate the clear position of UN Secretary-General @antonioguterres on the criminal intention of RF to illegally annex more 🇺🇦 lands: such actions won't have any legal force, grossly violate the Purposes and Principles of the UN Charter and won't be recognized by the world.",
    lang: "en",
    edit_history_tweet_ids: ["1575537866058657792"],
    id: "1575537866058657792",
    public_metrics: {
      retweet_count: 4155,
      reply_count: 1217,
      like_count: 27885,
      quote_count: 146,
    },
    created_at: "2022-09-29T17:27:54.000Z",
    score: 0.044423232132398, //appended
    sentiment: "positive", //appended
  },
  //etc
];

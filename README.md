# Tweet sentiment analyzer
Retrieve latest public English-language tweets of users by user name/Twitter handle in the last 30 days and analyze sentiment. Sort by number of quotes, retweets, or recency (default). Compare sentiment scores across different users with up to four unique marker/shape indicators (after which the shapes recycle). No data persistence is provided.

**Tech used**: 
- [Twitter API v.2](https://developer.twitter.com/en/docs/twitter-api)
- A pretrained TensorFlow model that needs **a lot** of work (i.e., accuracy, judgment, etc. is all very bizarre right now). 
- Node, Express, vaguely MVC architecture (but not quite), and node-fetch for http reqs from server (yep, not axios). 
- Front end built with React, CanvasJS used for visualization; comes with basic tooltip. Forgot I was going to try using a CSS framework/component library...

## Live here: https://tweet-sentiment-analyzer.netlify.app/
(Give the search a few seconds...)

![tweet_getter_r4](https://user-images.githubusercontent.com/102257735/193480968-e2f51b98-765a-4830-a3b0-350acfaed836.png)

- Empty search input (no user name provided) is flagged with a notice at the top; submit button is also disabled until input is provided.
- The comparative sentiment view prevents the adding of the same user to the visualization set.
- Requests are routed via a server so as to protect tokens/keys/secrets. Analysis/report functionality is implemented entirely client side.

Currently, front and back end are deployed separately ([Netlify](netlify.com/) and [Railway](https://railway.app/) free tier, pretty painless).

## Optimizations

It's interesting what gets categorized as positive - the starting thresholds probably need some tweaking (or better yet, eventually changing/training the model, which was based off...IMDB reviews and probably are missing quite a few salient keywords).

It's also quite slow to return search results - I wouldn't blame Twitter API necessarily. Combo of Twitter + Railway free tier + suboptimal code? One of these areas is addressable for free.

### Provide comparative visual 
#### v1 mostly done
Allow users to save the set of tweets and username to an array that then visualizes sentiment of up to ?? users' tweets across same time period. (Levers could come to include same user, different timeframe, or longer timeframes, etc.)

- Current view is scatter plot of sentiment score (0 negative - 1 positive) vs. date (last 30 days).
- legend showing unique marker matched to each username.
- likely involving object consisting of { username: 'twitter handle', tweets: scoredData } where scoredData is the array currently rendered of the retrieved tweets.
- need to filter out the pure RTs (indicated by text opener "RT")
- 100% client side ops, no persisting data, for simplicity
- UI: button to "save" user and data into the array
- separate page appears? or just component within same overall?
  - maybe visualization module when enabled will hide the tweet list
  - Using react router might end up simpler after all: - common to all: header with search term entry - component: Nothing to show, conditional based on username - component: Full tweet list of active /last searched username, can be cleared* - component: visualization of sentiment vs. last 30 days of the saved users
    *current draft approach does not allow removal of any users added for comparison.
- UI could/should include a list of the usernames included and in their assigned color code
- UI should allow for removal of particular username (executed with splice)
- this is a bit similar to the "compare school rankings" type function
- Some people tweet multiple times per day - markers end up stacked on top of each other visually.

#### Nice to haves

- visual neutral threshold line indicator as well
- (to adjust existing) tooltip on hover over data point, providing the tweet text; aria-label? of content on click of the data point

### Model retraining
There are many problems with the model and how it is categorizing sentiment.

This will involve either finding a better baseline model and/or retraining and then updating thresholds... A more govt/politics/international baseline model? Most resources along these lines will be in Python.

### Backlog

- Compare sentiment vs. engagement (e.g., for a particular figure, over time, is there correlation between what sentiment their tweets are encoded as and engagement rate, and if so, does that person respond by adapting how they frame their tweets accordingly?)
  - Rather arbitrarily, I've decided retweets and quotes are higher-effort engagement, though they could be done for oppositional purposes (mockery, evidence of contrary opinion, etc.)
  - Of course, this also assumes they tweet about relevant topics generally and are eyeballed by people already concerned with such topics (a pleasant "Happy holiday" or "On this day" is not nearly as relevant to 100% audience/followers as a note on a broader political situation, or similarly, a local holiday remark might drive greater interest and engagement from local audience that could overshadow decreased interest abroad... etc.)

## Progress

- [x] Successful Postman test of API (Twitter API v2), need to set up server.
- [x] Make successful server-side req to Twitter API (Postman -> server -> API). A long struggle later, it turns out the env vars were not actually being found/recognized server-side. Trimmed dependencies back down and imported dotenv for the main controller instead.
- Brief digression into hosting solution/search. Fly.io did not deploy properly (something to do with husky in the errors)?
- [x] Fix some formatting/width styling wonkiness.
- [x] Finish sentiment analysis piece.
  - Fix CORS issue with SA temp: This disappeared just as suddenly as it occurred.
  - Rewrite for text array and passing tweets array.
- [x] Fix sorting (currently a cheap workaround).
- [x] Handle user search error: user not found or suspended.
- [x] Format analysis outputs.
- [x] Figure out deployment. **Deployed!**
- [x] Make analysis output more visual. 
  - [ ] Fix tooltip width. _Chart presets make this challenging; currently, tweet is moved to alert on click._
  - [x] Change shape of marker indicators
- [x] Refactor to use react router and make app more modular. Could do more...
- [ ] PRIORITY: Debug display logic and chart wonkiness. **This is more of the actual conversion for display.**
- [x] Set up sample data (~30 posts or more) to avoid hitting API too much. **now obsolete**

## Setup notes for development

### Run your own copy

If you want to make your own copy, you will need to first set up a project and app on the [Twitter Developer Platform](https://developer.twitter.com/en/docs/apps/overview) and add a **bearer token** as an environment variable for authorization. After this prework:

Clone this repo;

Create an `.env` file inside backend/config, and add your bearer token there as BEARER_TOKEN.

Start the server in one terminal:

```
cd backend
npm install
npm start
```

Start the web app in a second terminal:

```
cd frontend
npm install
npm start
```

### Reminders
1. npm install your: prettier pretty-quick husky
2. husky: [you are likely on npm version > 7](https://dev.to/maithanhdanh/configuration-for-husky-pre-commit-1fo5)
3. pretty-quick: unlike what the docs say, you need `npx` in the pre-commit hook for it to run properly using husky: `npx pretty-quick --staged`
4. Remember to set up authorization for set of searches (to override) or individually under "auth" even if you have a saved environment selected.

## Learnings
### Observations
- [node-fetch](https://github.com/node-fetch/node-fetch/tree/2.x#readme) for ...server-side HTTP reqs - but turns out this can [only be done with import](https://stackoverflow.com/questions/69081410/error-err-require-esm-require-of-es-module-not-supported) (everything must then be updated to import.. syntax)... so I am discovering why folks like axios so much. Remember the file extension must also be included (".js" in this case) and VS Code's helpful suggestions keep leaving it out (leading to errors).
- TensorFlow: evidently "TypeError: forwardFunc is not a function" indicates some version incompatibility between model APIs and the core tf code.
- ["Platform node has already been set. Overwriting the platform with…cpu backend was already registered"](https://discuss.tensorflow.org/t/platform-node-has-already-been-set-overwriting-the-platform-with-cpu-backend-was-already-registered/4978)
- Tinkering too long = CORS problems start up again? And disappear just as suddenly.
- CanvasJS for React: If there is only 1 data series, it bewilderingly displays each point with a different color. If there are >=2 data series, each data series receives a consistent color treatment.

### Reference
- [Interesting to see how sentiment analysis struggles with sarcasm](https://www.csc2.ncsu.edu/faculty/healey/tweet_viz/)
- [TensorFlow sentiment model](https://github.com/tensorflow/tfjs-examples/tree/master/sentiment)
- [Tensorflow.js Sentiment CNN model and walkthrough](https://towardsdatascience.com/twitter-sentiment-analysis-with-node-js-ae1ed8dd8fa7) - [Benson Ruan](https://github.com/bensonruan/), re: sentiment threshold values.
- node-fetch in browser under the hood for these proxies: [isomorphic-fetch](https://www.npmjs.com/package/isomorphic-fetch), [cross-fetch](https://github.com/lquixada/cross-fetch#why-not-isomorphic-fetch). I like the ES6 module import syntax more as well.
- [canvas.js](https://canvasjs.com/react-charts/scatter-point-chart-custom-marker/) could work. Unique shapes can help with avoiding dependence solely on color for the visualization although I'm curious about accessibility of this approach overall. (The tooltip as well.) However, chart titles appear fuzzy/blurry.

## Other slow-moving projects

**Brute-force pangram**: https://github.com/h-yung/pangram

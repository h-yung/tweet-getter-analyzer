# Tester

Twitter Timeline API.
Retrieve latest tweets of public figures and analyze sentiment.

## Setup

Sending requests to server and then Twitter to keep secrets safe. Not sure this is the best approach.

- [node-fetch](https://github.com/node-fetch/node-fetch/tree/2.x#readme) for ...server-side HTTP reqs - but turns out this can [only be done with import](https://stackoverflow.com/questions/69081410/error-err-require-esm-require-of-es-module-not-supported) (everything must then be updated to import.. syntax)... so I am discovering why folks like axios so much. Remember the file extension must also be included (".js" in this case).

**Dev only**

1. npm install your: prettier pretty-quick husky
2. husky: [you are likely on npm version > 7](https://dev.to/maithanhdanh/configuration-for-husky-pre-commit-1fo5)
3. pretty-quick: unlike what the docs say, you need `npx` in the pre-commit hook for it to run properly using husky: `npx pretty-quick --staged`

Postman

1. Remember to set up authorization for set of searches (to override) or individually under "auth" even if you have a saved environment selected.

## Current status

- [x] Successful Postman test of API (Twitter API v2), need to set up server.
- [x] Make successful server-side req to Twitter API (Postman -> server -> API). A long struggle later, it turns out the env vars were not actually being found/recognized server-side. Trimmed dependencies back down and imported dotenv for the main controller instead.
- Brief digression into hosting solution/search. Fly.io did not deploy properly (something to do with husky in the errors)?
- [ ] Fix some formatting/width styling wonkiness.

## Resources

[Interesting to see how sentiment analysis struggles with sarcasm](https://www.csc2.ncsu.edu/faculty/healey/tweet_viz/)

[Tensorflow.js Sentiment CNN model and walkthrough](https://towardsdatascience.com/twitter-sentiment-analysis-with-node-js-ae1ed8dd8fa7) - [Benson Ruan](https://github.com/bensonruan/)

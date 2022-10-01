# Tweet getter & analyzer

Retrieve latest tweets of public figures and analyze sentiment. Uses [Twitter API v.2](https://developer.twitter.com/en/docs/twitter-api). Requests are routed via a server so as to protect tokens/keys/secrets.

...The sentiment analysis bit is WIP - planning to use TensorFlow.

**Tech used**: Node, Express, vaguely MVC architecture (but not quite), and node-fetch for http reqs from server (I know, it's not axios!). Front end built with React.

![tweet_getter_r1](https://user-images.githubusercontent.com/102257735/193356993-c6bdc5f6-6198-4c01-9f09-974d65402634.png)

## Run

Not yet deployed, so you will need environment variables by setting up a project and app on the Twitter Developer Platform. Ultimately, you need a **bearer token** to pass for authorization.

Start the server in one terminal:

1. `cd backend`, `npm install`, then `npm start`

Start the web app in a second terminal:

1. `cd frontend`, `npm install`, `npm start`

## Progress

- [x] Successful Postman test of API (Twitter API v2), need to set up server.
- [x] Make successful server-side req to Twitter API (Postman -> server -> API). A long struggle later, it turns out the env vars were not actually being found/recognized server-side. Trimmed dependencies back down and imported dotenv for the main controller instead.
- Brief digression into hosting solution/search. Fly.io did not deploy properly (something to do with husky in the errors)?
- [x] Fix some formatting/width styling wonkiness.
- [ ] Finish sentiment analysis piece.
  - Fix CORS issue with SA temp.
  - Rewrite for text array and passing tweets array.
- [ ] Format analysis outputs.
- [ ] Figure out deployment.

## Setup notes for development

1. npm install your: prettier pretty-quick husky
2. husky: [you are likely on npm version > 7](https://dev.to/maithanhdanh/configuration-for-husky-pre-commit-1fo5)
3. pretty-quick: unlike what the docs say, you need `npx` in the pre-commit hook for it to run properly using husky: `npx pretty-quick --staged`
4. Remember to set up authorization for set of searches (to override) or individually under "auth" even if you have a saved environment selected.

- [node-fetch](https://github.com/node-fetch/node-fetch/tree/2.x#readme) for ...server-side HTTP reqs - but turns out this can [only be done with import](https://stackoverflow.com/questions/69081410/error-err-require-esm-require-of-es-module-not-supported) (everything must then be updated to import.. syntax)... so I am discovering why folks like axios so much. Remember the file extension must also be included (".js" in this case).
- TensorFlow: evidently "TypeError: forwardFunc is not a function" indicates some version incompatibility between model APIs and the core tf code.
- ["Platform node has already been set. Overwriting the platform with…cpu backend was already registered"](https://discuss.tensorflow.org/t/platform-node-has-already-been-set-overwriting-the-platform-with-cpu-backend-was-already-registered/4978)
- Tinkering too long = CORS problems start up again? ....

## Resources and reference

- [Interesting to see how sentiment analysis struggles with sarcasm](https://www.csc2.ncsu.edu/faculty/healey/tweet_viz/)
- [TensorFlow sentiment model](https://github.com/tensorflow/tfjs-examples/tree/master/sentiment)
- [Tensorflow.js Sentiment CNN model and walkthrough](https://towardsdatascience.com/twitter-sentiment-analysis-with-node-js-ae1ed8dd8fa7) - [Benson Ruan](https://github.com/bensonruan/)

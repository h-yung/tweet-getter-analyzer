# Tester

Twitter Timeline API.
Builds on [sample code](https://github.com/twitterdev/Twitter-API-v2-sample-code).

Retrieve latest tweets of public figures and analyze sentiment.

## Setup

**Dev only**

1. npm install your: prettier pretty-quick husky
2. husky: [you are likely on npm version > 7](https://dev.to/maithanhdanh/configuration-for-husky-pre-commit-1fo5)
3. pretty-quick: unlike what the docs say, you need `npx` in the pre-commit hook for it to run properly using husky: `npx pretty-quick --staged`

Postman

1. Remember to set up authorization for set of searches (to override) or individually under "auth" even if you have a saved environment selected.

## Current status

- [x] Successful Postman test of API, need to set up server.

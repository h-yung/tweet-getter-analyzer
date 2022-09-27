# Tester


## Setup

**Dev only**

1. npm install your: prettier pretty-quick husky
2. husky: [you are likely on npm version > 7](https://dev.to/maithanhdanh/configuration-for-husky-pre-commit-1fo5)
3. pretty-quick: unlike what the docs say, you need `npx` in the pre-commit hook for it to run properly using husky: `npx pretty-quick --staged`

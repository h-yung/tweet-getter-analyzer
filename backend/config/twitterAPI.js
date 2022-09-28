const Client = require("twitter-api-sdk");

// const getPage = async (url, params, options, nextToken) => {
//   if (nextToken) {
//     params.pagination_token = nextToken;
//   }

//   try {
//     const resp = await needle("get", url, params, options);

//     if (resp.statusCode != 200) {
//       console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
//       return;
//     }
//     return resp.body;
//   } catch (err) {
//     throw new Error(`Request failed: ${err}`);
//   }
// };

// module.exports = getPage;

import { useState } from "react";
import { isEmpty } from "./utils/validateInput";
import { getTweets } from "./api/twitter";

function App() {
  const [username, setUsername] = useState(""); //currently id

  const getRecent = async (e) => {
    e.preventDefault();
    getTweets(username);
    try {
      console.log("trying");
      const options = {};
      const response = await fetch(`http://localhost:3001/${username}`);
      const data = await response.json();
      // console.log(data)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Womp</h1>
        <span>Tweet getter from user timeline.</span>
      </header>
      <div>
        <form onSubmit={(e) => getRecent(e)}>
          <label>
            User name:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button disabled={isEmpty(username)}>Get tweets</button>
            {isEmpty(username) && <span>Enter a username</span>}
          </label>
        </form>
        <button type="button" onClick={() => setUsername("")}>
          Clear
        </button>
        <h3>
          Placeholder: specify where JSON is written in local file system? Clear
          + Save buttons?
        </h3>
      </div>
      <main>
        <h2>Tweets</h2>
      </main>
      <footer>
        <p>Made by LCM.</p>
      </footer>
    </div>
  );
}

export default App;

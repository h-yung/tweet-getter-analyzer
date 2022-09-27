import { useState } from 'react';
import { isEmpty } from './utils/validateInput';

function App() {
  const [username, setUsername] = useState('');

  const getRecent = (e)=>{
    e.preventDefault();
    //api call here
  }

  return (
    <div className="App">
      <header>
        <h1>Womp</h1>
        <span>Tweet getter from user timeline.</span>
      </header>
      <div>
        <form
          onSubmit={(e)=>getRecent(e)}
        >
          <label>
            User name:
            <input
              type='text'
              onChange={(e)=>setUsername(e.target.value)}
            />
            <button
              disabled={isEmpty(username)}
            >
              Get tweets
            </button>
            {isEmpty(username) && <span>Enter a username</span>}
          </label>
        </form>
        <button 
          type="button"
          onClick={()=>setUsername('')}
        >
          Clear
        </button>
        <h3>Placeholder: specify where JSON is written in local file system? Clear + Save buttons?</h3>
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

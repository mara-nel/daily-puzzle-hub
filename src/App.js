import MyGames from './myGames';
import Explore from './explore';
import { useState, useEffect } from "react";
import './App.css';

function App() {
  const [pinnedGames, setPinnedGames] = useLocalStorage("games", []);
  const [dateTracker, setDateTracker] = useLocalStorage("dateTracker", new Date().toISOString().split("T")[0]);
  useEffect(() => {
    let currentDate = new Date().toISOString().split("T")[0];
    if (dateTracker < currentDate) {
      setDateTracker(currentDate);
      let dailyReset = pinnedGames;
      dailyReset.forEach(game => {
        game.visited = false;
        game.completed = false;
      });
      setPinnedGames(dailyReset);
    }
  }, []);


  const addAGame = (game) => {
    if(!pinnedGames.some(pg => pg.title === game.title)) {
      setPinnedGames([...pinnedGames, game]);
    }
  }
  const removeGame = (game) => {
    setPinnedGames(pinnedGames.filter(pg => pg.title !== game.title));
  }
  const markVisited = (game) => {
    let updatedPinnedGames = pinnedGames;
    updatedPinnedGames.forEach(pg => {
      if (pg.title === game.title) {
        pg.visited = true;
      }
    });
    setPinnedGames(updatedPinnedGames);
  }

  const toggleCompletion = (game) => {
    console.log('attempting to toggle');
    let updatedPinnedGames = pinnedGames;
    updatedPinnedGames.forEach(pg => {
      if (pg.title === game.title) {
        pg.completed = !pg.completed;
      }
    });
    setPinnedGames(updatedPinnedGames);
  }

  return (
    <div className="App">
      <h1>Daily Puzzle Hub</h1>
      <MyGames games={pinnedGames} remove={removeGame} markVisited={markVisited} toggleCompletion={toggleCompletion}/>
      <Explore add={addAGame} pinnedGames={pinnedGames}/>
    </div>
  );
}

function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // If item doesn't exist, add it to localStorage using initialValue
      if (item === null) {
        window.localStorage.setItem(key, JSON.stringify(initialValue));
      }
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}


export default App;

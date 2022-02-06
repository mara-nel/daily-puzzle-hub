import GameCard from './GameCard';

const MyGames = ({games, remove, markVisited, toggleCompletion}) => {
  console.log(games);
  return (
    <div>
      <h2>My Games</h2>
      <ul>
      {games.map((game, i) => (
        <li key={i}>
          <GameCard
            title={game.title} 
            image={game.image}
            content={<div className='gameCard-pinnedContent'>
              <div className='gameCard-status'>
                {game.visited ? 'Visited' : 'Not yet visited'}
                {game.visited && <label>
                  <input type="checkbox" value="completed" checked={game.completed} onChange={() => toggleCompletion(game)}></input>
                  Completed
                </label>}
              </div>
              <a href={game.url} onClick={() => markVisited(game)}>Play Now</a>
              <button onClick={() => remove(game)}>Remove Game</button>
            </div>}
          />
        </li>
      ))}
      </ul>
    </div>
  )
}

export default MyGames;

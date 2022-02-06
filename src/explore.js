import trackedGames from './trackedGames'; 
import UnpinnedGame from './UnpinnedGame';

const Explore = ({pinnedGames, add}) => {

  return (
    <div>
      <h2>Explore</h2>
      <ul style={{display: 'flex', flexWrap: 'wrap'}}>
        {trackedGames.map((game,i) => (
          <li key={i}>
            <UnpinnedGame 
              title={game.title} 
              image={game.image} 
              pinned={pinnedGames.filter(pg => pg.title === game.title).length === 1}
              onClick={() => add(game)} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Explore;

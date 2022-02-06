import GameCard from './GameCard';

const UnpinnedGame = ({title, image, onClick, pinned}) => {
  return (
    <GameCard
      title={title}
      image={image}
      content={
        (pinned === true) 
          ? <div>Added to My Games</div> 
          : <button onClick={onClick}>Add to My Games</button>
      }
    />
  )
}

export default UnpinnedGame;

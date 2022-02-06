const GameCard = ({title, image, content}) => {
  return (
    <div className='gameCard'>
      <img src={image} alt={`Logo for the ${title} game`} width='64' height='64'/>
      <div>
        <h3>{title}</h3>
        {content}
      </div>
    </div>
  )
}

export default GameCard;

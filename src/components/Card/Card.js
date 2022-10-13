import './Card.scss';

const Card = (props) => {
    
    const { card, handleDeleteCard } = props;
    return (
       <>
            <div className='card-item'>
                {card.image && 
                    // eslint-disable-next-line
                    <img className='card__cover' src={card.image} onMouseDown={(event) => event.preventDefault()}/>
                }
                <div className='card-item__title'>
                    { card.title }
                    <i className='fa fa-times icon' onClick={() => handleDeleteCard(card)}></i>
                </div>
                
            </div>
       </> 
    )
}

export default Card;
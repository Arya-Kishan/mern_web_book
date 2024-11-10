import React, { useState } from 'react'
import MyImage from '../../MyImage'

const Card = ({ card, cards, setCards, flippedCard, setFlippedCard }) => {

    const handleClick = () => {

        // ALREADY CLICKED OR FLIPPED
        if (card.show || flippedCard.length >= 2) {
            return 0;
        }

        let newCards = JSON.parse(JSON.stringify(cards));
        console.log(newCards);
        newCards[card.id] = { ...card, show: true };
        setCards(newCards);
        setFlippedCard(prev => [...prev, { ...card, show: true }]);
    }

    return (
        <div onClick={handleClick} className={`w-[60px] lg:w-[80px] h-[60px] lg:h-[80px] ${!card.show ? "bg-teal-500" : "bg-blue-900"} flex justify-center items-center`}>
            {card.show && <MyImage src={card.pic} className={"w-[30px] h-[30px]"} />}
        </div>
    )

}

export default Card
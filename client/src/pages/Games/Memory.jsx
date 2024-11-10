import React, { useEffect, useState } from 'react'
import Card from '../../components/Games/Mmemory/Card'
import settingIcon from "../../assets/setting.svg"
import MyImage from '../../components/MyImage'

import birdIcon from "../../assets/memory_game/bird.svg"
import catIcon from "../../assets/memory_game/cat.svg"
import dinosaurIcon from "../../assets/memory_game/dinosaur.svg"
import elephantIcon from "../../assets/memory_game/elephant.svg"
import pandaIcon from "../../assets/memory_game/panda.svg"
import ratIcon from "../../assets/memory_game/rat.svg"
import spiderIcon from "../../assets/memory_game/spider.svg"
import swanIcon from "../../assets/memory_game/swan.svg"

const Memory = () => {

  const level1 = {
    name: "easy",
    cardsArr: [
      { pic: birdIcon, name: "birdIcon", show: false },
      { pic: catIcon, name: "catIcon", show: false },
      { pic: spiderIcon, name: "spiderIcon", show: false },
      { pic: swanIcon, name: "swanIcon", show: false },
    ],
    grid: 4
  }

  const level2 = {
    name: "difficult",
    cardsArr: [
      { pic: birdIcon, name: "birdIcon", show: false },
      { pic: catIcon, name: "catIcon", show: false },
      { pic: dinosaurIcon, name: "dinosaurIcon", show: false },
      { pic: elephantIcon, name: "elephantIcon", show: false },
      { pic: pandaIcon, name: "pandaIcon", show: false },
      { pic: ratIcon, name: "ratIcon", show: false },
    ],
    grid: 6
  }

  const [cards, setCards] = useState([]);
  const [level, setLevel] = useState(level1);
  const [showSetting, setShowSetting] = useState(false);
  const [flippedCard, setFlippedCard] = useState([]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    // Assign a unique id to each object based on its index after shuffling
    array.forEach((obj, index) => {
      obj.id = index;
    });

    return array;
  }

  function createRepeatedArrayWithUniqueIds(objectsArray, totalLength) {

    const repeatCount = totalLength / objectsArray.length;
    const result = [];
    let uniqueIdCounter = 0;

    for (let i = 0; i < repeatCount; i++) {
      objectsArray.forEach(obj => {
        result.push({ ...obj, id: `${uniqueIdCounter++}` });
      });
    }

    return shuffleArray(result);
  }

  const handleReset = () => {
    setCards(createRepeatedArrayWithUniqueIds(level.cardsArr, level.grid * level.grid))
  }

  useEffect(() => {

    if (flippedCard.length == 2) {

      if (flippedCard[0].name == flippedCard[1].name) {
        setFlippedCard(prev => []);
      } else {

        setTimeout(() => {
          let newCards = JSON.parse(JSON.stringify(cards));

          flippedCard.forEach((card) => {
            newCards[card.id] = { ...card, show: false };
          })

          setCards(newCards);
          setFlippedCard(prev => []);

        }, 1000);

      }

    }
  }, [flippedCard])

  useEffect(() => {
    setCards(createRepeatedArrayWithUniqueIds(level.cardsArr, level.grid * level.grid))
  }, [level])

  return (
    <div className='size-full flex flex-col gap-4 justify-start items-center relative'>

      <div className='w-full h-[40px] flex items-center justify-between gap-2 relative'>
        <p className='font-semibold text-xl capitalize border-b-2 border-white'>Memory Game</p>
        <MyImage src={settingIcon} className={"w-[30px] h-[30px]"} onClick={() => setShowSetting(!showSetting)} />
        {
          showSetting
          &&
          <div className='absolute top-7 right-7 w-[200px] h-fit rounded-md shadow-md shadow-black bg-blue1'>
            <p onClick={() => { setLevel(level1); setShowSetting(!showSetting) }} className='px-2 py-1' >Easy</p>
            <p onClick={() => { setLevel(level2); setShowSetting(!showSetting) }} className='px-2 py-1' >Difficult</p>
          </div>
        }
      </div>

      {
        level.grid == 4
        &&
        <div
          className={`w-fit grid grid-cols-4 grid-rows-4 gap-1`}>
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              cards={cards}
              setCards={setCards}
              flippedCard={flippedCard}
              setFlippedCard={setFlippedCard} />
          ))}
        </div>
      }

      {
        level.grid == 6
        &&
        <div
          className={`w-fit grid grid-cols-4 md:grid-cols-6 grid-rows-8 md:grid-rows-6 gap-1`}>
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              cards={cards}
              setCards={setCards}
              flippedCard={flippedCard}
              setFlippedCard={setFlippedCard} />
          ))}
        </div>
      }

      <div>
        <button onClick={handleReset} className='w-[100px] bg-blue2 px-2 py-1 rounded-md'>Reset</button>
      </div>

    </div>
  )
}

export default Memory
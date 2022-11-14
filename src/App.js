import { useEffect, useState } from 'react'
import SingleCard from './components/SingleCard'
import './App.css'

const cardImages = [
  {"src" : "/img/sword-1.png", matched:false},
  {"src" : "/img/helmet-1.png", matched:false},
  {"src" : "/img/potion-1.png", matched:false},
  {"src" : "/img/ring-1.png", matched:false},
  {"src" : "/img/scroll-1.png", matched:false},
  {"src" : "/img/shield-1.png", matched:false}
]

function App() {
  const [cards, serCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiseOne, setChoiseOne] = useState(null)
  const [choiseTwo, setChoiseTwo] = useState(null)

  //shuffle card function
  const shuffleCards = () =>{
    const shuffeledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card , id:Math.random() }))
    serCards(shuffeledCards)
    setTurns(0)
  }
  
  // handle a choice
  const handleChoice = (card) => {
    choiseOne ? setChoiseTwo(card) : setChoiseOne(card)
  }


  // compare choises
  useEffect(() => {
    if(choiseOne && choiseTwo){
      
      if(choiseOne.src === choiseTwo.src){
        console.log("U WIN !!");
        resetTurn()
      }else {
        console.log("Not match !!") 
        resetTurn()
       }
    }
  } , [choiseOne , choiseTwo])

  //reset choice & increase turn
  const resetTurn = () => {
    setChoiseOne(null)
    setChoiseTwo(null)
    setTurns(prevTurns => prevTurns+1)
  }



  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards }>New Game</button>
      <div className="card-grid">
          {cards.map( card => (
            <SingleCard
            card={card} 
            key={card.id}
            handleChoice={handleChoice}
            />
          ))}
      </div>
    </div>
  );
}

export default App
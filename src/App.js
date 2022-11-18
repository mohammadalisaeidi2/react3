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
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiseOne, setChoiseOne] = useState(null)
  const [choiseTwo, setChoiseTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  //shuffle card function
  const shuffleCards = () =>{
    const shuffeledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card , id:Math.random() }))
    
      setChoiseOne(null)
      setChoiseTwo(null)
      setCards(shuffeledCards)
      setTurns(0)
  }
  
  // handle a choice
  const handleChoice = (card) => {
    choiseOne ? setChoiseTwo(card) : setChoiseOne(card)
  }


  // compare choises
  useEffect(() => {
    if(choiseOne && choiseTwo){
      setDisabled(true)
      
      if(choiseOne.src === choiseTwo.src){
        setCards(prevCards =>{
          return prevCards.map(card =>{
            if(card.src === choiseOne.src) {
              return {...card, matched: true}
            }else{
              return card
            }
          })
        })
        resetTurn()
      }else {
 
        setTimeout(() => resetTurn(), 500)
       }
    }
  } , [choiseOne , choiseTwo])

  console.log(cards)

  //reset choice & increase turn
  const resetTurn = () => {
    setChoiseOne(null)
    setChoiseTwo(null)
    setTurns(prevTurns => prevTurns+1)
    setDisabled(false)
  }


  //start a game automatically
  useEffect (() => {
    shuffleCards()
  }, [])



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
            flipped={card ===choiseOne || card === choiseTwo || card.matched}
            disabled = {disabled}
            />
          ))}
      </div>
      <p>turns: {turns}</p>
    </div>
  );
}

export default App
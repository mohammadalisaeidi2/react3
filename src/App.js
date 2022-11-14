import { useEffect, useState } from 'react'
import './App.css'

const cardImages = [
  {"src" : "/img/sword-1.png"},
  {"src" : "/img/helmet-1.png"},
  {"src" : "/img/potion-1.png"},
  {"src" : "/img/ring-1.png"},
  {"src" : "/img/scroll-1.png"},
  {"src" : "/img/shield-1.png"}
]

function App() {
  const [cards, serCards] = useState([])
  const [turns, setTurns] = useState(0)

  //shuffle card function
  const shuffleCards = () =>{
    const shuffeledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card , id:Math.random() }))
    serCards(shuffeledCards)
    setTurns(0)
  }
  
  console.log(cards, turns)



  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards }>New Game</button>

      <div className='card-grid'>
        {cards.map( card => (
          <div className='card' key={card.id}>
            <div>
              <img className='front' src={card.src} alt='card front' ></img>
              <img className='back' src='/img/cover.png' alt='card back'></img>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App
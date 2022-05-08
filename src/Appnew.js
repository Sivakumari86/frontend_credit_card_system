import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Header } from './components/Header'
import { Users } from './components/Users'
import { DisplayBoard } from './components/DisplayBoard'

import { getAllCards} from './components/Services/CardService'

function App() {
 const [card, setCard] = useState({})
  const [cards, setCards] = useState([])
  

  const fetchAllCards = () => {
    getAllCards()
      .then(cards => {
        console.log(cards)
        setCards(cards);
      });
  }

  useEffect(() => {
    getAllCards()
      .then(cards => {
        console.log(cards)
        setCards(cards);
        
      });
  }, [])

  const onChangeForm = (e) => {
      if (e.target.name === 'firstname') {
          user.firstName = e.target.value;
      } else if (e.target.name === 'lastname') {
          user.lastName = e.target.value;
      } else if (e.target.name === 'email') {
          user.email = e.target.value;
      }
      setCard(card)
  }
  
    
    return (
        <div className="App">
          <Header></Header>
          <div className="container mrgnbtm">
            <div className="row">
        <p>This is to add card</p>
              <div className="col-md-4">
                  <DisplayBoard
                   
                    getAllCards={fetchAllCards}
                  >
                  </DisplayBoard>
              </div>
            </div>
          </div>
          <div className="row mrgnbtm">
            <CardList cards={cards}></CardList>
          </div>
        </div>
    );
}

export default App;
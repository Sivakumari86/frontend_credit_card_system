import React, { useState, useEffect } from "react";
import $ from 'jquery-ajax';
import './App.css';
import Form from './components/Form';
import CardList from './components/CardList';
import ValidationErrors from './components/ValidationErrors';

const urlGetAll = "/credit/cards";
const urlAdd = "/credit/addCard";


function App() {
  const [card, setCard] = useState({
          name: '', cardNumber: '', limit: 0
  });
  const [validationErrors, setValidationErrors] = useState({
    name: false, cardNumber: false, limit: false
  });
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    $.get(urlGetAll, response => setCardList(response));
  }, []);

  const handleInputChange = event => {
    console.log('handle input change..', event);
    let obj = {[event.target.name] : event.target.value};
    setCard(() => ({ ...card, ...obj }));
  }

  const isFormValid = () => {
    console.log('isFormValid change..');
    const nameRegex = /^[^0-9.]+$/;
    const limitRegex = /^[0-9]+$/;
    let errors = {name: true, cardNumber: true, limit: true};
    console.log('name is..',card.name);
    console.log('cardNumber is..',card.cardNumber);
    if (nameRegex.test(card.name))
      errors.name = false;
    if (checkCardNumber())
      errors.cardNumber = false;
    if (limitRegex.test(card.limit) && card.limit >= 100)
      errors.limit = false;
    setValidationErrors(errors);
    return !Object.values(errors).some(error => error === true);
  }

  const checkCardNumber = () => {
    const cardNumber = card.cardNumber.replace(/ /g,'').replace(/-/g,'');
    return cardNumber.length >= 16 && cardNumber.length <= 19 
          && checkLuhn10(cardNumber);
  }  

  const checkLuhn10 = cardNumber => {
    let sum = 0;
    for (let i=0; i<cardNumber.length; i++){
      let digit = Number(cardNumber.charAt(i));
      if (i % 2 === 0) {
        digit *= 2;
        if (digit > 9)
          digit -= 9;
      }
      sum += digit;
    }
    return (sum % 10) === 0;
  }

  const addCard = () => {
    if (isFormValid()){
      $.ajax({
        url:urlAdd,
        type:"POST",
        data:JSON.stringify(card),
        'Access-Control-Allow-Origin': '*',
        contentType:"application/json;charset=utf-8",
        success: function(r){
          console.log("function called success")
          setCardList( [...cardList, card] );
          setCard({name: '', cardNumber: '', limit: ''});
        },
        error: function(xhr, status, error){
          console.log('status code is ..',xhr.status);
          if (xhr.status === 409) {
            alert("A Credit Card with that number already exists!");
          } 
          if (xhr.status === 201) {
            setCardList( [...cardList, card] );
          setCard({name: '', cardNumber: '', limit: ''});
          } 
        }
      });
    }
  }

  return (
    <div className="App">
      <h1>Credit Card System</h1>
      <p> Use the form below to add a new Credit Card to the System </p>

      <Form card={card} 
            handleInputChange={handleInputChange}
            addCard={addCard} />

      <ValidationErrors errors={validationErrors} />

      <CardList cards={cardList} />

    </div>
  );
}

export default App;

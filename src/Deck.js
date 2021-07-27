import React, { Component } from 'react';
import axios from 'axios';
import Card from "./Card";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {deck: null, drawn: []};
    this.getCard = this.getCard.bind(this);
  }

  async componentDidMount() {
    let deck = await axios.get(`${API_BASE_URL}/new/shuffle`);
    this.setState({deck: deck.data});
  }

  async getCard() {
    const id = this.state.deck.deck_id;
    const cardUrl = `${API_BASE_URL}/${id}/draw/`;
    
    try {
      let cardRes = await axios.get(cardUrl);
      if(!cardRes.data.success && cardRes.data.remaining === 0) {
        throw new Error("No cards left");
      } else {
        let card = cardRes.data.cards[0];
        this.setState(st => ({
          drawn: [
            ...st.drawn,
            {
              id: card.code,
              image: card.image,
              name: `${card.value} ${card.suit}`
            }
          ]
        }));
      }
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    const cards = this.state.drawn.map(c => {
      return(
        <Card
        key={c.id}
        image={c.image}
        name={c.name}
        />
      )
    })
    return (
      <div>
        <h1>Card Dealer</h1>
        <button onClick={this.getCard}>Get Card!</button>
        <div className="deck">
          {cards}
        </div>
      </div>
    )
  }
}

export default Deck;
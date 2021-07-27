import React, { Component } from 'react'

class Card extends Component {
  render() {
    return (
      <img src={this.props.image} alt={this.props.name} className="card"/>
    )
  }
}

export default Card;
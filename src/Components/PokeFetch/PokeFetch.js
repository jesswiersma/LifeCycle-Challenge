import React, { Component } from 'react'
import Timer from "./timer";

import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      time: 0,
      timeOut: undefined,
    }
  }

  decrementTimer() {
    this.setState({
      timeOut: setTimeout(() => {
        if (this.state.time > 0) {
          this.setState({
          time: this.state.time -1
        },() => {
          if (this.state.time >0) {
            this.decrementTimer()
          }
        })
      }
    }, 1000)
    })
  }


  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    clearTimeout(this.state.timeOut)

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          time: 10,
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
          //time: 10,
        })
        this.decrementTimer()
      })
      .catch((err) => console.log(err))
  }


  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        <h1 className={'timer'} >{this.state.time}</h1>
        {/* <Timer/> */}
        
        <div className={'pokeWrap'}>
           <img className={'pokeImg'} src={this.state.pokeSprite} /> 
          <h1 className={'pokeName'}>{this.state.pokeName}</h1>
        </div>
      </div>
    )
  }
}

export default PokeFetch;
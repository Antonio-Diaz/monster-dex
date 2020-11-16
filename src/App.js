import React, { Component } from "react";
import { CardList } from './components/card-list/card-list.component'
import { SearchBox } from './components/search-box/search-box.component'
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      monstersDetails: [],
      searchField: '',
    }
  }
  
   componentDidMount(){
    this.getMoreMonsters();
   }   

  getMoreMonsters() {
    let url = "https://pokeapi.co/api/v2/pokemon/?limit=151"

    fetch(url)
    .then(response => response.json())
    .then(data => {
      if(data) {
        this.setState({ monsters: data.results }, () => {
          this.state.monsters.map(monster => {
            fetch(monster.url)
            .then(response => response.json())
            .then(data => {
              if(data) {
                let temp = this.state.monstersDetails
                temp.push(data)
                this.setState({monstersDetails: temp})
              }
            })
            .catch(console.log)
          })
        })
      }
    })
    .catch(console.log)
   }

   onSearchChange = event => {
     this.setState({ searchField: event.target.value })
   }

  render() {
    const { monstersDetails, searchField } = this.state;

    const filterMonster = monstersDetails.filter(monster => monster.name.toLowerCase().includes(searchField.toLocaleLowerCase()))

    return (
      <div className="App">
      <h1> monsterDex </h1>
       <SearchBox
          onSearchChange={ this.onSearchChange }
       />
       <CardList 
          monsters={ filterMonster } 
       /> 
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react'
import Search from '../components/Search'
import Calculate from '../components/Calculate'
//axios was installed to assist with post requests
import axios from 'axios'
import Portfolio from './Portfolio'

class PortfolioContainer extends Component {
  constructor(props){
    super(props)

    this.state = {
      name: '',
      portfolio: [],
      search_results: [],
      active_currency: null,
      amount: ''
    }

    //this line "binds" the class to the function handleChange
    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAmount = this.handleAmount.bind(this)
  }

  //handleChange is linked to the search: onChange triggers it.
  //as its defined in Search as this.props, it knows what comes next
  // is not in the same component, so it moves up a level and looks for the function with the correct name.
  // handleChange takes the event (e) as argument, it means that it will be
  //triggered as described in Search.js: onChange.
  //Upon changes in the e (typing or deleting in the search box), handleChange
  //takes the value (letters) and "set the state" in the props, for that, it takes the e as
  // an argument and which prop is the "target", below the state name is the target and
  //that will equal to the value
  //this is dynamic and changes as you type or delete, as it can be seem by
  //console.logging this.state.name (this from 2nd line of the func + prop after target on 3rd line)


  //
  handleChange(e){
    axios.post('http://localhost:3000/search', {
      search: e.target.value
    })
     .then((data) => {
      this.setState({
      search_results: [...data.data.currencies]
      })
    })
     .catch((data) => {

     })

    // console.log(this.searchResults)
  }

  handleSelect(e){
    e.preventDefault()
    const id = e.target.getAttribute('data-id')
    const activeCurrency = this.state.search_results.filter( item => item.id == parseInt(id))
    this.setState({
      active_currency: activeCurrency[0],
      search_results: []
    })
   }


  handleSubmit(e){
    e.preventDefault()

    let currency = this.state.active_currency
    let amount = this.state.amount

    axios.post('http://localhost:3000/calculate', {
      id: currency.id,
      amount: amount
    })
    .then( (data) => {
      console.log(data)
      this.setState({
        amount: '',
        active_currency: null,
        portfolio: [...this.state.portfolio, data.data]
      })
    })
    .catch( (data) => {
      // debugger
    })
  }


  handleAmount(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  //handleChange also appears here as this.handleChange - no need for this.props as its in the same component

  render(){

    const searchOrCalculate = this.state.active_currency ?
    <Calculate
      handleChange={this.handleAmount}
      handleSubmit={this.handleSubmit}
      active_currency={this.state.active_currency}
      amount={this.state.amount}
    /> :
    <Search
      handleSelect={this.handleSelect}
      searchResults={this.state.search_results}
      handleChange={this.handleChange} />

    return(
      <div className="grid">
        <div className="left">
          {searchOrCalculate}
        </div>
        <div className="right">
          <Portfolio portfolio={this.state.portfolio}/>
        </div>
      </div>
    )
  }
}


export default PortfolioContainer

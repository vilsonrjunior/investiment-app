import React, { Component } from 'react'
import PortfolioContainer from './PortfolioContainer'
import axios from 'axios'

//needed to include the const below in order to avoid issue with
//rails authenticity token when making requests
const csrfToken = document.querySelector('[name="csrf-token"]').content
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

class App extends Component {
  render() {
    return(
      < PortfolioContainer/>
    )
  }
}

export default App

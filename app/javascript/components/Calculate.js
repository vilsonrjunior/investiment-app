import React, { Component } from 'react'

const Calculate = (props) => {
      return(
        <div>
          <h1>How much {props.active_currency.name} do you own?</h1>
          <form onSubmit={props.handleSubmit}>
            <div className="form-group">
              <label>Enter amount owned</label><br/>
              <input onChange={props.handleChange} autoComplete="off" type="text" name="amount" value={props.amount} className="field"/>
            </div>
            <div className="form-group">
              <input type="submit" className="calculate-btn" value="Calculate my total"/>
            </div>
          </form>
        </div>
    )
  }

export default Calculate


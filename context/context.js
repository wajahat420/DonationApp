import React, { Component } from 'react'

export const MyContext = React.createContext()

export default class context extends Component {
      state = {
            amount : 0
      }
      updateAmount = (amount)=>{
            console.log("amount",amount)
            this.setState({amount})
      }
      render() {
                  return (
                        <MyContext.Provider value={{...this.state, updateAmount : this.updateAmount}}>
                              {this.props.children}
                        </MyContext.Provider>
                              
                  )
      }
}

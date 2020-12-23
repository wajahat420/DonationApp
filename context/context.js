import React, { Component } from 'react'

export const MyContext = React.createContext()

export default class context extends Component {
      state = {
            amount : 0,
            cartOpened : ""
      }
      updateAmount = (amount)=>{
            this.setState({amount})
      }
      openCart=(cartOpened)=>{
            this.setState({cartOpened })
      }
      render() {
                  return (
                        <MyContext.Provider value={{...this.state, updateAmount : this.updateAmount, openCart: this.openCart}}>
                              {this.props.children}
                        </MyContext.Provider>
                              
                  )
      }
}

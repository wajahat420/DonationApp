import React from "react";
import SwitchNavigator from "./navigation/SwitchNavigator";
import ContextProvider from "./context/context"

export default class App extends React.Component {
  render() {
    console.disableYellowBox = true;

    return (
      <ContextProvider>
        <SwitchNavigator />
      </ContextProvider>

      )
    ;
  }
}

import React from "react";
import SwitchNavigator from "./navigation/SwitchNavigator";

export default class App extends React.Component {
  render() {
    console.disableYellowBox = true;
    return <SwitchNavigator />;
  }
}

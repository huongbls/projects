import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";
import React, { Component } from "react";
import Main from "./component/MainComponent";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

const store = ConfigureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;

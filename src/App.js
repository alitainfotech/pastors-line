import React from "react";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import "./App.css";
import MainScreen from "./pages/MainScreen/MainScreen.page";
import store from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <MainScreen />
      </Router>
    </Provider>
  );
}

export default App;

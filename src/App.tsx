import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CryptoDetails from "./components/CryptoDetails/CryptoDetails";
import HomePage from "./pages/HomePage/HomePage";

const App = () => {
  return (
   
        <Router>
          <Switch>
            <Route exact path="/">
              <HomePage />           
            </Route>
            <Route path="/cryptos/:id">
              <CryptoDetails />
            </Route>
          </Switch>
        </Router>
      );
    }
    
export default App;
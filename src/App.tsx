import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import CryptoDetailsPage from "./pages/CryptoDetailsPage/CryptoDetailsPage";
import HomePage from "./pages/HomePage/HomePage";
import "./App.scss";

const App: React.FC = () => {
  return (
   
        <Router>
          <Switch>
            <Route exact path="/">
              <HomePage />           
            </Route>
            <Route path="/cryptos/:id">
              <CryptoDetailsPage />
            </Route>
          </Switch>
        </Router>
      );
    }
    
export default App;
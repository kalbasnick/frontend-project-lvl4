import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import AuthContext from "./contexts/index.jsx";
// import useAuth from "./hooks/index.jsx";

import store from './slices/index.js';

const AuthProvider = ({ children }) => {
  const [loggedId, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedId, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
      <Switch>
          <Route exact path="/">
            <Provider store={store}>
              <HomePage />
            </Provider>
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

function NoMatch() {
  return <h1>Error 404. Page not found</h1>
}

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import AuthContext from "./contexts/index.jsx";
// import useAuth from "./hooks/index.jsx";

import io from 'socket.io-client';

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

const socket = new io();

export default function App() {
  return (
    <AuthProvider>
      <Router>
      <Switch>
          <Route exact path="/">
            <ChatPage socket={socket} />
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

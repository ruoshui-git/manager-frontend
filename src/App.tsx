import React from 'react';
// import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from "./components/Login"
// import UserPage from './components/user_pages/Main';
import Register from './components/Register';
// import Home from './components/Home';
import AppContainer from './components/AppContainer'

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient();

function App() {

  return (
    <Router>
      <ApolloProvider client={client} >
          <Switch>
            {/* <Route exact path='/' component={Home} /> */}
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            <Route path='/app' component={AppContainer} />
          </Switch>
      </ApolloProvider>
    </Router>
  )
}


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;

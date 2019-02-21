import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyC2AyYkZFAMHpF3hm9ifsMDzJEUGgmwwjE",
    authDomain: "bloc-chat-c460d.firebaseapp.com",
    databaseURL: "https://bloc-chat-c460d.firebaseio.com",
    projectId: "bloc-chat-c460d",
    storageBucket: "bloc-chat-c460d.appspot.com",
    messagingSenderId: "828708485035"
  };
  firebase.initializeApp(config);


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1>Bloc Chat</h1>
          <RoomList firebase={firebase} />
        </header>
      </div>
    );
  }
}

export default App;

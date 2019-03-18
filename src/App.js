import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyC2AyYkZFAMHpF3hm9ifsMDzJEUGgmwwjE",
    authDomain: "bloc-chat-c460d.firebaseapp.com",
    databaseURL: "https://bloc-chat-c460d.firebaseio.com",
    projectId: "bloc-chat-c460d",
    storageBucket: "bloc-chat-c460d.appspot.com",
    messagingSenderId: "828708485035"
  };
  const fb=firebase.initializeApp(config);


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeRoom: '',

    }

    this.setActiveRoom = this.setActiveRoom.bind(this);

  }

  setActiveRoom(room) {
    this.setState({activeRoom: room});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1>Bloc Chat</h1>
          <RoomList firebase={fb} setActiveRoom={(room)=>this.setActiveRoom(room)} />
        <div>
          <MessageList firebase={fb} activeRoom={ this.state.activeRoom} />
        </div>
        </header>
      </div>
    );
  }
}

export default App;

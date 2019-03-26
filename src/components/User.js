import React, {Component} from 'react';
import * as firebase from 'firebase';

class User extends Component {
  constructor(props) {
    super(props);

    this.state ={
      users: [],
    };

    this.usersRef = this.props.firebase.database().ref('users');
    this.signInWithPopup = this.signInWithPopup.bind(this);
    this.signOut = this.signOut.bind(this);

    }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
        this.props.setUser(user);
      });
  }

  signInWithPopup() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider).then((result) => {
      const user = result.user;
      this.setState({user});
    });
  }

  signOut(user) {
    this.props.firebase.auth().signOut();
    this.props.setUser(null);

  }

  render() {
    return (
      <div className="user-display">
      <button id="sign-in" onClick={ this.props.user ? this.signOut : this.signInWithPopup}>
       <span>Sign {this.props.user ? 'Out' : 'In'}</span>
      </button>
      <div id="display-name">{this.props.user ? this.props.user.displayName : ''}</div>
      </div>
    )
  }
}

export default User;

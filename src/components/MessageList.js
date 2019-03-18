import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      currentMessages: [],
      newMessage: ''
    };

    this.messagesRef = this.props.firebase.database().ref('messages');
    this.createMessage = this.createMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      console.log(message);
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) })
      });
  }

  componentWDidUpdate(prevProps) {
    if (this.props.activeRoom !== prevProps.activeRoom) {
      console.log('props updated');
      this.getRoomMessages();
    }
  }
  createMessage(e) {
    e.preventDefault();
    this.messagesRef.push({
      content: this.state.newMessage,
      room: this.props.activeRoom.key,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      username: this.props.user.displayName
    });
    this.setState({newMessage: ''});
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({newMessage: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const newMessage = {newMessage: this.state.newMessage};
    this.setState({meessages: newMessage});
  }


  render() {
    let messageHeader = (this.props.activeRoom.hasOwnProperty('name')) ? `Messages for ${this.props.activeRoom.name}` : '';
    return (
       <div className="messageList">
        <h2 className="main-header">{ messageHeader}</h2>
       {console.log(this.state.messages)}
       {this.state.messages.filter(message =>
       message.roomId === this.props.activeRoom.key).map((message) =>
      <div className="message" key={message.key}>
       <p className="content">{message.content}</p>
       <p className="username">{message.username}</p>
       <p className="sentAt">Sent at: {message.sentAt}</p>
      <div id="message-form">
     </div>
    </div>
    )}
  </div>
);
}
}

export default MessageList;

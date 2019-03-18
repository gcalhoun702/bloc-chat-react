import React, { Component } from 'react';


class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoom: ''
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.handleNewRoomChange=this.handleNewRoomChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.createRoom=this.createRoom.bind(this);
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }


handleNewRoomChange(e) {
  e.preventDefault();
  this.setState({
    newRoom: e.target.value
  });
}

handleSubmit(e) {
  e.preventDefault();
  const newRoom= {newRoom: this.state.newRoom};
}

  createRoom(e) {
    e.preventDefault();
    this.roomsRef.push({
    name: this.state.newRoom
  });
  this.setState({newRoom: ''});
}



render () {
  return (
   <div className="sidebar">
     {this.state.rooms.map((room, key) =>
       <div className="room-list" key={room, key}>
       <button id="rooms-button" onClick={() => this.props.setActiveRoom(room)}>
       {room.name}</button>
       </div>
     )}
     <form onSubmit={(e) => this.handleSubmit(e)} >
      <input id="submit-field" type="text" value={this.state.newRoom}
        onChange={(e) => this.handleNewRoomChange(e)}  />
      <button className="btn-newRoom" onClick={this.createRoom}>Submit</button>
     </form>
    </div>
);
 }

}




export default RoomList;

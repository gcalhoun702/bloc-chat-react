import React, { Component } from 'react';


class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: []
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');


  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  handleClick(index) {
    this.state.rooms[index]
  }

handleNewRoomChange(e) {
  this.setState({
    newRoomName: e.target.value,
  });
}

handleSubmit(e) {
  e.preventDefault();
  this.createRoom(this.state.newRoomName);
}

  createRoom(newRoomName) {
    this.roomsRef.push({
    name: newRoomName
  });
  this.setState({newRoomName: ''});
}
}


render () {
  return (
   <section className="room-list">
     {this.state.rooms.map((room, index) =>
       <p className="roomLists" key={index}>{room.name} onClick={() => this.handleClick(index)}>
       {room.val}
       </p>
     )
   }
   <div>
     <form id="create-room" >
      <input type="text" value={this.state.newRoomName}
        onChange={(e) => this.handleNewRoomChange(e)}  />
      <input type="submit" onSubmit={(e) => this.handleSubmit(e)}/>
     </form>
    </div>
  </section>
);
 }




export default RoomList;

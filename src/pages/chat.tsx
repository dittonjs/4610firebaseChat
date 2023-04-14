import { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";

type Message = {
  id: string,
  authorId: string,
  authorEmail: string,
  content: string,
}

type Room = {
  id: string,
  creatorId: string,
  code: string,
  name: string,
}

export const Chat = () => {
  const user = useContext(UserContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [currentRoomCode, setCurrentRoomCode] = useState('');
  const [message, setMessage] = useState('');
  const [newRoomName, setNewRoomName] = useState('') ;
  const [newCode, setNewCode] = useState('');

  useEffect(() => {
    // TODO load users rooms
    async function loadRooms() {
      const querySnapshot = await getDocs(
        query(
          collection(db, "rooms"),
          where("creatorId", "==", user!.uid)
        )
      );
      const myRooms: Room[] = [];
      querySnapshot.forEach((doc) => {

        myRooms.push({ ...doc.data(), id: doc.id } as Room);
      });
      setRooms(myRooms);
    }
    loadRooms();
  }, [])

  console.log(rooms);

  useEffect(() => {
    // TODO subscribe to messages in current room
  }, [currentRoom]);

  async function createRoom() {
    if (!newCode || !newRoomName) {
      return;
    }
    const room = {
      name: newRoomName,
      code: newCode,
      creatorId: user!.uid,
    }
    const docRef = await addDoc(collection(db, "rooms"), room)
    console.log(docRef.id);

    (room as Room).id = docRef.id;
    setRooms([...rooms, room as Room]);

    // TODO create a room in firestore
  }

  function joinRoom() {
    // TODO
    // find the room by code
    // set the current room
  }

  function leaveRoom() {
    // TODO implement leaving a room
  }

  function deleteRoom() {
    // TODO delete room from firebase
  }

  function sendMessage() {
    // TODO send a message
  }

  return (
    <div className="panels">
      <div className="rooms-panel">
        <h2>Rooms</h2>
        <div className="create-room">
          <input type="text" placeholder="Room Name" value={newRoomName} onChange={e => setNewRoomName(e.target.value)} />
          <input type="text" placeholder="Code" value={newCode} onChange={e => setNewCode(e.target.value)} />
          <div className="create-room-controls">
            <button onClick={createRoom}>Create Room</button>
          </div>
        </div>
      </div>
      {
        currentRoom ? (
          <div className="chat-panel">
            <div className="messages">

            </div>
            <div className="chatbar">
              <input type="text" className="chat-input" placeholder="Message"/>
              <button className="send-button">Send</button>
            </div>
          </div>
        ) : (
          <div className="join-room">
            <h2>Chat</h2>
            <input type="text" value={currentRoomCode} onChange={e => setCurrentRoomCode(e.target.value)} placeholder="Room Code" />
            <button>Join</button>
            <button onClick={() => signOut(auth)}>Logout</button>
          </div>
        )
      }
    </div>
  );
}
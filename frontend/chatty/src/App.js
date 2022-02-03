import './App.css';
import {useState, useEffect} from "react";
import {nanoid} from 'nanoid';
import {io} from 'socket.io-client';

const socket = io("http://localhost:9000")
const userName = nanoid(4)

function App() {
  const [message, setMessamge] = useState("");
  const [chat, setChat] = useState([])

  const sendChat = (e) =>{
    e.preventDefault();
    socket.emit("chat", { message, userName });
    setMessamge("");
  }

  useEffect(()=>{
    socket.on("chat", (payload)=>{
      setChat([...chat, payload])
    })
  })

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chatty app</h1>

        {chat.map((payload, index)=>(
          <p key={index}>{payload.message} <span>User: {payload.userName}</span></p>
        ))}

        <form onSubmit={sendChat}>
          <input
          type="text"
          name="chat"
          placeholder="Enter your message..."
          value={message}
          onChange={(e)=>{
            setMessamge(e.target.value)
          }}
          />
          <button type="submit">Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;

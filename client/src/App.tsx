import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";
import { useState } from "react";

import Home from "./components/Home";
import ChatWrapper from "./components/Chat/ChatWrapper";

const socket = io("http://localhost:4000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                username={username}
                setUsername={setUsername}
                room={room}
                setRoom={setRoom}
                socket={socket}
              />
            }
          />
          <Route
            path="/chat"
            element={
              <ChatWrapper username={username} room={room} socket={socket} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

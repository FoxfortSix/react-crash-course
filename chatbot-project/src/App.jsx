import { useState } from "react";
import { ChatInput } from "./components/ChatInput";
import { ChatMessages } from "./components/ChatMessages";

import "./global.css";

function App() {
  /*
          Lifting State Up:
          I moved the 'chatMessages' state from ChatMessages to App so it can be shared.
          - 'chatMessages': Holds the current array of message objects.
          - 'setChatMessages': Function to update the state.
    */
  const [chatMessages, setChatMessages] = useState([
    {
      message: "Hello chatbot",
      sender: "user",
      key: "id-1",
    },
    {
      message: "Hello! How can i help you",
      sender: "robot",
      key: "id-2",
    },
    {
      message: "can you get me todays date?",
      sender: "user",
      key: "id-3",
    },
    {
      message: "Today is September 27",
      sender: "robot",
      key: "id-4",
    },
    {
      message: "how about flip a coin",
      sender: "user",
      key: "id-5",
    },
    {
      message: "Sure! You got tails",
      sender: "robot",
      key: "id-6",
    },
  ]);

  return (
    <div className="max-w-xl m-auto h-screen flex flex-col justify-between">
      {/* I pass the state down to ChatMessages so it can display them. */}
      <ChatMessages chatMessages={chatMessages} />

      {/* I pass the state and the setter function down as props to ChatInput so it can add new messages. */}
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App;

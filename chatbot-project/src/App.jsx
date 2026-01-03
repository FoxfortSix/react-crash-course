import { useState, useEffect, useRef } from "react";
import { chatbot } from "supersimpledev";
import robotProfile from "./assets/robot.png";
import userProfile from "./assets/user.png";

import "./global.css";

/**
 * ChatInput Component
 * Renders an input field and a send button for user interaction.
 *
 * @param {Object} props
 * @param {Array} props.chatMessages - The current list of chat messages.
 * @param {Function} props.setChatMessages - Function to update the chat messages state.
 */
function ChatInput({ chatMessages, setChatMessages }) {
  // I use the useState hook to create a controlled input.
  // 'inputText' tracks what the user types, initialized to an empty string.
  const [inputText, setInputText] = useState("");

  /**
   * Event handler for the input field.
   * Updates 'inputText' state whenever the user types.
   */
  function saveInputText(event) {
    setInputText(event.target.value);
  }

  /**
   * Function to add a new message to the chat.
   * I use the spread operator (...) to copy the existing messages and add the new one.
   * crypto.randomUUID() generates a unique ID for the key prop.
   */
  function sendMessage() {
    const newChatMessages = [
      ...chatMessages,
      {
        // I assign the current 'inputText' state to the message property.
        message: inputText,
        sender: "user",
        key: crypto.randomUUID(), // Generates a unique string ID
      },
    ];

    setChatMessages(newChatMessages);
    // Clear the input field after sending.
    setInputText("");

    const response = chatbot.getResponse(inputText);

    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        key: crypto.randomUUID(),
      },
    ]);
  }

  return (
    <div className="flex justify-center mt-5 gap-1 mb-3">
      <input
        type="text"
        placeholder="send a message to textbox"
        size="30"
        onChange={saveInputText}
        value={inputText}
        className="border rounded-lg p-2 flex-grow"
      />
      <button
        onClick={sendMessage}
        className="text-white py-1 px-3 rounded-lg bg-green-500 active:bg-green700"
      >
        Send
      </button>
    </div>
  );
}

/**
 * ChatMessage Component
 * Renders a single chat message.
 *
 * @param {Object} props - The component props.
 * @param {string} props.message - The content of the message.
 * @param {string} props.sender - The sender of the message ('user' or 'robot').
 */
function ChatMessage({ message, sender }) {
  // I am using destructuring in the function parameters to extract 'message' and 'sender' directly.
  // equivalent to:
  // const message = props.message;
  // const sender = props.sender;

  /*
   * Conditional Rendering approach:
   * I check the 'sender' prop to decide which image to display.
   * The logical AND operator (&&) is used ("Guard Operator") to conditionally render elements.
   * If the condition on the left is true, the element on the right is rendered.
   */
  return (
    <div
      className={`flex items-start gap-2 mb-2 ${
        sender === "robot" ? "justify-start" : "justify-end"
      }`}
    >
      {sender === "robot" && <img src={robotProfile} alt="Robot" width="50" />}
      <div className=" p-2 rounded-lg bg-gray-200 max-w-90">{message}</div>
      {sender === "user" && <img src={userProfile} alt="User" width="50" />}
    </div>
  );
}

/**
 * ChatMessages Component
 * Renders a list of ChatMessage components based on an array of data.
 *
 * @param {Object} props
 * @param {Array} props.chatMessages - The list of messages to display.
 */
function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useRef(null);
  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages]);
  return (
    <div className="mt-5 overflow-auto" ref={chatMessagesRef}>
      {/*
              I use the .map() method to iterate over the 'chatMessages' array
              and transform each object into a <ChatMessage /> component.
              The 'key' prop is essential for React to efficiently update the list.
            */}
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.key}
          />
        );
      })}
    </div>
  );
}

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

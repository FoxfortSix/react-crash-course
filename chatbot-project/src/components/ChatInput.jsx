import { useState } from "react";
import { chatbot } from "supersimpledev";

/**
 * ChatInput Component
 * Renders an input field and a send button for user interaction.
 *
 * @param {Object} props
 * @param {Array} props.chatMessages - The current list of chat messages.
 * @param {Function} props.setChatMessages - Function to update the chat messages state.
 */
export function ChatInput({ chatMessages, setChatMessages }) {
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
        className="border rounded-lg p-2 grow"
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

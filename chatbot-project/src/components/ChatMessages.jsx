import { useEffect, useRef } from "react";
import { ChatMessage } from "./components/ChatMessage";

/**
 * ChatMessages Component
 * Renders a list of ChatMessage components based on an array of data.
 *
 * @param {Object} props
 * @param {Array} props.chatMessages - The list of messages to display.
 */
export function ChatMessages({ chatMessages }) {
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

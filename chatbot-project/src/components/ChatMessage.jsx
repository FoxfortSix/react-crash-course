import robotProfile from "./assets/robot.png";
import userProfile from "./assets/user.png";
/**
 * ChatMessage Component
 * Renders a single chat message.
 *
 * @param {Object} props - The component props.
 * @param {string} props.message - The content of the message.
 * @param {string} props.sender - The sender of the message ('user' or 'robot').
 */
export function ChatMessage({ message, sender }) {
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

import React, { useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import Picker from 'emoji-picker-react';
import moment from 'moment';

const userPhoto =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8Ft3wkMzh_PFVQMh_W8MbSbd-ZGrBX833wVolP6kZ-kWXIL7fmQWsiU7duTvxxRyKEY8TrdjiV9-vUyqVXNH6OMQc1bX18QFP94tDlw'; // Replace with the actual path to the user's profile photo
const adminPhoto =
  'https://media.licdn.com/dms/image/D4D03AQHZCnU83ynsiw/profile-displayphoto-shrink_200_200/0/1720078846351?e=2147483647&v=beta&t=GwF8savK5o5cHJ-lmtU4bqW30mc7Fbrj01HVslmv2VA'; // Replace with the actual path to the admin's profile photo

function Chat({ isLargeScreen }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = {
        text: input,
        isSent: true,
        profilePhoto: userPhoto,
        time: new Date(),
        name: 'You', // User's name
      };
      setMessages([...messages, newMessage]);
      setInput('');
      // Simulate a received message
      setTimeout(() => {
        const receivedMessage = {
          text: 'Received message',
          isSent: false,
          profilePhoto: adminPhoto,
          time: new Date(),
          name: 'Admin', // Admin's name
        };
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      }, 1000);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setInput((prevInput) => prevInput + emoji.emoji);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newMessage = {
        text: `Shared a file: ${file.name}`,
        isSent: true,
        profilePhoto: userPhoto,
        time: new Date(),
        name: 'You',
        file,
      };
      setMessages([...messages, newMessage]);
      e.target.value = null; // Clear the file input
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      className={`${isLargeScreen ? 'custom-container' : ''} container mx-auto p-6 h-20`}
    >
      <h1 className="text-2xl font-semibold mb-6 flex justify-center mb-10">
        Chat with Admin
      </h1>

      <div
        className="flex flex-col p-4 bg-gray-100"
        style={{ height: '600px', overflow: 'hidden' }}
      >
        <div className="flex-grow overflow-y-auto" style={{ height: '80%' }}>
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              message={msg.text}
              isSent={msg.isSent}
              profilePhoto={msg.profilePhoto}
              time={msg.time}
              name={msg.name}
              file={msg.file}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex items-center mt-4">
          <button
            onClick={() => setShowEmojiPicker((val) => !val)}
            className="mr-2 p-2 bg-gray-200 text-black rounded-lg"
          >
            😊
          </button>
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiSelect} />}
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="mr-2 p-2 bg-gray-200 text-black rounded-lg cursor-pointer"
          >
            <svg
              class="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01"
              />
            </svg>
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-grow p-2 border border-gray-300 rounded-lg"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSend}
            className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;

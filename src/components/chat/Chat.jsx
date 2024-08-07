import React, { useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import Picker from 'emoji-picker-react';
import moment from 'moment';

const userPhoto =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8Ft3wkMzh_PFVQMh_W8MbSbd-ZGrBX833wVolP6kZ-kWXIL7fmQWsiU7duTvxxRyKEY8TrdjiV9-vUyqVXNH6OMQc1bX18QFP94tDlw'; // Replace with the actual path to the user's profile photo
const adminPhoto =
  'https://media.licdn.com/dms/image/D4D03AQHZCnU83ynsiw/profile-displayphoto-shrink_200_200/0/1720078846351?e=2147483647&v=beta&t=GwF8savK5o5cHJ-lmtU4bqW30mc7Fbrj01HVslmv2VA'; // Replace with the actual path to the admin's profile photo

const initialUsers = [
  { id: 1, name: 'Simon', photo: userPhoto, pendingMessages: 0 },
  { id: 2, name: 'Patric', photo: userPhoto, pendingMessages: 0 },
  { id: 3, name: 'Jonas', photo: userPhoto, pendingMessages: 0 },
  { id: 4, name: 'Bob', photo: userPhoto, pendingMessages: 0 },
  { id: 5, name: 'Lerix', photo: userPhoto, pendingMessages: 0 },
  { id: 6, name: 'Brutionn', photo: userPhoto, pendingMessages: 0 },
  { id: 7, name: 'User 7', photo: userPhoto, pendingMessages: 0 },
  { id: 8, name: 'User 8', photo: userPhoto, pendingMessages: 0 },
  { id: 9, name: 'User 9', photo: userPhoto, pendingMessages: 0 },
  { id: 10, name: 'User 10', photo: userPhoto, pendingMessages: 0 },
  { id: 11, name: 'User 11', photo: userPhoto, pendingMessages: 0 },
  { id: 12, name: 'User 12', photo: userPhoto, pendingMessages: 0 },
];

function Chat({ isLargeScreen }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedUser, setSelectedUser] = useState(initialUsers[0]);
  const [users, setUsers] = useState(initialUsers);
  const [isUserListExpanded, setIsUserListExpanded] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = {
        text: input,
        isSent: true,
        profilePhoto: userPhoto,
        time: new Date(),
        name: 'You', // User's name
        userId: selectedUser.id,
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
          userId: selectedUser.id,
        };
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        incrementPendingMessages(selectedUser.id);
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
        userId: selectedUser.id,
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

  const handleUserClick = (user) => {
    setSelectedUser(user);
    resetPendingMessages(user.id);
  };

  const filteredMessages = messages.filter(
    (message) => message.userId === selectedUser.id
  );

  const incrementPendingMessages = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? { ...user, pendingMessages: user.pendingMessages + 1 }
          : user
      )
    );
  };

  const resetPendingMessages = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, pendingMessages: 0 } : user
      )
    );
  };

  return (
    <div
      className={`${isLargeScreen ? 'custom-container' : ''} container mx-auto p-6 h-full w-full`}
    >
      <div className="text-2xl font-semibold mb-6 flex justify-center mb-10">
        {/* Chat with {selectedUser?.name} */}
        <span>
          {`Chat with `}
          {selectedUser?.name || `Admin`}
        </span>
      </div>

      <div className="flex">
        <div
          className="w-1/4 bg-gray-200 p-4 rounded-lg  overflow-hidden"
          style={{ height: '600px' }}
        >
          <h2 className="text-xl font-medium mb-4 flex justify-between items-center">
            Users {initialUsers?.length}
            {users.length > 7 && (
              <button
                onClick={() => setIsUserListExpanded(!isUserListExpanded)}
                className="text-sm text-blue-500"
              >
                {isUserListExpanded ? 'Show Less' : 'Show More'}
              </button>
            )}
          </h2>
          <ul
            className={`transition-all duration-300 ease-in-out overflow-y-auto ${
              isUserListExpanded ? '[height:500px]' : 'h-100'
            }`}
          >
            {(isUserListExpanded ? users : users.slice(0, 7)).map((user) => (
              <li
                key={user.id}
                className={`relative p-4 mb-3 cursor-pointer rounded-lg flex items-center ${
                  user.id === selectedUser.id
                    ? 'bg-gray-600 text-white'
                    : 'bg-white text-gray-700'
                }`}
                onClick={() => handleUserClick(user)}
              >
                <img
                  src={user.photo}
                  alt={user.name}
                  className="inline-block w-8 h-8 rounded-full mr-2"
                />
                <div>
                  {user.name}
                  {user.pendingMessages > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {user.pendingMessages}
                    </span>
                  )}
                </div>
                {user.id === selectedUser.id && (
                  <span className="absolute top-1 left-1 bg-green-500 w-3 h-3 rounded-full"></span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="flex flex-col p-4 bg-gray-100 w-3/4 ml-4 rounded-lg"
          style={{ height: '600px', overflow: 'hidden' }}
        >
          <div className="flex-grow overflow-y-auto" style={{ height: '80%' }}>
            {filteredMessages.map((msg, index) => (
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
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
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
    </div>
  );
}

export default Chat;

import React, { useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import Picker from 'emoji-picker-react';
import { useSocket } from '../../Context/SocketContext';
import {
  allAdminListApi,
  viewAllPrivateChat,
} from '../../services/authService';
import { UserData } from '../../redux/authSlice';
import { useSelector } from 'react-redux';
import { selectUserProfile } from '../../redux/userProfileSlice';
import { getAuthHeader } from '../../constant';

function Chat({ isLargeScreen }) {
  const [adminData, setAdminData] = useState([]);
  const [input, setInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const [isUserListExpanded, setIsUserListExpanded] = useState(false);
  const messagesEndRef = useRef(null);
  const { socket, activeUsers } = useSocket();
  const { user } = useSelector(UserData);
  const data = useSelector(selectUserProfile);
  const { token } = useSelector(UserData);
  const [userChat, setUserChat] = useState([]);

  console.log('activeUsers', activeUsers);

  async function showAllAdminList() {
    try {
      let { data } = await allAdminListApi();
      setAdminData(data);
      // setSelectedUser(data[0]);
    } catch (err) {
      console.log('err showAll admin 1612199', err);
    }
  }

  async function showAllPrivateMsg(payload) {
    try {
      let { data } = await viewAllPrivateChat(payload, getAuthHeader(token));
      setUserChat(data);
    } catch (err) {
      console.log('err showAll admin 1612199', err);
    }
  }

  useEffect(() => {
    showAllAdminList();
  }, []);

  useEffect(() => {
    socket?.on('private message', (data) => {
      console.log('data recive message', data, user.email !== data.from);
      if (user.email !== data.from) {
        setUserChat((prevMessages) => [...prevMessages, data]);
      }
    });

    return () => {
      socket?.off('private message');
    };
  }, [socket, user]);

  useEffect(() => {
    showAllPrivateMsg({
      senderEmail: user?.email,
      recipientEmail: selectedUser?.email,
    });
  }, [selectedUser]);

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = {
        message: input,
        isSent: true,
        profilePhoto: data.profilePicture,
        time: new Date(),
        name: 'You', // User's name
        userId: selectedUser.id,
        senderEmail: user.email, // Ensure senderEmail is correctly set
        recipientEmail: selectedUser.email,
      };
      // setUserChat([...userChat, newMessage]);
      setUserChat((prevMessages) => [...prevMessages, newMessage]);
      // Emit private message event to the server
      if (socket) {
        socket.emit('private message', {
          to: selectedUser.email,
          message: input,
        });
      }
      setInput('');
    }
  };

  const handleEmojiSelect = (emoji) => {
    setInput((prevInput) => prevInput + emoji.emoji);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newMessage = {
        message: `Shared a file: ${file.name}`,
        isSent: true,
        profilePhoto: selectedUser.profilePicture,
        time: new Date(),
        name: 'You',
        file,
        userId: selectedUser.id,
        senderEmail: user.email, // Ensure senderEmail is correctly set
        recipientEmail: selectedUser.email,
      };
      setUserChat([...userChat, newMessage]);
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
  }, [userChat]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  console.log('selectedUser', selectedUser);

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
            Users {adminData?.length}
            {adminData.length > 7 && (
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
            {(isUserListExpanded ? adminData : adminData.slice(0, 7)).map(
              (adminUser) => {
                return (
                  <li
                    key={adminUser.email}
                    className={`relative p-4 mb-3 cursor-pointer rounded-lg flex items-center ${
                      adminUser?.email === selectedUser?.email
                        ? 'bg-gray-600 text-white'
                        : 'bg-white text-gray-700'
                    }`}
                    onClick={() => handleUserClick(adminUser)}
                  >
                    <img
                      src={adminUser.profilePicture}
                      alt={adminUser.name}
                      className="inline-block w-8 h-8 rounded-full mr-2"
                    />
                    <div>
                      {adminUser?.name === user?.name ? 'You' : adminUser?.name}
                      {/* {5 > 0 && (
                        <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          5
                        </span>
                      )} */}
                    </div>
                    {activeUsers.includes(adminUser?.email) ? (
                      <span className="absolute top-1 left-1 bg-green-500 w-3 h-3 rounded-full"></span>
                    ) : (
                      <span className="absolute top-1 left-1 bg-yellow-400 w-3 h-3 rounded-full"></span>
                    )}
                  </li>
                );
              }
            )}
          </ul>
        </div>

        {selectedUser ? (
          <div
            className="flex flex-col p-4 bg-gray-100 w-3/4 ml-4 rounded-lg"
            style={{ height: '600px', overflow: 'hidden' }}
          >
            <div
              className="flex-grow overflow-y-auto"
              style={{ height: '80%' }}
            >
              {userChat.map((msg, index) => (
                <ChatMessage
                  key={index}
                  message={msg.message}
                  isSent={user.email === msg.senderEmail}
                  profilePhoto={
                    user.email === msg.senderEmail
                      ? data.profilePicture
                      : selectedUser.profilePicture
                  }
                  time={msg.timestamp}
                  name={
                    user.email === msg.senderEmail ? 'You' : selectedUser?.name
                  }
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
        ) : (
          <div
            className="flex flex-col p-4 bg-gray-100 w-3/4 ml-4 rounded-lg"
            style={{ height: '600px', overflow: 'hidden' }}
          >
            <div
              className="flex flex-grow overflow-y-auto justify-center items-center"
              style={{ height: '80%' }}
            >
              <h1>Select a conversation to start chatting !</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;

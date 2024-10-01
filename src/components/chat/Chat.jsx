import React, { useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import Picker from 'emoji-picker-react';
import { useSocket } from '../../Context/SocketContext';
import {
  allAdminListApi,
  allAdminMemberListApi,
  getAllGroupMessages,
  getAllUnreadedMsgCountListApi,
  shareFileHandlingApi,
  updateUnreadedMsgCountApi,
  viewAllPrivateChat,
} from '../../services/authService';
import { UserData } from '../../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllUnreadMessages,
  selectUserProfile,
} from '../../redux/userProfileSlice';
import { getAuthHeader } from '../../constant';
import CreateGroupModel from '../common/CreateGroup';
import AddMemberToGroup from '../common/AddMemberToGroup';

function Chat({ isLargeScreen }) {
  const dispatch = useDispatch();
  const [adminData, setAdminData] = useState([]);
  const [groupMember, setGroupMember] = useState([]);

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
  const [unReadCountMsg, setUnReadCountMsg] = useState([]);
  const [isTyping, setIsTyping] = useState(false); // New state for typing indicator
  const typingTimeoutRef = useRef(null); // Reference for typing timeout
  const [isTypingSenderUser, setIsTypingSenderUse] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpenAddMember, setModalOpenAddMember] = useState(false);
  const openModal = (type) => {
    if (type === 'create_group') {
      setModalOpen(true);
    } else {
      setModalOpenAddMember(true);
    }
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalOpenAddMember(false);
  };
  const closeModalAddMember = () => {
    setModalOpenAddMember(false);
  };
  async function showAllAdminList() {
    try {
      let { data } = await allAdminListApi();
      setAdminData(data);
    } catch (err) {
      console.log('err showAll admin 1612199', err);
    }
  }

  async function showAllPrivateMsg(payload) {
    try {
      let { data } = await viewAllPrivateChat(payload, getAuthHeader(token));
      setUserChat(data);
    } catch (err) {
      console.log('showAllPrivateMsg', err);
    }
  }

  async function showAllGroupMessages(payload){
      try {
        let { data} = await getAllGroupMessages(payload,getAuthHeader(token));
        setUserChat(data);
      } catch (err) {
        console.log('showAllGroupMessages', err);
      }
  }

  // Emit typing event when the user starts typing
  async function handleTyping(recipientEmail) {
    if (socket) {
      socket.emit('typing', { to: recipientEmail });
      console.log('first');

      // Reset the typing timeout to prevent multiple emissions
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        handleStopTyping(recipientEmail);
      }, 4000); // Stop typing after 4 seconds of no input
    }
  }

  // Emit stop typing event
  async function handleStopTyping(recipientEmail) {
    if (socket) {
      socket.emit('stop typing', { to: recipientEmail });
    }
  }

  async function getAllUnreadMsgCount() {
    try {
      let payload = {
        recipientEmail: user?.email,
      };
      let { data } = await getAllUnreadedMsgCountListApi(
        payload,
        getAuthHeader(token)
      );
      dispatch(getAllUnreadMessages(getAuthHeader(token)));
      setUnReadCountMsg(data);
    } catch (err) {
      console.log('err getAllUnreadMsgCount 1612199', err);
    }
  }

  async function updatAllUnreadMsgCount(sender) {
    try {
      let payload = {
        senderEmail: sender,
        recipientEmail: user?.email,
      };
      await updateUnreadedMsgCountApi(payload, getAuthHeader(token));
      getAllUnreadMsgCount();
    } catch (err) {
      console.log('err updatAllUnreadMsgCount 1612199', err);
    }
  }

  async function showAllAdminMemberList() {
    try {
      let { data } = await allAdminMemberListApi();
      setGroupMember(data);
    } catch (err) {
      console.log('showAllAdminMemberList', err);
    }
  }
  useEffect(() => {
    showAllAdminList();
    showAllAdminMemberList()
  }, []);


  useEffect(() => {
    if (!selectedUser?.email) {
      let groupName=selectedUser?.name
     socket?.emit('join group', { groupName, email: user.email });
     console.log(`Joined group: ${groupName} with email: ${user.email}`);
    }
     return () => {
       socket?.off('group joined');
     };
  }, [selectedUser,socket,user]);

  useEffect(() => {
   
    // console.log('effect call', selectedUser,!selectedUser?.email);
    // Function to handle group messages
    const handleGroupMessage = async(msg) => {

      console.log('Group message received:', msg);
      console.log('selectedUser', selectedUser)
       if (user.email !== msg.from) {
        if (selectedUser?.name === msg.groupName) {
          setUserChat((prevMessages) => [...prevMessages, msg]);
        }
      }
    };

    // Function to handle private messages
    const handlePrivateMessage = (data) => {
      console.log('Private message received:', data);
      if (user.email !== data.from) {
        if (selectedUser?.email === data.from) {
          setUserChat((prevMessages) => [...prevMessages, data]);
        }
        getAllUnreadMsgCount();
      }
    };


     if (!selectedUser?.email) {
       // Listening for group messages when no user is selected (assumed group chat)
       socket?.on('group message', handleGroupMessage);
     } else {
       // Listening for private messages when a user is selected
       socket?.on('private message', handlePrivateMessage);
     }

    // Listen for typing events from the server
    socket?.on('typing', (data) => {
      if (data.from === selectedUser?.email) {
        setIsTyping(true);
      }
    });

    socket?.on('typing', (data) => {
      const { from } = data;
      setIsTypingSenderUse(from);
      setIsTyping(true);
    });

    // Listen for stop typing events from the server
    socket?.on('stop typing', (data) => {
      if (data.from === selectedUser?.email) {
        setIsTyping(false);
      }
    });

    socket?.on('stop typing', (data) => {
      setIsTyping(false);
    });

    return () => {
      socket?.off('private message');
      socket?.off('typing');
      socket?.off('stop typing');
      socket?.off('group message');
    };
  }, [socket, user, selectedUser]);

  useEffect(() => {

    if (selectedUser?.email){
      showAllPrivateMsg({
        senderEmail: user?.email,
        recipientEmail: selectedUser?.email,
      })
    }else{
        showAllGroupMessages({
          senderEmail: user?.email,
          groupName: selectedUser?.name,
        });
    }
  }, [selectedUser]);

  console.log('selectedUser', selectedUser)
  const handleSend = async() => {
    if (input.trim()) {
      const newMessage = {
        message: input,
        isSent: true,
        profilePhoto: data.profilePicture,
        time: new Date(),
        name: 'You',
        userId: selectedUser?.id,
        senderEmail: user?.email,
        recipientEmail: selectedUser?.email,
      };

      setUserChat((prevMessages) => [...prevMessages, newMessage]);

      // if (socket) {
      //   socket.emit('private message', {
      //     to: selectedUser.email,
      //     message: input,
      //   });
      // }
      if (socket) {
        if (!selectedUser?.email) {
          console.log("call thay chhe group ")
           // Emit a group message event
           socket.emit('group message', {
             groupName: selectedUser?.name, // Name of the group
             message: input,
           });
         } else {
          console.log("call thay chhe private messages")
           // Emit a private message event
           socket.emit('private message', {
             to: selectedUser.email,
             message: input,
           });
         }
       }
      setInput('');
      handleStopTyping(selectedUser.email); // Stop typing after sending the message
    }
  };

  const handleEmojiSelect = (emoji) => {
    setInput((prevInput) => prevInput + emoji.emoji);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await shareFileHandlingApi(formData);

        const data = response.fileUrl;

        const newMessage = {
          message: `Shared a file: ${file.name}`,
          isSent: true,
          profilePhoto: selectedUser.profilePicture,
          time: new Date(),
          name: 'You',
          fileName: file.name,
          userId: selectedUser.id,
          senderEmail: user.email,
          recipientEmail: selectedUser.email,
          fileUrl: data,
          fileType: file?.type,
        };

        // socket.emit('private message', {
        //   to: selectedUser.email,
        //   message: newMessage.message,
        //   fileUrl: data,
        //   fileName: file.name,
        //   fileType: file?.type,
        // });
        
        if (!selectedUser?.email) {
          // Emit a group message event
          socket.emit('group message', {
            groupName: selectedUser?.name, // Name of the group
            message: newMessage.message,
            fileUrl: data,
            fileName: file.name,
            fileType: file?.type,
          });
        } else {
          // Emit a private message event
          socket.emit('private message', {
              to: selectedUser.email,
              message: newMessage.message,
              fileUrl: data,
              fileName: file.name,
              fileType: file?.type,
          });
        }
        
        setUserChat([...userChat, newMessage]);
        e.target.value = null;
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    } else {
      handleTyping(selectedUser.email);
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

  useEffect(() => {
    getAllUnreadMsgCount();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      updatAllUnreadMsgCount(selectedUser?.email);
      dispatch(getAllUnreadMessages(getAuthHeader(token)));
    }
  }, [selectedUser, userChat]);

  const findUnreaderSenderMsg = (email) => {
    return unReadCountMsg.find((item) => item.senderEmail === email);
  };

  return (
    <div>
      {user?.userType === 'superAdmin' && (
        <div className="flex  items-baseline justify-end space-y-6 gap-2">
          <button
            onClick={() => openModal('add_member')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            Add Member To Group
          </button>
          <button
            onClick={() => openModal('create_group')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            Create Group
          </button>
        </div>
      )}

      <div className="text-2xl font-semibold text-gray-800 flex justify-center mb-1">
        <span>
          {`Chat with `}
          <span className="text-indigo-600">
            {selectedUser?.name || `Admin`}
          </span>
        </span>
      </div>

      <div className="sm:flex">
        <div
          className="sm:w-full  md:w-1/4 bg-gray-200 p-4 rounded-lg  overflow-hidden"
          style={{ height: '600px' }}
        >
          <h2 className="text-xl font-medium mb-4 flex justify-between items-center">
            Users {adminData?.length}
            {adminData.length >= 6 && (
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
            {(isUserListExpanded ? adminData : adminData.slice(0, 6)).map(
              (adminUser) => {
                const userCountMsg =
                  user.email !== adminUser.email &&
                  findUnreaderSenderMsg(adminUser?.email);
                return (
                  <li
                    key={adminUser.email}
                    className={`relative p-4 mb-3 cursor-pointer rounded-lg flex items-center transition-all duration-300 ${
                      adminUser?.email === selectedUser?.email
                        ? 'bg-gray-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => handleUserClick(adminUser)}
                  >
                    <img
                      src={adminUser.profilePicture}
                      alt={adminUser.name}
                      className="inline-block w-10 h-10 rounded-full mr-4 border-2 border-gray-300"
                    />
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">
                          {adminUser?.name === data?.name
                            ? 'You'
                            : adminUser?.name}
                        </span>
                        {userCountMsg && (
                          <span className="bg-green-500 text-black text-xs font-bold px-2 py-1 rounded-full ml-4">
                            {userCountMsg?.count || ' '}
                          </span>
                        )}
                      </div>
                      {isTyping && adminUser?.email === isTypingSenderUser && (
                        <div className="text-xs text-green-500">Typing...</div>
                      )}
                    </div>
                    {activeUsers.includes(adminUser?.email) ? (
                      <span className="absolute top-1 left-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></span>
                    ) : (
                      <span className="absolute top-1 left-1 bg-yellow-400 w-3 h-3 rounded-full border-2 border-white"></span>
                    )}
                  </li>
                );
              }
            )}
          </ul>
        </div>

        {selectedUser ? (
          <div
            className="flex flex-col p-4 bg-gray-100 sm:w-full md:w-3/4  rounded-lg h-[600px] md:overflow-hidden"
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
                    selectedUser?.email
                      ? user.email === msg.senderEmail
                        ? data.profilePicture
                        : selectedUser.profilePicture
                      : user.email === msg.senderEmail
                        ? data.profilePicture
                        : msg?.profilePicture
                  }
                  time={msg.timestamp}
                  name={
                    selectedUser?.email
                      ? user.email === msg.senderEmail
                        ? 'You'
                        : selectedUser?.name
                      : msg?.userName
                  }
                  file={msg.fileUrl}
                  fileType={msg.fileType}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
            {isTyping && selectedUser.email === isTypingSenderUser && (
              <div className="typing-indicator">
                {selectedUser?.name} is typing...
              </div>
            )}
            <div className="md:flex items-center mt-4">
              <button
                onClick={() => setShowEmojiPicker((val) => !val)}
                className="block mr-2 p-2 bg-gray-200 text-black rounded-lg"
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
                className=" bg-gray-200 text-black rounded-lg cursor-pointer"
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
            className="flex flex-col p-4 bg-gray-100 sm: w-full md:w-3/4 rounded-lg"
            style={{ height: '600px', overflow: 'hidden' }}
          >
            <div
              className="flex flex-grow overflow-y-auto justify-center items-center"
              style={{ height: '80%' }}
            >
              <h1 className="text-base sm:text-lg md:text-xl">
                Select a conversation to start chatting !
              </h1>
            </div>
          </div>
        )}
      </div>
      <CreateGroupModel
        isOpen={isModalOpen}
        close={closeModal}
        showAllAdminList={showAllAdminList}
      />
      <AddMemberToGroup
        isOpen={isModalOpenAddMember}
        close={closeModalAddMember}
        adminData={groupMember}
        socket={socket}
      />
    </div>
  );
}

export default Chat;

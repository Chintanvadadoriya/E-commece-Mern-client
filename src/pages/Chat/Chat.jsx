import React from 'react';
import Chat from '../../components/chat/Chat';
const isLargeScreen = window.innerWidth > 1024;

function ChatPage() {
  return (
    <>
      <Chat isLargeScreen={isLargeScreen} />
    </>
  );
}

export default ChatPage;

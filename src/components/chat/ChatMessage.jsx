import React from 'react';
import moment from 'moment';

function ChatMessage({ message, isSent, profilePhoto, time, name, file }) {
  // console.log('ChatMessage', message, isSent, profilePhoto, time, name, file);
  return (
    <div className={`flex ${isSent ? 'justify-end' : 'justify-start'} mb-2`}>
      {!isSent && (
        <img
          src={profilePhoto}
          alt="Profile"
          className="w-8 h-8 rounded-full mr-2"
        />
      )}
      <div>
        <div className="text-xs text-gray-500 mt-1 text-left">{name}</div>
        <div
          className={`p-2 rounded-lg ${
            isSent ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
          }`}
        >
          {message}
          {file && (
            <div className="mt-2">
              <a
                href={URL.createObjectURL(file)}
                download={file.name}
                className="text-blue-700 underline"
              >
                {file.name}
              </a>
            </div>
          )}
        </div>
        <div className="text-xs text-gray-500 mt-1 text-right">
          {moment(time).fromNow()} ({moment(time).format('h:mm A')})
        </div>
      </div>
      {isSent && (
        <img
          src={profilePhoto}
          alt="Profile"
          className="w-8 h-8 rounded-full ml-2"
        />
      )}
    </div>
  );
}

export default ChatMessage;

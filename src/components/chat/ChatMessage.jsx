import React, { useEffect, useState } from 'react';
import moment from 'moment';

function ChatMessage({ message, isSent, profilePhoto, time, name, file }) {
  const [fileUrl, setFileUrl] = useState(null);
  const [fileType, setFileType] = useState(null);
  useEffect(() => {
    if (file) {
      if (file instanceof Blob || file instanceof File) {
        const url = URL.createObjectURL(file);
        setFileUrl(url);
        setFileType(file.type);

        // Clean up the object URL when the component unmounts or when the file changes
        return () => URL.revokeObjectURL(url);
      }
      // If the file is a URL string
      else if (typeof file === 'string') {
        setFileUrl(file);
      }
    }
  }, [file]);

  const renderFilePreview = () => {
    // if (!fileUrl || !fileType) return null;

    // if (fileType.startsWith('image/')) {
    //   return (
    //     <img src={fileUrl} alt="File preview" className="max-w-xs max-h-60" />
    //   );
    // }

    // // Add handling for PDF files
    // if (fileType.startsWith('application/pdf')) {
    //   return (
    //     <embed
    //       src={fileUrl}
    //       type="application/pdf"
    //       className="max-w-xs max-h-60"
    //     />
    //   );
    // }

    // // Add handling for audio files
    // if (fileType.startsWith('audio/')) {
    //   return <audio controls src={fileUrl} className="max-w-xs" />;
    // }

    // // Add handling for video files
    // if (fileType.startsWith('video/')) {
    //   return <video controls src={fileUrl} className="max-w-xs max-h-60" />;
    // }

    // Fallback for other file types
    return (
      // <a
      //   href={fileUrl}
      //   download={file.name}
      //   className="text-blue-700 underline"
      // >
      //   {file.name}
      // </a>
      <img
        src={`http://localhost:4000${fileUrl}`}
        alt="File preview"
        className="max-w-xs max-h-60"
      />
    );
  };

  // console.log('fileUrl', fileUrl);
  // console.log('file', file);

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
          {file && <div className="mt-2">{renderFilePreview()}</div>}
          {message}
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

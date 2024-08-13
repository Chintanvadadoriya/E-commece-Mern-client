import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { downLoadSharingsFileApi } from '../../services/authService';
import { saveAs } from 'file-saver';

function removeUploadsPrefix(filePath) {
  return filePath.replace('/uploads/', '');
}
function ChatMessage({
  message,
  isSent,
  profilePhoto,
  time,
  name,
  file,
  fileType,
}) {
  const [fileUrl, setFileUrl] = useState(null);
  useEffect(() => {
    if (file) {
      if (file instanceof Blob || file instanceof File) {
        const url = URL.createObjectURL(file);
        setFileUrl(url);

        // Clean up the object URL when the component unmounts or when the file changes
        return () => URL.revokeObjectURL(url);
      }
      // If the file is a URL string
      else if (typeof file === 'string') {
        setFileUrl(file);
      }
    }
  }, [file]);

  const handleDownload = async (e) => {
    e.preventDefault();
    let filename = removeUploadsPrefix(fileUrl);
    try {
      const response = await downLoadSharingsFileApi(filename);
      // Use file-saver to save the file as Blob
      saveAs(response.data, filename);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  const renderFilePreview = () => {
    if (!fileUrl || !fileType) return null;

    if (fileType.startsWith('image/')) {
      return (
        <div className="relative">
          <img
            src={
              fileUrl.startsWith('blob:')
                ? fileUrl
                : `http://localhost:4000${fileUrl}`
            }
            alt="File preview"
            className="max-w-xs max-h-60 rounded-lg"
          />
          <button
            onClick={handleDownload}
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full"
          >
            Download
          </button>
        </div>
      );
    }

    if (fileType.startsWith('application/pdf')) {
      return (
        <div className="relative">
          <embed
            src={
              fileUrl.startsWith('blob:')
                ? fileUrl
                : `http://localhost:4000${fileUrl}`
            }
            type="application/pdf"
            className="max-w-xs max-h-60 rounded-lg"
          />
          <button
            onClick={handleDownload}
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full"
          >
            Download
          </button>
        </div>
      );
    }

    if (fileType.startsWith('audio/')) {
      return (
        <div className="relative">
          <audio
            controls
            src={
              fileUrl.startsWith('blob:')
                ? fileUrl
                : `http://localhost:4000${fileUrl}`
            }
            className="max-w-xs"
          />
          <button
            onClick={handleDownload}
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full"
          >
            Download
          </button>
        </div>
      );
    }

    if (fileType.startsWith('video/')) {
      return (
        <div className="relative">
          <video
            controls
            src={
              fileUrl.startsWith('blob:')
                ? fileUrl
                : `http://localhost:4000${fileUrl}`
            }
            className="max-w-xs max-h-60 rounded-lg"
          />
          <button
            onClick={handleDownload}
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full"
          >
            Download
          </button>
        </div>
      );
    }

    return (
      <div className="text-center">
        <a
          href={
            fileUrl.startsWith('blob:')
              ? fileUrl
              : `http://localhost:4000${fileUrl}`
          }
          download={file.name}
          onClick={handleDownload}
          className="text-blue-700 underline"
        >
          {file.name}
        </a>
      </div>
    );
  };

  return (
    <div className={`flex ${isSent ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isSent && (
        <img
          src={profilePhoto}
          alt="Profile"
          className="w-10 h-10 rounded-full mr-3"
        />
      )}
      <div>
        <div className="text-xs text-gray-500 mt-1 text-left">{name}</div>
        <div
          className={`p-3 rounded-lg ${
            isSent ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
          } max-w-xs`}
        >
          {file && <div className="mt-2">{renderFilePreview()}</div>}
          <p className="mt-2">{message}</p>
        </div>
        <div className="text-xs text-gray-500 mt-1 text-right">
          {moment(time).fromNow()} ({moment(time).format('h:mm A')})
        </div>
      </div>
      {isSent && (
        <img
          src={profilePhoto}
          alt="Profile"
          className="w-10 h-10 rounded-full ml-3"
        />
      )}
    </div>
  );
}

export default ChatMessage;

import React, { useState } from 'react';
import { FaSyncAlt, FaClipboard, FaYoutube } from 'react-icons/fa';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

export default function App() {
  const [output, setOutput] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateOutput = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`https://s5xadp.buildship.run/generate?url=${url}`);
      setOutput(data.output);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 min-h-screen">
      <div className="w-full max-w-3xl p-6 mx-auto bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">Timestamp Generator</h1>
          <button
            className="flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={generateOutput}
          >
            <FaSyncAlt className="mr-2" />
            Generate
          </button>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaYoutube className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="url"
              id="url"
              className="block w-full pl-10 pr-3 py-2 text-gray-900 placeholder-gray-500 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter YouTube URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          {loading && (
            <div className="flex justify-center">
              <ClipLoader color="#4B5563" />
            </div>
          )}
          {output && !loading && (
            <div className="my-4 overflow-y-scroll border border-gray-200 rounded-md">
              <pre className="p-4 text-sm font-mono">{output}</pre>
              <button
                className="flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-b-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => navigator.clipboard.writeText(output)}
              >
                <FaClipboard className="mr-2" />
                Copy to Clipboard
              </button>
            </div>
          )}
          {!output && !loading && (
            <p className="text-md font-medium text-gray-600">
              Enter a YouTube URL and click the "Generate" button to generate timestamps.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
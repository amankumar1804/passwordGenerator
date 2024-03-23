import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false); // State for tracking whether password is copied

  const passRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()><'[]`_=+-";

    for (let i = 1; i <= length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, setPassword, passwordGenerator]);

  const copyPasswordToClipboard = useCallback(() => {
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true); // Set copied state to true after successful copy
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    });
  }, [password]);

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
      <h3 className='text-white text-center'>Password Generator</h3>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
          type="text" 
          value={password} 
          className='outline-none w-full py-1 px-3 my-3 rounded-lg' 
          placeholder='Password' 
          readOnly 
          ref={passRef} 
        />
        <button 
          className='outline-none bg-blue-500 text-white py-1 px-3 my-3 shrink-0 rounded-lg' 
          onClick={copyPasswordToClipboard}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div>
        <div className='flex items-center gap-x-1'>
          <input
            type="range"
            min={5}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {
              setLength(parseInt(e.target.value));
            }}
          />
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            checked={numAllowed}
            id='numberInput'
            onChange={() => {
              setNumAllowed((prev) => !prev);
            }}
          />
          <label>Include Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            checked={charAllowed}
            id='characterInput'
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label>Include Special Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;

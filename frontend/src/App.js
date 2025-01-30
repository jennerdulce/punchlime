import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    contactAPI();
  }, [])

  const contactAPI = async () => {
    const response =  await axios.get('/hello');
    setMessage(response.data.message)
  }

  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
}

export default App;
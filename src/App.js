import React, { useState } from 'react';
import './App.css';
import UserList from './UserList';
import CategoryWinners from './CategoryWinners';
import Login from './Login';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <h1>Water Footprint Analysis</h1>
      {loggedIn ? (
        <>
          <CategoryWinners />
          <UserList />
        </>
      ) : (
        <Login onLogin={setLoggedIn} />
      )}
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Statisticx } from './models'; // Adjust the path to your generated models
import { Auth } from 'aws-amplify'; // Import Auth from aws-amplify

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);
  const handleSignOut = async () => {
    try {
      await Auth.signOut(); // Sign out the user
      window.location.reload(); // Refresh the page to update the UI
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  const fetchUsers = async () => {
    try {
      const usersData = await DataStore.query(Statisticx);
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleRefresh = () => {
    fetchUsers();
  };

  return (
    <div>
      <h2>Users List</h2>
      <button onClick={handleRefresh}>Refresh</button>
      <button onClick={handleSignOut}>Sign Out</button>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Saved Value</th>
            <th>Total Value</th>
            <th>Current Saved Value</th>
            <th>Current Total Value</th>
            <th>Start Date</th>
            <th>Visit Count</th>
            <th>Last Update Time</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.savedvalue}</td>
              <td>{user.totalvalue}</td>
              <td>{user.currentsavedvalue}</td>
              <td>{user.currenttotalvalue}</td>
              <td>{user.startdate}</td>
              <td>{user.visitcount}</td>
              <td>{user.lastupdatetime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;

import React, { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Statisticx } from './models';
import { Auth } from 'aws-amplify';

import ExcelJS from 'exceljs';


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState('username');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      window.location.reload();
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

  const formatReadableDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const sortedUsers = [...users]?.sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    return sortOrder === 'asc' ? aValue?.toString().localeCompare(bValue?.toString()) : bValue?.toString().localeCompare(aValue?.toString());
  });

  const handleExcel = () => {
    // Create a new workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');
    const sortedUsers = [...users]?.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      return sortOrder === 'asc' ? aValue?.toString().localeCompare(bValue?.toString()) : bValue?.toString().localeCompare(aValue?.toString());
    });

    worksheet.addRow(['username', 'totalvalue','currerntsavedvalue','currentotalvalue', 'startdate', 'visitcount', 'lastupdatetime','watersaveincreaserate']);

    sortedUsers.map((user) => (
      worksheet.addRow([user.username, user.totalvalue, user.currerntsavedvalue, user.currentotalvalue, formatReadableDate(user.startdate), user.visitcount, formatReadableDate(user.lastupdatetime),((user?.currerntsavedvalue-user?.savedvalue)/user?.savedvalue * 100).toFixed(2)])

    ))




    // Generate a blob from the workbook
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.xlsx';
      a.click();
      URL.revokeObjectURL(url);
    });

  }
  const filteredUsers = sortedUsers.filter(user => user.username && user.username.trim() !== '');

  return (
    <div>
      <h2>Users List</h2>
      <button onClick={handleRefresh}>Refresh</button>
      <button onClick={handleExcel}>To Excel</button>
      <button onClick={handleSignOut}>Sign Out</button>
      <table id="userTable">
        <thead>
          <tr>
            <th onClick={() => handleSort('username')}>Username ▼</th>
            {/* <th onClick={() => handleSort('savedvalue')}>Saved Value ▼</th> */}
            <th onClick={() => handleSort('totalvalue')}>WaterFoot Print Initial ▼</th>
            <th onClick={() => handleSort('currerntsavedvalue')}>Total Saved ▼</th>
            <th onClick={() => handleSort('currentotalvalue')}>Current WaterFoot Print ▼</th>
            <th onClick={() => handleSort('startdate')}>Start Date ▼</th>
            <th onClick={() => handleSort('visitcount')}>Visit Count ▼</th>
            <th onClick={() => handleSort('lastupdatetime')}>Last Update Time ▼</th>
            <th>Water Save Increase Rate</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user?.id}>
              <td>{user?.username}</td>
              {/* <td>{user?.savedvalue}</td> */}
              <td>{user?.totalvalue}</td>
              <td>{user?.currerntsavedvalue}</td>
              <td>{user?.currentotalvalue}</td>
              <td>{formatReadableDate(user?.startdate)}</td>
              <td>{user?.visitcount}</td>
              <td>{formatReadableDate(user?.lastupdatetime)}</td>
              <td>{((user?.currerntsavedvalue-user?.savedvalue)/user?.savedvalue * 100).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;

import React, { useState, useEffect } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { DataStore } from '@aws-amplify/datastore';
import { Statisticx } from './models'; // Adjust the path to your generated models

const CategoryWinners = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersData = await DataStore.query(Statisticx);
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const findMostSavedWaterWinner = () => {
    const sortedUsers = users.slice().sort((a, b) => b.savedvalue - a.savedvalue);
    return sortedUsers[0];
  };

  const findMostVisitorsWinner = () => {
    const sortedUsers = users.slice().sort((a, b) => b.visitcount - a.visitcount);
    return sortedUsers[0];
  };

  const findMostDecreasedValueWinner = () => {
    const sortedUsers = users.slice().sort((a, b) => (b.totalvalue - b.currentotalvalue) - (a.totalvalue - a.currentotalvalue));
    return sortedUsers[0];
  };

  const refreshData = () => {
    fetchUsers();
  };

  const mostSavedWaterWinner = findMostSavedWaterWinner();
  const mostVisitorsWinner = findMostVisitorsWinner();
  const mostDecreasedValueWinner = findMostDecreasedValueWinner();

  return (
    <div>
      <h2 className="mb-4">Category Winners</h2>
      <Button variant="primary" onClick={refreshData}>
        Refresh
      </Button>
      <Alert variant="success" className="mt-3">
        Most Saved Water Winner: {mostSavedWaterWinner?.username} - {mostSavedWaterWinner?.savedvalue} liters
      </Alert>
      <Alert variant="info" className="mt-3">
        Most Visitors Winner: {mostVisitorsWinner?.username} - {mostVisitorsWinner?.visitcount} visits
      </Alert>
      <Alert variant="warning" className="mt-3">
        Most Decreased Value Winner: {mostDecreasedValueWinner?.username} - {mostDecreasedValueWinner ? (mostDecreasedValueWinner.totalvalue - mostDecreasedValueWinner.currentotalvalue) : 0} liters
      </Alert>
    </div>
  );
};

export default CategoryWinners;

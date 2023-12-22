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
    const sortedUsers = users.slice().sort((a, b) =>b.currerntsavedvalue -a.currerntsavedvalue  );
    return sortedUsers;
  };

  const getTopThreeItems = (items) => {
    if (!Array.isArray(items)) {
      return ""; // Return an empty string for non-array inputs
    }
  
    const topThreeItems = items.map(user=>user.username).slice(0, 4); // Extract the first three items or less
    return topThreeItems.join(", "); // Join them with commas
  };
  

  const findMostVisitorsWinner = () => {
    const sortedUsers = users.slice().sort((a, b) => b.visitcount - a.visitcount);
    return sortedUsers;
  };

  const findMostDecreasedValueWinner = () => {
    const sortedUsers = users.slice().sort((a, b) => (a.currentotalvalue!==0 && b.currentotalvalue !==0 && (a.currentotalvalue  - a.totalvalue) -(b.currentotalvalue-b.totalvalue  ) ));
    return sortedUsers;
  };

  const findLeastWaterFootPrintValueWinner = () => {
    const sortedUsers = users.slice().sort((a, b) => (a.totalvalue - b.totalvalue) );
    return sortedUsers;
  };

  const refreshData = () => {
    fetchUsers();
  };

  const mostSavedWaterWinner = getTopThreeItems(findMostSavedWaterWinner());
  const mostVisitorsWinner = getTopThreeItems(findMostVisitorsWinner());
  const mostDecreasedValueWinner =  getTopThreeItems(findMostDecreasedValueWinner());
  const leastWaterFootPrint =  getTopThreeItems(findLeastWaterFootPrintValueWinner());
  return (
    <div>
       <h2 className="mb-4">EMEA-ISTANBUL Office</h2>
      <h2 className="mb-4">Category Winners</h2>
      <Button variant="primary" onClick={refreshData}>
        Refresh
      </Button>
      <Alert variant="success" className="mt-3">
        Most Saved Water Winner: {mostSavedWaterWinner}   
      </Alert>
      <Alert variant="info" className="mt-3">
        Most Visitors Winner:  {mostVisitorsWinner}  
      </Alert>
      <Alert variant="warning" className="mt-3">
        Most Decreased Value Winner: {mostDecreasedValueWinner}  
      </Alert>
      <Alert variant="warning" className="mt-3">
       The best starters(Who starts the challenge with the lowest water footprint): {leastWaterFootPrint}  
      </Alert>
    </div>
  );
};

export default CategoryWinners;

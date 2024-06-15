import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [userDetails, setUserDetails] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:3001/users');
        setUsers(response.data);
        setIsLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (selectedUser) {
        setIsLoading(true);
        try {
          const response = await axios.get(`http://localhost:3001/users/${selectedUser}`);
          setUserDetails(response.data);
          setIsLoading(false);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unknown error occurred.');
          }
          setIsLoading(false);
        }
      } else {
        setUserDetails(null); // Clear userDetails if selectedUser is empty
      }
    };

    fetchUserDetails();
  }, [selectedUser]);

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="App">
      <h1>User Details</h1>
      <select value={selectedUser} onChange={handleUserSelect}>
        <option value="">Please select</option>
        {users.map((user) => (
          <option key={user.name} value={user.name}>
            {user.name}
          </option>
        ))}
      </select>
      <br />
      {userDetails && (
        <div>
          <h2>{userDetails.name}</h2>
          <p>Current Address: {userDetails.details.currentAddress}</p>
          <p>Office Address: {userDetails.details.officeAddress}</p>
          <p>Mobile Number: {userDetails.details.MobileNo}</p>
        </div>
      )}
    </div>
  );
};

export default App;
